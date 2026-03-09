"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Loader2, Eye, Code } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    metaDescription: "",
    coverImageUrl: "",
    status: "draft",
    publishedAt: null as string | null,
  });

  useEffect(() => {
    fetch(`/api/admin/posts/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setForm({
          title: data.title || "",
          slug: data.slug || "",
          content: data.content || "",
          excerpt: data.excerpt || "",
          metaDescription: data.metaDescription || "",
          coverImageUrl: data.coverImageUrl || "",
          status: data.status || "draft",
          publishedAt: data.publishedAt,
        });
        setLoading(false);
      });
  }, [id]);

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
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status }),
      });

      if (res.ok) {
        router.push("/admin/posts");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || `Failed to save (${res.status})`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error — please try again");
    }
    setSaving(false);
  };

  if (loading) {
    return <p className="text-sm text-[#595959]">Loading...</p>;
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

      <h1 className="text-2xl font-semibold text-[#1b1b1b] mb-8">Edit Post</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-[#595959] mb-1.5">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
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
            <label className="block text-sm text-[#595959]">Content (HTML)</label>
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
              />
            </label>
          )}
        </div>

        {/* Actions */}
        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-4 py-2">{error}</p>
        )}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => handleSave("draft")}
            disabled={saving}
            className="border border-[#e5e5e5] text-[#1b1b1b] px-6 py-2 text-sm hover:bg-[#f9f9f9] transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save as Draft"}
          </button>
          <button
            type="button"
            onClick={() => handleSave("published")}
            disabled={saving}
            className="bg-[#1b1b1b] text-white px-6 py-2 text-sm hover:bg-[#333] transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}
