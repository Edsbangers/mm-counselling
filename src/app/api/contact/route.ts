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

    if (db) {
      await db.lead.create({
        data: {
          name,
          email,
          phone: phone || null,
          notes: message || null,
          status: "new",
        },
      });
    }

    // Send email notification to Marion
    await sendNewEnquiryNotification({ name, email, phone });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try calling instead." },
      { status: 500 }
    );
  }
}
