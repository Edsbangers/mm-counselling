import { encrypt, decrypt } from "./crypto";
import { exchangeForLongLivedToken, getUserPages } from "./meta-oauth";

async function getDb() {
  try {
    if (!process.env.POSTGRES_PRISMA_URL) return null;
    const { prisma } = await import("@/lib/db");
    return prisma;
  } catch {
    return null;
  }
}

function isTokenExpiringSoon(expiresAt: Date, daysThreshold: number): boolean {
  const threshold = new Date(
    Date.now() + daysThreshold * 24 * 60 * 60 * 1000
  );
  return expiresAt <= threshold;
}

export async function checkAndRefreshTokens(): Promise<void> {
  const db = await getDb();
  if (!db) return;

  const connections = await db.socialConnection.findMany({
    where: { status: "active" },
  });

  for (const conn of connections) {
    if (!conn.tokenExpiresAt || !isTokenExpiringSoon(conn.tokenExpiresAt, 7)) {
      continue;
    }

    try {
      const currentToken = decrypt({
        ciphertext: conn.userAccessToken,
        iv: conn.userAccessTokenIv,
        tag: conn.userAccessTokenTag,
      });

      const refreshed = await exchangeForLongLivedToken(currentToken);
      const encrypted = encrypt(refreshed.access_token);
      const newExpiry = new Date(
        Date.now() + refreshed.expires_in * 1000
      );

      await db.socialConnection.update({
        where: { id: conn.id },
        data: {
          userAccessToken: encrypted.ciphertext,
          userAccessTokenIv: encrypted.iv,
          userAccessTokenTag: encrypted.tag,
          tokenExpiresAt: newExpiry,
        },
      });

      // Re-derive page token from refreshed user token
      if (conn.pageId) {
        const pages = await getUserPages(refreshed.access_token);
        const page = pages.find((p) => p.id === conn.pageId);
        if (page?.access_token) {
          const encPageToken = encrypt(page.access_token);
          await db.socialConnection.update({
            where: { id: conn.id },
            data: {
              pageAccessToken: encPageToken.ciphertext,
              pageAccessTokenIv: encPageToken.iv,
              pageAccessTokenTag: encPageToken.tag,
            },
          });
        }
      }

      await db.tokenRefreshLog.create({
        data: { platform: conn.platform, success: true },
      });
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Unknown error";
      await db.tokenRefreshLog.create({
        data: { platform: conn.platform, success: false, error: errorMsg },
      });

      // Mark connection as expired if refresh fails
      await db.socialConnection.update({
        where: { id: conn.id },
        data: { status: "expired" },
      });
    }
  }
}

export async function getDecryptedPageToken(
  platform: "facebook" | "instagram"
): Promise<{ token: string; pageId: string; igBusinessAccountId?: string } | null> {
  const db = await getDb();
  if (!db) return null;

  const connection = await db.socialConnection.findUnique({
    where: { platform },
  });

  if (
    !connection ||
    connection.status !== "active" ||
    !connection.pageAccessToken ||
    !connection.pageAccessTokenIv ||
    !connection.pageAccessTokenTag
  ) {
    return null;
  }

  const token = decrypt({
    ciphertext: connection.pageAccessToken,
    iv: connection.pageAccessTokenIv,
    tag: connection.pageAccessTokenTag,
  });

  return {
    token,
    pageId: connection.pageId || "",
    igBusinessAccountId: connection.igBusinessAccountId || undefined,
  };
}
