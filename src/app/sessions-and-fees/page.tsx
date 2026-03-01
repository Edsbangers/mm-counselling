import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Counselling Sessions & Fees | £50 Individual, £60 Couples | Portsmouth",
  description:
    "MM-Counselling session fees: Individual counselling £50, Couples counselling £60. 50-minute sessions in Southsea, Portsmouth. Free introductory consultation available.",
};

export default function SessionsAndFeesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            Sessions and Fees
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            I offer a complimentary introductory discussion via telephone
            or Zoom. This allows you to discuss your
            circumstances and determine compatibility before committing to paid
            sessions.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-24 bg-[#f9f9f9]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Individual */}
            <div className="bg-white p-10 border border-border text-center">
              <h2 className="text-2xl font-serif text-foreground mb-2">
                Individual Sessions
              </h2>
              <p className="text-5xl font-serif text-foreground my-6">
                &pound;{siteConfig.fees.individual}
              </p>
              <p className="text-muted-foreground text-sm mb-6">
                {siteConfig.fees.sessionLength} per session
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>&#8226; Weekly, fortnightly, or monthly scheduling</li>
                <li>&#8226; In-person, telephone, or Zoom</li>
                <li>&#8226; Anxiety, trauma, depression, self-esteem</li>
                <li>&#8226; Neurodiversity, ADHD, LGBTQ+ support</li>
              </ul>
            </div>

            {/* Couples */}
            <div className="bg-white p-10 border border-border text-center">
              <h2 className="text-2xl font-serif text-foreground mb-2">
                Couples Sessions
              </h2>
              <p className="text-5xl font-serif text-foreground my-6">
                &pound;{siteConfig.fees.couples}
              </p>
              <p className="text-muted-foreground text-sm mb-6">
                {siteConfig.fees.sessionLength} per session
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>&#8226; Weekly, fortnightly, or monthly scheduling</li>
                <li>&#8226; In-person, telephone, or Zoom</li>
                <li>&#8226; Infidelity recovery &amp; trust restoration</li>
                <li>&#8226; Communication &amp; relationship repair</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Session Details */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          <h2 className="text-2xl md:text-3xl font-serif text-foreground text-center mb-8">
            How Sessions Work
          </h2>

          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <div>
              <h3 className="font-serif text-lg text-foreground mb-2">
                Initial Consultation
              </h3>
              <p>
                I offer a complimentary introductory discussion via
                telephone or Zoom. This allows you to discuss your circumstances
                and determine compatibility before committing to paid sessions.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-foreground mb-2">
                Session Format
              </h3>
              <p>
                Sessions are {siteConfig.fees.sessionLength} in length and can be
                scheduled weekly, fortnightly, or monthly based on your needs and
                financial circumstances. Counselling takes place at the practice in
                Southsea ({siteConfig.location.postcode}). Alternative formats
                include telephone and Zoom sessions.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-foreground mb-2">
                Payment &amp; Cancellation
              </h3>
              <p>
                Payment is required {siteConfig.fees.cancellationNotice} before
                each appointment, with {siteConfig.fees.cancellationNotice}{" "}
                cancellation notice required to avoid charges.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg text-foreground mb-2">
                Location &amp; Parking
              </h3>
              <p>
                The practice is based in Southsea, Portsmouth
                ({siteConfig.location.postcode}). Street parking is available
                locally, though some times require permits. Alternative parking
                options exist within a 5-minute walk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-[#f9f9f9]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
            Ready to Book?
          </h2>
          <p className="text-muted-foreground mb-8">
            Get in touch to arrange your free introductory consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block border border-foreground text-foreground px-8 py-3 text-sm tracking-wide hover:bg-foreground hover:text-white transition-all duration-300"
            >
              Schedule an Introductory Session
            </Link>
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="inline-block border border-[#808080] text-[#808080] px-8 py-3 text-sm tracking-wide hover:bg-[#808080] hover:text-white transition-all duration-300"
            >
              Call {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
