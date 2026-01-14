import { Metadata } from "next";
import { BlogAgentForm } from "./blog-agent-form";

export const metadata: Metadata = {
  title: "Blog Agent - Admin",
  description: "AI-powered blog content generation for MM Counselling",
  robots: { index: false, follow: false },
};

export default function BlogAgentPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Blog Content Agent
            </h1>
            <p className="text-muted-foreground">
              Generate SEO-optimised blog posts with local Portsmouth/Hampshire
              references. Simply enter a seed idea and let the AI craft
              professional content.
            </p>
          </div>

          <BlogAgentForm />
        </div>
      </div>
    </div>
  );
}
