import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-slate-dark text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Take the First Step?
          </h2>
          <p className="text-lg text-slate-light mb-8 max-w-2xl mx-auto">
            Whether you&apos;re seeking support for ADHD, working through trauma,
            or simply need someone to talk to, I&apos;m here to help. Book a free
            initial consultation to see if we&apos;re a good fit.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
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
              <a href={`tel:${siteConfig.contact.phone}`}>Call Now</a>
            </Button>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 pt-8 border-t border-slate-brand">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center">
                <Phone className="h-5 w-5 text-sage-light" />
              </div>
              <span className="text-sm text-slate-light">Phone</span>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="font-medium hover:text-sage-light transition-colors"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center">
                <Mail className="h-5 w-5 text-sage-light" />
              </div>
              <span className="text-sm text-slate-light">Email</span>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="font-medium hover:text-sage-light transition-colors"
              >
                {siteConfig.contact.email}
              </a>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-sage-light" />
              </div>
              <span className="text-sm text-slate-light">Location</span>
              <span className="font-medium">
                {siteConfig.location.area}, {siteConfig.location.city}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
