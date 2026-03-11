"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  Trash2,
  Loader2,
  Instagram,
  Facebook,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: string;
}

interface SocialPost {
  id: string;
  blogPostId: string | null;
  topic: string | null;
  caption: string;
  hashtags: string;
  facebookContent: string | null;
  blogUrl: string | null;
  status: string;
  createdAt: string;
  blogPost?: { title: string; slug: string };
}

export default function SocialPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  // Generation mode
  const [mode, setMode] = useState<"blog" | "topic">("topic");
  const [selectedPostId, setSelectedPostId] = useState("");
  const [topic, setTopic] = useState("");

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCaption, setEditCaption] = useState("");
  const [editHashtags, setEditHashtags] = useState("");
  const [editFacebookContent, setEditFacebookContent] = useState("");

  // Copy feedback
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/posts").then((r) => r.json()),
      fetch("/api/admin/social").then((r) => (r.ok ? r.json() : [])),
    ]).then(([blogPosts, social]) => {
      setPosts(blogPosts.filter((p: BlogPost) => p.status === "published"));
      setSocialPosts(social);
      setLoading(false);
    });
  }, []);

  const handleGenerate = async () => {
    if (mode === "blog" && !selectedPostId) return;
    if (mode === "topic" && !topic.trim()) return;

    setGenerating(true);
    setError("");

    try {
      const body =
        mode === "blog"
          ? { blogPostId: selectedPostId }
          : { topic: topic.trim() };

      const res = await fetch("/api/admin/social/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const newPost = await res.json();
        if (mode === "blog") {
          const blogPost = posts.find((p) => p.id === selectedPostId);
          newPost.blogPost = blogPost
            ? { title: blogPost.title, slug: blogPost.slug }
            : undefined;
        }
        setSocialPosts([newPost, ...socialPosts]);
        setTopic("");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || `Generation failed (${res.status})`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    }
    setGenerating(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this social post?")) return;
    await fetch(`/api/admin/social/${id}`, { method: "DELETE" });
    setSocialPosts(socialPosts.filter((sp) => sp.id !== id));
  };

  const startEdit = (sp: SocialPost) => {
    setEditingId(sp.id);
    setEditCaption(sp.caption);
    setEditHashtags(sp.hashtags);
    setEditFacebookContent(sp.facebookContent || "");
  };

  const saveEdit = async (id: string) => {
    const res = await fetch(`/api/admin/social/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        caption: editCaption,
        hashtags: editHashtags,
        facebookContent: editFacebookContent || null,
        status: "draft",
      }),
    });

    if (res.ok) {
      setSocialPosts(
        socialPosts.map((sp) =>
          sp.id === id
            ? {
                ...sp,
                caption: editCaption,
                hashtags: editHashtags,
                facebookContent: editFacebookContent || null,
              }
            : sp
        )
      );
      setEditingId(null);
    }
  };

  const copyToClipboard = async (text: string, fieldId: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (loading) {
    return <p className="text-sm text-[#595959]">Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#1b1b1b] mb-2">
        Social Media
      </h1>
      <p className="text-sm text-[#595959] mb-8">
        Generate posts for Instagram and Facebook, then copy and paste into your
        accounts.
      </p>

      {/* Generator */}
      <div className="bg-white border border-[#e5e5e5] p-6 mb-8">
        <h2 className="text-sm font-medium text-[#1b1b1b] mb-4">
          Generate Social Posts
        </h2>

        {/* Mode toggle */}
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => setMode("topic")}
            className={`px-3 py-1.5 text-xs transition-colors ${
              mode === "topic"
                ? "bg-[#1b1b1b] text-white"
                : "border border-[#e5e5e5] text-[#595959] hover:bg-[#f9f9f9]"
            }`}
          >
            From Topic
          </button>
          <button
            type="button"
            onClick={() => setMode("blog")}
            className={`px-3 py-1.5 text-xs transition-colors ${
              mode === "blog"
                ? "bg-[#1b1b1b] text-white"
                : "border border-[#e5e5e5] text-[#595959] hover:bg-[#f9f9f9]"
            }`}
          >
            From Blog Post
          </button>
        </div>

        {mode === "topic" ? (
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Describe what you want to post about, e.g. 'A post about managing anxiety during the colder months, with tips for self-care and a reminder that support is available'"
            rows={3}
            className="w-full px-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080] resize-none mb-3"
          />
        ) : (
          <select
            value={selectedPostId}
            onChange={(e) => setSelectedPostId(e.target.value)}
            className="w-full px-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080] bg-white mb-3"
          >
            <option value="">Select a published blog post...</option>
            {posts.map((post) => (
              <option key={post.id} value={post.id}>
                {post.title}
              </option>
            ))}
          </select>
        )}

        <button
          type="button"
          onClick={handleGenerate}
          disabled={
            generating ||
            (mode === "blog" && !selectedPostId) ||
            (mode === "topic" && !topic.trim())
          }
          className="inline-flex items-center gap-2 bg-[#1b1b1b] text-white px-4 py-2 text-sm hover:bg-[#333] transition-colors disabled:opacity-50"
        >
          {generating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          {generating ? "Generating..." : "Generate Posts"}
        </button>

        {error && (
          <p className="text-sm text-red-600 mt-3 bg-red-50 px-4 py-2">
            {error}
          </p>
        )}
      </div>

      {/* Social Posts List */}
      {socialPosts.length === 0 ? (
        <p className="text-sm text-[#595959]">
          No social posts yet. Generate one above to get started.
        </p>
      ) : (
        <div className="space-y-4">
          {socialPosts.map((sp) => (
            <div key={sp.id} className="bg-white border border-[#e5e5e5] p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-sm font-medium text-[#1b1b1b]">
                    {sp.blogPost?.title || sp.topic || "Social Post"}
                  </span>
                  <p className="text-xs text-[#808080] mt-0.5">
                    {new Date(sp.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(sp.id)}
                  className="p-1.5 text-[#595959] hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {editingId === sp.id ? (
                /* Edit Mode */
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs text-[#808080] mb-1">
                      <Facebook className="h-3 w-3" /> Facebook
                    </label>
                    <textarea
                      value={editFacebookContent}
                      onChange={(e) => setEditFacebookContent(e.target.value)}
                      rows={5}
                      placeholder="Facebook post content..."
                      className="w-full px-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080] resize-y"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-xs text-[#808080] mb-1">
                      <Instagram className="h-3 w-3" /> Instagram Caption
                    </label>
                    <textarea
                      value={editCaption}
                      onChange={(e) => setEditCaption(e.target.value)}
                      rows={5}
                      className="w-full px-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080] resize-y"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#808080] mb-1">
                      Hashtags
                    </label>
                    <input
                      type="text"
                      value={editHashtags}
                      onChange={(e) => setEditHashtags(e.target.value)}
                      className="w-full px-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => saveEdit(sp.id)}
                      className="bg-[#1b1b1b] text-white px-4 py-1.5 text-sm hover:bg-[#333] transition-colors"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="border border-[#e5e5e5] text-[#595959] px-4 py-1.5 text-sm hover:bg-[#f9f9f9] transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <>
                  {/* Facebook content */}
                  {sp.facebookContent && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="flex items-center gap-1.5 text-xs text-[#808080]">
                          <Facebook className="h-3 w-3" /> Facebook
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            copyToClipboard(sp.facebookContent!, `fb-${sp.id}`)
                          }
                          className="inline-flex items-center gap-1 text-xs text-[#595959] hover:text-[#1b1b1b] transition-colors"
                        >
                          {copiedField === `fb-${sp.id}` ? (
                            <>
                              <Check className="h-3 w-3 text-green-600" />
                              <span className="text-green-600">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" /> Copy
                            </>
                          )}
                        </button>
                      </div>
                      <div className="bg-[#f9f9f9] border border-[#e5e5e5] p-4">
                        <p className="text-sm text-[#595959] whitespace-pre-wrap">
                          {sp.facebookContent}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Instagram content */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="flex items-center gap-1.5 text-xs text-[#808080]">
                        <Instagram className="h-3 w-3" /> Instagram
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          copyToClipboard(
                            `${sp.caption}\n\n${sp.hashtags}`,
                            `ig-${sp.id}`
                          )
                        }
                        className="inline-flex items-center gap-1 text-xs text-[#595959] hover:text-[#1b1b1b] transition-colors"
                      >
                        {copiedField === `ig-${sp.id}` ? (
                          <>
                            <Check className="h-3 w-3 text-green-600" />
                            <span className="text-green-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" /> Copy
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-[#f9f9f9] border border-[#e5e5e5] p-4">
                      <p className="text-sm text-[#595959] whitespace-pre-wrap mb-2">
                        {sp.caption}
                      </p>
                      <p className="text-xs text-[#808080]">{sp.hashtags}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => startEdit(sp)}
                      className="border border-[#e5e5e5] text-[#595959] px-3 py-1.5 text-xs hover:bg-[#f9f9f9] transition-colors"
                    >
                      Edit
                    </button>

                    {sp.blogUrl && (
                      <a
                        href={sp.blogUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#595959] hover:text-[#1b1b1b] transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" />
                        View Blog
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
