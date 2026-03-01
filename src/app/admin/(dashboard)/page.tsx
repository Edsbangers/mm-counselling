import { StatsCard } from "@/components/admin/stats-card";
import { AnnouncementEditor } from "@/components/admin/announcement-editor";
import { getBookingsByDate } from "@/lib/bookings";
import type { BookingRecord } from "@/lib/bookings";
import { getGbpMetrics, type GbpMetrics } from "@/lib/gbp";

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

export default async function AdminDashboardPage() {
  const db = await getDb();

  let pageViews = 0;
  let conversations = 0;
  let leads = 0;
  let blogPosts = 0;
  let recentConversations: Array<{
    id: string;
    visitorName: string | null;
    visitorEmail: string | null;
    createdAt: Date;
    messages: Array<{ content: string }>;
  }> = [];

  if (db) {
    try {
      [pageViews, conversations, leads, blogPosts] = await Promise.all([
        db.pageView.count(),
        db.chatConversation.count(),
        db.chatConversation.count({ where: { visitorEmail: { not: null } } }),
        db.blogPost.count(),
      ]);

      recentConversations = await db.chatConversation.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { messages: { take: 1, orderBy: { createdAt: "asc" } } },
      });
    } catch (e) {
      console.error("Dashboard DB error:", e);
    }
  }

  // Fetch today's bookings from KV
  const today = new Date().toISOString().split("T")[0];
  let todaysBookings: BookingRecord[] = [];
  try {
    todaysBookings = await getBookingsByDate(today);
    todaysBookings.sort((a, b) => a.startTime.localeCompare(b.startTime));
  } catch {
    // KV not available
  }

  const activeBookings = todaysBookings.filter(
    (b) => b.status !== "cancelled"
  );

  // Fetch GBP metrics (last 30 days)
  let gbp: GbpMetrics | null = null;
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    gbp = await getGbpMetrics(
      thirtyDaysAgo.toISOString().split("T")[0],
      today
    );
  } catch {
    // GBP not configured
  }

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-50 text-yellow-700",
      confirmed: "bg-green-50 text-green-700",
      cancelled: "bg-red-50 text-red-700",
      rescheduled: "bg-blue-50 text-blue-700",
    };
    return colors[status] || "bg-gray-50 text-gray-700";
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#1b1b1b] mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatsCard label="Page Views" value={pageViews} description="Total all-time" />
        <StatsCard label="Conversations" value={conversations} description="Chat sessions" />
        <StatsCard label="Leads Captured" value={leads} description="With email address" />
        <StatsCard label="Blog Posts" value={blogPosts} description="Published & drafts" />
      </div>

      {/* Google Business Profile */}
      {gbp && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatsCard label="GBP Impressions" value={gbp.impressions} description="Last 30 days" />
          <StatsCard label="Website Clicks" value={gbp.websiteClicks} description="From Google" />
          <StatsCard label="Call Clicks" value={gbp.callClicks} description="From Google" />
          <StatsCard label="Direction Requests" value={gbp.directionRequests} description="From Google" />
        </div>
      )}

      {/* Today's Bookings */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#1b1b1b]">
            Today&apos;s Bookings
          </h2>
          <a
            href="/admin/bookings"
            className="text-sm text-[#595959] hover:text-[#1b1b1b] underline underline-offset-4 transition-colors"
          >
            View calendar
          </a>
        </div>
        {activeBookings.length === 0 ? (
          <p className="text-sm text-[#595959]">
            No bookings scheduled for today.
          </p>
        ) : (
          <div className="space-y-2">
            {activeBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white border border-[#e5e5e5] p-4 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-medium text-[#1b1b1b]">
                      {booking.clientName}
                    </p>
                    <span
                      className={`text-xs px-2 py-0.5 ${statusBadge(booking.status)}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#595959] mt-1">
                    {booking.startTime} — {booking.endTime} &middot;{" "}
                    {booking.sessionType === "couples"
                      ? "Couples"
                      : "Individual"}
                  </p>
                </div>
                <p className="text-sm text-[#808080]">£{booking.fee}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Announcement for Chat Agent */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-[#1b1b1b] mb-4">
          Chat Agent Context
        </h2>
        <AnnouncementEditor />
      </div>

      {/* Recent Conversations */}
      <div>
        <h2 className="text-lg font-semibold text-[#1b1b1b] mb-4">
          Recent Conversations
        </h2>
        {recentConversations.length === 0 ? (
          <p className="text-sm text-[#595959]">
            No conversations yet. The chat agent will appear on the site once deployed.
          </p>
        ) : (
          <div className="space-y-2">
            {recentConversations.map((convo) => (
              <a
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
                      {convo.visitorEmail || "No email captured"}
                    </p>
                  </div>
                  <p className="text-xs text-[#808080]">
                    {new Date(convo.createdAt).toLocaleDateString("en-GB")}
                  </p>
                </div>
                {convo.messages[0] && (
                  <p className="text-xs text-[#808080] mt-2 truncate">
                    {convo.messages[0].content}
                  </p>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
