import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const qualifications = [
  "MBACP Registered Counsellor",
  "Diploma in Counselling",
  "Specialist ADHD Training",
  "Trauma-Informed Practice",
  "Person-Centred Approach",
  "Over 10 Years Experience",
];

export function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-sage/20 to-slate-brand/10 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-sage/30 flex items-center justify-center">
                    <span className="text-5xl font-bold text-sage-dark">M</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Marion&apos;s photo would appear here
                  </p>
                </div>
              </div>
            </div>
            {/* Experience badge */}
            <div className="absolute -bottom-6 -right-6 bg-sage text-white rounded-xl shadow-lg p-6">
              <p className="text-3xl font-bold">10+</p>
              <p className="text-sm opacity-90">Years Experience</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              About {siteConfig.therapist.name}
            </h2>
            <p className="text-lg text-muted-foreground">
              Hello, I&apos;m Marion, and I&apos;ve been supporting individuals
              through their mental health journeys for over a decade. Based in
              Southsea, I work with clients across Portsmouth and the wider
              Hampshire area.
            </p>
            <p className="text-muted-foreground">
              My approach is warm, non-judgemental, and tailored to your unique
              needs. I believe that everyone deserves to be heard and supported,
              particularly those navigating the complexities of ADHD or
              processing traumatic experiences.
            </p>
            <p className="text-muted-foreground">
              I create a safe space where you can explore your thoughts and
              feelings at your own pace. Whether you&apos;re seeking support for
              ADHD, working through trauma, or dealing with anxiety and
              depression, I&apos;m here to help.
            </p>

            {/* Qualifications */}
            <div className="grid sm:grid-cols-2 gap-3 pt-4">
              {qualifications.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-sage flex-shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <Button asChild size="lg" className="mt-6">
              <Link href="/about">Read My Full Story</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
