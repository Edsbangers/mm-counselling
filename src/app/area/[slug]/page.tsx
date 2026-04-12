import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { areaContent, areaSlugs } from "@/lib/area-content";
import { CtaBlock } from "@/components/shared/cta-block";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return areaSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = areaContent[slug];
  if (!data) return {};

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: `/counselling-in-${slug}` },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      type: "website",
    },
  };
}

const areaGeoCoordinates: Record<string, { latitude: number; longitude: number }> = {
  portsmouth: { latitude: 50.8198, longitude: -1.0880 },
  southsea: { latitude: 50.7811, longitude: -1.0856 },
  gosport: { latitude: 50.7948, longitude: -1.1243 },
  fareham: { latitude: 50.8521, longitude: -1.1784 },
  havant: { latitude: 50.8518, longitude: -0.9847 },
  waterlooville: { latitude: 50.8808, longitude: -1.0305 },
  chichester: { latitude: 50.8365, longitude: -0.7792 },
};

function generateStructuredData(areaName: string, slug: string) {
  const geo = areaGeoCoordinates[slug] || areaGeoCoordinates.portsmouth;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#localbusiness`,
        name: "MM-Counselling",
        alternateName: "Marion Morris Counselling",
        image: `${siteConfig.url}/images/og-image.jpg`,
        telephone: "+447864281701",
        email: siteConfig.contact.email,
        url: siteConfig.url,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.location.street,
          addressLocality: "Southsea",
          postalCode: siteConfig.location.postcode,
          addressRegion: "Hampshire",
          addressCountry: "GB",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 50.7811,
          longitude: -1.0856,
        },
        priceRange: "\u00a350-\u00a360",
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: siteConfig.hours.open,
          closes: siteConfig.hours.close,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: 5,
          bestRating: 5,
          reviewCount: siteConfig.testimonials.length,
        },
        areaServed: {
          "@type": "City",
          name: areaName,
          geo: {
            "@type": "GeoCoordinates",
            latitude: geo.latitude,
            longitude: geo.longitude,
          },
        },
      },
      {
        "@type": "Service",
        name: `Counselling in ${areaName}`,
        description: `Professional counselling services for ${areaName} residents, provided by ${siteConfig.therapist.fullName}, BACP registered counsellor.`,
        provider: {
          "@id": `${siteConfig.url}/#localbusiness`,
        },
        areaServed: {
          "@type": "City",
          name: areaName,
          geo: {
            "@type": "GeoCoordinates",
            latitude: geo.latitude,
            longitude: geo.longitude,
          },
        },
        serviceType: "Counselling",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: `Counselling in ${areaName}`,
            item: `${siteConfig.url}/counselling-in-${slug}`,
          },
        ],
      },
    ],
  };
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const data = areaContent[slug];

  if (!data) notFound();

  const structuredData = generateStructuredData(data.name, data.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <nav className="text-sm text-muted-foreground mb-8">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>Counselling in {data.name}</span>
            </nav>

            <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-8">
              {data.heading}
            </h1>

            <div className="space-y-5">
              {data.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Specialisms */}
        <section className="py-16 md:py-24 bg-[#f9f9f9]">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-8 text-center">
              How I Can Help
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {siteConfig.specialisms.map((specialism) => (
                <div
                  key={specialism.slug}
                  className="bg-white p-6 border border-border"
                >
                  <h3 className="font-serif text-lg text-foreground mb-2">
                    {specialism.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {specialism.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Marion */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-6 text-center">
              About {siteConfig.therapist.name}
            </h2>
            <p className="text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto mb-4">
              {siteConfig.therapist.fullName} is a BACP registered
              psychotherapeutic counsellor based in Southsea, Portsmouth.
              With qualifications including an Accredited Diploma in
              Psychotherapeutic Counselling, a Certificate in Working with
              Couples, and specialist training in trauma, attachment and ADHD,
              Marion brings a breadth of experience to her practice.
            </p>
            <p className="text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto">
              Sessions cost {"\u00A3"}{siteConfig.fees.individual} for individuals
              and {"\u00A3"}{siteConfig.fees.couples} for couples ({siteConfig.fees.sessionLength}).
              A free initial consultation is available.
            </p>
          </div>
        </section>

        {/* Learn More */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-xl font-serif text-foreground mb-6 text-center">
              Learn More
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              >
                Learn more about Marion
              </Link>
              <Link
                href="/sessions-and-fees"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              >
                View sessions and fees
              </Link>
              <Link
                href="/blog"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              >
                Read our latest articles
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </section>

        <CtaBlock />
      </div>
    </>
  );
}
