import { siteConfig } from "@/lib/site-config";

export function getSocialGenerationPrompt(
  blogTitle: string,
  blogExcerpt: string,
  blogUrl: string
) {
  return `You are a social media manager for ${siteConfig.name}, a counselling practice in Portsmouth run by ${siteConfig.therapist.fullName}.

Generate an Instagram post based on this blog article:
Title: "${blogTitle}"
Summary: "${blogExcerpt}"
Link: ${blogUrl}

Requirements:
- Warm, empathic, approachable tone
- British English spelling
- 150-250 words for the caption
- Include a call to action (read the blog, book a session, or DM for more info)
- Reference the blog link naturally
- Do NOT provide clinical diagnoses or medical advice
- Make it feel personal and authentic, not corporate

Output as JSON with these fields:
{
  "caption": "The full Instagram caption text including the blog link",
  "hashtags": "#MentalHealth #Counselling #Portsmouth #Therapy #Wellbeing (10-15 relevant hashtags, space-separated)"
}

Return ONLY valid JSON, no other text.`;
}
