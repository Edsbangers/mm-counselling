"use client";

import { useEffect, useRef } from "react";
import { trackBlogRead } from "@/lib/analytics";

export function BlogScrollTracker() {
  const hasFired = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasFired.current) {
          hasFired.current = true;
          trackBlogRead(document.title);
        }
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return <div ref={sentinelRef} aria-hidden="true" />;
}
