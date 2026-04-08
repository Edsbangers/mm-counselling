import { siteConfig } from "./site-config";
import type { BookingRecord } from "./bookings";
import {
  bookingConfirmationHtml,
  bookingRescheduleHtml,
  bookingCancellationHtml,
  newEnquiryHtml,
  marionBookingNotificationHtml,
} from "./email-templates";
import { getResend, getFromEmail } from "./email-send";

async function getDb() {
  try {
    if (!process.env.POSTGRES_PRISMA_URL) return null;
    const { prisma } = await import("@/lib/db");
    return prisma;
  } catch {
    return null;
  }
}

async function logEmail(params: {
  to: string;
  subject: string;
  type: string;
  status: "sent" | "failed";
  error?: string;
  leadId?: string | null;
  bookingId?: string | null;
  resendId?: string | null;
}) {
  try {
    const db = await getDb();
    if (!db) return;
    await db.emailLog.create({
      data: {
        to: params.to,
        subject: params.subject,
        type: params.type,
        status: params.status,
        error: params.error || null,
        leadId: params.leadId || null,
        bookingId: params.bookingId || null,
        resendId: params.resendId || null,
      },
    });
  } catch (e) {
    console.error("Email log error (non-fatal):", e);
  }
}

export async function sendBookingConfirmation(
  booking: BookingRecord
): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  // Send to client
  try {
    const result = await resend.emails.send({
      from: getFromEmail(),
      to: booking.clientEmail,
      subject: `Booking Confirmation — ${booking.date} at ${booking.startTime}`,
      html: bookingConfirmationHtml(booking),
    });
    await logEmail({
      to: booking.clientEmail,
      subject: `Booking Confirmation — ${booking.date} at ${booking.startTime}`,
      type: "booking_confirmation",
      status: "sent",
      bookingId: booking.id,
      resendId: result.data?.id || null,
    });
  } catch (e) {
    console.error("Email send error (non-fatal):", e);
    await logEmail({
      to: booking.clientEmail,
      subject: `Booking Confirmation — ${booking.date} at ${booking.startTime}`,
      type: "booking_confirmation",
      status: "failed",
      error: e instanceof Error ? e.message : String(e),
      bookingId: booking.id,
    });
  }

  // Notify Marion
  try {
    const result = await resend.emails.send({
      from: getFromEmail(),
      to: siteConfig.contact.email,
      subject: `New Booking: ${booking.clientName} — ${booking.date} at ${booking.startTime}`,
      html: marionBookingNotificationHtml(booking, "new"),
    });
    await logEmail({
      to: siteConfig.contact.email,
      subject: `New Booking: ${booking.clientName} — ${booking.date} at ${booking.startTime}`,
      type: "booking_notification",
      status: "sent",
      bookingId: booking.id,
      resendId: result.data?.id || null,
    });
  } catch (e) {
    console.error("Email send error (non-fatal):", e);
    await logEmail({
      to: siteConfig.contact.email,
      subject: `New Booking: ${booking.clientName} — ${booking.date} at ${booking.startTime}`,
      type: "booking_notification",
      status: "failed",
      error: e instanceof Error ? e.message : String(e),
      bookingId: booking.id,
    });
  }
}

