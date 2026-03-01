import Link from "next/link";
import { format } from "date-fns";

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

export default async function ConversationsPage() {
  const db = await getDb();

  let conversations: Array<{
    id: string;
    visitorName: string | null;
    visitorEmail: string | null;
    createdAt: Date;
    _count: { messages: number };
    messages: Array<{ content: string }>;
  }> = [];

  if (db) {
    try {
      conversations = await db.chatConversation.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          _count: { select: { messages: true } },
          messages: { take: 1, orderBy: { createdAt: "asc" } },
        },
      });
    } catch (e) {
      console.error("Conversations DB error:", e);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#1b1b1b] mb-8">
        Conversations
      </h1>

      {!db && (
        <p className="text-sm text-[#595959] mb-4 bg-yellow-50 border border-yellow-200 p-3">
          Database not configured. Add POSTGRES_PRISMA_URL to enable conversation tracking.
        </p>
      )}

      {conversations.length === 0 ? (
        <p className="text-sm text-[#595959]">No conversations yet.</p>
      ) : (
        <div className="space-y-2">
          {conversations.map((convo) => (
            <Link
              key={convo.id}
              href={`/admin/conversations/${convo.id}`}
              className="block bg-white border border-[#e5e5e5] p-4 hover:border-[#808080] transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-[#1b1b1b]">
                    {convo.visitorName || "Anonymous Visitor"}
                  </p>
                  <p className="text-xs text-[#595959]">
                    {convo.visitorEmail || "No email"} &middot;{" "}
                    {convo._count.messages} messages
                  </p>
                </div>
                <p className="text-xs text-[#808080]">
                  {format(new Date(convo.createdAt), "dd MMM yyyy, HH:mm")}
                </p>
              </div>
              {convo.messages[0] && (
                <p className="text-xs text-[#808080] mt-2 truncate">
                  {convo.messages[0].content}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
