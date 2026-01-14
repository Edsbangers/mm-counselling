import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, CheckCircle2, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Relationship Counselling Portsmouth | Relationship Issues Support Hampshire",
  description:
    "Professional counselling for relationship difficulties in Portsmouth & Hampshire. Support for communication issues, boundaries, breakups and self-worth.",
  keywords: [
    "relationship counselling Portsmouth",
    "relationship therapy Hampshire",
    "breakup support Southsea",
    "boundaries counsellor Portsmouth",
  ],
};

const issues = [
  "Communication difficulties in relationships",
  "Setting and maintaining boundaries",
  "Recovering from a breakup or divorce",
  "Patterns of unhealthy relationships",
  "Trust issues after betrayal",
  "Codependency concerns",
  "Family relationship difficulties",
  "Building self-worth and self-esteem",
];

const benefits = [
  {
    title: "Improve Communication",
    description:
      "Learn healthier ways to express your needs and listen to others without conflict escalating.",
  },
  {
    title: "Understand Your Patterns",
    description:
      "Explore why you might be drawn to certain relationship dynamics and how to change them.",
  },
  {
    title: "Set Healthy Boundaries",
    description:
      "Develop the confidence to establish and maintain boundaries that protect your wellbeing.",
  },
  {
    title: "Build Self-Worth",
    description:
      "Work on your relationship with yourself as the foundation for healthier connections with others.",
  },
];

export default function RelationshipsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-warm-white to-cream py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sage/10 flex items-center justify-center">
              <Users className="h-8 w-8 text-sage" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Relationship Counselling in Portsmouth
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Support for navigating relationship challenges, whether with
              partners, family, or yourself. At our Southsea practice, I help
              you build healthier connections.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Book a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Understanding */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Relationships Shape Our Lives
              </h2>
              <p className="text-muted-foreground mb-4">
                Our relationships – with partners, family, friends, and
                ourselves – have a profound impact on our wellbeing. When
                relationships are struggling, it can affect every area of life.
              </p>
              <p className="text-muted-foreground mb-4">
                Many clients come to me feeling stuck in unhealthy patterns,
                struggling to communicate their needs, or working through the
                pain of a relationship ending. Others want to understand why
                they keep finding themselves in similar situations.
              </p>
              <p className="text-muted-foreground">
                I offer a safe space to explore these difficulties without
                judgement. Whether you&apos;re in a relationship, navigating a
                breakup, or working on your relationship with yourself,
                counselling can help you find clarity and make positive changes.
              </p>
            </div>
            <div className="bg-cream rounded-2xl p-8">
              <h3 className="font-semibold text-lg text-foreground mb-4">
                Issues I can help with:
              </h3>
              <ul className="space-y-3">
                {issues.map((issue) => (
                  <li key={issue} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-sage flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{issue}</span>
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
              Working through relationship issues in therapy can lead to lasting
              positive change. Here&apos;s what we can focus on together.
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
                I work with individuals to explore their relationship
                difficulties. While I don&apos;t offer couples counselling, I
                find that individual work can be incredibly powerful for
                understanding your own patterns and making changes.
              </p>
              <p className="text-muted-foreground mb-4">
                Our relationships often reflect our early experiences and the
                beliefs we&apos;ve developed about ourselves and others. By
                exploring these patterns in a safe space, we can begin to
                understand why certain dynamics keep repeating.
              </p>
              <p className="text-muted-foreground">
                I take a person-centred approach, meeting you where you are
                without judgement. Whether you&apos;re dealing with a current
                relationship crisis or looking at longer-standing patterns,
                we&apos;ll work at a pace that feels right for you.
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
              .filter((s) => s.slug !== "relationships")
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
            Ready to Work on Your Relationships?
          </h2>
          <p className="text-lg text-slate-light mb-8 max-w-2xl mx-auto">
            Book a free initial consultation to discuss how counselling might
            help you navigate your relationship challenges.
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
