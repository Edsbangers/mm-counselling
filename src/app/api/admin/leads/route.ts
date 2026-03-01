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

export async function GET(request: NextRequest) {
  const db = await getDb();
  if (!db) return NextResponse.json([]);

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  try {
    const leads = await db.lead.findMany({
      where: status && status !== "all" ? { status } : undefined,
      orderBy: { createdAt: "desc" },
      include: {
        conversation: {
          select: {
            id: true,
            sessionId: true,
            _count: { select: { messages: true } },
          },
        },
      },
    });

    return NextResponse.json(leads);
  } catch (e) {
    console.error("Leads fetch error:", e);
    return NextResponse.json([], { status: 500 });
  }
}
