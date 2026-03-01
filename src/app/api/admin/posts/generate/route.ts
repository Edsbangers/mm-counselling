import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { contentModel } from "@/lib/ai";
import { getBlogGenerationPrompt } from "@/lib/blog-prompts";

export async function POST(request: NextRequest) {
  const { topic, description } = await request.json();

  if (!topic) {
    return NextResponse.json({ error: "Missing topic" }, { status: 400 });
  }

  const { text } = await generateText({
    model: contentModel,
    prompt: getBlogGenerationPrompt(topic, description),
    maxOutputTokens: 3000,
    temperature: 0.7,
  });

  try {
    // Extract JSON from the response (handle potential markdown wrapping)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in response");

    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json(
      { error: "Failed to parse AI response", raw: text },
      { status: 500 }
    );
  }
}
