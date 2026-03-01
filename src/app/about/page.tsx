import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Marion Morris | BACP Registered Counsellor in Portsmouth & Southsea",
  description:
    "Meet Marion Morris, a BACP-registered psychotherapeutic counsellor based in Southsea, Portsmouth. Specialist training in trauma, attachment, couples work, and neurodiversity.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Image placeholder */}
            <div className="aspect-[3/4] bg-[#e8e8e8] flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-[#d0d0d0] flex items-center justify-center">
                  <span className="text-4xl font-serif text-[#808080]">M</span>
                </div>
                <p className="text-sm text-muted-foreground">Marion Morris</p>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-5">
              <h1 className="text-3xl md:text-4xl font-serif text-foreground">
                About MM Counselling
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                Marion Morris is a BACP-registered psychotherapeutic counsellor
                based in Southsea, Portsmouth, working with clients across
                Portsmouth and Hampshire. She holds a BACP Accredited Diploma in
                Psychotherapeutic Counselling with a psychodynamic approach.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Marion also holds a Certificate in Working with Couples and is
                completing ADHD Certification Training. She has specialist
                training in Trauma and Attachment and is committed to furthering
                qualifications through continual professional development.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Marion works with clients across diverse backgrounds, including
                those with neurodiversity (Autism, ADHD), panic attacks,
                depression, trauma and abuse histories, addictions, low
                self-worth, occupational stress, OCD, relationship difficulties,
                and members of the LGBTQ+ community supporting transition and
                ongoing care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16 md:py-24 bg-[#f9f9f9]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-6 text-center">
            Approach to Therapy
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Marion works from a psychodynamic perspective, exploring how past
              experiences and unconscious processes influence present behaviour
              and relationships. She aims to help clients look at and work
              through patterns and behaviours to potentially break the cycle.
            </p>
            <p>
              For individuals, she addresses anxiety, trauma, and self-esteem
              challenges, offering a non-judgmental space to explore thoughts and
              emotions, examining relationship patterns and generational cycles.
            </p>
            <p>
              For couples, Marion provides an unbiased space to work through
              ruptures towards repair, including infidelity recovery and trust
              restoration.
            </p>
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-8 text-center">
            Qualifications &amp; Training
          </h2>
          <ul className="space-y-4">
            {siteConfig.therapist.certifications.map((cert, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-muted-foreground mt-1">&#8226;</span>
                <span className="text-muted-foreground">{cert}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 border-t border-border pt-8">
            <h3 className="font-serif text-lg text-foreground mb-4">
              Areas of Experience
            </h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {siteConfig.expertise.map((area, index) => (
                <p key={index} className="text-sm text-muted-foreground">
                  &#8226; {area}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-[#f9f9f9]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-muted-foreground mb-8">
            If you&apos;d like to find out more about how Marion can help, a
            free introductory consultation is available where you can discuss
            your needs and see if it&apos;s a good fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block border border-foreground text-foreground px-8 py-3 text-sm tracking-wide hover:bg-foreground hover:text-white transition-all duration-300"
            >
              Schedule an Introductory Session
            </Link>
            <Link
              href="/sessions-and-fees"
              className="inline-block border border-[#808080] text-[#808080] px-8 py-3 text-sm tracking-wide hover:bg-[#808080] hover:text-white transition-all duration-300"
            >
              View Sessions &amp; Fees
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
