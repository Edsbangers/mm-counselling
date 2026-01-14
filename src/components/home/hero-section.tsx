import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Award, Heart } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-warm-white to-cream">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-sage/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-slate-brand/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-sage/10 text-sage-dark px-4 py-2 rounded-full text-sm font-medium">
              <MapPin className="h-4 w-4" />
              Southsea, Portsmouth
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Compassionate Counselling for{" "}
              <span className="text-sage">ADHD</span> &{" "}
              <span className="text-slate-brand">Trauma</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              Professional, person-centred therapy in Hampshire. I help adults
              navigate ADHD, process trauma, and find their path to wellbeing in
              a safe, supportive environment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-base">
                <Link href="/contact">Book Your Free Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="h-5 w-5 text-sage" />
                <span>MBACP Registered</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Heart className="h-5 w-5 text-sage" />
                <span>10+ Years Experience</span>
              </div>
            </div>
          </div>

          {/* Image placeholder - would be replaced with actual image */}
          <div className="relative hidden lg:block">
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-sage/20 to-slate-brand/20 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-sage/30 flex items-center justify-center">
                    <span className="text-4xl font-bold text-sage-dark">MM</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Professional headshot would appear here
                  </p>
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4">
              <p className="text-sm font-medium text-foreground">
                Based in Southsea
              </p>
              <p className="text-xs text-muted-foreground">
                Serving Portsmouth & Hampshire
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
