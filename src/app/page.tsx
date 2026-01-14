import { HeroSection } from "@/components/home/hero-section";
import { ServicesSection } from "@/components/home/services-section";
import { AboutSection } from "@/components/home/about-section";
import { FeesSection } from "@/components/home/fees-section";
import { CTASection } from "@/components/home/cta-section";
import { siteConfig } from "@/lib/site-config";

// CounsellingService Schema for Local SEO
function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${siteConfig.url}/#business`,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.location.area,
          addressRegion: siteConfig.location.city,
          addressCountry: "GB",
          postalCode: siteConfig.location.postcode,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "50.7823",
          longitude: "-1.0866",
        },
        areaServed: [
          {
            "@type": "City",
            name: "Portsmouth",
          },
          {
            "@type": "City",
            name: "Southsea",
          },
          {
            "@type": "AdministrativeArea",
            name: "Hampshire",
          },
        ],
        priceRange: `£${siteConfig.fees.concession}-£${siteConfig.fees.standard}`,
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
      },
      {
        "@type": "CounselingService",
        "@id": `${siteConfig.url}/#service`,
        name: "MM Counselling Services",
        provider: {
          "@id": `${siteConfig.url}/#business`,
        },
        areaServed: [
          {
            "@type": "City",
            name: "Portsmouth",
          },
          {
            "@type": "City",
            name: "Southsea",
          },
          {
            "@type": "AdministrativeArea",
            name: "Hampshire",
          },
        ],
        serviceType: [
          "ADHD Counselling",
          "Trauma Therapy",
          "Anxiety Counselling",
          "Depression Support",
          "Relationship Counselling",
        ],
        description:
          "Professional counselling services specialising in ADHD support and trauma therapy for adults in Portsmouth, Southsea and Hampshire.",
        offers: {
          "@type": "Offer",
          price: siteConfig.fees.standard,
          priceCurrency: "GBP",
          description: `${siteConfig.fees.sessionLength} counselling session`,
        },
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#therapist`,
        name: siteConfig.therapist.title,
        jobTitle: "Counsellor",
        description: `MBACP registered counsellor with ${siteConfig.therapist.experience} specialising in ADHD and trauma therapy.`,
        worksFor: {
          "@id": `${siteConfig.url}/#business`,
        },
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "Professional Certification",
            name: "MBACP Registered",
          },
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "Diploma",
            name: "Diploma in Counselling",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: {
          "@id": `${siteConfig.url}/#business`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}/#webpage`,
        url: siteConfig.url,
        name: siteConfig.seo.title,
        isPartOf: {
          "@id": `${siteConfig.url}/#website`,
        },
        about: {
          "@id": `${siteConfig.url}/#service`,
        },
        description: siteConfig.seo.description,
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
      <FeesSection />
      <CTASection />
    </>
  );
}
