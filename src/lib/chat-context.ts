import { getKv } from "./kv";
import { getBookingsByDate } from "./bookings";

export async function buildDynamicContext(): Promise<string> {
  const sections: string[] = [];

  // 1. Latest blog posts (from Postgres)
  const blogContext = await getLatestBlogContext();
  if (blogContext) sections.push(blogContext);

  // 2. This week's availability (from KV bookings)
  const availabilityContext = await getAvailabilityContext();
  if (availabilityContext) sections.push(availabilityContext);

  // 3. Current announcements/offers (from KV)
  const announcementsContext = await getAnnouncementsContext();
  if (announcementsContext) sections.push(announcementsContext);

  if (sections.length === 0) return "";

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return `\n\nDYNAMIC CONTEXT (Current as of ${today}):\n${sections.join("\n\n")}`;
}

async function getLatestBlogContext(): Promise<string | null> {
  try {
    if (!process.env.POSTGRES_PRISMA_URL) return null;
    const { prisma } = await import("@/lib/db");

    const posts = await prisma.blogPost.findMany({
      where: { status: "published" },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: { title: true, excerpt: true, publishedAt: true },
    });

    if (posts.length === 0) return null;

    const lines = posts.map((p) => {
      const date = p.publishedAt
        ? p.publishedAt.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "recently";
      return `- "${p.title}" (${date}): ${p.excerpt || ""}`;
    });

    return `RECENT BLOG POSTS:\n${lines.join("\n")}`;
  } catch {
    return null;
  }
}

async function getAvailabilityContext(): Promise<string | null> {
  try {
    const today = new Date();
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const busyDays: string[] = [];
    const freeDays: string[] = [];

    // Check the next 5 weekdays
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const day = d.getDay();
      if (day === 0 || day === 6) continue; // Skip weekends

      const dateStr = d.toISOString().split("T")[0];
      const bookings = await getBookingsByDate(dateStr);
      const active = bookings.filter((b) => b.status !== "cancelled");

      const dayName = dayNames[day];
      if (active.length >= 6) {
        busyDays.push(dayName);
      } else {
        freeDays.push(dayName);
      }
    }

    if (freeDays.length === 0 && busyDays.length === 0) return null;

    const parts: string[] = [];
    if (freeDays.length > 0) {
      parts.push(
        `Marion has availability on ${freeDays.join(", ")} this week.`
      );
    }
    if (busyDays.length > 0) {
      parts.push(`${busyDays.join(", ")} ${busyDays.length === 1 ? "is" : "are"} fully booked.`);
    }

    return `AVAILABILITY:\n${parts.join(" ")}`;
  } catch {
    return null;
  }
}

async function getAnnouncementsContext(): Promise<string | null> {
  try {
    const kv = await getKv();
    if (!kv) return null;

    const announcement = await kv.get<string>("site:announcements");
    if (!announcement || announcement.trim().length === 0) return null;

    return `CURRENT ANNOUNCEMENTS:\n${announcement}`;
  } catch {
    return null;
  }
}
