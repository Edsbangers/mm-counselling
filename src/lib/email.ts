import { Resend } from "resend";
import { siteConfig } from "./site-config";
import type { BookingRecord } from "./bookings";
import {
  bookingConfirmationHtml,
  bookingRescheduleHtml,
  bookingCancellationHtml,
  newEnquiryHtml,
  marionBookingNotificationHtml,
} from "./email-templates";

let resendInstance: Resend | null = null;

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!resendInstance) {
    resendInstance = new Resend(process.env.RESEND_API_KEY);
  }
  return resendInstance;
}

function getFromEmail(): string {
  return (
    process.env.RESEND_FROM_EMAIL ||
    `MM Counselling <noreply@${siteConfig.url.replace("https://www.", "")}>`
  );
}

export async function sendBookingConfirmation(
  booking: BookingRecord
): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  try {
    // Send to client
    await resend.emails.send({
      from: getFromEmail(),
      to: booking.clientEmail,
      subject: `Booking Confirmation — ${booking.date} at ${booking.startTime}`,
      html: bookingConfirmationHtml(booking),
    });

    // Notify Marion
    await resend.emails.send({
      from: getFromEmail(),
      to: siteConfig.contact.email,
      subject: `New Booking: ${booking.clientName} — ${booking.date} at ${booking.startTime}`,
      html: marionBookingNotificationHtml(booking, "new"),
    });
  } catch (e) {
    console.error("Email send error (non-fatal):", e);
  }
}

export async function sendBookingReschedule(
  booking: BookingRecord
): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  try {
    await resend.emails.send({
      from: getFromEmail(),
      to: booking.clientEmail,
      subject: `Appointment Rescheduled — ${booking.date} at ${booking.startTime}`,
      html: bookingRescheduleHtml(booking),
    });

    await resend.emails.send({
      from: getFromEmail(),
      to: siteConfig.contact.email,
      subject: `Booking Rescheduled: ${booking.clientName} — ${booking.date} at ${booking.startTime}`,
      html: marionBookingNotificationHtml(booking, "rescheduled"),
    });
  } catch (e) {
    console.error("Email send error (non-fatal):", e);
  }
}

export async function sendBookingCancellation(
  booking: BookingRecord
): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  try {
    await resend.emails.send({
      from: getFromEmail(),
      to: booking.clientEmail,
      subject: "Appointment Cancelled — MM Counselling",
      html: bookingCancellationHtml(booking),
    });

    await resend.emails.send({
      from: getFromEmail(),
      to: siteConfig.contact.email,
      subject: `Booking Cancelled: ${booking.clientName} — ${booking.date}`,
      html: marionBookingNotificationHtml(booking, "cancelled"),
    });
  } catch (e) {
    console.error("Email send error (non-fatal):", e);
  }
}

export async function sendNewEnquiryNotification(lead: {
  name: string;
  email: string;
}): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  try {
    await resend.emails.send({
      from: getFromEmail(),
      to: siteConfig.contact.email,
      subject: `New Enquiry from ${lead.name}`,
      html: newEnquiryHtml(lead),
    });
  } catch (e) {
    console.error("Email send error (non-fatal):", e);
  }
}
