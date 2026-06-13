import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import {
  couplesAreaContent,
  couplesAreaSlugs,
  type CouplesAreaData,
} from "@/lib/couples-area-content";
import { CtaBlock } from "@/components/shared/cta-block";
import {
  graph,
  localBusinessNode,
  serviceNode,
  breadcrumbNode,
  faqNode,
} from "@/lib/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return couplesAreaSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = couplesAreaContent[slug];
  if (!data) return {};

  const path = `/couples-counselling-${slug}`;
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: `${data.metaTitle} | MM Counselling`,
      description: data.metaDescription,
      type: "website",
      url: `${siteConfig.url}${path}`,
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: data.metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.metaTitle,
      description: data.metaDescription,
      images: ["/images/og-image.jpg"],
    },
  };
}

function structuredData(data: CouplesAreaData) {
  const path = `/couples-counselling-${data.slug}`;
  return graph([
    localBusinessNode(),
    serviceNode({
      name: `Couples Counselling in ${data.name}`,
      description: `Couples and relationship counselling for ${data.name} for communication difficulties, recurring conflict, trust repair, infidelity recovery and emotional reconnection, with a BACP registered counsellor. In-person sessions in Southsea plus telephone and Zoom.`,
      serviceType: "Couples Counselling",
      path,
    }),
    breadcrumbNode([
      { name: "Home", path: "" },
      { name: `Couples Counselling ${data.name}`, path },
    ]),
    faqNode(data.faqs),
  ]);
}

export default async function CouplesAreaPage({ params }: Props) {
  const { slug } = await params;
  const data = couplesAreaContent[slug];

  if (!data) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(data)) }}
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
              <span>Couples Counselling {data.name}</span>
            </nav>

            <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
              Couples Counselling in {data.name}
            </h1>

            <div className="space-y-5 text-muted-foreground leading-relaxed">
              {data.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Local context + shared service detail */}
        <section className="py-12 md:py-16 bg-[#f9f9f9]">
          <div className="max-w-3xl mx-auto px-6 space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
                {data.localHeading}
              </h2>
              <div className="space-y-4">
                {data.localBody.map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
                What couples counselling can help with
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You don&apos;t need to be in crisis to benefit. Counselling can help
                when you are experiencing:
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
                I work from a psychodynamic perspective, gently exploring how each
                of your histories and relationship patterns shape what happens
                between you now. I don&apos;t take sides or hand out verdicts — my
                role is to help you both feel heard and understand one another more
                clearly. You can read more about my full approach on the main{" "}
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
                  href={`/counselling-in-${data.slug}`}
                  className="text-foreground underline underline-offset-4 hover:text-foreground/70 transition-colors"
                >
                  counselling in {data.name}
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
              Common questions about couples counselling in {data.name}
            </h2>
            <div className="space-y-8">
              {data.faqs.map((item, i) => (
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
