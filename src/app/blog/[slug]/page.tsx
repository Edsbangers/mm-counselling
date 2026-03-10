import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { siteConfig } from "@/lib/site-config";
import { BlogScrollTracker } from "@/components/shared/blog-scroll-tracker";
import { TrackedBookingLink } from "@/components/shared/tracked-booking-link";

async function getDb() {
  try {
    if (!process.env.POSTGRES_PRISMA_URL) return null;
    const { prisma } = await import("@/lib/db");
    return prisma;
  } catch {
    return null;
  }
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const db = await getDb();
  if (!db) return {};
  const { slug } = await params;
  const post = await db.blogPost.findUnique({
    where: { slug },
    select: { title: true, metaDescription: true, excerpt: true, coverImageUrl: true },
  });

  if (!post) return {};

  return {
    title: post.title,
    description: post.metaDescription || post.excerpt || undefined,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription || post.excerpt || undefined,
      type: "article",
      ...(post.coverImageUrl && { images: [{ url: post.coverImageUrl }] }),
    },
  };
}

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const db = await getDb();

  if (!db) notFound();

  const post = await db.blogPost.findUnique({
    where: { slug },
  });

  if (!post || post.status !== "published") {
    notFound();
  }

  // Increment view count
  await db.blogPost.update({
    where: { id: post.id },
    data: { viewCount: { increment: 1 } },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt || "",
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: siteConfig.therapist.fullName,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    ...(post.coverImageUrl && { image: post.coverImageUrl }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {post.coverImageUrl && (
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="w-full h-64 md:h-80 object-cover mb-8"
          />
        )}

        <header className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-3">
            {post.title}
          </h1>
          {post.publishedAt && (
            <p className="text-sm text-muted-foreground">
              {format(new Date(post.publishedAt), "dd MMMM yyyy")} &middot;{" "}
              {siteConfig.therapist.fullName}
            </p>
          )}
        </header>

        <div
          className="prose prose-neutral max-w-none
            prose-headings:font-serif prose-headings:text-foreground
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-a:text-foreground prose-a:underline prose-a:underline-offset-4
            prose-strong:text-foreground
            prose-li:text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <BlogScrollTracker />

        <div className="mt-16 pt-8 border-t border-border/40">
          <p className="text-sm text-muted-foreground">
            If you&apos;d like to talk about anything raised in this article,{" "}
            <TrackedBookingLink
              href="/contact"
              className="text-foreground underline underline-offset-4"
            >
              get in touch
            </TrackedBookingLink>{" "}
            to book a session.
          </p>
        </div>
      </article>
    </>
  );
}
