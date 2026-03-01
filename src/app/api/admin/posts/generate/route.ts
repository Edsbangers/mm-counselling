import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { contentModel } from "@/lib/ai";
import { getBlogGenerationPrompt } from "@/lib/blog-prompts";

export async function POST(request: NextRequest) {
  const { topic, description } = await request.json();

  if (!topic) {
    return NextResponse.json({ error: "Missing topic" }, { status: 400 });
  }

  try {
    const { text } = await generateText({
      model: contentModel,
      prompt: getBlogGenerationPrompt(topic, description),
      maxOutputTokens: 3000,
      temperature: 0.7,
    });

    // Extract JSON from the response (handle potential markdown wrapping)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "No JSON found in AI response", raw: text },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json(parsed);
  } catch (e) {
    console.error("Blog generation error:", e);
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      { error: `Generation failed: ${message}` },
      { status: 500 }
    );
  }
}
