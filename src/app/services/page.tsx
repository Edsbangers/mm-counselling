import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Heart, Frown, Users, ArrowRight, Clock, PoundSterling } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Counselling Services | ADHD, Trauma & Anxiety Support",
  description:
    "Professional counselling services in Portsmouth & Hampshire. Specialist support for ADHD, trauma, anxiety, depression, and relationship issues.",
};

const serviceIcons = {
  adhd: Brain,
  trauma: Heart,
  "anxiety-depression": Frown,
  relationships: Users,
};

const serviceDetails = {
  adhd: {
    longDescription:
      "Living with ADHD as an adult can feel overwhelming. From struggling with time management to dealing with emotional dysregulation, the challenges are real. I provide a supportive space where you can understand your neurodivergent mind, develop practical coping strategies, and build on your unique strengths.",
    benefits: [
      "Understand your ADHD and how it affects you",
      "Develop practical coping strategies",
      "Improve time management and organisation",
      "Address emotional dysregulation",
      "Build self-compassion and self-esteem",
    ],
  },
  trauma: {
    longDescription:
      "Trauma can affect every aspect of your life, often in ways that aren't immediately obvious. Using trauma-informed approaches, I help you process difficult experiences at a pace that feels safe for you. Healing is possible, and you don't have to face it alone.",
    benefits: [
      "Process traumatic experiences safely",
      "Understand trauma responses",
      "Develop grounding techniques",
      "Rebuild sense of safety",
      "Work towards post-traumatic growth",
    ],
  },
  "anxiety-depression": {
    longDescription:
      "Anxiety and depression can feel isolating and exhausting. Whether you're experiencing persistent worry, low mood, or both, counselling can help you understand what's happening and find ways forward. Together, we'll explore the root causes and develop strategies for managing symptoms.",
    benefits: [
      "Understand triggers and patterns",
      "Develop coping strategies",
      "Challenge negative thought patterns",
      "Improve daily functioning",
      "Build resilience for the future",
    ],
  },
  relationships: {
    longDescription:
      "Relationships with others – and with ourselves – can be a source of both joy and pain. Whether you're navigating difficulties in your relationships, recovering from a breakup, or working on setting boundaries, I can help you explore these challenges and find healthier ways of relating.",
    benefits: [
      "Improve communication skills",
      "Understand relationship patterns",
      "Set healthy boundaries",
      "Process relationship difficulties",
      "Build self-awareness and self-worth",
    ],
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-warm-white to-cream py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Counselling Services in Portsmouth
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              I offer specialist counselling support for adults across Portsmouth,
              Southsea, and Hampshire. Every person&apos;s journey is unique, and I
              tailor my approach to meet your individual needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
                <Clock className="h-4 w-4 text-sage" />
                <span className="text-sm text-foreground">
                  {siteConfig.fees.sessionLength} sessions
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
                <PoundSterling className="h-4 w-4 text-sage" />
                <span className="text-sm text-foreground">
                  From £{siteConfig.fees.concession} per session
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {siteConfig.specialisms.map((service) => {
              const Icon = serviceIcons[service.slug as keyof typeof serviceIcons];
              const details = serviceDetails[service.slug as keyof typeof serviceDetails];

              return (
                <Card
                  key={service.slug}
                  className="border-border/50 hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-lg bg-sage/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-7 w-7 text-sage" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl mb-2">
                          {service.name}
                        </CardTitle>
                        <p className="text-muted-foreground text-sm">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {details.longDescription}
                    </p>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/services/${service.slug}`}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How Counselling Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Taking the first step can feel daunting. Here&apos;s what you can
              expect when you reach out.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-sage text-white flex items-center justify-center font-bold text-xl">
                1
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">
                Initial Consultation
              </h3>
              <p className="text-muted-foreground text-sm">
                We&apos;ll have a free initial conversation to discuss what
                brings you to counselling and see if we&apos;re a good fit.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-sage text-white flex items-center justify-center font-bold text-xl">
                2
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">
                Regular Sessions
              </h3>
              <p className="text-muted-foreground text-sm">
                We&apos;ll meet weekly or fortnightly for {siteConfig.fees.sessionLength}{" "}
                sessions, working at a pace that feels right for you.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-sage text-white flex items-center justify-center font-bold text-xl">
                3
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">
                Ongoing Support
              </h3>
              <p className="text-muted-foreground text-sm">
                The length of therapy varies. Some people find a few sessions
                helpful; others benefit from longer-term support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Session Fees
            </h2>
            <p className="text-lg text-muted-foreground">
              Transparent, competitive pricing for the Portsmouth area. I also
              offer concession rates for those who need them.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Initial Consultation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-foreground mb-2">
                  £{siteConfig.fees.initial}
                </p>
                <p className="text-muted-foreground text-sm">
                  {siteConfig.fees.sessionLength} session
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-sage">
              <CardHeader>
                <CardTitle>Standard Session</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-foreground mb-2">
                  £{siteConfig.fees.standard}
                </p>
                <p className="text-muted-foreground text-sm">
                  {siteConfig.fees.sessionLength} session
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Concession Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-foreground mb-2">
                  £{siteConfig.fees.concession}
                </p>
                <p className="text-muted-foreground text-sm">
                  Students & low income
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-slate-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Take the First Step?
          </h2>
          <p className="text-lg text-slate-light mb-8 max-w-2xl mx-auto">
            Book a free initial consultation to discuss your needs and see if
            we&apos;re a good fit. There&apos;s no obligation to continue.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-sage hover:bg-sage-dark text-white"
          >
            <Link href="/contact">Book Free Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
