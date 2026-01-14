import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, PoundSterling, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const feeCards = [
  {
    title: "Initial Consultation",
    price: siteConfig.fees.initial,
    description: "A chance to meet, discuss your needs, and see if we're a good fit.",
    features: [
      "50-minute session",
      "No obligation",
      "Discuss your goals",
      "Ask any questions",
    ],
    highlighted: false,
  },
  {
    title: "Standard Session",
    price: siteConfig.fees.standard,
    description: "Regular counselling sessions tailored to your individual needs.",
    features: [
      "50-minute session",
      "Person-centred approach",
      "Flexible scheduling",
      "Ongoing support",
    ],
    highlighted: true,
  },
  {
    title: "Concession Rate",
    price: siteConfig.fees.concession,
    description: "Reduced rate for students, unemployed, or those on low income.",
    features: [
      "50-minute session",
      "Same quality care",
      "Subject to availability",
      "Proof may be required",
    ],
    highlighted: false,
  },
];

export function FeesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Transparent Fees
          </h2>
          <p className="text-lg text-muted-foreground">
            I believe therapy should be accessible. My fees are competitive for
            the Portsmouth and Hampshire area, and I offer concession rates where
            possible.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {feeCards.map((card) => (
            <Card
              key={card.title}
              className={`relative ${
                card.highlighted
                  ? "border-sage shadow-lg scale-105"
                  : "border-border/50"
              }`}
            >
              {card.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-sage text-white text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl">{card.title}</CardTitle>
                <div className="flex items-center justify-center gap-1 mt-4">
                  <PoundSterling className="h-6 w-6 text-foreground" />
                  <span className="text-4xl font-bold text-foreground">
                    {card.price}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-1 text-muted-foreground text-sm">
                  <Clock className="h-4 w-4" />
                  <span>{siteConfig.fees.sessionLength}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm text-center mb-6">
                  {card.description}
                </p>
                <ul className="space-y-3">
                  {card.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-sage flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/contact">Book Your Session</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
