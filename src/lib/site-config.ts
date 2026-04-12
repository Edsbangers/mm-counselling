export const siteConfig = {
  name: "MM Counselling",
  description: "Empathic and approachable counselling services in Portsmouth and Southsea, providing clients with professional support for anxiety, trauma, depression, relationship difficulties and more.",
  url: "https://www.mm-counselling.co.uk",

  // Contact & Location
  location: {
    street: "66 Collins Road",
    area: "Southsea",
    city: "Portsmouth",
    county: "Hampshire",
    country: "United Kingdom",
    postcode: "PO4 9NZ",
  },

  // Therapist Info
  therapist: {
    name: "Marion",
    fullName: "Marion Morris",
    qualifications: "BACP Registered, Accredited Diploma in Psychotherapeutic Counselling",
    approach: "Psychodynamic",
    certifications: [
      "BACP Accredited Diploma in Psychotherapeutic Counselling (Psychodynamic)",
      "Certificate in Working with Couples",
      "ADHD Certification Training",
      "Trauma and Attachment Training",
    ],
  },

  // Services & Specialisms
  specialisms: [
    {
      name: "Individual Counselling",
      slug: "individuals",
      description: "A non-judgmental space to explore your thoughts and emotions, examining relationship patterns and generational cycles to help break unhelpful behaviours.",
      keywords: ["counselling Portsmouth", "therapist Portsmouth", "individual therapy Portsmouth"],
    },
    {
      name: "Couples Counselling",
      slug: "couples",
      description: "An unbiased space to work through relationship ruptures towards repair, including infidelity recovery and trust restoration.",
      keywords: ["couples counselling Portsmouth", "relationship therapy Portsmouth", "couples therapy Hampshire"],
    },
    {
      name: "Trauma & PTSD",
      slug: "trauma",
      description: "Compassionate trauma-informed therapy to help you process difficult experiences, including abuse, PTSD, and attachment difficulties.",
      keywords: ["trauma counselling Portsmouth", "PTSD therapy Hampshire", "trauma support Southsea"],
    },
    {
      name: "Anxiety & Depression",
      slug: "anxiety-depression",
      description: "Support for managing anxiety, panic attacks, depression, low self-worth, and occupational stress through person-centred counselling.",
      keywords: ["anxiety counselling Portsmouth", "depression therapy Hampshire", "mental health support Southsea"],
    },
  ],

  // Additional areas of expertise from the About page
  expertise: [
    "Neurodiversity (Autism, ADHD)",
    "Panic Attacks & Depression",
    "Trauma & Abuse",
    "Addictions",
    "Low Self-Worth",
    "Occupational Stress",
    "OCD",
    "Relationship Difficulties",
    "LGBTQ+ Support",
    "Suicidal Ideation",
  ],

  // Fees
  fees: {
    individual: 50,
    couples: 60,
    currency: "GBP",
    sessionLength: "50 minutes",
    cancellationNotice: "24 hours",
    freeConsultation: true,
  },

  // Contact
  contact: {
    email: "mmcounselling1@gmail.com",
    phone: "07864 281701",
  },

  // Hours
  hours: {
    days: "Monday to Friday",
    open: "09:00",
    close: "20:00",
    note: "Evening appointments available",
  },

  // Service Areas
  serviceAreas: [
    { name: "Portsmouth", slug: "portsmouth" },
    { name: "Southsea", slug: "southsea" },
    { name: "Gosport", slug: "gosport" },
    { name: "Fareham", slug: "fareham" },
    { name: "Havant", slug: "havant" },
    { name: "Waterlooville", slug: "waterlooville" },
    { name: "Chichester", slug: "chichester" },
  ],

  // Social
  social: {
    instagram: "https://www.instagram.com/mmcounselling1",
  },

  // Testimonials from the GoDaddy site
  testimonials: [
    {
      text: "I'm happier than I've ever been, and I am learning new skills to help overcome when I feel anxious.",
      attribution: "S.M., Portsmouth",
    },
    {
      text: "I felt emotionally safe and was able to open up in ways I hadn't before.",
      attribution: "R.T., Southsea",
    },
    {
      text: "Cost-effective mental health support that has genuinely changed my life.",
      attribution: "J.W., Gosport",
    },
    {
      text: "After just a few sessions, I noticed a real shift in how I see myself.",
      attribution: "L.K., Portsmouth",
    },
  ],

  // SEO / AEO
  seo: {
    title: "MM-Counselling | Empathic Counselling Services in Portsmouth",
    description: "Book a therapy appointment with MM-Counselling in Portsmouth. Professional, approachable counselling support tailored to your needs. BACP registered.",
    keywords: [
      "Portsmouth counselling",
      "counselling in Portsmouth",
      "therapist Portsmouth",
      "counselling services Portsmouth",
      "mental health support Portsmouth",
      "therapy appointments Portsmouth",
      "empathic counselling Portsmouth",
      "book therapy session Portsmouth",
      "couples counselling Portsmouth",
      "local counselling support",
    ],
  },
} as const;

export type Specialism = typeof siteConfig.specialisms[number];
