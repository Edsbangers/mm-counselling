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

const PATH = "/adhd-counselling-portsmouth";

export const metadata: Metadata = {
  title: "ADHD Counselling Portsmouth & Southsea",
  description:
    "ADHD counselling and support in Portsmouth and Southsea with Marion Morris, BACP registered and ADHD-trained. Help with self-esteem, overwhelm, late diagnosis and relationships.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "ADHD Counselling in Portsmouth and Southsea | MM Counselling",
    description:
      "Warm, ADHD-informed counselling in Portsmouth and Southsea. Support for overwhelm, self-esteem, late diagnosis and relationships with a BACP registered counsellor.",
    type: "website",
    url: `${siteConfig.url}${PATH}`,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ADHD counselling in Portsmouth and Southsea",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ADHD Counselling in Portsmouth and Southsea",
    description:
      "Warm, ADHD-informed counselling in Portsmouth and Southsea with a BACP registered counsellor.",
    images: ["/images/og-image.jpg"],
  },
};

const faqs = [
  {
    question: "How much does ADHD counselling cost in Portsmouth?",
    answer: `Individual sessions are £${siteConfig.fees.individual} for ${siteConfig.fees.sessionLength}. A free introductory call by telephone or Zoom is offered first, so you can ask questions before booking a paid session.`,
  },
  {
    question: "Can you diagnose ADHD or carry out an ADHD assessment?",
    answer:
      "No. Counselling is not a diagnostic or assessment service, and I cannot diagnose ADHD or prescribe medication. A formal diagnosis comes from your GP, an NHS pathway (including Right to Choose), or a private specialist. What I offer is counselling support for the emotional impact of living with ADHD — whether or not you have a formal diagnosis.",
  },
  {
    question: "Can counselling help with ADHD if I'm not taking medication?",
    answer:
      "Yes. Counselling works alongside any path you choose, with or without medication. We focus on the feelings ADHD can bring — overwhelm, frustration, low self-esteem, shame — and on understanding yourself with more compassion, so daily life feels more manageable.",
  },
  {
    question: "I've only just found out I might have ADHD as an adult. Can you help?",
    answer:
      "Absolutely. Many people come to counselling while making sense of a late diagnosis, or while waiting on an assessment. It can stir up grief, anger and relief all at once — re-reading your whole life through a new lens. Counselling offers a space to process that and decide what you want next.",
  },
  {
    question: "Do you offer online or telephone ADHD counselling?",
    answer:
      "Yes. Sessions are available in person at the Southsea practice, or by telephone and Zoom. Some people find remote sessions easier to fit around a busy, full life, and evening appointments are available.",
  },
  {
    question: "What is a psychodynamic, ADHD-informed approach?",
    answer:
      "It means we gently explore how your experiences — including years of coping, masking or being misunderstood — have shaped how you feel about yourself, while staying mindful of how ADHD genuinely affects attention, emotion and energy. The pace is always led by you, and the work is about understanding rather than 'fixing' you.",
  },
];

function structuredData() {
  return graph([
    localBusinessNode(),
    serviceNode({
      name: "ADHD Counselling",
      description:
        "ADHD counselling and emotional support in Portsmouth and Southsea for adults living with ADHD, including late diagnosis, overwhelm, low self-esteem, rejection sensitivity and the impact on relationships, using a psychodynamic, ADHD-informed approach. Counselling is not a diagnostic or assessment service.",
      serviceType: "ADHD Counselling",
      path: PATH,
    }),
    breadcrumbNode([
      { name: "Home", path: "" },
      { name: "ADHD Counselling Portsmouth", path: PATH },
    ]),
    faqNode(faqs),
  ]);
}

