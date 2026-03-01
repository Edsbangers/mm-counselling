import { createAnthropic } from "@ai-sdk/anthropic";

export const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const chatModel = anthropic("claude-haiku-4-5-20251001");
export const contentModel = anthropic("claude-sonnet-4-5-20251014");
