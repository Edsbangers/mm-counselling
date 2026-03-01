import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

async function getDb() {
  try {
    if (!process.env.POSTGRES_PRISMA_URL) return null;
    const { prisma } = await import("@/lib/db");
    return prisma;
  } catch {
    return null;
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const db = await getDb();
  if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  const { id } = await params;

  try {
    const { subject, body } = await request.json();

    if (!subject || !body) {
      return NextResponse.json({ error: "Subject and body are required" }, { status: 400 });
    }

    const lead = await db.lead.findUnique({ where: { id } });
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    if (!lead.email) {
      return NextResponse.json({ error: "Lead has no email address" }, { status: 400 });
    }

    // Try to send via Resend
    const { getResend, getFromEmail } = await import("@/lib/email-send");
    const resend = getResend();

    if (!resend) {
      return NextResponse.json({ error: "Email not configured. Add RESEND_API_KEY." }, { status: 503 });
    }

    // Convert plain text body to HTML
    const htmlBody = `<!DOCTYPE html>
<html><head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;font-family:Georgia,'Times New Roman',serif;background:#f9f9f9;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f9;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5e5e5;">
<tr><td style="padding:32px 40px 24px;border-bottom:1px solid #e5e5e5;">
<h1 style="margin:0;font-size:20px;color:#1b1b1b;font-weight:600;">MM Counselling</h1>
<p style="margin:4px 0 0;font-size:12px;color:#808080;">Marion Morris — Counselling Services</p>
</td></tr>
<tr><td style="padding:32px 40px;">
<div style="font-size:14px;color:#1b1b1b;line-height:1.8;white-space:pre-wrap;">${body}</div>
</td></tr>
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

    await resend.emails.send({
      from: getFromEmail(),
      to: lead.email,
      subject,
      html: htmlBody,
    });

    // Update lead status to contacted
    await db.lead.update({
      where: { id },
      data: { status: "contacted" },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Send email error:", e);
    const message = e instanceof Error ? e.message : "Failed to send email";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
