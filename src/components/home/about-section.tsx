import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function AboutSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f9f9f9]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image placeholder matching GoDaddy layout */}
          <div className="aspect-[3/4] bg-[#e8e8e8] flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-[#d0d0d0] flex items-center justify-center">
                <span className="text-4xl font-serif text-[#808080]">M</span>
              </div>
              <p className="text-sm text-muted-foreground">Marion Morris</p>
              <p className="text-xs text-muted-foreground">BACP Registered Counsellor</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-5">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground">
              About {siteConfig.therapist.fullName}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Marion is a BACP-registered psychotherapeutic counsellor based in
              Southsea, Portsmouth. She holds a BACP Accredited Diploma in
              Psychotherapeutic Counselling with a psychodynamic approach, a
              Certificate in Working with Couples, and is completing ADHD
              Certification Training.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              She is committed to furthering qualifications and training through
              continual professional development, with specialist training in
              Trauma and Attachment.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Marion works with clients across diverse backgrounds, including
              those with neurodiversity, trauma histories, addictions,
              relationship difficulties, and members of the LGBTQ+ community.
            </p>
            <Link
              href="/about"
              className="inline-block text-sm text-foreground border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
            >
              Read More About Marion
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
