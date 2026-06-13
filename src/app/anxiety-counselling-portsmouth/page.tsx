import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { CtaBlock } from "@/components/shared/cta-block";
import {
  graph,
  localBusinessNode,
  serviceNode,
  breadcrumbNode,
  faqNode,
} from "@/lib/schema";

const PATH = "/anxiety-counselling-portsmouth";

export const metadata: Metadata = {
  title: "Anxiety Counselling Portsmouth & Southsea",
  description:
    "Anxiety counselling in Portsmouth and Southsea with Marion Morris, BACP registered. Trauma-informed support for anxiety, panic and constant worry.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Anxiety Counselling in Portsmouth and Southsea | MM Counselling",
    description:
      "Compassionate anxiety counselling in Portsmouth and Southsea. Psychodynamic, trauma-informed support for anxiety, panic and worry with a BACP registered counsellor.",
    type: "website",
    url: `${siteConfig.url}${PATH}`,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Anxiety counselling in Portsmouth and Southsea",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anxiety Counselling in Portsmouth and Southsea",
    description:
      "Compassionate, trauma-informed anxiety counselling in Portsmouth and Southsea with a BACP registered counsellor.",
    images: ["/images/og-image.jpg"],
  },
};

const faqs = [
  {
    question: "How much does anxiety counselling cost in Portsmouth?",
    answer: `Individual sessions are £${siteConfig.fees.individual} for ${siteConfig.fees.sessionLength}. A free introductory call by telephone or Zoom is offered first, so you can ask questions before booking a paid session.`,
  },
  {
    question: "How many sessions will I need for anxiety?",
    answer:
      "There is no fixed number. Some people find a handful of sessions helpful, while others prefer longer-term support to explore the roots of their anxiety. We review how things are going together, and you are always in control of how long we work.",
  },
  {
    question: "Can counselling really help with anxiety?",
    answer:
      "For many people, yes. Counselling offers a space to understand what your anxiety is responding to, to make sense of the patterns that keep it going, and to develop a different relationship with worry and fear over time. It is not a quick fix, but it can bring lasting change.",
  },
  {
    question: "What is a psychodynamic, trauma-informed approach?",
    answer:
      "It means we look gently at how past experiences and early relationships may shape the way anxiety shows up now, while staying mindful of how distressing experiences affect the body and mind. The pace is always led by you, and nothing is forced.",
  },
  {
    question: "Do you offer online or telephone anxiety counselling?",
    answer:
      "Yes. Sessions are available in person at the Southsea practice, or by telephone and Zoom. Remote sessions can feel more comfortable if leaving the house adds to your anxiety, and evening appointments are available.",
  },
  {
    question: "Can counselling help with panic attacks?",
    answer:
      "Yes. Panic attacks can be frightening, but they are not dangerous, and they make sense once we understand what your mind and body are responding to. In counselling we work to reduce the fear of the panic itself and to address what is keeping the alarm system on high alert, so the attacks tend to become less frequent and less overwhelming over time.",
  },
  {
    question: "I can't stop overthinking — can therapy help with that?",
    answer:
      "Overthinking and rumination are very common with anxiety. Counselling offers a space to slow the thinking down, notice the patterns that keep it spinning, and understand what the worry is trying to protect you from. Many people find that as the underlying feelings are understood, the constant mental churn begins to settle.",
  },
  {
    question: "What if my anxiety feels like a crisis?",
    answer:
      "Counselling is not an emergency service. If you are in crisis or worried about your safety, please use the urgent support options listed on this page — including NHS 111, Samaritans on 116 123, or 999 in an emergency.",
  },
];

function structuredData() {
  return graph([
    localBusinessNode(),
    serviceNode({
      name: "Anxiety Counselling",
      description:
        "Anxiety counselling in Portsmouth and Southsea for generalised anxiety, panic attacks, health anxiety, social anxiety and constant worry, using a psychodynamic, trauma-informed approach.",
      serviceType: "Anxiety Counselling",
      path: PATH,
    }),
    breadcrumbNode([
      { name: "Home", path: "" },
      { name: "Anxiety Counselling Portsmouth", path: PATH },
    ]),
    faqNode(faqs),
  ]);
}

