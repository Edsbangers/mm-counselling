"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  FileText,
  Link as LinkIcon,
  Type,
} from "lucide-react";

interface GeneratedContent {
  title: string;
  slug: string;
  metaDescription: string;
  content: string;
  keyTakeaways: string[];
  wordCount: number;
}

export function BlogAgentForm() {
  const [seedIdea, setSeedIdea] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] =
    useState<GeneratedContent | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!seedIdea.trim()) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedContent(null);

    try {
      const response = await fetch("/api/blog/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seedIdea: seedIdea.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate content");
      }

      const data = await response.json();
      setGeneratedContent(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const CopyButton = ({ text, field }: { text: string; field: string }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => copyToClipboard(text, field)}
      className="h-8 w-8 p-0"
    >
      {copiedField === field ? (
        <Check className="h-4 w-4 text-green-600" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-sage" />
            Seed Idea
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter your blog post idea... e.g., 'How ADHD affects daily planning and time management' or 'Understanding trauma responses in everyday life'"
            value={seedIdea}
            onChange={(e) => setSeedIdea(e.target.value)}
            className="min-h-[120px] resize-none"
          />
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              The agent will generate 800-1000 words with local references,
              key takeaways, SEO slug, and meta description.
            </p>
            <Button
              onClick={handleGenerate}
              disabled={!seedIdea.trim() || isGenerating}
              className="min-w-[140px]"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Generated Content */}
      {generatedContent && (
        <div className="space-y-6">
          {/* Metadata Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-sage" />
                Generated Metadata
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Title */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    Title (H1)
                  </label>
                  <CopyButton text={generatedContent.title} field="title" />
                </div>
                <Input value={generatedContent.title} readOnly />
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" />
                    URL Slug
                  </label>
                  <CopyButton text={generatedContent.slug} field="slug" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-sm">/blog/</span>
                  <Input
                    value={generatedContent.slug}
                    readOnly
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Meta Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">
                    Meta Description ({generatedContent.metaDescription.length}
                    /160 chars)
                  </label>
                  <CopyButton
                    text={generatedContent.metaDescription}
                    field="meta"
                  />
                </div>
                <Textarea
                  value={generatedContent.metaDescription}
                  readOnly
                  className="h-20 resize-none"
                />
              </div>

              {/* Word Count Badge */}
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {generatedContent.wordCount} words
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Target: 800-1000 words
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Key Takeaways */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Key Takeaways</CardTitle>
                <CopyButton
                  text={generatedContent.keyTakeaways.join("\n")}
                  field="takeaways"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-sage/10 rounded-lg p-4 border border-sage/20">
                <ul className="space-y-2">
                  {generatedContent.keyTakeaways.map((takeaway, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-foreground"
                    >
                      <span className="text-sage font-bold">•</span>
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Full Content */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Full Article Content</CardTitle>
                <CopyButton
                  text={generatedContent.content}
                  field="content"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-slate max-w-none">
                <div
                  className="bg-white rounded-lg p-6 border border-border"
                  dangerouslySetInnerHTML={{
                    __html: generatedContent.content
                      .replace(/\n\n/g, "</p><p>")
                      .replace(/^/, "<p>")
                      .replace(/$/, "</p>")
                      .replace(/## (.*?)(?=\n|$)/g, "</p><h2>$1</h2><p>")
                      .replace(/### (.*?)(?=\n|$)/g, "</p><h3>$1</h3><p>"),
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setGeneratedContent(null);
                setSeedIdea("");
              }}
            >
              Start New
            </Button>
            <Button
              onClick={() =>
                copyToClipboard(
                  `# ${generatedContent.title}\n\n${generatedContent.content}`,
                  "full"
                )
              }
            >
              {copiedField === "full" ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Full Article
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
