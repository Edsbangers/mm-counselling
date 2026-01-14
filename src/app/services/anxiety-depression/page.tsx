import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Frown, CheckCircle2, ArrowRight, AlertTriangle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Anxiety & Depression Counselling Portsmouth | Mental Health Support Hampshire",
  description:
    "Professional counselling for anxiety and depression in Portsmouth & Hampshire. Compassionate support to help you understand and manage your mental health.",
  keywords: [
    "anxiety counselling Portsmouth",
    "depression therapy Hampshire",
    "mental health support Southsea",
    "anxiety therapist Portsmouth",
  ],
};

const symptoms = [
  "Persistent feelings of worry or dread",
  "Low mood lasting weeks or months",
  "Difficulty sleeping or sleeping too much",
  "Loss of interest in things you used to enjoy",
  "Physical symptoms like chest tightness or fatigue",
  "Negative thoughts about yourself or the future",
  "Social withdrawal or isolation",
  "Difficulty concentrating or making decisions",
];

const benefits = [
  {
    title: "Understand Your Experience",
    description:
      "Gain insight into what's driving your anxiety or depression and why you feel the way you do.",
  },
  {
    title: "Develop Coping Strategies",
    description:
      "Learn practical techniques for managing difficult thoughts, feelings, and physical symptoms.",
  },
  {
    title: "Challenge Negative Patterns",
    description:
      "Identify and work through unhelpful thought patterns that keep you stuck.",
  },
  {
    title: "Build Resilience",
    description:
      "Develop tools and self-awareness to better handle future challenges.",
  },
];

export default function AnxietyDepressionPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-warm-white to-cream py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sage/10 flex items-center justify-center">
              <Frown className="h-8 w-8 text-sage" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Anxiety & Depression Counselling in Portsmouth
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Compassionate support for managing anxiety and depression. At our
              Southsea practice, I help you understand your experiences and find
              your way back to wellbeing.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Book a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Crisis Notice */}
      <section className="bg-amber-50 border-y border-amber-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-3 text-amber-800">
            <AlertTriangle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm">
              <strong>Struggling right now?</strong> Call Samaritans on 116 123
              (free, 24/7) or text SHOUT to 85258.
            </p>
          </div>
        </div>
      </section>

      {/* Understanding */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                You&apos;re Not Alone
              </h2>
              <p className="text-muted-foreground mb-4">
                Anxiety and depression are among the most common mental health
                challenges, yet they can feel incredibly isolating. If
                you&apos;re struggling, please know that what you&apos;re
                experiencing is more common than you might think – and help is
                available.
              </p>
              <p className="text-muted-foreground mb-4">
                Many of my clients in Hampshire describe feeling exhausted from
                trying to &quot;just get on with it&quot; or frustrated that
                they can&apos;t simply &quot;think positive.&quot; The truth is,
                these conditions are complex and often require more than
                willpower to overcome.
              </p>
              <p className="text-muted-foreground">
                Counselling provides a space to explore what&apos;s really going
                on beneath the surface, understand your triggers and patterns,
                and develop sustainable ways to manage your mental health.
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

      {/* How Therapy Helps */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How Counselling Helps
            </h2>
            <p className="text-lg text-muted-foreground">
              Working with a counsellor gives you dedicated time and space to
              focus on your mental health. Here&apos;s what we can work on
              together.
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
              My Approach
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-muted-foreground mb-4">
                I work from a person-centred perspective, which means I
                don&apos;t come with a predetermined agenda or try to fit you
                into a box. Instead, we explore your unique experiences and what
                anxiety or depression means in the context of your life.
              </p>
              <p className="text-muted-foreground mb-4">
                Sessions might involve exploring the roots of your difficulties,
                developing practical coping strategies, or simply having a space
                to express how you&apos;re feeling without judgement. I also
                incorporate mindfulness-based approaches where helpful.
              </p>
              <p className="text-muted-foreground">
                The length of therapy varies depending on your needs. Some
                people benefit from short-term focused work; others find
                longer-term support more helpful. We&apos;ll work together to
                find what&apos;s right for you.
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
              .filter((s) => s.slug !== "anxiety-depression")
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
            Ready to Feel Better?
          </h2>
          <p className="text-lg text-slate-light mb-8 max-w-2xl mx-auto">
            You don&apos;t have to keep struggling alone. Book a free initial
            consultation to discuss how counselling might help you.
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
