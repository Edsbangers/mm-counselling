import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    if (!process.env.POSTGRES_PRISMA_URL) {
      return NextResponse.json({ success: true });
    }

    const { path, referrer, sessionId } = await request.json();

    if (!path) {
      return NextResponse.json({ error: "Missing path" }, { status: 400 });
    }

    const { prisma } = await import("@/lib/db");

    await prisma.pageView.create({
      data: {
        path,
        referrer: referrer || null,
        userAgent: request.headers.get("user-agent") || null,
        sessionId: sessionId || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true }); // Fail silently for analytics
  }
}
