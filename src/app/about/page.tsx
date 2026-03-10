import { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { CtaBlock } from "@/components/shared/cta-block";

export const metadata: Metadata = {
  title: "About Marion Morris | BACP Counsellor Portsmouth",
  description:
    "Meet Marion Morris, a BACP-registered psychotherapeutic counsellor based in Southsea, Portsmouth. Specialist training in trauma, attachment, couples work, and neurodiversity.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Marion's headshot */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/marion-headshot.jpg"
                alt="Marion Morris - BACP Registered Counsellor in Portsmouth"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Content - Marion's preferred bio */}
            <div className="space-y-5">
              <h1 className="text-3xl md:text-4xl font-serif text-foreground">
                About MM Counselling
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                I provide a compassionate, confidential, and safe space for
                individuals and couples to navigate life&apos;s challenges. Whether
                you are feeling weighed down by anxiety, depression, or the impact
                of trauma, you don&apos;t have to walk through it alone.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">For Individuals</strong> &mdash; I
                work collaboratively with you to rebuild self-esteem, process the
                pain of past relationships, and untangle the roots of generational
                trauma so you can move forward with clarity and confidence.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">For Couples</strong> &mdash; I
                help partners identify and break negative relationship cycles.
                Together, we will work to improve communication, rebuild trust, and
                foster a healthier, more secure connection.
              </p>
              <p className="text-muted-foreground leading-relaxed italic">
                Healing is a journey, and taking the first step takes courage.
                Reach out today to schedule a call.
              </p>

              {/* BACP Logo */}
              <div className="pt-2">
                <Image
                  src="/images/bacp-logo.png"
                  alt="BACP Registered Member 388689 - Accredited Register"
                  width={200}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16 md:py-24 bg-[#f9f9f9]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-6 text-center">
            Approach to Therapy
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I work from a psychodynamic perspective, exploring how past
              experiences and unconscious processes influence present behaviour
              and relationships. I aim to help you look at and work
              through patterns and behaviours to potentially break the cycle.
            </p>
            <p>
              For individuals, I address anxiety, trauma, and self-esteem
              challenges, offering a non-judgmental space to explore thoughts and
              emotions, examining relationship patterns and generational cycles.
            </p>
            <p>
              For couples, I provide an unbiased space to work through
              ruptures towards repair, including infidelity recovery and trust
              restoration.
            </p>
          </div>
        </div>
      </section>

      {/* Therapy Room */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-8 text-center">
            The Therapy Room
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            My therapy room is designed to feel comfortable and safe &mdash; a
            space where you can relax, reflect, and begin your journey towards
            healing.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/therapy-room-1.jpg"
                alt="Marion's counselling room in Southsea - a comfortable, welcoming therapeutic space"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/therapy-room-3.webp"
                alt="The therapy room with natural light, stained glass windows and comfortable seating"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/therapy-room-2.jpg"
                alt="Detail of the therapy room - Things I Can Control cushion in a cosy setting"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="py-16 md:py-24 bg-[#f9f9f9]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-8 text-center">
            Qualifications &amp; Training
          </h2>
          <ul className="space-y-4">
            {siteConfig.therapist.certifications.map((cert, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-muted-foreground mt-1">&#8226;</span>
                <span className="text-muted-foreground">{cert}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 border-t border-border pt-8">
            <h3 className="font-serif text-lg text-foreground mb-4">
              Areas of Experience
            </h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {siteConfig.expertise.map((area, index) => (
                <p key={index} className="text-sm text-muted-foreground">
                  &#8226; {area}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBlock />
    </div>
  );
}
