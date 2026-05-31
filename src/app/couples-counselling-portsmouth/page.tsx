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

const PATH = "/couples-counselling-portsmouth";

export const metadata: Metadata = {
  title: "Couples Counselling Portsmouth & Southsea",
  description:
    "Couples counselling in Portsmouth and Southsea with Marion Morris, BACP registered. Help with communication, trust, infidelity recovery and reconnection.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Couples Counselling in Portsmouth and Southsea | MM Counselling",
    description:
      "Warm, unbiased couples and relationship counselling in Portsmouth and Southsea. Communication, trust repair and reconnection with a BACP registered counsellor.",
    type: "website",
    url: `${siteConfig.url}${PATH}`,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Couples counselling in Portsmouth and Southsea",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Couples Counselling in Portsmouth and Southsea",
    description:
      "Warm, unbiased couples and relationship counselling in Portsmouth and Southsea with a BACP registered counsellor.",
    images: ["/images/og-image.jpg"],
  },
};

const faqs = [
  {
    question: "How much does couples counselling cost in Portsmouth?",
    answer: `Couples sessions are £${siteConfig.fees.couples} for ${siteConfig.fees.sessionLength}. A free introductory call by telephone or Zoom is offered first, so you can both ask questions before booking a paid session.`,
  },
  {
    question: "Do both partners need to attend every session?",
    answer:
      "Couples counselling works best when both partners attend together, as the focus is on the relationship between you. Occasionally an individual session can be helpful, and we can discuss what suits your situation during the introductory call.",
  },
  {
    question: "Can couples counselling help after an affair?",
    answer:
      "Yes. Many couples come to counselling while recovering from infidelity. It offers a calm, unbiased space to understand what happened, process the hurt, and decide together whether and how to rebuild trust — at a pace that feels manageable for both of you.",
  },
  {
    question: "What if we argue during the session?",
    answer:
      "That is completely normal and often useful. Part of my role is to help conversations stay safe and productive, so that patterns you get stuck in at home can be slowed down and understood rather than escalating.",
  },
  {
    question: "Do you offer online or evening couples sessions?",
    answer:
      "Yes. Sessions are available in person at the Southsea practice, or by telephone and Zoom if that is easier for your schedules. Evening appointments are available to fit around work and family commitments.",
  },
  {
    question: "What if we are not sure whether to stay together?",
    answer:
      "Counselling is not about pushing you in any particular direction. It is a space to understand your relationship more clearly so that whatever you decide — to rebuild, or to separate respectfully — you do so with greater understanding and less blame.",
  },
];

function structuredData() {
  return graph([
    localBusinessNode(),
    serviceNode({
      name: "Couples Counselling",
      description:
        "Couples and relationship counselling in Portsmouth and Southsea for communication difficulties, recurring conflict, trust repair, infidelity recovery and emotional reconnection.",
      serviceType: "Couples Counselling",
      path: PATH,
    }),
    breadcrumbNode([
      { name: "Home", path: "" },
      { name: "Couples Counselling Portsmouth", path: PATH },
    ]),
    faqNode(faqs),
  ]);
}

