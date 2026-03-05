"use client";

import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { trackPhoneClick } from "@/lib/analytics";

export function ContactTracking() {
  return (
    <a
      href={`tel:+447864281701`}
      onClick={trackPhoneClick}
      className="inline-flex items-center gap-2 text-xl font-serif text-foreground hover:text-muted-foreground transition-colors"
    >
      <Phone className="h-5 w-5" />
      {siteConfig.contact.phone}
    </a>
  );
}
