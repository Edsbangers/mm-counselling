const META_GRAPH_BASE = "https://graph.facebook.com/v21.0";

export function getMetaAuthUrl(state: string): string {
  const appId = process.env.META_APP_ID;
  const redirectUri = process.env.META_REDIRECT_URI;
  if (!appId || !redirectUri) {
    throw new Error("META_APP_ID and META_REDIRECT_URI must be configured");
  }

  const params = new URLSearchParams({
    client_id: appId,
    redirect_uri: redirectUri,
    scope: [
      "pages_show_list",
      "pages_manage_posts",
      "pages_read_engagement",
      "instagram_basic",
      "instagram_content_publish",
    ].join(","),
    response_type: "code",
    state,
  });

  return `https://www.facebook.com/v21.0/dialog/oauth?${params}`;
}

export async function exchangeCodeForToken(
  code: string
): Promise<{ access_token: string; token_type: string; expires_in: number }> {
  const params = new URLSearchParams({
    client_id: process.env.META_APP_ID!,
    client_secret: process.env.META_APP_SECRET!,
    redirect_uri: process.env.META_REDIRECT_URI!,
    code,
  });

  const res = await fetch(`${META_GRAPH_BASE}/oauth/access_token?${params}`);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(
      error.error?.message || `Token exchange failed: ${res.status}`
    );
  }
  return res.json();
}

export async function exchangeForLongLivedToken(
  shortToken: string
): Promise<{ access_token: string; token_type: string; expires_in: number }> {
  const params = new URLSearchParams({
    grant_type: "fb_exchange_token",
    client_id: process.env.META_APP_ID!,
    client_secret: process.env.META_APP_SECRET!,
    fb_exchange_token: shortToken,
  });

  const res = await fetch(`${META_GRAPH_BASE}/oauth/access_token?${params}`);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(
      error.error?.message ||
        `Long-lived token exchange failed: ${res.status}`
    );
  }
  return res.json();
}

export interface MetaPage {
  id: string;
  name: string;
  access_token: string;
}

export async function getUserPages(
  userToken: string
): Promise<MetaPage[]> {
  const res = await fetch(
    `${META_GRAPH_BASE}/me/accounts?access_token=${userToken}`
  );
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(
      error.error?.message || `Failed to fetch pages: ${res.status}`
    );
  }
  const data = await res.json();
  return data.data || [];
}

export async function getInstagramBusinessAccount(
  pageId: string,
  userToken: string
): Promise<{ id: string; username: string } | null> {
  const res = await fetch(
    `${META_GRAPH_BASE}/${pageId}?fields=instagram_business_account&access_token=${userToken}`
  );
  if (!res.ok) return null;
  const data = await res.json();
  const igId = data.instagram_business_account?.id;
  if (!igId) return null;

  // Fetch the IG username
  const igRes = await fetch(
    `${META_GRAPH_BASE}/${igId}?fields=username&access_token=${userToken}`
  );
  const igData = igRes.ok ? await igRes.json() : {};

  return { id: igId, username: igData.username || "" };
}
