import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function FeesSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            Sessions and Fees
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Marion offers a complimentary introductory discussion via telephone
            or Zoom to discuss your circumstances and determine compatibility
            before committing to paid sessions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Individual Sessions */}
          <div className="text-center p-8 border border-border">
            <h3 className="text-xl font-serif text-foreground mb-2">
              Individual Sessions
            </h3>
            <p className="text-4xl font-serif text-foreground mb-2">
              &pound;{siteConfig.fees.individual}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              {siteConfig.fees.sessionLength} per session
            </p>
            <p className="text-sm text-muted-foreground">
              Weekly, fortnightly, or monthly
            </p>
          </div>

          {/* Couples Sessions */}
          <div className="text-center p-8 border border-border">
            <h3 className="text-xl font-serif text-foreground mb-2">
              Couples Sessions
            </h3>
            <p className="text-4xl font-serif text-foreground mb-2">
              &pound;{siteConfig.fees.couples}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              {siteConfig.fees.sessionLength} per session
            </p>
            <p className="text-sm text-muted-foreground">
              Weekly, fortnightly, or monthly
            </p>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link
            href="/contact"
            className="inline-block border border-foreground text-foreground px-8 py-3 text-sm tracking-wide hover:bg-foreground hover:text-white transition-all duration-300"
          >
            Book Your Therapy Appointment
          </Link>
        </div>
      </div>
    </section>
  );
}
