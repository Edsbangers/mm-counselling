"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { trackBookingClick, trackPhoneClick } from "@/lib/analytics";

export function CtaBlock() {
  return (
    <section className="py-12 px-6 md:py-16 md:px-8 bg-[#faf9f6]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
          Ready to Take the First Step?
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
          It&apos;s completely normal to feel nervous about reaching out.
          There&apos;s no pressure &mdash; you can ask questions, share
          what&apos;s on your mind, or simply see if it feels right. Your first
          session is a chance to meet me and decide if my approach works for you.
        </p>

        <Link
          href="/contact"
          onClick={trackBookingClick}
          className="inline-block border border-foreground text-foreground px-8 py-3 text-sm tracking-wide hover:bg-foreground hover:text-white transition-all duration-300 mb-4"
        >
          Get in Touch
        </Link>

        <p className="text-sm text-muted-foreground mb-6">
          Or call me directly on{" "}
          <a
            href={`tel:+447864281701`}
            onClick={trackPhoneClick}
            className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
          >
            {siteConfig.contact.phone}
          </a>
        </p>

        <p className="text-xs text-muted-foreground">
          &#10003; Free introductory call &middot; &#10003; BACP registered
          &middot; &#10003; Confidential
        </p>
      </div>
    </section>
  );
}
