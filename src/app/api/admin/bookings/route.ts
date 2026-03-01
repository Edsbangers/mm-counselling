import { NextRequest, NextResponse } from "next/server";
import {
  getBookingsByDateRange,
  createBooking,
  type CreateBookingInput,
} from "@/lib/bookings";
import { getKv } from "@/lib/kv";

export async function GET(request: NextRequest) {
  const kv = await getKv();
  if (!kv)
    return NextResponse.json(
      { error: "Bookings database not configured" },
      { status: 503 }
    );

  const { searchParams } = new URL(request.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  if (!start || !end) {
    return NextResponse.json(
      { error: "start and end query params required" },
      { status: 400 }
    );
  }

  const bookings = await getBookingsByDateRange(start, end);
  return NextResponse.json(bookings);
}

export async function POST(request: NextRequest) {
  const kv = await getKv();
  if (!kv)
    return NextResponse.json(
      { error: "Bookings database not configured" },
      { status: 503 }
    );

  const body = await request.json();

  const input: CreateBookingInput = {
    clientName: body.clientName,
    clientEmail: body.clientEmail,
    clientPhone: body.clientPhone || undefined,
    date: body.date,
    startTime: body.startTime,
    endTime: body.endTime,
    sessionType: body.sessionType || "individual",
    fee: body.fee ?? (body.sessionType === "couples" ? 60 : 50),
    notes: body.notes || undefined,
  };

  if (!input.clientName || !input.clientEmail || !input.date || !input.startTime) {
    return NextResponse.json(
      { error: "clientName, clientEmail, date, and startTime are required" },
      { status: 400 }
    );
  }

  const booking = await createBooking(input);
  if (!booking) {
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }

  // Send confirmation email (fire-and-forget)
  import("@/lib/email").then(({ sendBookingConfirmation }) =>
    sendBookingConfirmation(booking).catch(() => {})
  );

  // Create Google Calendar event (fire-and-forget)
  import("@/lib/calendar-sync").then(async ({ createCalendarEvent }) => {
    try {
      const eventId = await createCalendarEvent(booking);
      if (eventId) {
        const { updateBooking } = await import("@/lib/bookings");
        await updateBooking(booking.id, { googleCalendarEventId: eventId });
      }
    } catch {}
  });

  return NextResponse.json(booking, { status: 201 });
}
