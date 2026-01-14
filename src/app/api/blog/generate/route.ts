import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

const BLOG_GENERATION_PROMPT = `You are a professional content writer for MM Counselling, a therapy practice based in Southsea, Portsmouth, Hampshire, UK. You write in a warm, professional, UK English tone.

PRACTICE CONTEXT:
- Therapist: ${siteConfig.therapist.title} (${siteConfig.therapist.qualifications})
- Location: ${siteConfig.location.area}, ${siteConfig.location.city}, ${siteConfig.location.county}
- Specialisms: ADHD support, trauma therapy, anxiety & depression, relationship issues
- Target audience: Adults seeking mental health support in the Portsmouth/Hampshire area

YOUR TASK:
Generate a complete blog post based on the seed idea provided. You must:

1. CONTENT REQUIREMENTS:
   - Write 800-1000 words of high-quality, informative content
   - Use a warm, professional UK English tone (empathetic, calm, clinical but accessible)
   - Include at least ONE natural local reference (e.g., "At our Southsea-based practice...", "Many of our clients in Portsmouth...", "Here in Hampshire...")
   - Structure with clear sections using ## for H2 headings
   - Be informative but NOT give clinical advice or diagnoses
   - End with an invitation to reach out for support

2. SEO REQUIREMENTS:
   - Create an SEO-friendly H1 title targeting Hampshire/Portsmouth keywords where relevant
   - Generate a URL slug (lowercase, hyphens, include location keyword if relevant, e.g., "adhd-support-portsmouth")
   - Write a meta description of EXACTLY 150-160 characters

3. KEY TAKEAWAYS:
   - Include 3-4 key takeaways that summarise the main points

OUTPUT FORMAT (JSON):
{
  "title": "The H1 title of the blog post",
  "slug": "the-url-slug-for-the-post",
  "metaDescription": "The meta description (150-160 characters)",
  "content": "The full article content with ## headers for sections",
  "keyTakeaways": ["Takeaway 1", "Takeaway 2", "Takeaway 3"]
}

IMPORTANT:
- Return ONLY valid JSON, no markdown code blocks
- Do not include any text before or after the JSON
- Ensure the JSON is properly formatted and parseable`;

export async function POST(request: NextRequest) {
  try {
    const { seedIdea } = await request.json();

    if (!seedIdea || typeof seedIdea !== "string") {
      return NextResponse.json(
        { error: "Please provide a seed idea for the blog post" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Return demo content if no API key
      return NextResponse.json(generateDemoContent(seedIdea));
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: BLOG_GENERATION_PROMPT },
          {
            role: "user",
            content: `Generate a blog post about: ${seedIdea}`,
          },
        ],
        max_tokens: 2500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenAI API error:", error);
      throw new Error("Failed to generate blog content");
    }

    const data = await response.json();
    const rawContent = data.choices[0]?.message?.content;

    if (!rawContent) {
      throw new Error("No content generated");
    }

    // Parse the JSON response
    let parsedContent;
    try {
      // Remove any potential markdown code blocks
      const cleanedContent = rawContent
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      parsedContent = JSON.parse(cleanedContent);
    } catch {
      console.error("Failed to parse generated content:", rawContent);
      throw new Error("Failed to parse generated content");
    }

    // Calculate word count
    const wordCount = parsedContent.content
      .split(/\s+/)
      .filter((word: string) => word.length > 0).length;

    return NextResponse.json({
      ...parsedContent,
      wordCount,
    });
  } catch (error) {
    console.error("Blog generation error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate blog content",
      },
      { status: 500 }
    );
  }
}

// Demo content generator for when no API key is configured
function generateDemoContent(seedIdea: string) {
  const slug = seedIdea
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 50)
    .replace(/-+$/, "");

  return {
    title: `Understanding ${seedIdea}: A Guide from Our Southsea Practice`,
    slug: `${slug}-portsmouth`,
    metaDescription: `Learn about ${seedIdea.slice(0, 60)} with expert guidance from MM Counselling in Southsea, Portsmouth. Professional support available.`,
    content: `## Introduction

At our Southsea-based practice, we regularly support clients who are navigating the challenges of ${seedIdea.toLowerCase()}. This is a topic close to our hearts, and one that affects many people across Portsmouth and the wider Hampshire area.

Understanding your experiences is the first step towards positive change. In this article, we'll explore some key aspects of ${seedIdea.toLowerCase()} and how professional counselling support can make a difference.

## Understanding the Impact

Many of our clients in Portsmouth initially come to us feeling uncertain about what they're experiencing. This is completely normal. ${seedIdea} can affect various aspects of daily life, from relationships to work performance.

What's important to remember is that seeking support is a sign of strength, not weakness. By taking the time to understand your experiences, you're already taking a positive step forward.

## How Counselling Can Help

Professional counselling provides a safe, confidential space to explore your thoughts and feelings. Here in Hampshire, we take a person-centred approach, meaning your therapy is tailored to your unique needs and circumstances.

Whether you're dealing with ${seedIdea.toLowerCase()} for the first time or have been managing it for years, there's always scope for new understanding and growth.

## Taking the Next Step

If you recognise yourself in any of what we've discussed, please know that support is available. Our Southsea practice offers a warm, welcoming environment where you can explore these issues at your own pace.

We offer an initial consultation so you can see if we're the right fit for you, with no obligation to continue. You deserve support that works for you.`,
    keyTakeaways: [
      `${seedIdea} affects many people and seeking help is a positive step`,
      "Professional counselling provides a safe space to explore your experiences",
      "Person-centred therapy is tailored to your unique needs",
      "Support is available at our Southsea practice",
    ],
    wordCount: 312,
  };
}
