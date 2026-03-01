import { NextResponse } from "next/server";

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

  const socialPosts = await db.socialPost.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      blogPost: { select: { title: true, slug: true } },
    },
  });

  return NextResponse.json(socialPosts);
}
