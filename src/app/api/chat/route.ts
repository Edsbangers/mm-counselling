import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { siteConfig } from "@/lib/site-config";

// System prompt with full context about Marion's practice
const SYSTEM_PROMPT = `You are a helpful assistant for MM Counselling, a professional counselling practice based in Southsea, Portsmouth, Hampshire, UK.

IMPORTANT CONTEXT ABOUT THE PRACTICE:

Therapist: ${siteConfig.therapist.title} (${siteConfig.therapist.qualifications})
Experience: ${siteConfig.therapist.experience}

Location: ${siteConfig.location.area}, ${siteConfig.location.city}, ${siteConfig.location.county}

Specialisms:
${siteConfig.specialisms.map((s) => `- ${s.name}: ${s.description}`).join("\n")}

Fees:
- Initial Consultation: £${siteConfig.fees.initial} (${siteConfig.fees.sessionLength})
- Standard Session: £${siteConfig.fees.standard} (${siteConfig.fees.sessionLength})
- Concession Rate: £${siteConfig.fees.concession} (for students, unemployed, or those on low income)

Contact:
- Email: ${siteConfig.contact.email}
- Phone: ${siteConfig.contact.phone}

GUIDELINES FOR RESPONSES:
1. Be warm, professional, and empathetic in your tone
2. Use British English spelling and phrasing
3. Keep responses concise but helpful (2-4 sentences typically)
4. If asked about booking, direct them to contact Marion via email or phone
5. NEVER provide clinical advice or therapeutic interventions
6. NEVER diagnose or suggest diagnoses
7. If someone appears to be in crisis, remind them this is not a crisis service and provide:
   - Samaritans: 116 123 (free, 24/7)
   - Crisis Text Line: Text SHOUT to 85258
   - NHS 111 (Option 2 for mental health)
   - In emergency, call 999

Remember: You are an informational assistant, not a therapist. Your role is to help potential clients learn about Marion's services and how to get in touch.`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    // Check if Anthropic API key is configured
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      // Return a helpful static response if no API key
      return NextResponse.json({
        content: `Thank you for your message! I'm currently in demo mode. To learn more about our services or book a consultation, please contact us directly:

Email: ${siteConfig.contact.email}
Phone: ${siteConfig.contact.phone}

Our Southsea-based practice offers specialist support for ADHD, trauma, anxiety, depression, and relationship issues. Sessions start from £${siteConfig.fees.concession}.`,
      });
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    // Format messages for Claude API
    const formattedMessages = messages.map((m: { role: string; content: string }) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

    // Call Claude API (using Haiku for cost efficiency on chat)
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 500,
      temperature: 0.7,
      system: SYSTEM_PROMPT,
      messages: formattedMessages,
    });

    // Extract text content from response
    let content = "I apologise, I was unable to generate a response.";
    if (response.content && response.content.length > 0) {
      const textBlock = response.content.find((block) => block.type === "text");
      if (textBlock && textBlock.type === "text") {
        content = textBlock.text;
      }
    }

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        content: `I apologise, something went wrong. Please contact us directly at ${siteConfig.contact.email} or ${siteConfig.contact.phone}.`,
      },
      { status: 500 }
    );
  }
}
