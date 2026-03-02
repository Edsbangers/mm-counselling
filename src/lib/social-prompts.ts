import { siteConfig } from "@/lib/site-config";

export function getSocialGenerationPrompt(
  blogTitle: string,
  blogExcerpt: string,
  blogUrl: string
) {
  return `You are a social media manager for ${siteConfig.name}, a counselling practice in Portsmouth run by ${siteConfig.therapist.fullName}.

Generate social media posts for BOTH Facebook and Instagram based on this blog article:
Title: "${blogTitle}"
Summary: "${blogExcerpt}"
Link: ${blogUrl}

Requirements for BOTH platforms:
- Warm, empathic, approachable tone
- British English spelling
- Include a call to action (read the blog, book a session, or send a message)
- Do NOT provide clinical diagnoses or medical advice
- Make it feel personal and authentic, not corporate

FACEBOOK POST (300-500 words):
- More conversational and storytelling in style
- Include the blog link ${blogUrl} naturally in the text
- Use 0-2 hashtags maximum (Facebook posts don't need many hashtags)

INSTAGRAM POST:
- Caption: 150-250 words
- Reference "link in bio" instead of a clickable link
- Include a call to action (DM for more info, book a session, etc.)

HASHTAGS (for Instagram only):
- 10-15 relevant hashtags, space-separated

Output as JSON with these fields:
{
  "facebookContent": "The full Facebook post text including the blog link",
  "caption": "The full Instagram caption text",
  "hashtags": "#MentalHealth #Counselling #Portsmouth #Therapy #Wellbeing (10-15 relevant hashtags, space-separated)"
}

Return ONLY valid JSON, no other text.`;
}
