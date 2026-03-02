import { NextResponse } from "next/server";

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

  const logs = await db.publishLog.findMany({
    orderBy: { publishedAt: "desc" },
    take: 20,
    include: {
      socialPost: {
        select: {
          blogPost: {
            select: { title: true },
          },
        },
      },
    },
  });

  return NextResponse.json(logs);
}
