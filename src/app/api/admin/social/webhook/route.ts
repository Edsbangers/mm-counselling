import { NextRequest, NextResponse } from "next/server";

async function getDb() {
  try {
    if (!process.env.POSTGRES_PRISMA_URL) return null;
    const { prisma } = await import("@/lib/db");
    return prisma;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  const db = await getDb();
  if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

  const webhookUrl = process.env.SOCIAL_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "SOCIAL_WEBHOOK_URL is not configured" },
      { status: 500 }
    );
  }

  const { socialPostId } = await request.json();

  const socialPost = await db.socialPost.findUnique({
    where: { id: socialPostId },
    include: { blogPost: { select: { title: true, slug: true, coverImageUrl: true } } },
  });

  if (!socialPost) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const payload = {
    caption: socialPost.caption,
    hashtags: socialPost.hashtags,
    imageUrl: socialPost.imageUrl || socialPost.blogPost.coverImageUrl || null,
    blogUrl: socialPost.blogUrl,
    blogTitle: socialPost.blogPost.title,
  };

  const webhookRes = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!webhookRes.ok) {
    return NextResponse.json(
      { error: "Webhook failed", status: webhookRes.status },
      { status: 502 }
    );
  }

  await db.socialPost.update({
    where: { id: socialPostId },
    data: { status: "sent", sentAt: new Date() },
  });

  return NextResponse.json({ success: true });
}
