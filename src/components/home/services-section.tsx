import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Frown, Users, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const serviceIcons = {
  adhd: Brain,
  trauma: Heart,
  "anxiety-depression": Frown,
  relationships: Users,
};

export function ServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Specialist Counselling Services
          </h2>
          <p className="text-lg text-muted-foreground">
            At our Southsea-based practice, I offer tailored support for a range
            of challenges. Every journey is unique, and I am here to walk
            alongside you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.specialisms.map((service) => {
            const Icon = serviceIcons[service.slug as keyof typeof serviceIcons];
            return (
              <Card
                key={service.slug}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-sage/10 flex items-center justify-center mb-4 group-hover:bg-sage/20 transition-colors">
                    <Icon className="h-6 w-6 text-sage" />
                  </div>
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    {service.description}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center text-sm font-medium text-sage hover:text-sage-dark transition-colors"
                  >
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
