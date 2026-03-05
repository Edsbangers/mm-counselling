import { HeroSection } from "@/components/home/hero-section";
import { ServicesSection } from "@/components/home/services-section";
import { AboutSection } from "@/components/home/about-section";
import { TherapyRoomSection } from "@/components/home/therapy-room-section";
import { FeesSection } from "@/components/home/fees-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FAQSection, faqData } from "@/components/home/faq-section";
import { CTASection } from "@/components/home/cta-section";
import { siteConfig } from "@/lib/site-config";

function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${siteConfig.url}/#localbusiness`,
        name: "MM-Counselling",
        image: `${siteConfig.url}/logo.png`,
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Southsea, Portsmouth",
          addressRegion: "Hampshire",
          postalCode: siteConfig.location.postcode,
          addressCountry: "GB",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "50.7823",
          longitude: "-1.0866",
        },
        url: siteConfig.url,
        priceRange: "££",
        description:
          "Empathic and approachable counselling services in Portsmouth and Southsea. BACP registered. Individual and couples therapy.",
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
        review: siteConfig.testimonials.map((t) => ({
          "@type": "Review",
          author: { "@type": "Person", name: t.attribution },
          reviewRating: {
            "@type": "Rating",
            ratingValue: 5,
            bestRating: 5,
          },
          reviewBody: t.text,
        })),
        areaServed: [
          ...siteConfig.serviceAreas.map((a) => ({
            "@type": "City",
            name: a.name,
          })),
          {
            "@type": "GeoCircle",
            geoMidpoint: {
              "@type": "GeoCoordinates",
              latitude: "50.7823",
              longitude: "-1.0866",
            },
            geoRadius: "20 mi",
          },
        ],
        founder: {
          "@type": "Person",
          name: siteConfig.therapist.fullName,
          jobTitle: "BACP Registered Psychotherapeutic Counsellor",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Counselling Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Individual Counselling Session",
                description: "50-minute individual therapy session",
              },
              price: "50.00",
              priceCurrency: "GBP",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "50.00",
                priceCurrency: "GBP",
                unitCode: "HUR",
                unitText: "per 50-minute session",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Couples Counselling Session",
                description: "50-minute couples therapy session",
              },
              price: "60.00",
              priceCurrency: "GBP",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "60.00",
                priceCurrency: "GBP",
                unitCode: "HUR",
                unitText: "per 50-minute session",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: "MM-Counselling",
        publisher: {
          "@id": `${siteConfig.url}/#localbusiness`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteConfig.url}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/#faq`,
        mainEntity: faqData.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#therapist`,
        name: siteConfig.therapist.fullName,
        jobTitle: "BACP Registered Psychotherapeutic Counsellor",
        worksFor: {
          "@id": `${siteConfig.url}/#localbusiness`,
        },
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "Professional Certification",
            name: "BACP Registered Counsellor",
          },
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "Diploma",
            name: "Accredited Diploma in Psychotherapeutic Counselling",
          },
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "Certificate",
            name: "Certificate in Working with Couples",
          },
        ],
      },
    ],
  };
}

export default function HomePage() {
  const structuredData = generateStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <TherapyRoomSection />
      <TestimonialsSection />
      <FeesSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
