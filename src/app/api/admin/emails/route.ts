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
  const type = searchParams.get("type");
  const status = searchParams.get("status");
  const leadId = searchParams.get("leadId");

  try {
    const where: Record<string, unknown> = {};
    if (type && type !== "all") where.type = type;
    if (status && status !== "all") where.status = status;
    if (leadId) where.leadId = leadId;

    const emails = await db.emailLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 200,
      include: {
        lead: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json(emails);
  } catch (e) {
    console.error("Emails fetch error:", e);
    return NextResponse.json([]);
  }
}
