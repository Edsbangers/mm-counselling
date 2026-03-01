"use client";

import { useState, useEffect } from "react";
import { Loader2, Megaphone } from "lucide-react";

export function AnnouncementEditor() {
  const [announcement, setAnnouncement] = useState("");
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/admin/announcements")
      .then((r) => r.json())
      .then((data) => {
        setAnnouncement(data.announcement || "");
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/admin/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ announcement }),
    });
    setSaving(false);
  };

  if (!loaded) return null;

  return (
    <div className="bg-white border border-[#e5e5e5] p-6">
      <div className="flex items-center gap-2 mb-3">
        <Megaphone className="h-4 w-4 text-[#808080]" />
        <h3 className="text-sm font-medium text-[#1b1b1b]">
          Current Announcement
        </h3>
      </div>
      <p className="text-xs text-[#808080] mb-3">
        This message will be shared with the chat agent so Marion can mention
        current offers or updates to visitors.
      </p>
      <textarea
        value={announcement}
        onChange={(e) => setAnnouncement(e.target.value)}
        placeholder="e.g. 20% off first session this month, or new evening appointments available"
        rows={2}
        className="w-full px-4 py-2 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#808080] resize-none mb-3"
      />
      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="inline-flex items-center gap-2 bg-[#1b1b1b] text-white px-4 py-1.5 text-sm hover:bg-[#333] transition-colors disabled:opacity-50"
      >
        {saving && <Loader2 className="h-3 w-3 animate-spin" />}
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
