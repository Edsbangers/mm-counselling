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

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const db = await getDb();
  if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  const { id } = await params;
  const post = await db.blogPost.findUnique({ where: { id } });

  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = await getDb();
  if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  const data = await request.json();

  const post = await db.blogPost.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      content: data.content,
      excerpt: data.excerpt || null,
      metaDescription: data.metaDescription || null,
      coverImageUrl: data.coverImageUrl || null,
      status: data.status,
      publishedAt:
        data.status === "published" && !data.publishedAt
          ? new Date()
          : data.publishedAt || null,
    },
  });

  return NextResponse.json(post);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const db = await getDb();
  if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  const { id } = await params;
  await db.blogPost.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
