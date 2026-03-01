import { NextResponse } from "next/server";

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

export async function GET() {
  const db = await getDb();
  if (!db) {
    return NextResponse.json({
      totalPageViews: 0,
      totalConversations: 0,
      totalLeads: 0,
      totalBlogPosts: 0,
      publishedBlogPosts: 0,
      viewsByPath: [],
      recentPageViews: [],
    });
  }

  const [
    totalPageViews,
    totalConversations,
    totalLeads,
    totalBlogPosts,
    publishedBlogPosts,
    viewsByPath,
    recentPageViews,
  ] = await Promise.all([
    db.pageView.count(),
    db.chatConversation.count(),
    db.chatConversation.count({ where: { visitorEmail: { not: null } } }),
    db.blogPost.count(),
    db.blogPost.count({ where: { status: "published" } }),
    db.pageView.groupBy({
      by: ["path"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    }),
    db.pageView.findMany({
      take: 50,
      orderBy: { createdAt: "desc" },
      select: { path: true, createdAt: true },
    }),
  ]);

  return NextResponse.json({
    totalPageViews,
    totalConversations,
    totalLeads,
    totalBlogPosts,
    publishedBlogPosts,
    viewsByPath: viewsByPath.map((v) => ({ path: v.path, count: v._count.id })),
    recentPageViews,
  });
}
