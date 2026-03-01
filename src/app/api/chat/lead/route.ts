import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const { sessionId, name, email } = await request.json();

  if (!sessionId) {
    return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
  }

  if (!process.env.POSTGRES_PRISMA_URL) {
    return NextResponse.json({ success: true, note: "No database configured" });
  }

  try {
    const { prisma } = await import("@/lib/db");

    const conversation = await prisma.chatConversation.findUnique({
      where: { sessionId },
    });

    if (!conversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }

    await prisma.chatConversation.update({
      where: { sessionId },
      data: {
        ...(name && { visitorName: name }),
        ...(email && { visitorEmail: email }),
      },
    });
  } catch (e) {
    console.error("Lead capture DB error:", e);
  }

  // Notify Marion of new enquiry (fire-and-forget)
  if (name && email) {
    import("@/lib/email").then(({ sendNewEnquiryNotification }) =>
      sendNewEnquiryNotification({ name, email }).catch(() => {})
    );
  }

  return NextResponse.json({ success: true });
}
