import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { encrypt } from "@/lib/social/crypto";
import {
  exchangeCodeForToken,
  exchangeForLongLivedToken,
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

async function setupConnections(
  db: NonNullable<Awaited<ReturnType<typeof getDb>>>,
  page: { id: string; name: string; access_token: string },
  longLivedUserToken: string,
  tokenExpiresAt: Date
) {
  const encUserToken = encrypt(longLivedUserToken);
  const encPageToken = encrypt(page.access_token);

  // Upsert Facebook connection
  await db.socialConnection.upsert({
    where: { platform: "facebook" },
    create: {
      platform: "facebook",
      userAccessToken: encUserToken.ciphertext,
      userAccessTokenIv: encUserToken.iv,
      userAccessTokenTag: encUserToken.tag,
      pageAccessToken: encPageToken.ciphertext,
      pageAccessTokenIv: encPageToken.iv,
      pageAccessTokenTag: encPageToken.tag,
      tokenExpiresAt,
      status: "active",
      pageId: page.id,
      pageName: page.name,
    },
    update: {
      userAccessToken: encUserToken.ciphertext,
      userAccessTokenIv: encUserToken.iv,
      userAccessTokenTag: encUserToken.tag,
      pageAccessToken: encPageToken.ciphertext,
      pageAccessTokenIv: encPageToken.iv,
      pageAccessTokenTag: encPageToken.tag,
      tokenExpiresAt,
      status: "active",
      pageId: page.id,
      pageName: page.name,
    },
  });

  // Check for linked Instagram Business Account
  const ig = await getInstagramBusinessAccount(page.id, longLivedUserToken);
  if (ig) {
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
        tokenExpiresAt,
        status: "active",
        pageId: page.id,
        pageName: page.name,
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
        tokenExpiresAt,
        status: "active",
        pageId: page.id,
        pageName: page.name,
        igBusinessAccountId: ig.id,
        igUsername: ig.username,
      },
    });
  }
}

export async function GET(request: NextRequest) {
  const db = await getDb();
  if (!db) {
    return NextResponse.redirect(
      new URL("/admin/social?error=database_error", request.url)
    );
  }

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const errorParam = request.nextUrl.searchParams.get("error");

  // Handle user denying permissions
  if (errorParam) {
    return NextResponse.redirect(
      new URL(`/admin/social?error=${errorParam}`, request.url)
    );
  }

  // Verify CSRF state
  const cookieStore = await cookies();
  const storedState = cookieStore.get("meta_oauth_state")?.value;
  cookieStore.delete("meta_oauth_state");

  if (!state || !storedState || state !== storedState) {
    return NextResponse.redirect(
      new URL("/admin/social?error=invalid_state", request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/admin/social?error=no_code", request.url)
    );
  }

  try {
    // Exchange code for short-lived token
    const shortLived = await exchangeCodeForToken(code);

    // Exchange for long-lived token (60 days)
    const longLived = await exchangeForLongLivedToken(
      shortLived.access_token
    );
    const expiresAt = new Date(
      Date.now() + longLived.expires_in * 1000
    );

    // Fetch user's Facebook Pages
    const pages = await getUserPages(longLived.access_token);

    if (pages.length === 0) {
      return NextResponse.redirect(
        new URL("/admin/social?error=no_pages", request.url)
      );
    }

    if (pages.length === 1) {
      // Auto-select the single page
      await setupConnections(
        db,
        pages[0],
        longLived.access_token,
        expiresAt
      );
      return NextResponse.redirect(
        new URL("/admin/social?connected=true", request.url)
      );
    }

    // Multiple pages: store user token as pending, let user select page
    const encUserToken = encrypt(longLived.access_token);
    await db.socialConnection.upsert({
      where: { platform: "facebook" },
      create: {
        platform: "facebook",
        userAccessToken: encUserToken.ciphertext,
        userAccessTokenIv: encUserToken.iv,
        userAccessTokenTag: encUserToken.tag,
        tokenExpiresAt: expiresAt,
        status: "pending_page_selection",
      },
      update: {
        userAccessToken: encUserToken.ciphertext,
        userAccessTokenIv: encUserToken.iv,
        userAccessTokenTag: encUserToken.tag,
        tokenExpiresAt: expiresAt,
        status: "pending_page_selection",
        pageId: null,
        pageName: null,
        pageAccessToken: null,
        pageAccessTokenIv: null,
        pageAccessTokenTag: null,
      },
    });

    // Pass page list (IDs and names only, not tokens)
    const pageList = pages.map((p) => ({ id: p.id, name: p.name }));
    return NextResponse.redirect(
      new URL(
        `/admin/social?select_page=${encodeURIComponent(JSON.stringify(pageList))}`,
        request.url
      )
    );
  } catch (error) {
    console.error("Meta OAuth callback error:", error);
    return NextResponse.redirect(
      new URL("/admin/social?error=oauth_failed", request.url)
    );
  }
}
