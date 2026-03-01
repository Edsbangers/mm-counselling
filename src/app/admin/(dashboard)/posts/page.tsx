"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Plus, Edit, Trash2, Eye } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  status: string;
  publishedAt: string | null;
  createdAt: string;
  viewCount: number;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/posts")
      .then((r) => r.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    setPosts(posts.filter((p) => p.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-[#1b1b1b]">Blog Posts</h1>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 bg-[#1b1b1b] text-white px-4 py-2 text-sm hover:bg-[#333] transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-[#595959]">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-sm text-[#595959]">
          No blog posts yet. Create your first one!
        </p>
      ) : (
        <div className="space-y-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-[#e5e5e5] p-4 flex items-center justify-between"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#1b1b1b] truncate">
                  {post.title}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span
                    className={`text-xs px-2 py-0.5 ${
                      post.status === "published"
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {post.status}
                  </span>
                  <span className="text-xs text-[#808080]">
                    {format(new Date(post.createdAt), "dd MMM yyyy")}
                  </span>
                  <span className="text-xs text-[#808080] flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {post.viewCount}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="p-2 text-[#595959] hover:text-[#1b1b1b] transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(post.id)}
                  className="p-2 text-[#595959] hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
