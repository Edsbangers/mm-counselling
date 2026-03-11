import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { contentModel } from "@/lib/ai";
import { getSocialGenerationPrompt, getTopicSocialPrompt } from "@/lib/social-prompts";
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

export async function POST(request: NextRequest) {
  const db = await getDb();
  if (!db) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

  const { blogPostId, topic } = await request.json();

  if (!blogPostId && !topic) {
    return NextResponse.json(
      { error: "blogPostId or topic is required" },
      { status: 400 }
    );
  }

  let prompt: string;
  let blogUrl: string | null = null;

  if (blogPostId) {
    const post = await db.blogPost.findUnique({
      where: { id: blogPostId },
      select: { title: true, excerpt: true, slug: true },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    blogUrl = `${siteConfig.url}/blog/${post.slug}`;
    prompt = getSocialGenerationPrompt(post.title, post.excerpt || "", blogUrl);
  } else {
    prompt = getTopicSocialPrompt(topic);
  }

  const { text } = await generateText({
    model: contentModel,
    prompt,
    maxOutputTokens: 2000,
    temperature: 0.7,
  });

  try {
    const cleaned = text.replace(/```json\n?|\n?```/g, "").trim();
    const data = JSON.parse(cleaned);

    const socialPost = await db.socialPost.create({
      data: {
        blogPostId: blogPostId || null,
        topic: topic || null,
        caption: data.caption || "",
        hashtags: data.hashtags || "",
        facebookContent: data.facebookContent || null,
        blogUrl,
        status: "draft",
      },
    });

    return NextResponse.json(socialPost, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to parse AI response", raw: text },
      { status: 500 }
    );
  }
}
