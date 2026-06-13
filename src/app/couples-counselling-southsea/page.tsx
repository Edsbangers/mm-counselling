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

const PATH = "/couples-counselling-southsea";

export const metadata: Metadata = {
  title: "Couples Counselling Southsea",
  description:
    "Couples counselling in Southsea with Marion Morris, BACP registered. A local practice in Southsea (PO4) for communication, trust, infidelity recovery and reconnection.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Couples Counselling in Southsea | MM Counselling",
    description:
      "Warm, unbiased couples and relationship counselling in Southsea with a BACP registered counsellor. A local practice in PO4 for communication, trust repair and reconnection.",
    type: "website",
    url: `${siteConfig.url}${PATH}`,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Couples counselling in Southsea",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Couples Counselling in Southsea",
    description:
      "Warm, unbiased couples and relationship counselling in Southsea with a BACP registered counsellor.",
    images: ["/images/og-image.jpg"],
  },
};

const faqs = [
  {
    question: "Where in Southsea is your couples counselling practice?",
    answer: `My practice is based in Southsea (${siteConfig.location.postcode}), so couples counselling here is genuinely local — not a city-centre clinic you have to travel into. Sessions are also available by telephone and Zoom if that suits you better.`,
  },
  {
    question: "How much does couples counselling cost in Southsea?",
    answer: `Couples sessions are £${siteConfig.fees.couples} for ${siteConfig.fees.sessionLength}. A free introductory call by telephone or Zoom is offered first, so you can both ask questions before booking a paid session.`,
  },
  {
    question: "Do you offer evening couples sessions in Southsea?",
    answer:
      "Yes. Evening appointments are available to fit around work and family commitments, in person at the Southsea practice or online.",
  },
  {
    question: "Can couples counselling in Southsea help after an affair?",
    answer:
      "Yes. Many couples come while recovering from infidelity. Counselling offers a calm, unbiased space to understand what happened, process the hurt, and decide together whether and how to rebuild trust — at a pace that feels manageable for both of you.",
  },
  {
    question: "Is this the same as relationship counselling?",
    answer:
      "Yes. Couples counselling and relationship counselling in Southsea describe the same work — focusing on the relationship between you rather than either person individually.",
  },
];

function structuredData() {
  return graph([
    localBusinessNode(),
    serviceNode({
      name: "Couples Counselling in Southsea",
      description:
        "Couples and relationship counselling in Southsea (PO4) for communication difficulties, recurring conflict, trust repair, infidelity recovery and emotional reconnection, with a BACP registered counsellor.",
      serviceType: "Couples Counselling",
      path: PATH,
    }),
    breadcrumbNode([
      { name: "Home", path: "" },
      { name: "Couples Counselling Southsea", path: PATH },
    ]),
    faqNode(faqs),
  ]);
}

export default function CouplesCounsellingSouthseaPage() {
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
              <span>Couples Counselling Southsea</span>
            </nav>

            <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
              Couples Counselling in Southsea
            </h1>

            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                If you and your partner are struggling to reach each other — stuck
                in the same argument, feeling more like housemates than a couple,
                or finding your way back after a betrayal — you don&apos;t have to
                travel far to find support. My counselling practice is based right
                here in Southsea ({siteConfig.location.postcode}), offering a calm,
                unbiased space to be heard and to begin repairing what matters.
              </p>
              <p>
                I&apos;m {siteConfig.therapist.fullName}, a BACP registered
                counsellor with a Certificate in Working with Couples and over
                2,500 hours of one-to-one experience. I work with couples from
                across Southsea, Eastney, and the wider Portsmouth area, in person
                and online.
              </p>
            </div>
          </div>
        </section>

        {/* Local context */}
        <section className="py-12 md:py-16 bg-[#f9f9f9]">
          <div className="max-w-3xl mx-auto px-6 space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
                Couples counselling on your doorstep in Southsea
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Reaching out for couples counselling can feel like a big step, and
                having a local, familiar place to come to makes it easier. The
                practice is a short distance for those living around Southsea,
                Eastney, Milton and Albert Road, with a private, comfortable
                therapy room rather than a busy clinic. If getting to a session in
                person is difficult, telephone and Zoom sessions are always an
                option.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
                What couples counselling can help with
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You don&apos;t need to be in crisis to benefit. Many of the couples
                I see are simply tired of feeling stuck. Counselling can help when
                you are experiencing:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>&#8226; Communication breakdown and feeling unheard</li>
                <li>&#8226; The same arguments repeating without resolution</li>
                <li>&#8226; Loss of trust, including after infidelity</li>
                <li>&#8226; Emotional or physical disconnection and growing apart</li>
                <li>&#8226; Navigating big changes — parenthood, work stress, illness, or loss</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
                A psychodynamic, unbiased approach
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                I work from a psychodynamic perspective, which means we gently
                explore how each of your histories and relationship patterns shape
                what happens between you now. I don&apos;t take sides or hand out
                verdicts — my role is to help you both feel heard and understand
                one another more clearly, so you can respond differently and
                reconnect. You can read more about my full approach on the main{" "}
                <Link
                  href="/couples-counselling-portsmouth"
                  className="text-foreground underline underline-offset-4 hover:text-foreground/70 transition-colors"
                >
                  couples counselling in Portsmouth
                </Link>{" "}
                page.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
                Sessions and getting started
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We begin with a free introductory call so you can both get a sense
                of how I work. Sessions are {siteConfig.fees.sessionLength} and cost
                £{siteConfig.fees.couples}, and can be weekly, fortnightly, or
                monthly. You can read more on the{" "}
                <Link
                  href="/sessions-and-fees"
                  className="text-foreground underline underline-offset-4 hover:text-foreground/70 transition-colors"
                >
                  sessions and fees
                </Link>{" "}
                page, learn more{" "}
                <Link
                  href="/about"
                  className="text-foreground underline underline-offset-4 hover:text-foreground/70 transition-colors"
                >
                  about Marion
                </Link>
                , or explore{" "}
                <Link
                  href="/counselling-in-southsea"
                  className="text-foreground underline underline-offset-4 hover:text-foreground/70 transition-colors"
                >
                  counselling in Southsea
                </Link>{" "}
                more generally.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-8 text-center">
              Common questions about couples counselling in Southsea
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
