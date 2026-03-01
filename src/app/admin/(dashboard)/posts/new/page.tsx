"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Sparkles,
  Upload,
  Loader2,
  Instagram,
  Send,
  X,
  Eye,
  Code,
} from "lucide-react";
import Link from "next/link";

type PageState =
  | "editing"
  | "saving"
  | "published"
  | "generating_instagram"
  | "instagram_preview"
  | "sending_instagram"
  | "done";

export default function NewPostPage() {
  const router = useRouter();
  const [pageState, setPageState] = useState<PageState>("editing");
  const [generating, setGenerating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [topic, setTopic] = useState("");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(false);
  const [publishedPostId, setPublishedPostId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    metaDescription: "",
    coverImageUrl: "",
    status: "draft",
  });

  // Instagram state
  const [instagramCaption, setInstagramCaption] = useState("");
  const [instagramHashtags, setInstagramHashtags] = useState("");
  const [instagramId, setInstagramId] = useState<string | null>(null);

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setGenerating(true);
    setError("");

    try {
      const res = await fetch("/api/admin/posts/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      if (res.ok) {
        const data = await res.json();
        setForm({
          ...form,
          title: data.title || "",
          slug: data.slug || generateSlug(data.title || ""),
          content: data.content || "",
          excerpt: data.excerpt || "",
          metaDescription: data.metaDescription || "",
        });
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || `Generation failed (${res.status})`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    }
    setGenerating(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const { url } = await res.json();
      setForm({ ...form, coverImageUrl: url });
    }
    setUploading(false);
  };

  const handleSave = async (status: string) => {
    setPageState("saving");
    const res = await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, status }),
    });

    if (res.ok) {
      if (status === "published") {
        const post = await res.json();
        setPublishedPostId(post.id);
        setPageState("published");
      } else {
        router.push("/admin/posts");
      }
    } else {
      setPageState("editing");
    }
  };

  const handleGenerateInstagram = async () => {
    if (!publishedPostId) return;
    setPageState("generating_instagram");

    const res = await fetch("/api/admin/social/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogPostId: publishedPostId }),
    });

    if (res.ok) {
      const data = await res.json();
      setInstagramCaption(data.caption || "");
      setInstagramHashtags(data.hashtags || "");
      setInstagramId(data.id);
      setPageState("instagram_preview");
    } else {
      setPageState("published");
    }
  };

  const handleSendToWebhook = async () => {
    if (!instagramId) return;
    setPageState("sending_instagram");

    // Save any edits first
    await fetch(`/api/admin/social/${instagramId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        caption: instagramCaption,
        hashtags: instagramHashtags,
        status: "draft",
      }),
    });

    const res = await fetch("/api/admin/social/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ socialPostId: instagramId }),
    });

    if (res.ok) {
      setPageState("done");
    } else {
      setPageState("instagram_preview");
    }
  };

  // Post-publish flow
  if (pageState === "published" || pageState === "generating_instagram") {
    return (
      <div className="max-w-lg mx-auto py-16 text-center">
        <div className="bg-green-50 p-6 mb-8">
          <h2 className="text-lg font-semibold text-green-800 mb-2">
            Blog Post Published
          </h2>
          <p className="text-sm text-green-700">
            &ldquo;{form.title}&rdquo; is now live on your site.
          </p>
        </div>

        <div className="bg-white border border-[#e5e5e5] p-6">
          <Instagram className="h-8 w-8 text-[#595959] mx-auto mb-4" />
          <h3 className="text-sm font-medium text-[#1b1b1b] mb-2">
            Generate Instagram Post?
          </h3>
          <p className="text-xs text-[#595959] mb-6">
            Automatically create an Instagram caption and hashtags from this
            blog post.
          </p>
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={handleGenerateInstagram}
              disabled={pageState === "generating_instagram"}
              className="inline-flex items-center gap-2 bg-[#1b1b1b] text-white px-4 py-2 text-sm hover:bg-[#333] transition-colors disabled:opacity-50"
            >
              {pageState === "generating_instagram" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              Generate Instagram Post
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/posts")}
              className="border border-[#e5e5e5] text-[#595959] px-4 py-2 text-sm hover:bg-[#f9f9f9] transition-colors"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (
    pageState === "instagram_preview" ||
    pageState === "sending_instagram"
  ) {
    return (
      <div className="max-w-lg mx-auto py-16">
        <div className="bg-white border border-[#e5e5e5] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Instagram className="h-5 w-5 text-[#595959]" />
              <h3 className="text-sm font-medium text-[#1b1b1b]">
                Instagram Post Preview
              </h3>
            </div>
            <button
              type="button"
              onClick={() => router.push("/admin/posts")}
              className="p-1 text-[#595959] hover:text-[#1b1b1b]"
              title="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-[#808080] mb-1">
                Caption
              </label>
              <textarea
                value={instagramCaption}
                onChange={(e) => setInstagramCaption(e.target.value)}
                rows={6}
                placeholder="Instagram caption"
                className="w-full px-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080] resize-y"
              />
            </div>
            <div>
              <label className="block text-xs text-[#808080] mb-1">
                Hashtags
              </label>
              <input
                type="text"
                value={instagramHashtags}
                onChange={(e) => setInstagramHashtags(e.target.value)}
                placeholder="Hashtags"
                className="w-full px-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080]"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={handleSendToWebhook}
              disabled={pageState === "sending_instagram"}
              className="inline-flex items-center gap-2 bg-[#1b1b1b] text-white px-4 py-2 text-sm hover:bg-[#333] transition-colors disabled:opacity-50"
            >
              {pageState === "sending_instagram" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Push to Socials
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/posts")}
              className="border border-[#e5e5e5] text-[#595959] px-4 py-2 text-sm hover:bg-[#f9f9f9] transition-colors"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (pageState === "done") {
    return (
      <div className="max-w-lg mx-auto py-16 text-center">
        <div className="bg-green-50 p-6 mb-6">
          <h2 className="text-lg font-semibold text-green-800 mb-2">
            All Done!
          </h2>
          <p className="text-sm text-green-700">
            Blog published and Instagram post pushed to your socials.
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.push("/admin/posts")}
          className="bg-[#1b1b1b] text-white px-6 py-2 text-sm hover:bg-[#333] transition-colors"
        >
          Back to Posts
        </button>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/admin/posts"
        className="inline-flex items-center gap-1 text-sm text-[#595959] hover:text-[#1b1b1b] mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Posts
      </Link>

      <h1 className="text-2xl font-semibold text-[#1b1b1b] mb-8">New Blog Post</h1>

      {/* AI Generation */}
      <div className="bg-white border border-[#e5e5e5] p-6 mb-6">
        <h2 className="text-sm font-medium text-[#1b1b1b] mb-3">
          Generate with AI
        </h2>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Describe what you want the blog to be about, e.g. 'Write about managing anxiety during winter — include tips for daily routines, how shorter days affect mood, and mention local support in Portsmouth'"
          rows={3}
          className="w-full px-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080] resize-none mb-3"
        />
        <button
          type="button"
          onClick={handleGenerate}
          disabled={generating || !topic.trim()}
          className="inline-flex items-center gap-2 bg-[#1b1b1b] text-white px-4 py-2 text-sm hover:bg-[#333] transition-colors disabled:opacity-50"
        >
          {generating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          {generating ? "Generating..." : "Generate Blog Post"}
        </button>
        {error && (
          <p className="text-sm text-red-600 mt-3">{error}</p>
        )}
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-[#595959] mb-1.5">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
                slug: generateSlug(e.target.value),
              })
            }
            className="w-full px-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080]"
          />
        </div>

        <div>
          <label className="block text-sm text-[#595959] mb-1.5">Slug</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full px-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080]"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm text-[#595959]">Content</label>
            {form.content && (
              <button
                type="button"
                onClick={() => setPreview(!preview)}
                className="inline-flex items-center gap-1.5 text-xs text-[#595959] hover:text-[#1b1b1b] transition-colors"
              >
                {preview ? (
                  <>
                    <Code className="h-3.5 w-3.5" />
                    Edit HTML
                  </>
                ) : (
                  <>
                    <Eye className="h-3.5 w-3.5" />
                    Preview
                  </>
                )}
              </button>
            )}
          </div>
          {preview ? (
            <div
              className="w-full px-6 py-4 border border-[#e5e5e5] bg-white text-sm prose prose-sm max-w-none min-h-[500px] overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: form.content }}
            />
          ) : (
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={20}
              className="w-full px-4 py-2 border border-[#e5e5e5] text-sm font-mono focus:outline-none focus:border-[#808080] resize-y"
            />
          )}
        </div>

        <div>
          <label className="block text-sm text-[#595959] mb-1.5">Excerpt</label>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080] resize-none"
          />
        </div>

        <div>
          <label className="block text-sm text-[#595959] mb-1.5">
            Meta Description
          </label>
          <input
            type="text"
            value={form.metaDescription}
            onChange={(e) =>
              setForm({ ...form, metaDescription: e.target.value })
            }
            maxLength={160}
            className="w-full px-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080]"
          />
          <p className="text-xs text-[#808080] mt-1">
            {form.metaDescription.length}/160 characters
          </p>
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm text-[#595959] mb-1.5">
            Cover Image
          </label>
          {form.coverImageUrl ? (
            <div className="relative mb-2">
              <img
                src={form.coverImageUrl}
                alt="Cover"
                className="w-full max-w-md h-48 object-cover border border-[#e5e5e5]"
              />
              <button
                type="button"
                onClick={() => setForm({ ...form, coverImageUrl: "" })}
                className="absolute top-2 right-2 bg-white px-2 py-1 text-xs border border-[#e5e5e5] hover:bg-[#f9f9f9]"
              >
                Remove
              </button>
            </div>
          ) : (
            <label className="inline-flex items-center gap-2 border border-[#e5e5e5] px-4 py-2 text-sm text-[#595959] cursor-pointer hover:bg-[#f9f9f9] transition-colors">
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              {uploading ? "Uploading..." : "Upload Image"}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                title="Upload cover image"
              />
            </label>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => handleSave("draft")}
            disabled={pageState === "saving" || !form.title || !form.content}
            className="border border-[#e5e5e5] text-[#1b1b1b] px-6 py-2 text-sm hover:bg-[#f9f9f9] transition-colors disabled:opacity-50"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={() => handleSave("published")}
            disabled={pageState === "saving" || !form.title || !form.content}
            className="bg-[#1b1b1b] text-white px-6 py-2 text-sm hover:bg-[#333] transition-colors disabled:opacity-50"
          >
            {pageState === "saving" ? "Saving..." : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}
