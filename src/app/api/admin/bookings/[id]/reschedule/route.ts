import { NextRequest, NextResponse } from "next/server";
import { rescheduleBooking } from "@/lib/bookings";
import { getKv } from "@/lib/kv";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const kv = await getKv();
  if (!kv)
    return NextResponse.json(
      { error: "Bookings database not configured" },
      { status: 503 }
    );

  const { id } = await params;
  const { newDate, newTime } = await request.json();

  if (!newDate || !newTime) {
    return NextResponse.json(
      { error: "newDate and newTime are required" },
      { status: 400 }
    );
  }

  const booking = await rescheduleBooking(id, newDate, newTime);
  if (!booking) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Send reschedule email (fire-and-forget)
  import("@/lib/email").then(({ sendBookingReschedule }) =>
    sendBookingReschedule(booking).catch(() => {})
  );

  // Update Google Calendar event (fire-and-forget)
  import("@/lib/calendar-sync").then(({ updateCalendarEvent }) =>
    updateCalendarEvent(booking).catch(() => {})
  );

  return NextResponse.json(booking);
}
