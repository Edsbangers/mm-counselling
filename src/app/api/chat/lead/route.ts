import { NextRequest, NextResponse } from "next/server";

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
  const { sessionId, name, email, phone } = await request.json();

  if (!sessionId) {
    return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
  }

  if (!name && !email && !phone) {
    return NextResponse.json({ error: "At least one contact detail required" }, { status: 400 });
  }

  const db = await getDb();
  if (!db) {
    return NextResponse.json({ success: true, note: "No database configured" });
  }

  try {
    // Find the conversation
    const conversation = await db.chatConversation.findUnique({
      where: { sessionId },
    });

    // Update conversation with visitor details
    if (conversation) {
      await db.chatConversation.update({
        where: { sessionId },
        data: {
          ...(name && { visitorName: name }),
          ...(email && { visitorEmail: email }),
        },
      });
    }

    // Create a Lead record
    await db.lead.create({
      data: {
        name: name || "Unknown",
        email: email || null,
        phone: phone || null,
        status: "new",
        ...(conversation && { conversationId: conversation.id }),
      },
    });
  } catch (e) {
    console.error("Lead capture DB error:", e);
  }

  // Notify Marion of new enquiry (fire-and-forget)
  if (name && email) {
    import("@/lib/email").then(({ sendNewEnquiryNotification }) =>
      sendNewEnquiryNotification({ name, email, phone }).catch(() => {})
    );
  }

  return NextResponse.json({ success: true });
}

// Keep PATCH for backwards compatibility
export async function PATCH(request: NextRequest) {
  return POST(request);
}
