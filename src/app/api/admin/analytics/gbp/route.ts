import { NextRequest, NextResponse } from "next/server";
import { getGbpMetrics } from "@/lib/gbp";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  if (!start || !end) {
    return NextResponse.json(
      { error: "start and end query params required" },
      { status: 400 }
    );
  }

  const metrics = await getGbpMetrics(start, end);

  if (!metrics) {
    return NextResponse.json(
      {
        impressions: null,
        websiteClicks: null,
        callClicks: null,
        directionRequests: null,
        configured: false,
      },
      { status: 200 }
    );
  }

  return NextResponse.json({ ...metrics, configured: true });
}
