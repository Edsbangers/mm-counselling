import { HeroSection } from "@/components/home/hero-section";
import { ServicesSection } from "@/components/home/services-section";
import { AboutSection } from "@/components/home/about-section";
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
        areaServed: ["Portsmouth", "Southsea", "Hampshire"],
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
      <TestimonialsSection />
      <FeesSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
