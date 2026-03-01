import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";

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

export default async function ConversationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = await getDb();

  if (!db) notFound();

  const conversation = await db.chatConversation.findUnique({
    where: { id },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });

  if (!conversation) notFound();

  return (
    <div>
      <Link
        href="/admin/conversations"
        className="inline-flex items-center gap-1 text-sm text-[#595959] hover:text-[#1b1b1b] mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Conversations
      </Link>

      <div className="bg-white border border-[#e5e5e5] p-6 mb-6">
        <h1 className="text-xl font-semibold text-[#1b1b1b] mb-2">
          {conversation.visitorName || "Anonymous Visitor"}
        </h1>
        <p className="text-sm text-[#595959]">
          {conversation.visitorEmail || "No email captured"}
        </p>
        <p className="text-xs text-[#808080] mt-1">
          Started {format(new Date(conversation.createdAt), "dd MMM yyyy, HH:mm")}
          &middot; {conversation.messages.length} messages
        </p>
      </div>

      <div className="space-y-3">
        {conversation.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] px-4 py-3 text-sm ${
                msg.role === "user"
                  ? "bg-[#f9f9f9] text-[#1b1b1b]"
                  : "bg-white border border-[#e5e5e5] text-[#1b1b1b]"
              }`}
            >
              <p className="text-xs text-[#808080] mb-1">
                {msg.role === "user"
                  ? conversation.visitorName || "Visitor"
                  : "Marion (AI)"}{" "}
                &middot; {format(new Date(msg.createdAt), "HH:mm")}
              </p>
              <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
