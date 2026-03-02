"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  Send,
  Trash2,
  Loader2,
  Instagram,
  Facebook,
  ExternalLink,
  Link2,
  Link2Off,
  CheckCircle2,
  XCircle,
  Clock,
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
  facebookContent: string | null;
  imageUrl: string | null;
  blogUrl: string | null;
  status: string;
  sentAt: string | null;
  createdAt: string;
  blogPost?: { title: string; slug: string };
}

interface Connections {
  facebook: { connected: boolean; status: string; pageName?: string; expiresAt?: string };
  instagram: { connected: boolean; status: string; igUsername?: string; expiresAt?: string };
}

interface PublishLogEntry {
  id: string;
  platform: string;
  contentSnippet: string | null;
  status: string;
  platformPostId: string | null;
  platformUrl: string | null;
  error: string | null;
  publishedAt: string;
  socialPost?: { blogPost?: { title: string } } | null;
}

interface PageOption {
  id: string;
  name: string;
}

interface PublishResultEntry {
  platform: string;
  success: boolean;
  platformPostId?: string;
  platformUrl?: string;
  error?: string;
}

export default function SocialPage() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);
  const [connections, setConnections] = useState<Connections | null>(null);
  const [publishLogs, setPublishLogs] = useState<PublishLogEntry[]>([]);
  const [selectedPostId, setSelectedPostId] = useState("");
  const [generating, setGenerating] = useState(false);
  const [publishing, setPublishing] = useState<string | null>(null);
  const [publishResults, setPublishResults] = useState<Record<string, PublishResultEntry[]>>({});
  const [loading, setLoading] = useState(true);
  const [disconnecting, setDisconnecting] = useState(false);
  const [banner, setBanner] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Page selection state (for multi-page OAuth callback)
  const [pageOptions, setPageOptions] = useState<PageOption[] | null>(null);
  const [selectedPageId, setSelectedPageId] = useState("");
  const [selectingPage, setSelectingPage] = useState(false);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCaption, setEditCaption] = useState("");
  const [editHashtags, setEditHashtags] = useState("");
  const [editFacebookContent, setEditFacebookContent] = useState("");

  // Platform selection per post
  const [selectedPlatforms, setSelectedPlatforms] = useState<Record<string, string[]>>({});

  useEffect(() => {
    // Check URL params from OAuth callback
    const connected = searchParams.get("connected");
    const error = searchParams.get("error");
    const selectPage = searchParams.get("select_page");

    if (connected === "true") {
      setBanner({ type: "success", message: "Facebook & Instagram connected successfully!" });
    } else if (error) {
      const messages: Record<string, string> = {
        invalid_state: "OAuth security check failed. Please try again.",
        no_pages: "No Facebook Pages found. Make sure you manage at least one Facebook Page.",
        oauth_failed: "Connection failed. Please try again.",
        no_code: "No authorisation code received. Please try again.",
        database_error: "Database error. Please try again.",
      };
      setBanner({ type: "error", message: messages[error] || `Connection error: ${error}` });
    }

    if (selectPage) {
      try {
        setPageOptions(JSON.parse(selectPage));
      } catch {
        // ignore parse error
      }
    }

    // Fetch all data
    Promise.all([
      fetch("/api/admin/posts").then((r) => r.json()),
      fetch("/api/admin/social").then((r) => (r.ok ? r.json() : [])),
      fetch("/api/admin/social/connections").then((r) => (r.ok ? r.json() : null)),
      fetch("/api/admin/social/publish-logs").then((r) => (r.ok ? r.json() : [])),
    ]).then(([blogPosts, social, conns, logs]) => {
      setPosts(blogPosts.filter((p: BlogPost) => p.status === "published"));
      setSocialPosts(social);
      setConnections(conns);
      setPublishLogs(logs);
      setLoading(false);
    });
  }, [searchParams]);

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

  const handlePublish = async (socialPostId: string) => {
    const platforms = selectedPlatforms[socialPostId] || getDefaultPlatforms();
    if (platforms.length === 0) return;

    setPublishing(socialPostId);

    const res = await fetch("/api/admin/social/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ socialPostId, platforms }),
    });

    if (res.ok) {
      const data = await res.json();
      setPublishResults((prev) => ({ ...prev, [socialPostId]: data.results }));
      setSocialPosts(
        socialPosts.map((sp) =>
          sp.id === socialPostId
            ? { ...sp, status: data.overallStatus, sentAt: new Date().toISOString() }
            : sp
        )
      );
      // Refresh publish logs
      const logsRes = await fetch("/api/admin/social/publish-logs");
      if (logsRes.ok) setPublishLogs(await logsRes.json());
    }
    setPublishing(null);
  };

  const handleDisconnect = async () => {
    if (!confirm("Disconnect Facebook & Instagram? You will need to reconnect to publish.")) return;
    setDisconnecting(true);
    await fetch("/api/admin/social/connections", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform: "facebook" }),
    });
    setConnections({
      facebook: { connected: false, status: "disconnected" },
      instagram: { connected: false, status: "disconnected" },
    });
    setDisconnecting(false);
  };

  const handlePageSelect = async () => {
    if (!selectedPageId || !pageOptions) return;
    setSelectingPage(true);
    const page = pageOptions.find((p) => p.id === selectedPageId);
    if (!page) return;

    const res = await fetch("/api/admin/social/connections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageId: page.id, pageName: page.name }),
    });

    if (res.ok) {
      setPageOptions(null);
      setBanner({ type: "success", message: "Facebook & Instagram connected successfully!" });
      // Refresh connections
      const connsRes = await fetch("/api/admin/social/connections");
      if (connsRes.ok) setConnections(await connsRes.json());
    } else {
      setBanner({ type: "error", message: "Failed to complete page selection. Please try again." });
    }
    setSelectingPage(false);
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
                status: "draft",
              }
            : sp
        )
      );
      setEditingId(null);
    }
  };

  const togglePlatform = (postId: string, platform: string) => {
    const current = selectedPlatforms[postId] || getDefaultPlatforms();
    const updated = current.includes(platform)
      ? current.filter((p) => p !== platform)
      : [...current, platform];
    setSelectedPlatforms((prev) => ({ ...prev, [postId]: updated }));
  };

  const getDefaultPlatforms = (): string[] => {
    const platforms: string[] = [];
    if (connections?.facebook.connected) platforms.push("facebook");
    if (connections?.instagram.connected) platforms.push("instagram");
    return platforms;
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      draft: "bg-yellow-50 text-yellow-700",
      publishing: "bg-blue-50 text-blue-700",
      published: "bg-green-50 text-green-700",
      partial: "bg-orange-50 text-orange-700",
      failed: "bg-red-50 text-red-700",
      sent: "bg-green-50 text-green-700",
    };
    return styles[status] || "bg-gray-50 text-gray-700";
  };

  if (loading) {
    return <p className="text-sm text-[#595959]">Loading...</p>;
  }

  const anyConnected = connections?.facebook.connected || connections?.instagram.connected;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#1b1b1b] mb-8">Social Media</h1>

      {/* Banner */}
      {banner && (
        <div
          className={`p-4 mb-6 text-sm ${
            banner.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <span>{banner.message}</span>
            <button
              type="button"
              onClick={() => setBanner(null)}
              className="text-xs opacity-60 hover:opacity-100"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Page Selection (multi-page OAuth callback) */}
      {pageOptions && (
        <div className="bg-white border border-[#e5e5e5] p-6 mb-8">
          <h2 className="text-sm font-medium text-[#1b1b1b] mb-3">
            Select a Facebook Page
          </h2>
          <p className="text-xs text-[#595959] mb-4">
            Multiple Facebook Pages found. Select the one you want to publish to.
          </p>
          <div className="flex gap-2">
            <select
              value={selectedPageId}
              onChange={(e) => setSelectedPageId(e.target.value)}
              className="flex-1 px-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080] bg-white"
            >
              <option value="">Select a page...</option>
              {pageOptions.map((page) => (
                <option key={page.id} value={page.id}>
                  {page.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handlePageSelect}
              disabled={selectingPage || !selectedPageId}
              className="inline-flex items-center gap-2 bg-[#1b1b1b] text-white px-4 py-2 text-sm hover:bg-[#333] transition-colors disabled:opacity-50"
            >
              {selectingPage ? <Loader2 className="h-4 w-4 animate-spin" /> : <Link2 className="h-4 w-4" />}
              Connect
            </button>
          </div>
        </div>
      )}

      {/* Connected Accounts */}
      <div className="bg-white border border-[#e5e5e5] p-6 mb-8">
        <h2 className="text-sm font-medium text-[#1b1b1b] mb-4">Connected Accounts</h2>

        {anyConnected ? (
          <div className="space-y-3">
            {/* Facebook */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Facebook className="h-4 w-4 text-[#595959]" />
                <div>
                  <span className="text-sm text-[#1b1b1b]">Facebook Page</span>
                  {connections?.facebook.pageName && (
                    <p className="text-xs text-[#808080]">{connections.facebook.pageName}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 ${
                    connections?.facebook.connected
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      connections?.facebook.connected ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  {connections?.facebook.connected ? "Connected" : connections?.facebook.status || "Disconnected"}
                </span>
              </div>
            </div>

            {/* Instagram */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Instagram className="h-4 w-4 text-[#595959]" />
                <div>
                  <span className="text-sm text-[#1b1b1b]">Instagram</span>
                  {connections?.instagram.igUsername && (
                    <p className="text-xs text-[#808080]">@{connections.instagram.igUsername}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 ${
                    connections?.instagram.connected
                      ? "bg-green-50 text-green-700"
                      : "bg-yellow-50 text-yellow-700"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      connections?.instagram.connected ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  />
                  {connections?.instagram.connected
                    ? "Connected"
                    : "No IG Business Account linked"}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#e5e5e5]">
              <button
                type="button"
                onClick={handleDisconnect}
                disabled={disconnecting}
                className="inline-flex items-center gap-1.5 text-xs text-[#595959] hover:text-red-600 transition-colors"
              >
                <Link2Off className="h-3 w-3" />
                {disconnecting ? "Disconnecting..." : "Disconnect All"}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-[#595959] mb-4">
              Connect your Facebook Page and Instagram to publish directly from here.
            </p>
            <a
              href="/api/admin/social/connect/meta"
              className="inline-flex items-center gap-2 bg-[#1b1b1b] text-white px-4 py-2 text-sm hover:bg-[#333] transition-colors"
            >
              <Link2 className="h-4 w-4" />
              Connect Facebook & Instagram
            </a>
          </div>
        )}
      </div>

      {/* Generator */}
      <div className="bg-white border border-[#e5e5e5] p-6 mb-8">
        <h2 className="text-sm font-medium text-[#1b1b1b] mb-3">
          Generate Social Post from Blog
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
        <div className="space-y-4 mb-8">
          {socialPosts.map((sp) => {
            const platforms = selectedPlatforms[sp.id] || getDefaultPlatforms();
            const results = publishResults[sp.id];

            return (
              <div key={sp.id} className="bg-white border border-[#e5e5e5] p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Facebook className="h-4 w-4 text-[#595959]" />
                      <Instagram className="h-4 w-4 text-[#595959]" />
                    </div>
                    <span className="text-sm font-medium text-[#1b1b1b]">
                      {sp.blogPost?.title || "Blog Post"}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 ${getStatusBadge(sp.status)}`}>
                    {sp.status}
                  </span>
                </div>

                {editingId === sp.id ? (
                  /* Edit Mode */
                  <div className="space-y-4">
                    {/* Facebook content */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="flex items-center gap-1.5 text-xs text-[#808080]">
                          <Facebook className="h-3 w-3" /> Facebook
                        </label>
                        <span className="text-xs text-[#808080]">
                          {editFacebookContent.length}/63,206
                        </span>
                      </div>
                      <textarea
                        value={editFacebookContent}
                        onChange={(e) => setEditFacebookContent(e.target.value)}
                        rows={5}
                        placeholder="Facebook post content..."
                        className="w-full px-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080] resize-y"
                      />
                    </div>

                    {/* Instagram content */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="flex items-center gap-1.5 text-xs text-[#808080]">
                          <Instagram className="h-3 w-3" /> Instagram Caption
                        </label>
                        <span className="text-xs text-[#808080]">
                          {editCaption.length}/2,200
                        </span>
                      </div>
                      <textarea
                        value={editCaption}
                        onChange={(e) => setEditCaption(e.target.value)}
                        rows={5}
                        className="w-full px-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080] resize-y"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#808080] mb-1">Hashtags</label>
                      <input
                        type="text"
                        value={editHashtags}
                        onChange={(e) => setEditHashtags(e.target.value)}
                        className="w-full px-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080]"
                        placeholder="Hashtags"
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
                        <div className="flex items-center gap-1.5 mb-1">
                          <Facebook className="h-3 w-3 text-[#808080]" />
                          <span className="text-xs text-[#808080]">Facebook</span>
                        </div>
                        <p className="text-sm text-[#595959] whitespace-pre-wrap">
                          {sp.facebookContent}
                        </p>
                      </div>
                    )}

                    {/* Instagram content */}
                    <div className="mb-4">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Instagram className="h-3 w-3 text-[#808080]" />
                        <span className="text-xs text-[#808080]">Instagram</span>
                      </div>
                      <p className="text-sm text-[#595959] whitespace-pre-wrap mb-1">
                        {sp.caption}
                      </p>
                      <p className="text-xs text-[#808080]">{sp.hashtags}</p>
                    </div>

                    {/* Platform selection + publish */}
                    <div className="flex items-center gap-3 flex-wrap">
                      {sp.status === "draft" && anyConnected && (
                        <>
                          {/* Platform checkboxes */}
                          {connections?.facebook.connected && (
                            <label className="inline-flex items-center gap-1.5 text-xs text-[#595959] cursor-pointer">
                              <input
                                type="checkbox"
                                checked={platforms.includes("facebook")}
                                onChange={() => togglePlatform(sp.id, "facebook")}
                                className="rounded border-[#e5e5e5]"
                              />
                              <Facebook className="h-3 w-3" />
                              Facebook
                            </label>
                          )}
                          {connections?.instagram.connected && (
                            <label className="inline-flex items-center gap-1.5 text-xs text-[#595959] cursor-pointer">
                              <input
                                type="checkbox"
                                checked={platforms.includes("instagram")}
                                onChange={() => togglePlatform(sp.id, "instagram")}
                                className="rounded border-[#e5e5e5]"
                              />
                              <Instagram className="h-3 w-3" />
                              Instagram
                            </label>
                          )}

                          <button
                            type="button"
                            onClick={() => handlePublish(sp.id)}
                            disabled={publishing === sp.id || platforms.length === 0}
                            className="inline-flex items-center gap-1.5 bg-[#1b1b1b] text-white px-3 py-1.5 text-xs hover:bg-[#333] transition-colors disabled:opacity-50"
                          >
                            {publishing === sp.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Send className="h-3 w-3" />
                            )}
                            Publish
                          </button>
                        </>
                      )}

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

                      <button
                        type="button"
                        onClick={() => handleDelete(sp.id)}
                        className="p-1.5 text-[#595959] hover:text-red-600 transition-colors ml-auto"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Publish Results */}
                    {results && (
                      <div className="mt-3 pt-3 border-t border-[#e5e5e5] space-y-1">
                        {results.map((r) => (
                          <div key={r.platform} className="flex items-center gap-2 text-xs">
                            {r.success ? (
                              <CheckCircle2 className="h-3 w-3 text-green-600" />
                            ) : (
                              <XCircle className="h-3 w-3 text-red-600" />
                            )}
                            <span className="capitalize text-[#595959]">{r.platform}</span>
                            {r.success && r.platformUrl && (
                              <a
                                href={r.platformUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                View Post
                              </a>
                            )}
                            {!r.success && r.error && (
                              <span className="text-red-600">{r.error}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Publishing History */}
      {publishLogs.length > 0 && (
        <div className="bg-white border border-[#e5e5e5] p-6">
          <h2 className="text-sm font-medium text-[#1b1b1b] mb-4">Publishing History</h2>
          <div className="space-y-2">
            {publishLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center gap-3 py-2 border-b border-[#f0f0f0] last:border-0"
              >
                <div className="flex items-center gap-1.5 w-24">
                  {log.platform === "facebook" ? (
                    <Facebook className="h-3 w-3 text-[#595959]" />
                  ) : (
                    <Instagram className="h-3 w-3 text-[#595959]" />
                  )}
                  <span className="text-xs text-[#595959] capitalize">{log.platform}</span>
                </div>

                <span className="text-xs text-[#808080] w-36">
                  {new Date(log.publishedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>

                <span
                  className={`text-xs px-2 py-0.5 w-16 text-center ${
                    log.status === "success"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {log.status}
                </span>

                <span className="text-xs text-[#808080] flex-1 truncate">
                  {log.socialPost?.blogPost?.title || log.contentSnippet || "—"}
                </span>

                {log.platformUrl && (
                  <a
                    href={log.platformUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    View
                  </a>
                )}
                {log.error && (
                  <span className="text-xs text-red-600 truncate max-w-[200px]" title={log.error}>
                    {log.error}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
