"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  Send,
  Trash2,
  Loader2,
  Instagram,
  ExternalLink,
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: string;
  coverImageUrl: string | null;
}

interface SocialPost {
  id: string;
  blogPostId: string;
  caption: string;
  hashtags: string;
  imageUrl: string | null;
  blogUrl: string | null;
  status: string;
  sentAt: string | null;
  createdAt: string;
  blogPost?: { title: string; slug: string };
}

export default function SocialPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);
  const [selectedPostId, setSelectedPostId] = useState("");
  const [generating, setGenerating] = useState(false);
  const [sending, setSending] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCaption, setEditCaption] = useState("");
  const [editHashtags, setEditHashtags] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/posts").then((r) => r.json()),
      fetch("/api/admin/social").then((r) =>
        r.ok ? r.json() : []
      ),
    ]).then(([blogPosts, social]) => {
      setPosts(blogPosts.filter((p: BlogPost) => p.status === "published"));
      setSocialPosts(social);
      setLoading(false);
    });
  }, []);

  const handleGenerate = async () => {
    if (!selectedPostId) return;
    setGenerating(true);

    const res = await fetch("/api/admin/social/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogPostId: selectedPostId }),
    });

    if (res.ok) {
      const newPost = await res.json();
      const blogPost = posts.find((p) => p.id === selectedPostId);
      newPost.blogPost = blogPost
        ? { title: blogPost.title, slug: blogPost.slug }
        : undefined;
      setSocialPosts([newPost, ...socialPosts]);
    }
    setGenerating(false);
  };

  const handleSendToWebhook = async (socialPostId: string) => {
    setSending(socialPostId);

    const res = await fetch("/api/admin/social/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ socialPostId }),
    });

    if (res.ok) {
      setSocialPosts(
        socialPosts.map((sp) =>
          sp.id === socialPostId
            ? { ...sp, status: "sent", sentAt: new Date().toISOString() }
            : sp
        )
      );
    }
    setSending(null);
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
  };

  const saveEdit = async (id: string) => {
    const res = await fetch(`/api/admin/social/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        caption: editCaption,
        hashtags: editHashtags,
        status: "draft",
      }),
    });

    if (res.ok) {
      setSocialPosts(
        socialPosts.map((sp) =>
          sp.id === id
            ? { ...sp, caption: editCaption, hashtags: editHashtags }
            : sp
        )
      );
      setEditingId(null);
    }
  };

  if (loading) {
    return <p className="text-sm text-[#595959]">Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#1b1b1b] mb-8">
        Social Media
      </h1>

      {/* Generator */}
      <div className="bg-white border border-[#e5e5e5] p-6 mb-8">
        <h2 className="text-sm font-medium text-[#1b1b1b] mb-3">
          Generate Instagram Post from Blog
        </h2>
        <div className="flex gap-2">
          <select
            value={selectedPostId}
            onChange={(e) => setSelectedPostId(e.target.value)}
            className="flex-1 px-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080] bg-white"
          >
            <option value="">Select a published blog post...</option>
            {posts.map((post) => (
              <option key={post.id} value={post.id}>
                {post.title}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={generating || !selectedPostId}
            className="inline-flex items-center gap-2 bg-[#1b1b1b] text-white px-4 py-2 text-sm hover:bg-[#333] transition-colors disabled:opacity-50"
          >
            {generating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            Generate
          </button>
        </div>
      </div>

      {/* Social Posts List */}
      {socialPosts.length === 0 ? (
        <p className="text-sm text-[#595959]">
          No social posts yet. Select a blog post above to generate one.
        </p>
      ) : (
        <div className="space-y-4">
          {socialPosts.map((sp) => (
            <div
              key={sp.id}
              className="bg-white border border-[#e5e5e5] p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-[#595959]" />
                  <span className="text-sm font-medium text-[#1b1b1b]">
                    {sp.blogPost?.title || "Blog Post"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-0.5 ${
                      sp.status === "sent"
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {sp.status}
                  </span>
                </div>
              </div>

              {editingId === sp.id ? (
                <div className="space-y-3">
                  <textarea
                    value={editCaption}
                    onChange={(e) => setEditCaption(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080] resize-y"
                  />
                  <input
                    type="text"
                    value={editHashtags}
                    onChange={(e) => setEditHashtags(e.target.value)}
                    className="w-full px-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080]"
                    placeholder="Hashtags"
                  />
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
                <>
                  <p className="text-sm text-[#595959] whitespace-pre-wrap mb-2">
                    {sp.caption}
                  </p>
                  <p className="text-xs text-[#808080] mb-4">{sp.hashtags}</p>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(sp)}
                      className="border border-[#e5e5e5] text-[#595959] px-3 py-1.5 text-xs hover:bg-[#f9f9f9] transition-colors"
                    >
                      Edit
                    </button>
                    {sp.status === "draft" && (
                      <button
                        type="button"
                        onClick={() => handleSendToWebhook(sp.id)}
                        disabled={sending === sp.id}
                        className="inline-flex items-center gap-1.5 bg-[#1b1b1b] text-white px-3 py-1.5 text-xs hover:bg-[#333] transition-colors disabled:opacity-50"
                      >
                        {sending === sp.id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Send className="h-3 w-3" />
                        )}
                        Push to Webhook
                      </button>
                    )}
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
                    <button
                      type="button"
                      onClick={() => handleDelete(sp.id)}
                      className="p-1.5 text-[#595959] hover:text-red-600 transition-colors ml-auto"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
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
