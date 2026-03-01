import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { contentModel } from "@/lib/ai";
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
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const db = await getDb();
  if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  const { id } = await params;

  try {
    const lead = await db.lead.findUnique({
      where: { id },
      include: {
        conversation: {
          include: {
            messages: { orderBy: { createdAt: "asc" }, take: 20 },
          },
        },
      },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    // Build conversation context
    let conversationContext = "";
    if (lead.conversation?.messages?.length) {
      conversationContext = lead.conversation.messages
        .map((m) => `${m.role === "user" ? "Visitor" : "AI Assistant"}: ${m.content}`)
        .join("\n");
    }

    const prompt = `You are drafting a follow-up email from Marion Morris, a counsellor at MM Counselling in Portsmouth.

ABOUT MARION:
- ${siteConfig.therapist.fullName}, ${siteConfig.therapist.qualifications}
- Approach: ${siteConfig.therapist.approach}
- Location: ${siteConfig.location.area}, ${siteConfig.location.city} ${siteConfig.location.postcode}
- Individual sessions: £${siteConfig.fees.individual} for ${siteConfig.fees.sessionLength}
- Couples sessions: £${siteConfig.fees.couples} for ${siteConfig.fees.sessionLength}
- Free introductory consultation available
- Contact: ${siteConfig.contact.email} | ${siteConfig.contact.phone}

LEAD DETAILS:
- Name: ${lead.name}
- Email: ${lead.email || "Not provided"}
- Phone: ${lead.phone || "Not provided"}

${conversationContext ? `THEIR CHAT CONVERSATION:\n${conversationContext}` : "No conversation history available."}

${lead.notes ? `MARION'S NOTES:\n${lead.notes}` : ""}

Write a warm, professional follow-up email from Marion to this potential client. The email should:
1. Be friendly and empathic, using British English
2. Reference what they discussed in the chat if available
3. Offer a free introductory consultation (telephone or Zoom)
4. Include Marion's contact details
5. Be concise (3-5 short paragraphs)
6. Use "Dear ${lead.name}" as the greeting
7. Sign off as "Warm regards, Marion"

Write ONLY the email body (no subject line). Do not include any markdown formatting.`;

    const result = await generateText({
      model: contentModel,
      prompt,
      maxOutputTokens: 600,
      temperature: 0.7,
    });

    // Generate a subject line
    const subjectResult = await generateText({
      model: contentModel,
      prompt: `Based on this email, write a short, warm email subject line (no quotes, no "Subject:" prefix):\n\n${result.text}`,
      maxOutputTokens: 50,
      temperature: 0.7,
    });

    return NextResponse.json({
      subject: subjectResult.text.trim(),
      body: result.text.trim(),
    });
  } catch (e) {
    console.error("Draft reply error:", e);
    const message = e instanceof Error ? e.message : "Failed to generate draft";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
