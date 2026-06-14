import { siteConfig } from "@/lib/site-config";

/**
 * Centralised JSON-LD builders so every page references the same canonical
 * @id / url / sameAs values. Schema must stay truthful — reviews and ratings
 * come only from siteConfig.testimonials.
 */

const url = siteConfig.url;

export const ID = {
  localBusiness: `${url}/#localbusiness`,
  website: `${url}/#website`,
  therapist: `${url}/#therapist`,
} as const;

export const sameAs = [
  siteConfig.profiles.instagram,
  siteConfig.profiles.bacp,
  siteConfig.profiles.counsellingDirectory,
  siteConfig.profiles.psychologyToday,
  // Add the Google Business Profile share URL here when available, e.g.
  // "https://g.page/r/XXXXXXXXXXXX"
];

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: siteConfig.location.street,
  addressLocality: "Southsea",
  addressRegion: "Hampshire",
  postalCode: siteConfig.location.postcode,
  addressCountry: "GB",
} as const;

const openingHours = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  opens: siteConfig.hours.open,
  closes: siteConfig.hours.close,
} as const;

const aggregateRating = {
  "@type": "AggregateRating",
  ratingValue: 5,
  bestRating: 5,
  reviewCount: siteConfig.testimonials.length,
} as const;

/**
 * The canonical business node. Typed as both ProfessionalService and
 * LocalBusiness so it satisfies local-pack and rich-result requirements.
 */
export function localBusinessNode() {
  return {
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": ID.localBusiness,
    name: "MM-Counselling",
    alternateName: "Marion Morris Counselling",
    image: `${url}/images/og-image.jpg`,
    telephone: "+447864281701",
    email: siteConfig.contact.email,
    url,
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.7811,
      longitude: -1.0856,
    },
    priceRange: "£50-£65",
    currenciesAccepted: "GBP",
    description:
      "Person-centred counselling in Portsmouth and Southsea. BACP registered counsellor offering face-to-face, telephone and online therapy for anxiety, trauma, depression, relationship difficulties, and more.",
    sameAs,
    openingHoursSpecification: openingHours,
    aggregateRating,
    areaServed: siteConfig.serviceAreas.map((a) => ({
      "@type": "City",
      name: a.name,
    })),
  };
}

export function breadcrumbNode(
  items: { name: string; path: string }[],
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${url}${item.path}`,
    })),
  };
}

export function faqNode(faqs: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function serviceNode({
  name,
  description,
  serviceType,
  path,
}: {
  name: string;
  description: string;
  serviceType: string;
  path: string;
}) {
  return {
    "@type": "Service",
    name,
    description,
    serviceType,
    url: `${url}${path}`,
    provider: { "@id": ID.localBusiness },
    areaServed: siteConfig.serviceAreas.map((a) => ({
      "@type": "City",
      name: a.name,
    })),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "GBP",
    },
  };
}

/** Wrap nodes into a complete JSON-LD graph document. */
export function graph(nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
