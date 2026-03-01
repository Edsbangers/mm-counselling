import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { chatModel } from "@/lib/ai";
import { chatSystemPrompt } from "@/lib/chat-system-prompt";
import { buildDynamicContext } from "@/lib/chat-context";

function extractText(message: UIMessage): string {
  if (!message.parts) return "";
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

async function getDb() {
  try {
    if (!process.env.POSTGRES_PRISMA_URL) return null;
    const { prisma } = await import("@/lib/db");
    return prisma;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const uiMessages: UIMessage[] = body.messages ?? [];
  const sessionId: string | undefined = body.sessionId;

  if (!sessionId || !uiMessages.length) {
    return new Response("Missing sessionId or messages", { status: 400 });
  }

  const db = await getDb();

  // Save to database if available
  if (db) {
    try {
      await db.chatConversation.upsert({
        where: { sessionId },
        create: { sessionId },
        update: { updatedAt: new Date() },
      });

      const lastUserMessage = uiMessages[uiMessages.length - 1];
      if (lastUserMessage?.role === "user") {
        const content = extractText(lastUserMessage);
        if (content) {
          await db.chatMessage.create({
            data: {
              conversation: { connect: { sessionId } },
              role: "user",
              content,
            },
          });
        }
      }
    } catch (e) {
      console.error("Chat DB error (non-fatal):", e);
    }
  }

  const modelMessages = await convertToModelMessages(uiMessages);

  // Build dynamic context (latest blogs, availability, announcements)
  let systemPrompt = chatSystemPrompt;
  try {
    const dynamicContext = await buildDynamicContext();
    systemPrompt = chatSystemPrompt + dynamicContext;
  } catch {
    // Fall back to static prompt
  }

  const result = streamText({
    model: chatModel,
    system: systemPrompt,
    messages: modelMessages,
    maxOutputTokens: 500,
    temperature: 0.7,
    onFinish: async ({ text }) => {
      if (db) {
        try {
          await db.chatMessage.create({
            data: {
              conversation: { connect: { sessionId } },
              role: "assistant",
              content: text,
            },
          });
        } catch (e) {
          console.error("Chat DB save error (non-fatal):", e);
        }
      }
    },
  });

  return result.toUIMessageStreamResponse();
}