export async function sendBookingReschedule(
  booking: BookingRecord
): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  // Send to client
  try {
    const result = await resend.emails.send({
      from: getFromEmail(),
      to: booking.clientEmail,
      subject: `Appointment Rescheduled — ${booking.date} at ${booking.startTime}`,
      html: bookingRescheduleHtml(booking),
    });
    await logEmail({
      to: booking.clientEmail,
      subject: `Appointment Rescheduled — ${booking.date} at ${booking.startTime}`,
      type: "booking_reschedule",
      status: "sent",
      bookingId: booking.id,
      resendId: result.data?.id || null,
    });
  } catch (e) {
    console.error("Email send error (non-fatal):", e);
    await logEmail({
      to: booking.clientEmail,
      subject: `Appointment Rescheduled — ${booking.date} at ${booking.startTime}`,
      type: "booking_reschedule",
      status: "failed",
      error: e instanceof Error ? e.message : String(e),
      bookingId: booking.id,
    });
  }

  // Notify Marion
  try {
    const result = await resend.emails.send({
      from: getFromEmail(),
      to: siteConfig.contact.email,
      subject: `Booking Rescheduled: ${booking.clientName} — ${booking.date} at ${booking.startTime}`,
      html: marionBookingNotificationHtml(booking, "rescheduled"),
    });
    await logEmail({
      to: siteConfig.contact.email,
      subject: `Booking Rescheduled: ${booking.clientName} — ${booking.date} at ${booking.startTime}`,
      type: "booking_notification",
      status: "sent",
      bookingId: booking.id,
      resendId: result.data?.id || null,
    });
  } catch (e) {
    console.error("Email send error (non-fatal):", e);
    await logEmail({
      to: siteConfig.contact.email,
      subject: `Booking Rescheduled: ${booking.clientName} — ${booking.date} at ${booking.startTime}`,
      type: "booking_notification",
      status: "failed",
      error: e instanceof Error ? e.message : String(e),
      bookingId: booking.id,
    });
  }
}

export async function sendBookingCancellation(
  booking: BookingRecord
): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  // Send to client
  try {
    const result = await resend.emails.send({
      from: getFromEmail(),
      to: booking.clientEmail,
      subject: "Appointment Cancelled — MM Counselling",
      html: bookingCancellationHtml(booking),
    });
    await logEmail({
      to: booking.clientEmail,
      subject: "Appointment Cancelled — MM Counselling",
      type: "booking_cancellation",
      status: "sent",
      bookingId: booking.id,
      resendId: result.data?.id || null,
    });
  } catch (e) {
    console.error("Email send error (non-fatal):", e);
    await logEmail({
      to: booking.clientEmail,
      subject: "Appointment Cancelled — MM Counselling",
      type: "booking_cancellation",
      status: "failed",
      error: e instanceof Error ? e.message : String(e),
      bookingId: booking.id,
    });
  }

  // Notify Marion
  try {
    const result = await resend.emails.send({
      from: getFromEmail(),
      to: siteConfig.contact.email,
      subject: `Booking Cancelled: ${booking.clientName} — ${booking.date}`,
      html: marionBookingNotificationHtml(booking, "cancelled"),
    });
    await logEmail({
      to: siteConfig.contact.email,
      subject: `Booking Cancelled: ${booking.clientName} — ${booking.date}`,
      type: "booking_notification",
      status: "sent",
      bookingId: booking.id,
      resendId: result.data?.id || null,
    });
  } catch (e) {
    console.error("Email send error (non-fatal):", e);
    await logEmail({
      to: siteConfig.contact.email,
      subject: `Booking Cancelled: ${booking.clientName} — ${booking.date}`,
      type: "booking_notification",
      status: "failed",
      error: e instanceof Error ? e.message : String(e),
      bookingId: booking.id,
    });
  }
}

export async function sendNewEnquiryNotification(lead: {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  leadId?: string;
}): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  try {
    const result = await resend.emails.send({
      from: getFromEmail(),
      to: siteConfig.contact.email,
      subject: `New Enquiry from ${lead.name}`,
      html: newEnquiryHtml({ name: lead.name, email: lead.email, phone: lead.phone, message: lead.message }),
    });
    await logEmail({
      to: siteConfig.contact.email,
      subject: `New Enquiry from ${lead.name}`,
      type: "enquiry_notification",
      status: "sent",
      leadId: lead.leadId || null,
      resendId: result.data?.id || null,
    });
  } catch (e) {
    console.error("Email send error (non-fatal):", e);
    await logEmail({
      to: siteConfig.contact.email,
      subject: `New Enquiry from ${lead.name}`,
      type: "enquiry_notification",
      status: "failed",
      error: e instanceof Error ? e.message : String(e),
      leadId: lead.leadId || null,
    });
  }
}

// Export logEmail for use by the admin reply route
export { logEmail };