export default function CouplesCounsellingPage() {
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
              <span>Couples Counselling</span>
            </nav>

            <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
              Couples Counselling in Portsmouth and Southsea
            </h1>

            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Relationships ask a lot of us, and even loving partnerships go
                through times when connection feels harder to reach. If you and
                your partner keep having the same argument, feel more like
                housemates than a couple, or are trying to find your way back to
                each other after a betrayal, couples counselling offers a calm,
                unbiased space to be heard and to begin repairing what matters.
              </p>
              <p>
                I&apos;m {siteConfig.therapist.fullName}, a{" "}
                {siteConfig.therapist.qualifications.split(",")[0]} counsellor
                based in Southsea, Portsmouth, with a Certificate in Working with
                Couples. I work with partners from across Portsmouth, Southsea,
                and the wider Hampshire area, in person and online.
              </p>
            </div>
          </div>
        </section>

        {/* Who it helps */}
        <section className="py-12 md:py-16 bg-[#f9f9f9]">
          <div className="max-w-3xl mx-auto px-6 space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
                Who couples counselling is for
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Couples come to counselling at every stage of a relationship —
                dating, living together, married, or rebuilding after a
                separation. You don&apos;t need to be in crisis to benefit. Many
                of the couples I see are simply tired of feeling stuck and want
                to understand each other better. Counselling can help when you
                are experiencing:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>&#8226; Communication breakdown and feeling unheard</li>
                <li>&#8226; The same arguments repeating without resolution</li>
                <li>&#8226; Loss of trust, including after infidelity</li>
                <li>&#8226; Emotional or physical disconnection and growing apart</li>
                <li>&#8226; Navigating big changes — parenthood, work stress, illness, or loss</li>
                <li>&#8226; Difficulty talking about difficult subjects without it escalating</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
                When communication breaks down
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Most couples don&apos;t struggle because they care too little —
                they struggle because the way they try to connect has stopped
                working. Conversations turn into criticism, defensiveness, or
                silence, and both partners end up feeling alone. Together we slow
                these moments down to notice what each of you is really asking
                for underneath the frustration, so you can hear one another again.
                You may find this article helpful:{" "}
                <Link
                  href="/blog/are-you-really-listening-communication-in-relationships"
                  className="text-foreground underline underline-offset-4 hover:text-foreground/70 transition-colors"
                >
                  Are You Really Listening? How Communication Can Make or Break Your Relationship
                </Link>
                .
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
                Recurring arguments and difficult conversations
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                When the same conflict keeps coming back, it&apos;s usually a
                sign that the real issue underneath hasn&apos;t yet been put into
                words. My approach is psychodynamic, which means we gently
                explore how each of your histories and relationship patterns
                shape what happens between you now. Understanding those patterns
                makes it possible to respond differently, and to have the
                conversations you&apos;ve been avoiding in a way that feels safer.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
                Rebuilding trust and recovering from infidelity
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Few things shake a relationship like a breach of trust.
                Infidelity recovery takes time, and there is no single right way
                through it. Counselling provides an unbiased space to understand
                what happened, to make room for the hurt and anger without it
                overwhelming you, and to decide together whether and how to
                rebuild. For couples who choose to stay together, this work can
                become the foundation of a more honest and secure connection.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
                Reconnecting after emotional distance
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Sometimes nothing dramatic has happened — you&apos;ve simply
                drifted. Work, parenting, and daily life can quietly erode the
                closeness you once took for granted. Counselling helps you turn
                back towards each other, rediscover what drew you together, and
                build small, repeatable ways of staying connected.
              </p>
            </div>
          </div>
        </section>

        {/* First session */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
              What the first session is like
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Before your first paid session, I offer a free introductory call
              so you can both get a sense of how I work and ask any questions.
              The first full session is unhurried. There&apos;s no pressure to
              share more than feels comfortable. We&apos;ll talk about what has
              brought you to counselling, what each of you hopes for, and how we
              might work together. Sessions are {siteConfig.fees.sessionLength}{" "}
              and cost £{siteConfig.fees.couples}, and can be weekly,
              fortnightly, or monthly depending on what suits you. You can read
              more on the{" "}
              <Link
                href="/sessions-and-fees"
                className="text-foreground underline underline-offset-4 hover:text-foreground/70 transition-colors"
              >
                sessions and fees
              </Link>{" "}
              page.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Sessions take place in a private, comfortable therapy room in
              Southsea ({siteConfig.location.postcode}), or by telephone and Zoom
              if that works better for you. I see couples from across{" "}
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
              , and the surrounding Hampshire area. You can also{" "}
              <Link
                href="/about"
                className="text-foreground underline underline-offset-4 hover:text-foreground/70 transition-colors"
              >
                read more about Marion
              </Link>{" "}
              and her training.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 md:py-16 bg-[#f9f9f9]">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-8 text-center">
              Common questions about couples counselling
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
