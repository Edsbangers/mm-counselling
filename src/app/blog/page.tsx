import { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { siteConfig } from "@/lib/site-config";

async function getDb() {
  try {
    if (!process.env.POSTGRES_PRISMA_URL) return null;
    const { prisma } = await import("@/lib/db");
    return prisma;
  } catch {
    return null;
  }
}

export const metadata: Metadata = {
  title: "Blog | Mental Health & Wellbeing Articles",
  description:
    "Read articles on mental health, wellbeing, anxiety, depression, relationships and more from MM Counselling in Portsmouth.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | MM Counselling",
    description:
      "Articles on mental health, wellbeing and counselling from MM Counselling in Portsmouth.",
  },
};

export const dynamic = "force-dynamic";

function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        name: "MM Counselling Blog",
        description: "Articles on mental health, wellbeing, anxiety, depression, relationships and counselling from MM Counselling in Portsmouth.",
        url: `${siteConfig.url}/blog`,
        publisher: { "@id": `${siteConfig.url}/#localbusiness` },
        author: { "@id": `${siteConfig.url}/#therapist` },
        isPartOf: { "@id": `${siteConfig.url}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
        ],
      },
    ],
  };
}

export default async function BlogPage() {
  const db = await getDb();
  const blogStructuredData = generateStructuredData();

  const posts = db
    ? await db.blogPost.findMany({
        where: { status: "published" },
        orderBy: { publishedAt: "desc" },
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          coverImageUrl: true,
          publishedAt: true,
        },
      })
    : [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }}
      />
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-3">
        Blog
      </h1>
      <p className="text-muted-foreground mb-12 max-w-2xl">
        Articles on mental health, wellbeing and counselling from{" "}
        {siteConfig.therapist.fullName} at MM Counselling in Portsmouth.
      </p>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">
          No posts yet. Check back soon!
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block border border-border/40 bg-white hover:shadow-sm transition-shadow"
            >
              {post.coverImageUrl && (
                <img
                  src={post.coverImageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <p className="text-xs text-muted-foreground mb-2">
                  {post.publishedAt &&
                    format(new Date(post.publishedAt), "dd MMMM yyyy")}
                </p>
                <h2 className="font-serif text-xl text-foreground group-hover:text-warm-grey transition-colors mb-2">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
                <span className="inline-block mt-4 text-sm text-foreground underline underline-offset-4 decoration-warm-grey/40 group-hover:decoration-foreground transition-colors">
                  Read more
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
    </>
  );
}
