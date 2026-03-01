import { NextRequest, NextResponse } from "next/server";
import { getKv } from "@/lib/kv";

export async function GET() {
  const kv = await getKv();
  if (!kv)
    return NextResponse.json({ announcement: "", configured: false });

  const announcement = await kv.get<string>("site:announcements");
  return NextResponse.json({
    announcement: announcement || "",
    configured: true,
  });
}

export async function POST(request: NextRequest) {
  const kv = await getKv();
  if (!kv)
    return NextResponse.json(
      { error: "KV database not configured" },
      { status: 503 }
    );

  const { announcement } = await request.json();

  if (typeof announcement !== "string") {
    return NextResponse.json(
      { error: "announcement must be a string" },
      { status: 400 }
    );
  }

  if (announcement.trim().length === 0) {
    await kv.del("site:announcements");
  } else {
    await kv.set("site:announcements", announcement.trim());
  }

  return NextResponse.json({ success: true });
}

export async function DELETE() {
  const kv = await getKv();
  if (!kv)
    return NextResponse.json(
      { error: "KV database not configured" },
      { status: 503 }
    );

  await kv.del("site:announcements");
  return NextResponse.json({ success: true });
}