export default function AdhdCounsellingPage() {
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
              <span>ADHD Counselling</span>
            </nav>

            <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
              ADHD Counselling in Portsmouth and Southsea
            </h1>

            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Living with ADHD can be exhausting in ways other people don&apos;t
                always see. You might be bright, capable and creative, yet feel as
                though you&apos;re working twice as hard just to keep up — battling
                overwhelm, lost time, forgotten tasks, and a quiet voice that says
                you should be coping better. Whether you&apos;ve had ADHD named
                recently, are waiting on an assessment, or simply recognise
                yourself in the description, you don&apos;t have to make sense of it
                alone.
              </p>
              <p>
                I&apos;m {siteConfig.therapist.fullName}, a BACP registered
                psychotherapeutic counsellor based in Southsea, Portsmouth, with
                ADHD certification training. I offer a warm, non-judgemental space
                to understand how ADHD affects you and to feel more at home in
                yourself, in person and online.
              </p>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="py-12 md:py-16 bg-[#f9f9f9]">
          <div className="max-w-3xl mx-auto px-6 space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
                Common experiences of living with ADHD
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                ADHD looks different for everyone, and it&apos;s about far more
                than attention. You might recognise some of these:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>&#8226; Overwhelm and a sense that everyday life takes more effort than it &apos;should&apos;</li>
                <li>&#8226; Procrastination, lost time, and the &apos;wall of awful&apos; around starting tasks</li>
                <li>&#8226; Emotional intensity — feelings that arrive fast and hit hard</li>
                <li>&#8226; Rejection sensitivity and a deep fear of getting things wrong</li>
                <li>&#8226; Years of masking, and the exhaustion of holding it together</li>
                <li>&#8226; Low self-esteem after a lifetime of &apos;could do better&apos;</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
                How counselling can help
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Counselling for ADHD isn&apos;t about managing a list of symptoms —
                it&apos;s about the feelings underneath. Many people arrive carrying
                years of shame, frustration and self-criticism built up long before
                anyone understood what was really going on. Together we make space
                for that, separate who you are from the struggles you&apos;ve faced,
                and begin to build a kinder, clearer relationship with yourself.
                That shift often makes the practical side of life feel more
                manageable too.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
                Marion&apos;s psychodynamic, ADHD-informed approach
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                I work from a psychodynamic perspective, with ADHD certification
                training. This means we gently explore how your experiences — years
                of coping, masking, or being misunderstood — have shaped the way you
                feel about yourself, while staying mindful of how ADHD genuinely
                affects attention, emotion and energy. The pace is always led by
                you. The aim is never to &apos;fix&apos; you, but to help you
                understand yourself with more compassion.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
                ADHD, self-esteem and relationships
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                ADHD rarely stays in one place. It can wear down self-esteem after
                years of feeling &apos;not enough&apos;, and it often shows up in our
                closest relationships — in missed cues, forgotten plans, or the
                strain of one partner feeling unheard while the other feels
                criticised. If worry and overwhelm are part of the picture, you may
                also find{" "}
                <Link
                  href="/anxiety-counselling-portsmouth"
                  className="text-foreground underline underline-offset-4 hover:text-foreground/70 transition-colors"
                >
                  anxiety counselling in Portsmouth
                </Link>{" "}
                helpful. And if ADHD is putting pressure on your relationship,{" "}
                <Link
                  href="/couples-counselling-portsmouth"
                  className="text-foreground underline underline-offset-4 hover:text-foreground/70 transition-colors"
                >
                  couples counselling in Portsmouth
                </Link>{" "}
                can help you understand each other again.
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
                Zoom. You can read more on the{" "}
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
                . I also see clients from across{" "}
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

        {/* Assessment boundary */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <div className="border border-border bg-[#faf9f6] p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-serif text-foreground mb-4">
                Counselling is not an ADHD assessment
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                It&apos;s important to be clear: I am a counsellor, not a diagnosing
                clinician. Counselling cannot provide an ADHD diagnosis, an
                assessment, or medication. What I offer is support for the
                emotional side of living with ADHD — whether or not you have a
                formal diagnosis. If you are seeking an assessment, these are the
                usual routes:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  &#8226; Speak to your <strong className="text-foreground">GP</strong>, who can refer
                  you for an NHS ADHD assessment.
                </li>
                <li>
                  &#8226; Ask your GP about <strong className="text-foreground">NHS Right to Choose</strong>,
                  which may give you a choice of assessment provider.
                </li>
                <li>
                  &#8226; A <strong className="text-foreground">private specialist</strong> can carry out
                  a formal assessment if you prefer.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 md:py-16 bg-[#f9f9f9]">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-8 text-center">
              Common questions about ADHD counselling
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
