import { decrypt } from "./crypto";
import { checkAndRefreshTokens } from "./token-manager";
import { publishToFacebook, publishToInstagram } from "./meta-publisher";
import type { PublishResult } from "./meta-publisher";

async function getDb() {
  try {
    if (!process.env.POSTGRES_PRISMA_URL) return null;
    const { prisma } = await import("@/lib/db");
    return prisma;
  } catch {
    return null;
  }
}

type Platform = "facebook" | "instagram";

interface PublishRequest {
  socialPostId: string;
  platforms: Platform[];
}

interface PlatformResult extends PublishResult {
  platform: string;
}

interface PublishResponse {
  results: PlatformResult[];
  overallStatus: "published" | "partial" | "failed";
}

export async function publishToSocials(
  request: PublishRequest
): Promise<PublishResponse> {
  const db = await getDb();
  if (!db) throw new Error("Database not configured");

  // Refresh tokens if expiring soon
  await checkAndRefreshTokens();

  const socialPost = await db.socialPost.findUnique({
    where: { id: request.socialPostId },
    include: {
      blogPost: {
        select: { title: true, slug: true, coverImageUrl: true },
      },
    },
  });
  if (!socialPost) throw new Error("Social post not found");

  await db.socialPost.update({
    where: { id: request.socialPostId },
    data: { status: "publishing" },
  });

  const results: PlatformResult[] = [];

  for (const platform of request.platforms) {
    const connection = await db.socialConnection.findUnique({
      where: { platform },
    });

    if (!connection || connection.status !== "active") {
      const result: PlatformResult = {
        platform,
        success: false,
        error: `${platform} is not connected`,
      };
      results.push(result);
      await db.publishLog.create({
        data: {
          socialPostId: request.socialPostId,
          platform,
          contentSnippet: (socialPost.caption || "").slice(0, 100),
          status: "failed",
          error: result.error,
        },
      });
      continue;
    }

    if (
      !connection.pageAccessToken ||
      !connection.pageAccessTokenIv ||
      !connection.pageAccessTokenTag
    ) {
      const result: PlatformResult = {
        platform,
        success: false,
        error: `${platform} page token not configured`,
      };
      results.push(result);
      await db.publishLog.create({
        data: {
          socialPostId: request.socialPostId,
          platform,
          contentSnippet: (socialPost.caption || "").slice(0, 100),
          status: "failed",
          error: result.error,
        },
      });
      continue;
    }

    const pageToken = decrypt({
      ciphertext: connection.pageAccessToken,
      iv: connection.pageAccessTokenIv,
      tag: connection.pageAccessTokenTag,
    });

    let result: PublishResult;

    if (platform === "facebook") {
      const fbContent = socialPost.facebookContent || socialPost.caption;
      result = await publishToFacebook(connection.pageId!, pageToken, {
        message: fbContent,
        link: socialPost.blogUrl || undefined,
        imageUrl:
          socialPost.imageUrl ||
          socialPost.blogPost.coverImageUrl ||
          undefined,
      });
    } else {
      // Instagram requires an image
      const imageUrl =
        socialPost.imageUrl || socialPost.blogPost.coverImageUrl;
      if (!imageUrl) {
        result = {
          success: false,
          error: "Instagram requires an image — upload a cover image first",
        };
      } else {
        const captionWithHashtags =
          socialPost.caption +
          (socialPost.hashtags ? `\n\n${socialPost.hashtags}` : "");
        result = await publishToInstagram(
          connection.igBusinessAccountId!,
          pageToken,
          {
            imageUrl,
            caption: captionWithHashtags.slice(0, 2200),
          }
        );
      }
    }

    results.push({ platform, ...result });

    await db.publishLog.create({
      data: {
        socialPostId: request.socialPostId,
        platform,
        contentSnippet: (socialPost.caption || "").slice(0, 100),
        status: result.success ? "success" : "failed",
        platformPostId: result.platformPostId || null,
        platformUrl: result.platformUrl || null,
        error: result.error || null,
      },
    });
  }

  const allSuccess = results.every((r) => r.success);
  const allFailed = results.every((r) => !r.success);
  const overallStatus = allSuccess
    ? "published"
    : allFailed
      ? "failed"
      : "partial";

  await db.socialPost.update({
    where: { id: request.socialPostId },
    data: {
      status: overallStatus,
      sentAt: !allFailed ? new Date() : undefined,
    },
  });

  return { results, overallStatus };
}
