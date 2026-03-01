"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function getSessionId() {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("mm-chat-session");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("mm-chat-session", id);
  }
  return id;
}

export function PageTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef("");

  useEffect(() => {
    // Skip admin pages
    if (pathname.startsWith("/admin")) return;
    // Skip duplicate tracking on same path
    if (pathname === lastTrackedPath.current) return;
    lastTrackedPath.current = pathname;

    const data = {
      path: pathname,
      referrer: document.referrer || null,
      sessionId: getSessionId(),
    };

    // Use sendBeacon for reliability (fire-and-forget)
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/analytics",
        new Blob([JSON.stringify(data)], { type: "application/json" })
      );
    } else {
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).catch(() => {});
    }
  }, [pathname]);

  return null;
}
