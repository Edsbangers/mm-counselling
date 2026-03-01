import { siteConfig } from "@/lib/site-config";

export function getBlogGenerationPrompt(topic: string, description?: string) {
  const descriptionLine = description
    ? `\n\nAdditional context from Marion: "${description}"`
    : "";

  return `You are a content writer for MM Counselling, a counselling practice in Portsmouth, Hampshire run by ${siteConfig.therapist.fullName}.

Write a blog post about: "${topic}"${descriptionLine}

Requirements:
- 800-1200 words
- Warm, empathic tone matching a counselling practice
- British English spelling (counselling, behaviour, etc.)
- Include references to Portsmouth, Southsea, or Hampshire where natural
- Include practical advice readers can use
- Do NOT provide clinical diagnoses or medical advice
- End with a gentle call to action mentioning MM Counselling

Output as JSON with these fields:
{
  "title": "Blog post title",
  "slug": "url-friendly-slug",
  "content": "<p>Full HTML content with <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em> tags</p>",
  "excerpt": "2-3 sentence summary",
  "metaDescription": "Under 160 characters for SEO"
}

Return ONLY valid JSON, no other text.`;
}
