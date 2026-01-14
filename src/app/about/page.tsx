import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  Award,
  Heart,
  BookOpen,
  Users,
  MapPin,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Marion | MBACP Counsellor",
  description:
    "Meet Marion, a MBACP registered counsellor with over 10 years experience specialising in ADHD and trauma therapy in Southsea, Portsmouth.",
};

const qualifications = [
  {
    title: "MBACP Registered",
    description: "Member of the British Association for Counselling and Psychotherapy",
  },
  {
    title: "Diploma in Counselling",
    description: "Fully qualified counselling practitioner",
  },
  {
    title: "ADHD Specialist Training",
    description: "Advanced training in supporting neurodivergent adults",
  },
  {
    title: "Trauma-Informed Practice",
    description: "Certified in trauma-informed therapeutic approaches",
  },
  {
    title: "Person-Centred Approach",
    description: "Core training in Rogerian person-centred therapy",
  },
  {
    title: "Continuous Professional Development",
    description: "Ongoing training and supervision to maintain best practice",
  },
];

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description:
      "Every person deserves to be met with warmth and understanding, without judgement.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Therapy is a partnership. You are the expert on your own life; I'm here to walk alongside you.",
  },
  {
    icon: BookOpen,
    title: "Growth",
    description:
      "I believe in the capacity for change and growth in everyone, at any stage of life.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-warm-white to-cream py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-sage/20 to-slate-brand/10 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-sage/30 flex items-center justify-center">
                      <span className="text-5xl font-bold text-sage-dark">M</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Marion&apos;s photo
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-sage text-white rounded-xl shadow-lg p-4">
                <p className="text-2xl font-bold">10+</p>
                <p className="text-sm opacity-90">Years Experience</p>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-sage/10 text-sage-dark px-4 py-2 rounded-full text-sm font-medium">
                <MapPin className="h-4 w-4" />
                Southsea, Portsmouth
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                About {siteConfig.therapist.name}
              </h1>

              <p className="text-lg text-muted-foreground">
                Hello, and thank you for taking the time to learn a little about
                me. I&apos;m Marion, and I&apos;ve been supporting individuals
                through their mental health journeys for over a decade.
              </p>

              <p className="text-muted-foreground">
                Based in Southsea, I work with clients across Portsmouth and the
                wider Hampshire area. My practice is built on the belief that
                everyone deserves access to compassionate, professional support
                when life becomes challenging.
              </p>

              <p className="text-muted-foreground">
                I specialise in working with adults navigating ADHD and those
                processing traumatic experiences. Having seen how transformative
                the right support can be, I&apos;m passionate about creating a
                safe space where you can explore your thoughts and feelings
                without judgement.
              </p>

              <div className="flex items-center gap-4 pt-4">
                <Award className="h-8 w-8 text-sage" />
                <div>
                  <p className="font-medium text-foreground">
                    {siteConfig.therapist.qualifications}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Registered Member of BACP
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Approach */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              My Approach to Therapy
            </h2>
            <p className="text-lg text-muted-foreground">
              I work from a person-centred perspective, which means I believe you
              are the expert on your own life. My role is to provide a safe,
              non-judgemental space where you can explore your experiences at your
              own pace.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value) => (
              <Card key={value.title} className="text-center border-border/50">
                <CardContent className="pt-8 pb-6">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-sage/10 flex items-center justify-center">
                    <value.icon className="h-7 w-7 text-sage" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mt-12 bg-cream rounded-2xl p-8">
            <p className="text-muted-foreground mb-4">
              Whether you&apos;re seeking support for ADHD, working through
              trauma, or dealing with anxiety, depression, or relationship
              difficulties, I adapt my approach to meet your individual needs.
            </p>
            <p className="text-muted-foreground">
              I draw on various therapeutic techniques including person-centred
              therapy, trauma-informed approaches, and mindfulness-based
              strategies. Above all, I believe in the importance of the
              therapeutic relationship – feeling safe and understood is the
              foundation for meaningful change.
            </p>
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Qualifications & Training
            </h2>
            <p className="text-lg text-muted-foreground">
              I am committed to providing the highest standard of care through
              continuous professional development and adherence to ethical
              guidelines.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {qualifications.map((qual) => (
              <div
                key={qual.title}
                className="flex items-start gap-3 bg-white rounded-lg p-4"
              >
                <CheckCircle2 className="h-6 w-6 text-sage flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-foreground">{qual.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {qual.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-slate-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-slate-light mb-8 max-w-2xl mx-auto">
            If you&apos;d like to find out more about how I can help, I offer a
            free initial consultation where we can discuss your needs and see if
            we&apos;re a good fit.
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
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
