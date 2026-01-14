import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, CheckCircle2, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "ADHD Counselling Portsmouth | Adult ADHD Support Hampshire",
  description:
    "Specialist ADHD counselling for adults in Portsmouth, Southsea & Hampshire. Understand your neurodivergent mind and develop practical coping strategies.",
  keywords: [
    "ADHD counselling Portsmouth",
    "adult ADHD support Hampshire",
    "ADHD therapy Southsea",
    "neurodivergent counsellor Portsmouth",
  ],
};

const symptoms = [
  "Difficulty focusing or concentrating",
  "Struggling with time management",
  "Feeling overwhelmed by daily tasks",
  "Emotional dysregulation or mood swings",
  "Impulsivity affecting decisions",
  "Difficulty maintaining relationships",
  "Chronic feelings of underachievement",
  "Restlessness or difficulty relaxing",
];

const benefits = [
  {
    title: "Understand Your ADHD",
    description:
      "Learn how ADHD specifically affects you and why certain things feel harder.",
  },
  {
    title: "Develop Coping Strategies",
    description:
      "Build practical tools for managing time, focus, and daily responsibilities.",
  },
  {
    title: "Address Emotional Impact",
    description:
      "Work through feelings of shame, frustration, and low self-esteem often linked to ADHD.",
  },
  {
    title: "Build on Your Strengths",
    description:
      "Recognise and harness the unique strengths that come with your neurodivergent mind.",
  },
];

export default function ADHDPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-warm-white to-cream py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sage/10 flex items-center justify-center">
              <Brain className="h-8 w-8 text-sage" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              ADHD Counselling in Portsmouth
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Specialist support for adults navigating life with ADHD. At our
              Southsea-based practice, I help you understand your neurodivergent
              mind and develop strategies that work for you.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Book a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Understanding ADHD */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Understanding Adult ADHD
              </h2>
              <p className="text-muted-foreground mb-4">
                ADHD isn&apos;t just about being distracted or hyperactive.
                For many adults, it affects every aspect of life – from work
                and relationships to self-esteem and emotional wellbeing.
              </p>
              <p className="text-muted-foreground mb-4">
                Many of my clients in Portsmouth come to me feeling exhausted
                from trying to &quot;keep up&quot; with neurotypical
                expectations. They&apos;ve often spent years wondering why
                things that seem easy for others feel so difficult.
              </p>
              <p className="text-muted-foreground">
                Whether you have a diagnosis or suspect you might have ADHD,
                counselling can help you understand your experiences and find
                ways to thrive.
              </p>
            </div>
            <div className="bg-cream rounded-2xl p-8">
              <h3 className="font-semibold text-lg text-foreground mb-4">
                Common experiences I help with:
              </h3>
              <ul className="space-y-3">
                {symptoms.map((symptom) => (
                  <li key={symptom} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-sage flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How I Can Help */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How ADHD Counselling Helps
            </h2>
            <p className="text-lg text-muted-foreground">
              Working with a counsellor who understands ADHD can make a real
              difference. Here&apos;s what we can achieve together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="border-border/50">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* My Approach */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
              My Approach to ADHD Counselling
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-muted-foreground mb-4">
                I take a person-centred approach, meaning our sessions are
                tailored to your specific experiences and needs. There&apos;s no
                one-size-fits-all solution for ADHD, and I believe in working
                collaboratively to find what works for you.
              </p>
              <p className="text-muted-foreground mb-4">
                Sessions might involve exploring how ADHD has shaped your life
                experiences, developing practical strategies for daily
                challenges, or working through the emotional impact of living
                in a world not designed for neurodivergent minds.
              </p>
              <p className="text-muted-foreground">
                Many clients find it helpful to have a space where they can be
                fully themselves without judgement – where being
                &quot;scattered&quot; or &quot;too much&quot; isn&apos;t seen as
                a problem to fix, but simply part of who they are.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Other Services
            </h2>
            <p className="text-muted-foreground">
              I also offer support for other challenges you may be facing.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {siteConfig.specialisms
              .filter((s) => s.slug !== "adhd")
              .map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm font-medium text-foreground hover:bg-sage/10 transition-colors"
                >
                  {service.name}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-slate-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Explore ADHD Support?
          </h2>
          <p className="text-lg text-slate-light mb-8 max-w-2xl mx-auto">
            Book a free initial consultation to discuss how counselling might
            help you. Sessions are available at our Southsea practice or online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-sage hover:bg-sage-dark text-white"
            >
              <Link href="/contact">Book Free Consultation</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-slate-dark"
            >
              <Link href="/about">Learn About Marion</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
