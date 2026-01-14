export const siteConfig = {
  name: "MM Counselling",
  description: "Professional counselling services in Southsea, Portsmouth. Specialising in ADHD support and trauma therapy across Hampshire.",
  url: "https://mmcounselling.co.uk",

  // Contact & Location
  location: {
    area: "Southsea",
    city: "Portsmouth",
    county: "Hampshire",
    country: "United Kingdom",
    postcode: "PO5",
  },

  // Therapist Info
  therapist: {
    name: "Marion",
    title: "Marion Mitchell",
    qualifications: "MBACP, Dip. Counselling",
    experience: "10+ years",
  },

  // Services & Specialisms
  specialisms: [
    {
      name: "ADHD Support",
      slug: "adhd",
      description: "Specialist counselling for adults with ADHD, helping you understand your neurodivergent mind and develop effective coping strategies.",
      keywords: ["ADHD counselling Portsmouth", "ADHD therapy Hampshire", "adult ADHD support Southsea"],
    },
    {
      name: "Trauma Therapy",
      slug: "trauma",
      description: "Compassionate trauma-informed therapy using evidence-based approaches to help you process difficult experiences and move forward.",
      keywords: ["trauma counselling Portsmouth", "trauma therapy Hampshire", "PTSD support Southsea"],
    },
    {
      name: "Anxiety & Depression",
      slug: "anxiety-depression",
      description: "Understanding and managing anxiety and depression through person-centred counselling approaches.",
      keywords: ["anxiety counselling Portsmouth", "depression therapy Hampshire", "mental health support Southsea"],
    },
    {
      name: "Relationship Issues",
      slug: "relationships",
      description: "Support for navigating relationship difficulties, communication challenges, and personal boundaries.",
      keywords: ["relationship counselling Portsmouth", "couples therapy Hampshire"],
    },
  ],

  // Fees
  fees: {
    initial: 50,
    standard: 55,
    concession: 45,
    currency: "GBP",
    sessionLength: "50 minutes",
  },

  // Contact
  contact: {
    email: "marion@mmcounselling.co.uk",
    phone: "07XXX XXXXXX",
  },

  // Social
  social: {
    linkedin: "https://linkedin.com/in/mmcounselling",
  },

  // SEO
  seo: {
    title: "MM Counselling | ADHD & Trauma Specialist | Southsea, Portsmouth",
    description: "Professional counselling in Southsea, Portsmouth. Marion offers specialist support for ADHD, trauma, anxiety and depression. MBACP registered.",
    keywords: [
      "counselling Southsea",
      "counsellor Portsmouth",
      "ADHD counselling Hampshire",
      "trauma therapy Portsmouth",
      "anxiety counselling Southsea",
      "depression support Portsmouth",
      "MBACP counsellor Hampshire",
    ],
  },
} as const;

export type Specialism = typeof siteConfig.specialisms[number];
