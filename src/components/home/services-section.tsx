import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function ServicesSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            Empathic and Approachable Counselling Support
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            At our Southsea-based practice, Marion offers tailored support for a
            range of challenges. Every journey is unique, and she is here to walk
            alongside you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Individuals */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif text-foreground">Individuals</h3>
            <p className="text-muted-foreground leading-relaxed">
              Marion addresses anxiety, trauma, and self-esteem challenges,
              offering a non-judgmental space to explore thoughts and emotions.
              She examines relationship patterns and generational cycles, aiming
              to help look at and work through patterns and behaviours to
              potentially break the cycle.
            </p>
            <p className="text-muted-foreground text-sm">
              Areas of support include: {siteConfig.expertise.slice(0, 6).join(", ")}, and more.
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
              Marion provides an unbiased space to work through relationship
              ruptures towards repair. Services include infidelity recovery and
              trust restoration, helping couples navigate difficult conversations
              and rebuild their connection.
            </p>
            <p className="text-muted-foreground text-sm">
              Whether you are dealing with communication breakdown, trust issues,
              or simply growing apart, couples counselling can help.
            </p>
            <Link
              href="/contact"
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
