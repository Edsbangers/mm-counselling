"use client";

import Link from "next/link";
import { trackBookingClick } from "@/lib/analytics";

export function ServicesSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            Empathic and Approachable Counselling Support
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            At my Southsea-based practice, I offer tailored support for a range
            of challenges. Every journey is unique, and I am here to walk
            alongside you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Individuals */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif text-foreground">Individuals</h3>
            <p className="text-muted-foreground leading-relaxed">
              Do you struggle with anxiety, trauma, low self-esteem,
              relationship issues? Has life just become too much and you need a
              safe space, judgement free to be heard and work through it all?
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Maybe you just want someone to help you unpick all of your
              thoughts, feelings and emotions that can be overwhelming and all
              consuming at times. I can provide a space where we can unpick all
              of this together, helping you to understand yourself a bit better
              and work towards inner peace.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I&apos;m trained and qualified in psychodynamic counselling where
              we look at how we may have formed relationship templates and built
              defences that we needed in our early and formative years or helped
              us survive trauma, but which may not help us going forwards and may
              be affecting our current relationships in a negative way. I will
              work with the best method to help you.
            </p>
            <Link
              href="/sessions-and-fees"
              className="inline-block text-sm text-foreground border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
            >
              View Sessions &amp; Fees
            </Link>
          </div>

          {/* Couples */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif text-foreground">Couples</h3>
            <p className="text-muted-foreground leading-relaxed">
              I help partners identify and break negative relationship cycles.
              Together, we will work to improve communication, rebuild trust, and
              foster a healthier, more secure connection.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I provide an unbiased space to work through relationship ruptures
              towards repair, including infidelity recovery and trust
              restoration, helping couples navigate difficult conversations and
              rebuild their connection.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you are dealing with communication breakdown, trust issues,
              or simply growing apart, couples counselling can help.
            </p>
            <Link
              href="/contact"
              onClick={trackBookingClick}
              className="inline-block text-sm text-foreground border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
            >
              Book a Couples Session
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
