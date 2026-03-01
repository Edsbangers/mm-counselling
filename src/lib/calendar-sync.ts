import { getCalendarClient } from "./google";
import type { BookingRecord } from "./bookings";
import { siteConfig } from "./site-config";

export async function createCalendarEvent(
  booking: BookingRecord
): Promise<string | null> {
  const calendar = getCalendarClient();
  if (!calendar) return null;

  try {
    const sessionLabel =
      booking.sessionType === "couples" ? "Couples Session" : "Individual Session";

    const res = await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary: `${sessionLabel} — ${booking.clientName}`,
        description: [
          `Client: ${booking.clientName}`,
          `Email: ${booking.clientEmail}`,
          booking.clientPhone ? `Phone: ${booking.clientPhone}` : null,
          `Fee: £${booking.fee}`,
          booking.notes ? `\nNotes: ${booking.notes}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
        location: `${siteConfig.location.area}, ${siteConfig.location.city} ${siteConfig.location.postcode}`,
        start: {
          dateTime: `${booking.date}T${booking.startTime}:00`,
          timeZone: "Europe/London",
        },
        end: {
          dateTime: `${booking.date}T${booking.endTime}:00`,
          timeZone: "Europe/London",
        },
        reminders: {
          useDefault: false,
          overrides: [{ method: "popup", minutes: 30 }],
        },
      },
    });

    return res.data.id || null;
  } catch (e) {
    console.error("Google Calendar create error (non-fatal):", e);
    return null;
  }
}

export async function updateCalendarEvent(
  booking: BookingRecord
): Promise<void> {
  const calendar = getCalendarClient();
  if (!calendar || !booking.googleCalendarEventId) return;

  try {
    const sessionLabel =
      booking.sessionType === "couples" ? "Couples Session" : "Individual Session";

    await calendar.events.update({
      calendarId: "primary",
      eventId: booking.googleCalendarEventId,
      requestBody: {
        summary: `${sessionLabel} — ${booking.clientName}`,
        description: [
          `Client: ${booking.clientName}`,
          `Email: ${booking.clientEmail}`,
          booking.clientPhone ? `Phone: ${booking.clientPhone}` : null,
          `Fee: £${booking.fee}`,
          booking.notes ? `\nNotes: ${booking.notes}` : null,
          booking.previousDate
            ? `\nRescheduled from: ${booking.previousDate} at ${booking.previousTime}`
            : null,
        ]
          .filter(Boolean)
          .join("\n"),
        start: {
          dateTime: `${booking.date}T${booking.startTime}:00`,
          timeZone: "Europe/London",
        },
        end: {
          dateTime: `${booking.date}T${booking.endTime}:00`,
          timeZone: "Europe/London",
        },
      },
    });
  } catch (e) {
    console.error("Google Calendar update error (non-fatal):", e);
  }
}

export async function deleteCalendarEvent(
  eventId: string
): Promise<void> {
  const calendar = getCalendarClient();
  if (!calendar) return;

  try {
    await calendar.events.delete({
      calendarId: "primary",
      eventId,
    });
  } catch (e) {
    console.error("Google Calendar delete error (non-fatal):", e);
  }
}