export default function AnxietyCounsellingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
      />

      <div className="min-h-screen">
        {/* Intro */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <nav className="text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>Anxiety Counselling</span>
            </nav>

            <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
              Anxiety Counselling in Portsmouth and Southsea
            </h1>

            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Anxiety can be exhausting. It might show up as a racing mind that
                won&apos;t switch off, a tight chest before everyday tasks, sleep
                that won&apos;t come, or a constant sense that something bad is
                about to happen. Whatever shape it takes for you, you don&apos;t
                have to manage it alone — and reaching out is a sign of strength,
                not weakness.
              </p>
              <p>
                I&apos;m {siteConfig.therapist.fullName}, a BACP registered
                psychotherapeutic counsellor based in Southsea, Portsmouth. I
                offer a warm, non-judgemental space to understand your anxiety and
                begin to feel more like yourself again, in person and online.
              </p>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="py-12 md:py-16 bg-[#f9f9f9]">
          <div className="max-w-3xl mx-auto px-6 space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
                Common experiences of anxiety
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Anxiety is one of the most common reasons people seek
                counselling, and it looks different for everyone. You might
                recognise some of these:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>&#8226; Constant worrying or overthinking that feels hard to control</li>
                <li>&#8226; Panic attacks — racing heart, breathlessness, dizziness, dread</li>
                <li>&#8226; Trouble sleeping or a mind that won&apos;t settle at night</li>
                <li>&#8226; Avoiding people, places, or situations that feel overwhelming</li>
                <li>&#8226; Health anxiety, social anxiety, or anxiety tied to work and performance</li>
                <li>&#8226; Feeling on edge, irritable, or unable to relax</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
                How counselling can help
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Anxiety is often trying to protect us from something — but its
                alarm system can become overactive, firing when there&apos;s no
                real danger. In counselling we make space to understand what your
                anxiety is responding to, rather than just fighting the symptoms.
                Over time, this understanding can loosen anxiety&apos;s grip and
                help you feel more steady and in control of your own life.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
                Marion&apos;s psychodynamic, trauma-informed approach
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                I work from a psychodynamic perspective, with training in trauma
                and attachment. This means we gently explore how past experiences
                and early relationships may shape the way anxiety shows up for you
                now, while staying mindful of how distressing experiences affect
                both body and mind. The pace is always led by you. Nothing is
                rushed, and you decide what you&apos;re ready to talk about.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
                What to expect in sessions
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We begin with a free introductory call so you can see whether it
                feels like the right fit. Sessions are{" "}
                {siteConfig.fees.sessionLength} and cost £
                {siteConfig.fees.individual}, and can be weekly, fortnightly, or
                monthly. They take place in a calm, confidential therapy room in
                Southsea ({siteConfig.location.postcode}), or by telephone and
                Zoom — which some people find easier when leaving the house adds
                to their anxiety. You can read more on the{" "}
                <Link
                  href="/sessions-and-fees"
                  className="text-foreground underline underline-offset-4 hover:text-foreground/70 transition-colors"
                >
                  sessions and fees
                </Link>{" "}
                page, or about{" "}
                <Link
                  href="/about"
                  className="text-foreground underline underline-offset-4 hover:text-foreground/70 transition-colors"
                >
                  Marion&apos;s background and training
                </Link>
                .
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
                When anxiety affects self-esteem and relationships
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Anxiety rarely stays in one place. Persistent worry can chip away
                at self-esteem, leaving you second-guessing yourself or feeling
                like you&apos;re never quite enough. It can also spill into your
                closest relationships — when one partner is anxious, the other
                often feels the strain too, and small misunderstandings can
                escalate. We make space for all of this in our work together. If
                anxiety is putting your relationship under pressure, you might also
                find{" "}
                <Link
                  href="/couples-counselling-portsmouth"
                  className="text-foreground underline underline-offset-4 hover:text-foreground/70 transition-colors"
                >
                  couples counselling in Portsmouth
                </Link>{" "}
                helpful, either alongside individual sessions or on its own.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
                Further reading
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                These articles from the blog may resonate if you&apos;re living
                with anxiety:{" "}
                <Link
                  href="/blog/managing-anxiety-cold-wet-dark-days-portsmouth"
                  className="text-foreground underline underline-offset-4 hover:text-foreground/70 transition-colors"
                >
                  Managing anxiety through the cold, wet, dark days
                </Link>{" "}
                and{" "}
                <Link
                  href="/blog/fear-and-anxiety-around-the-threat-of-war"
                  className="text-foreground underline underline-offset-4 hover:text-foreground/70 transition-colors"
                >
                  Fear and anxiety around the threat of war
                </Link>
                . I also see clients for anxiety from across{" "}
                <Link
                  href="/counselling-in-portsmouth"
                  className="text-foreground underline underline-offset-4 hover:text-foreground/70 transition-colors"
                >
                  Portsmouth
                </Link>{" "}
                and{" "}
                <Link
                  href="/counselling-in-southsea"
                  className="text-foreground underline underline-offset-4 hover:text-foreground/70 transition-colors"
                >
                  Southsea
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Urgent help */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <div className="border border-border bg-[#faf9f6] p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-serif text-foreground mb-4">
                If you need urgent help
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Counselling is not a crisis or emergency service. If you are
                struggling to cope right now, or worried about your own safety,
                please reach out to one of these services — they are there to help,
                day or night:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  &#8226; <strong className="text-foreground">In an emergency, call 999</strong>{" "}
                  or go to your nearest A&amp;E.
                </li>
                <li>
                  &#8226; <strong className="text-foreground">NHS 111</strong> — call 111 and
                  select the mental health option for urgent NHS advice.
                </li>
                <li>
                  &#8226; <strong className="text-foreground">Samaritans</strong> — call{" "}
                  <a href="tel:116123" className="text-foreground underline underline-offset-4">
                    116 123
                  </a>{" "}
                  free, any time, to talk to someone.
                </li>
                <li>
                  &#8226; <strong className="text-foreground">Shout</strong> — text{" "}
                  <strong className="text-foreground">SHOUT to 85258</strong> for free,
                  confidential support by text.
                </li>
                <li>
                  &#8226; Your <strong className="text-foreground">GP</strong> can also discuss
                  treatment options, including medication and NHS talking therapies.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 md:py-16 bg-[#f9f9f9]">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-8 text-center">
              Common questions about anxiety counselling
            </h2>
            <div className="space-y-8">
              {faqs.map((item, i) => (
                <div key={i} className="border-b border-border pb-8 last:border-b-0">
                  <h3 className="font-serif text-lg text-foreground mb-3">
                    {item.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaBlock />
      </div>
    </>
  );
}
