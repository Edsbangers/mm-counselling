import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, CheckCircle2, ArrowRight, AlertTriangle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Trauma Therapy Portsmouth | Trauma Counselling Hampshire",
  description:
    "Compassionate trauma-informed therapy in Portsmouth & Hampshire. Process difficult experiences safely with a specialist trauma counsellor in Southsea.",
  keywords: [
    "trauma therapy Portsmouth",
    "trauma counselling Hampshire",
    "PTSD support Southsea",
    "trauma-informed therapist Portsmouth",
  ],
};

const traumaTypes = [
  "Childhood trauma or adverse experiences",
  "Relationship trauma or domestic abuse",
  "Accidents, injuries, or medical trauma",
  "Bereavement and complicated grief",
  "Workplace trauma or bullying",
  "Sexual assault or abuse",
  "Witnessing traumatic events",
  "Complex or developmental trauma",
];

const benefits = [
  {
    title: "Safe Processing",
    description:
      "Work through traumatic memories at a pace that feels manageable, with techniques to keep you grounded.",
  },
  {
    title: "Understand Your Responses",
    description:
      "Learn why your mind and body react the way they do, and recognise these as normal responses to abnormal events.",
  },
  {
    title: "Rebuild Safety",
    description:
      "Develop a renewed sense of safety in your body, relationships, and the world around you.",
  },
  {
    title: "Reclaim Your Life",
    description:
      "Move from surviving to thriving, with trauma no longer controlling your present.",
  },
];

export default function TraumaPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-warm-white to-cream py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sage/10 flex items-center justify-center">
              <Heart className="h-8 w-8 text-sage" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Trauma Therapy in Portsmouth
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Compassionate, trauma-informed support for healing from difficult
              experiences. At our Southsea practice, I create a safe space for
              you to process trauma at your own pace.
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
              <strong>In crisis?</strong> Call Samaritans on 116 123 (free, 24/7)
              or text SHOUT to 85258. In emergency, call 999.
            </p>
          </div>
        </div>
      </section>

      {/* Understanding Trauma */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Understanding Trauma
              </h2>
              <p className="text-muted-foreground mb-4">
                Trauma isn&apos;t just about what happened to you – it&apos;s
                about how those experiences affected you. The impact of trauma
                can show up in many ways: flashbacks, anxiety, difficulty
                trusting others, or a persistent sense that the world
                isn&apos;t safe.
              </p>
              <p className="text-muted-foreground mb-4">
                Many people who come to me have been carrying their trauma for
                years, often not even realising how much it&apos;s affecting
                their daily life. Here in Hampshire, I provide a safe,
                confidential space where you can begin to process these
                experiences.
              </p>
              <p className="text-muted-foreground">
                Healing from trauma is possible. It doesn&apos;t mean forgetting
                what happened, but rather integrating those experiences so they
                no longer control your present.
              </p>
            </div>
            <div className="bg-cream rounded-2xl p-8">
              <h3 className="font-semibold text-lg text-foreground mb-4">
                Types of trauma I work with:
              </h3>
              <ul className="space-y-3">
                {traumaTypes.map((type) => (
                  <li key={type} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-sage flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{type}</span>
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
              How Trauma Therapy Helps
            </h2>
            <p className="text-lg text-muted-foreground">
              Working with a trauma-informed therapist provides a safe container
              for healing. Here&apos;s what we can work towards together.
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
              My Approach to Trauma Therapy
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-muted-foreground mb-4">
                I use trauma-informed approaches that prioritise your safety and
                autonomy. We&apos;ll never move faster than feels right for you,
                and you&apos;re always in control of what we explore and when.
              </p>
              <p className="text-muted-foreground mb-4">
                Sessions often involve building resources first – developing
                grounding techniques, understanding your window of tolerance,
                and creating a sense of safety. Only when you feel ready do we
                begin to gently approach traumatic material.
              </p>
              <p className="text-muted-foreground mb-4">
                I draw on person-centred therapy, somatic awareness, and
                mindfulness-based approaches. My priority is always to ensure
                you feel safe, heard, and supported throughout the process.
              </p>
              <p className="text-muted-foreground">
                Many of my clients in Portsmouth tell me they appreciate having
                a space where they don&apos;t have to &quot;perform&quot;
                recovery or meet anyone else&apos;s timeline for healing.
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
              .filter((s) => s.slug !== "trauma")
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
            Ready to Begin Healing?
          </h2>
          <p className="text-lg text-slate-light mb-8 max-w-2xl mx-auto">
            Taking the first step is often the hardest part. Book a free initial
            consultation where we can discuss your needs in a safe, confidential
            space.
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
