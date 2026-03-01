import type { BookingRecord } from "./bookings";
import { siteConfig } from "./site-config";

function layout(content: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" /></head>
<body style="margin:0;padding:0;font-family:Georgia,'Times New Roman',serif;background:#f9f9f9;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f9;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5e5e5;">
<tr><td style="padding:32px 40px 24px;border-bottom:1px solid #e5e5e5;">
<h1 style="margin:0;font-size:20px;color:#1b1b1b;font-weight:600;">MM Counselling</h1>
<p style="margin:4px 0 0;font-size:12px;color:#808080;">Marion Morris — Counselling Services</p>
</td></tr>
<tr><td style="padding:32px 40px;">${content}</td></tr>
<tr><td style="padding:24px 40px;border-top:1px solid #e5e5e5;">
<p style="margin:0;font-size:11px;color:#808080;line-height:1.6;">
${siteConfig.therapist.fullName} | ${siteConfig.therapist.qualifications}<br/>
${siteConfig.location.area}, ${siteConfig.location.city} ${siteConfig.location.postcode}<br/>
${siteConfig.contact.email} | ${siteConfig.contact.phone}
</p>
</td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function bookingConfirmationHtml(booking: BookingRecord): string {
  return layout(`
<h2 style="margin:0 0 16px;font-size:18px;color:#1b1b1b;">Booking Confirmation</h2>
<p style="margin:0 0 16px;font-size:14px;color:#595959;line-height:1.6;">
Dear ${booking.clientName},
</p>
<p style="margin:0 0 20px;font-size:14px;color:#595959;line-height:1.6;">
Your counselling appointment has been booked. Here are the details:
</p>
<table cellpadding="0" cellspacing="0" style="margin:0 0 20px;font-size:14px;color:#1b1b1b;">
<tr><td style="padding:6px 20px 6px 0;color:#808080;">Date</td><td style="padding:6px 0;">${formatDate(booking.date)}</td></tr>
<tr><td style="padding:6px 20px 6px 0;color:#808080;">Time</td><td style="padding:6px 0;">${booking.startTime} — ${booking.endTime}</td></tr>
<tr><td style="padding:6px 20px 6px 0;color:#808080;">Session</td><td style="padding:6px 0;">${booking.sessionType === "couples" ? "Couples" : "Individual"}</td></tr>
<tr><td style="padding:6px 20px 6px 0;color:#808080;">Fee</td><td style="padding:6px 0;">£${booking.fee}</td></tr>
</table>
<p style="margin:0 0 8px;font-size:13px;color:#595959;line-height:1.6;">
Sessions are available in-person (Southsea PO4), by telephone, or via Zoom.
Please provide at least ${siteConfig.fees.cancellationNotice} notice if you need to cancel or reschedule.
</p>
<p style="margin:16px 0 0;font-size:13px;color:#808080;">
If you have any questions, please contact me at ${siteConfig.contact.email} or ${siteConfig.contact.phone}.
</p>
  `);
}

export function bookingRescheduleHtml(booking: BookingRecord): string {
  return layout(`
<h2 style="margin:0 0 16px;font-size:18px;color:#1b1b1b;">Appointment Rescheduled</h2>
<p style="margin:0 0 16px;font-size:14px;color:#595959;line-height:1.6;">
Dear ${booking.clientName},
</p>
<p style="margin:0 0 20px;font-size:14px;color:#595959;line-height:1.6;">
Your counselling appointment has been rescheduled. Here are your updated details:
</p>
${booking.previousDate ? `<p style="margin:0 0 12px;font-size:13px;color:#808080;"><s>Previously: ${formatDate(booking.previousDate)} at ${booking.previousTime}</s></p>` : ""}
<table cellpadding="0" cellspacing="0" style="margin:0 0 20px;font-size:14px;color:#1b1b1b;">
<tr><td style="padding:6px 20px 6px 0;color:#808080;">New Date</td><td style="padding:6px 0;">${formatDate(booking.date)}</td></tr>
<tr><td style="padding:6px 20px 6px 0;color:#808080;">New Time</td><td style="padding:6px 0;">${booking.startTime} — ${booking.endTime}</td></tr>
<tr><td style="padding:6px 20px 6px 0;color:#808080;">Session</td><td style="padding:6px 0;">${booking.sessionType === "couples" ? "Couples" : "Individual"}</td></tr>
<tr><td style="padding:6px 20px 6px 0;color:#808080;">Fee</td><td style="padding:6px 0;">£${booking.fee}</td></tr>
</table>
<p style="margin:0;font-size:13px;color:#808080;">
If you need to make any further changes, please contact me at ${siteConfig.contact.email} or ${siteConfig.contact.phone}.
</p>
  `);
}

export function bookingCancellationHtml(booking: BookingRecord): string {
  return layout(`
<h2 style="margin:0 0 16px;font-size:18px;color:#1b1b1b;">Appointment Cancelled</h2>
<p style="margin:0 0 16px;font-size:14px;color:#595959;line-height:1.6;">
Dear ${booking.clientName},
</p>
<p style="margin:0 0 20px;font-size:14px;color:#595959;line-height:1.6;">
Your counselling appointment on <strong>${formatDate(booking.date)}</strong> at <strong>${booking.startTime}</strong> has been cancelled.
</p>
<p style="margin:0 0 8px;font-size:14px;color:#595959;line-height:1.6;">
If you would like to rebook, please get in touch and I will be happy to find a suitable time.
</p>
<p style="margin:16px 0 0;font-size:13px;color:#808080;">
${siteConfig.contact.email} | ${siteConfig.contact.phone}
</p>
  `);
}

export function newEnquiryHtml(lead: {
  name: string;
  email: string;
}): string {
  return layout(`
<h2 style="margin:0 0 16px;font-size:18px;color:#1b1b1b;">New Website Enquiry</h2>
<p style="margin:0 0 20px;font-size:14px;color:#595959;line-height:1.6;">
A new potential client has provided their details via the website chat.
</p>
<table cellpadding="0" cellspacing="0" style="margin:0 0 20px;font-size:14px;color:#1b1b1b;">
<tr><td style="padding:6px 20px 6px 0;color:#808080;">Name</td><td style="padding:6px 0;">${lead.name}</td></tr>
<tr><td style="padding:6px 20px 6px 0;color:#808080;">Email</td><td style="padding:6px 0;"><a href="mailto:${lead.email}" style="color:#1b1b1b;">${lead.email}</a></td></tr>
</table>
<p style="margin:0;font-size:13px;color:#808080;">
You can view the full conversation in your <a href="${siteConfig.url}/admin/conversations" style="color:#1b1b1b;">admin dashboard</a>.
</p>
  `);
}

export function marionBookingNotificationHtml(booking: BookingRecord, action: "new" | "rescheduled" | "cancelled"): string {
  const titles: Record<string, string> = {
    new: "New Booking Created",
    rescheduled: "Booking Rescheduled",
    cancelled: "Booking Cancelled",
  };

  return layout(`
<h2 style="margin:0 0 16px;font-size:18px;color:#1b1b1b;">${titles[action]}</h2>
<table cellpadding="0" cellspacing="0" style="margin:0 0 20px;font-size:14px;color:#1b1b1b;">
<tr><td style="padding:6px 20px 6px 0;color:#808080;">Client</td><td style="padding:6px 0;">${booking.clientName}</td></tr>
<tr><td style="padding:6px 20px 6px 0;color:#808080;">Email</td><td style="padding:6px 0;">${booking.clientEmail}</td></tr>
${booking.clientPhone ? `<tr><td style="padding:6px 20px 6px 0;color:#808080;">Phone</td><td style="padding:6px 0;">${booking.clientPhone}</td></tr>` : ""}
<tr><td style="padding:6px 20px 6px 0;color:#808080;">Date</td><td style="padding:6px 0;">${formatDate(booking.date)}</td></tr>
<tr><td style="padding:6px 20px 6px 0;color:#808080;">Time</td><td style="padding:6px 0;">${booking.startTime} — ${booking.endTime}</td></tr>
<tr><td style="padding:6px 20px 6px 0;color:#808080;">Type</td><td style="padding:6px 0;">${booking.sessionType === "couples" ? "Couples" : "Individual"} (£${booking.fee})</td></tr>
<tr><td style="padding:6px 20px 6px 0;color:#808080;">Status</td><td style="padding:6px 0;">${booking.status}</td></tr>
</table>
${booking.notes ? `<p style="margin:0 0 16px;font-size:13px;color:#595959;">Notes: ${booking.notes}</p>` : ""}
<p style="margin:0;font-size:13px;color:#808080;">
<a href="${siteConfig.url}/admin/bookings" style="color:#1b1b1b;">View in dashboard</a>
</p>
  `);
}
