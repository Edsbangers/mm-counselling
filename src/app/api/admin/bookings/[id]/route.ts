import { NextRequest, NextResponse } from "next/server";
import { getBooking, updateBooking, deleteBooking } from "@/lib/bookings";
import { getKv } from "@/lib/kv";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const kv = await getKv();
  if (!kv)
    return NextResponse.json(
      { error: "Bookings database not configured" },
      { status: 503 }
    );

  const { id } = await params;
  const booking = await getBooking(id);
  if (!booking) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(booking);
}

export async function PUT(
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
  const body = await request.json();

  const previousBooking = await getBooking(id);
  const booking = await updateBooking(id, {
    clientName: body.clientName,
    clientEmail: body.clientEmail,
    clientPhone: body.clientPhone,
    date: body.date,
    startTime: body.startTime,
    endTime: body.endTime,
    sessionType: body.sessionType,
    status: body.status,
    fee: body.fee,
    notes: body.notes,
  });

  if (!booking) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Send cancellation email and remove calendar event if cancelled
  if (
    body.status === "cancelled" &&
    previousBooking?.status !== "cancelled"
  ) {
    import("@/lib/email").then(({ sendBookingCancellation }) =>
      sendBookingCancellation(booking).catch(() => {})
    );
    if (previousBooking?.googleCalendarEventId) {
      import("@/lib/calendar-sync").then(({ deleteCalendarEvent }) =>
        deleteCalendarEvent(previousBooking.googleCalendarEventId!).catch(() => {})
      );
    }
  }

  return NextResponse.json(booking);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const kv = await getKv();
  if (!kv)
    return NextResponse.json(
      { error: "Bookings database not configured" },
      { status: 503 }
    );

  const { id } = await params;
  const success = await deleteBooking(id);
  if (!success) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
