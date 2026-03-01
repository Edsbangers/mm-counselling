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
  const post = await db.socialPost.findUnique({
    where: { id },
    include: { blogPost: { select: { title: true, slug: true } } },
  });

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
  const data = await request.json();

  const db = await getDb();
  if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

  const post = await db.socialPost.update({
    where: { id },
    data: {
      caption: data.caption,
      hashtags: data.hashtags,
      imageUrl: data.imageUrl || null,
      status: data.status,
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
  await db.socialPost.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
