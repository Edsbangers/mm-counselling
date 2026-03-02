import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { contentModel } from "@/lib/ai";
import { getSocialGenerationPrompt } from "@/lib/social-prompts";
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

  const { blogPostId } = await request.json();

  if (!blogPostId) {
    return NextResponse.json(
      { error: "blogPostId is required" },
      { status: 400 }
    );
  }

  const post = await db.blogPost.findUnique({
    where: { id: blogPostId },
    select: { title: true, excerpt: true, slug: true },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const blogUrl = `${siteConfig.url}/blog/${post.slug}`;

  const { text } = await generateText({
    model: contentModel,
    prompt: getSocialGenerationPrompt(
      post.title,
      post.excerpt || "",
      blogUrl
    ),
    maxOutputTokens: 2000,
    temperature: 0.7,
  });

  try {
    const cleaned = text.replace(/```json\n?|\n?```/g, "").trim();
    const data = JSON.parse(cleaned);

    const socialPost = await db.socialPost.create({
      data: {
        blogPostId,
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
