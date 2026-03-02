const META_GRAPH_BASE = "https://graph.facebook.com/v21.0";

export interface PublishResult {
  success: boolean;
  platformPostId?: string;
  platformUrl?: string;
  error?: string;
}

export async function publishToFacebook(
  pageId: string,
  pageAccessToken: string,
  content: { message: string; link?: string; imageUrl?: string }
): Promise<PublishResult> {
  try {
    if (content.imageUrl) {
      // Photo post with caption
      const params = new URLSearchParams({
        url: content.imageUrl,
        caption:
          content.message + (content.link ? `\n\n${content.link}` : ""),
        access_token: pageAccessToken,
      });
      const res = await fetch(`${META_GRAPH_BASE}/${pageId}/photos`, {
        method: "POST",
        body: params,
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);

      return {
        success: true,
        platformPostId: data.id,
        platformUrl: `https://www.facebook.com/${data.id}`,
      };
    }

    // Text + link post
    const params = new URLSearchParams({
      message: content.message,
      access_token: pageAccessToken,
    });
    if (content.link) params.set("link", content.link);

    const res = await fetch(`${META_GRAPH_BASE}/${pageId}/feed`, {
      method: "POST",
      body: params,
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);

    return {
      success: true,
      platformPostId: data.id,
      platformUrl: `https://www.facebook.com/${data.id}`,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Facebook publishing failed",
    };
  }
}

export async function publishToInstagram(
  igBusinessAccountId: string,
  pageAccessToken: string,
  content: { imageUrl: string; caption: string }
): Promise<PublishResult> {
  try {
    // Step 1: Create media container
    const containerParams = new URLSearchParams({
      image_url: content.imageUrl,
      caption: content.caption,
      access_token: pageAccessToken,
    });

    const containerRes = await fetch(
      `${META_GRAPH_BASE}/${igBusinessAccountId}/media`,
      { method: "POST", body: containerParams }
    );
    const container = await containerRes.json();
    if (container.error) throw new Error(container.error.message);

    const creationId = container.id;

    // Step 2: Wait for container to be ready
    let ready = false;
    let attempts = 0;
    while (!ready && attempts < 10) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const statusRes = await fetch(
        `${META_GRAPH_BASE}/${creationId}?fields=status_code&access_token=${pageAccessToken}`
      );
      const statusData = await statusRes.json();
      if (statusData.status_code === "FINISHED") {
        ready = true;
      } else if (statusData.status_code === "ERROR") {
        throw new Error("Instagram media processing failed");
      }
      attempts++;
    }
    if (!ready) throw new Error("Instagram media processing timed out");

    // Step 3: Publish the container
    const publishParams = new URLSearchParams({
      creation_id: creationId,
      access_token: pageAccessToken,
    });

    const publishRes = await fetch(
      `${META_GRAPH_BASE}/${igBusinessAccountId}/media_publish`,
      { method: "POST", body: publishParams }
    );
    const publishData = await publishRes.json();
    if (publishData.error) throw new Error(publishData.error.message);

    // Step 4: Get the permalink
    const mediaRes = await fetch(
      `${META_GRAPH_BASE}/${publishData.id}?fields=permalink&access_token=${pageAccessToken}`
    );
    const mediaData = mediaRes.ok ? await mediaRes.json() : {};

    return {
      success: true,
      platformPostId: publishData.id,
      platformUrl: mediaData.permalink || undefined,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Instagram publishing failed",
    };
  }
}
