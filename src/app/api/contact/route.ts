import { NextRequest, NextResponse } from "next/server";
import { sendNewEnquiryNotification } from "@/lib/email";

async function getDb() {
  try {
    if (!process.env.POSTGRES_PRISMA_URL) return null;
    const { prisma } = await import("@/lib/db");
    return prisma;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    let leadId: string | undefined;

    if (db) {
      const lead = await db.lead.create({
        data: {
          name,
          email,
          phone: phone || null,
          notes: message || null,
          status: "new",
        },
      });
      leadId = lead.id;
    }

    // Send email notification to Marion (with message and leadId)
    await sendNewEnquiryNotification({ name, email, phone, message, leadId });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try calling instead." },
      { status: 500 }
    );
  }
}
