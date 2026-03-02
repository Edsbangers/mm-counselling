import { NextRequest, NextResponse } from "next/server";
import { decrypt, encrypt } from "@/lib/social/crypto";
import {
  getUserPages,
  getInstagramBusinessAccount,
} from "@/lib/social/meta-oauth";

async function getDb() {
  try {
    if (!process.env.POSTGRES_PRISMA_URL) return null;
    const { prisma } = await import("@/lib/db");
    return prisma;
  } catch {
    return null;
  }
}

export async function GET() {
  const db = await getDb();
  if (!db) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    );
  }

  const connections = await db.socialConnection.findMany();

  const result: Record<
    string,
    {
      connected: boolean;
      status: string;
      pageName?: string;
      igUsername?: string;
      expiresAt?: string;
    }
  > = {
    facebook: { connected: false, status: "disconnected" },
    instagram: { connected: false, status: "disconnected" },
  };

  for (const conn of connections) {
    result[conn.platform] = {
      connected: conn.status === "active",
      status: conn.status,
      pageName: conn.pageName || undefined,
      igUsername: conn.igUsername || undefined,
      expiresAt: conn.tokenExpiresAt?.toISOString(),
    };
  }

  return NextResponse.json(result);
}

// Finalize page selection (when user has multiple Facebook pages)
export async function POST(request: NextRequest) {
  const db = await getDb();
  if (!db) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    );
  }

  const { pageId, pageName } = await request.json();
  if (!pageId || !pageName) {
    return NextResponse.json(
      { error: "pageId and pageName are required" },
      { status: 400 }
    );
  }

  // Load the pending Facebook connection
  const fbConn = await db.socialConnection.findUnique({
    where: { platform: "facebook" },
  });

  if (!fbConn || fbConn.status !== "pending_page_selection") {
    return NextResponse.json(
      { error: "No pending connection found" },
      { status: 400 }
    );
  }

  try {
    // Decrypt the stored user token
    const userToken = decrypt({
      ciphertext: fbConn.userAccessToken,
      iv: fbConn.userAccessTokenIv,
      tag: fbConn.userAccessTokenTag,
    });

    // Get the page access token for the selected page
    const pages = await getUserPages(userToken);
    const selectedPage = pages.find((p) => p.id === pageId);
    if (!selectedPage) {
      return NextResponse.json(
        { error: "Page not found in your account" },
        { status: 400 }
      );
    }

    const encPageToken = encrypt(selectedPage.access_token);

    // Update Facebook connection
    await db.socialConnection.update({
      where: { platform: "facebook" },
      data: {
        pageAccessToken: encPageToken.ciphertext,
        pageAccessTokenIv: encPageToken.iv,
        pageAccessTokenTag: encPageToken.tag,
        status: "active",
        pageId,
        pageName,
      },
    });

    // Check for Instagram Business Account
    const ig = await getInstagramBusinessAccount(pageId, userToken);
    if (ig) {
      const encUserToken = encrypt(userToken);
      await db.socialConnection.upsert({
        where: { platform: "instagram" },
        create: {
          platform: "instagram",
          userAccessToken: encUserToken.ciphertext,
          userAccessTokenIv: encUserToken.iv,
          userAccessTokenTag: encUserToken.tag,
          pageAccessToken: encPageToken.ciphertext,
          pageAccessTokenIv: encPageToken.iv,
          pageAccessTokenTag: encPageToken.tag,
          tokenExpiresAt: fbConn.tokenExpiresAt,
          status: "active",
          pageId,
          pageName,
          igBusinessAccountId: ig.id,
          igUsername: ig.username,
        },
        update: {
          userAccessToken: encUserToken.ciphertext,
          userAccessTokenIv: encUserToken.iv,
          userAccessTokenTag: encUserToken.tag,
          pageAccessToken: encPageToken.ciphertext,
          pageAccessTokenIv: encPageToken.iv,
          pageAccessTokenTag: encPageToken.tag,
          tokenExpiresAt: fbConn.tokenExpiresAt,
          status: "active",
          pageId,
          pageName,
          igBusinessAccountId: ig.id,
          igUsername: ig.username,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Page selection error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to complete setup",
      },
      { status: 500 }
    );
  }
}

// Disconnect a platform
export async function DELETE(request: NextRequest) {
  const db = await getDb();
  if (!db) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    );
  }

  const { platform } = await request.json();
  if (!platform) {
    return NextResponse.json(
      { error: "platform is required" },
      { status: 400 }
    );
  }

  // Disconnecting Facebook also disconnects Instagram (shared Meta app)
  if (platform === "facebook") {
    await db.socialConnection.deleteMany({
      where: { platform: { in: ["facebook", "instagram"] } },
    });
  } else {
    await db.socialConnection.deleteMany({
      where: { platform },
    });
  }

  return NextResponse.json({ success: true });
}
