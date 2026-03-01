import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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
  if (!db) return NextResponse.json([]);

  const posts = await db.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      publishedAt: true,
      createdAt: true,
      viewCount: true,
      coverImageUrl: true,
    },
  });

  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const db = await getDb();
  if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

  const data = await request.json();

  const post = await db.blogPost.create({
    data: {
      title: data.title,
      slug: data.slug,
      content: data.content,
      excerpt: data.excerpt || null,
      metaDescription: data.metaDescription || null,
      coverImageUrl: data.coverImageUrl || null,
      status: data.status || "draft",
      publishedAt: data.status === "published" ? new Date() : null,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
