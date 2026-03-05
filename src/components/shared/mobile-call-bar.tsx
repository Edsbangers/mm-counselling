"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Phone, X } from "lucide-react";
import { trackPhoneClick } from "@/lib/analytics";

export function MobileCallBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't render on contact page or admin pages
  if (pathname === "/contact" || pathname.startsWith("/admin")) {
    return null;
  }

  const show = visible && !dismissed;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-200 ease-out ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-white/95 backdrop-blur-sm border-t border-border/40 shadow-[0_-2px_10px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Need to talk?</p>

        <div className="flex items-center gap-3">
          <a
            href="tel:+447864281701"
            onClick={trackPhoneClick}
            className="inline-flex items-center gap-2 bg-[#6b8f71] text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            <Phone className="h-4 w-4" />
            Call Marion
          </a>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="text-muted-foreground hover:text-foreground p-1"
            aria-label="Close call bar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
