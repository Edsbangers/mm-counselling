import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function AboutSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f9f9f9]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Marion's headshot */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/images/marion-headshot.jpg"
              alt="Marion Morris - BACP Registered Counsellor in Portsmouth"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Content - using Marion's preferred bio */}
          <div className="space-y-5">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground">
              About {siteConfig.therapist.fullName}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              I provide a compassionate, confidential, and safe space for
              individuals and couples to navigate life&apos;s challenges. Whether
              you are feeling weighed down by anxiety, depression, or the impact
              of trauma, you don&apos;t have to walk through it alone.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">For Individuals</strong> &mdash; I
              work collaboratively with you to rebuild self-esteem, process the
              pain of past relationships, and untangle the roots of generational
              trauma so you can move forward with clarity and confidence.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">For Couples</strong> &mdash; I
              help partners identify and break negative relationship cycles.
              Together, we will work to improve communication, rebuild trust, and
              foster a healthier, more secure connection.
            </p>
            <p className="text-muted-foreground leading-relaxed italic">
              Healing is a journey, and taking the first step takes courage.
              Reach out today to schedule a call.
            </p>

            {/* BACP Logo */}
            <div className="pt-4">
              <Image
                src="/images/bacp-logo.png"
                alt="BACP Registered Member 388689 - Accredited Register"
                width={200}
                height={80}
                className="object-contain"
              />
            </div>

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
