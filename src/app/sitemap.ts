import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { areaSlugs } from "@/lib/area-content";
import { couplesAreaSlugs } from "@/lib/couples-area-content";

async function getDb() {
  try {
    if (!process.env.POSTGRES_PRISMA_URL) return null;
    const { prisma } = await import("@/lib/db");
    return prisma;
  } catch {
    return null;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/sessions-and-fees`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/couples-counselling-portsmouth`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/couples-counselling-southsea`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/anxiety-counselling-portsmouth`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/adhd-counselling-portsmouth`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const areaPages: MetadataRoute.Sitemap = areaSlugs.map((slug) => ({
    url: `${baseUrl}/counselling-in-${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const couplesAreaPages: MetadataRoute.Sitemap = couplesAreaSlugs.map((slug) => ({
    url: `${baseUrl}/couples-counselling-${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  let blogPages: MetadataRoute.Sitemap = [];
  const db = await getDb();
  if (db) {
    try {
      const posts = await db.blogPost.findMany({
        where: { status: "published" },
        select: { slug: true, updatedAt: true },
        orderBy: { updatedAt: "desc" },
      });
      blogPages = posts.map((post: { slug: string; updatedAt: Date }) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
    } catch {
      // DB not available, skip blog posts
    }
  }

  return [...staticPages, ...areaPages, ...couplesAreaPages, ...blogPages];
}
