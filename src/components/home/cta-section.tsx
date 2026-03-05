"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { trackBookingClick, trackPhoneClick } from "@/lib/analytics";

export function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-[#f9f9f9]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
          Serving Portsmouth and Surrounding Areas
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          I provide accessible counselling services throughout Portsmouth and
          Southsea, including Fratton, Old Portsmouth, Eastney, and surrounding
          areas of Hampshire. Sessions are available in-person at my Southsea
          ({siteConfig.location.postcode}) practice, or via telephone and Zoom.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-10">
          My practice is easily accessible with local street parking and within
          walking distance of Southsea town centre.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/contact"
            onClick={trackBookingClick}
            className="inline-block border border-foreground text-foreground px-8 py-3 text-sm tracking-wide hover:bg-foreground hover:text-white transition-all duration-300"
          >
            Schedule an Introductory Session
          </Link>
          <a
            href={`tel:${siteConfig.contact.phone}`}
            onClick={trackPhoneClick}
            className="inline-block border border-[#808080] text-[#808080] px-8 py-3 text-sm tracking-wide hover:bg-[#808080] hover:text-white transition-all duration-300"
          >
            Call {siteConfig.contact.phone}
          </a>
        </div>

        {/* Trust indicators */}
        <div className="border-t border-border pt-8">
          <p className="font-serif text-lg text-foreground mb-2">
            Trusted &amp; Registered
          </p>
          <p className="text-sm text-muted-foreground">
            Registered member of BACP (British Association for Counselling and Psychotherapy)
          </p>
        </div>
      </div>
    </section>
  );
}
