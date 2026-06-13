import { siteConfig } from "@/lib/site-config";

const couplesFee = siteConfig.fees.couples;
const sessionLength = siteConfig.fees.sessionLength;
const postcode = siteConfig.location.postcode;

export interface CouplesAreaFaq {
  question: string;
  answer: string;
}

export interface CouplesAreaData {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  /** Two intro paragraphs under the H1. */
  intro: string[];
  localHeading: string;
  /** One or two paragraphs giving the area-specific travel/access angle. */
  localBody: string[];
  faqs: CouplesAreaFaq[];
}

/**
 * Dedicated couples-counselling landing pages for the towns Marion serves.
 * Portsmouth and Southsea have their own bespoke pages; these five reuse the
 * shared template at /couples-area/[slug] (rewritten to /couples-counselling-<slug>).
 * Copy is intentionally unique per town to avoid thin/duplicate content.
 */
export const couplesAreaContent: Record<string, CouplesAreaData> = {
  gosport: {
    slug: "gosport",
    name: "Gosport",
    metaTitle: "Couples Counselling Gosport",
    metaDescription:
      "Couples counselling for Gosport with Marion Morris, BACP registered. In-person sessions in nearby Southsea, plus telephone and Zoom for communication, trust and reconnection.",
    intro: [
      "Sitting across the water from Portsmouth, Gosport has a character all of its own — but when a relationship is struggling, the harbour can feel like it puts good support out of reach. It doesn't have to. Whether you and your partner keep circling the same argument, feel more like flatmates than a couple, or are trying to recover after a betrayal, help is closer than you think.",
      "I'm Marion Morris, a BACP registered counsellor with a Certificate in Working with Couples and over 2,500 hours of one-to-one experience. I see couples from Gosport, Lee-on-the-Solent, Alverstoke, Bridgemary and Hardway — in person at my Southsea practice, or by telephone and Zoom.",
    ],
    localHeading: "Getting to couples counselling from Gosport",
    localBody: [
      "Many Gosport couples find the Gosport Ferry the easiest route — it reaches Portsmouth Harbour in a few minutes, a short distance from the Southsea practice, with no need to drive the long way round the harbour.",
      "If travelling together for a session is difficult around work and family, online sessions by Zoom or telephone work just as well, and are a popular choice for couples on the Gosport peninsula. Evening appointments are also available.",
    ],
    faqs: [
      {
        question: "Do we have to travel to Portsmouth for couples counselling?",
        answer: `Not necessarily. In-person sessions are held at my Southsea practice (${postcode}), which many Gosport couples reach quickly via the Gosport Ferry. If that's awkward, telephone and Zoom sessions are available and just as effective.`,
      },
      {
        question: "How much does couples counselling cost?",
        answer: `Couples sessions are £${couplesFee} for ${sessionLength}, with a free introductory call by telephone or Zoom first so you can both ask questions before booking.`,
      },
      {
        question: "Can online couples counselling really work?",
        answer:
          "Yes. Many couples find online sessions just as helpful as being in the room, and they remove the stress of both partners getting to the same place at the same time. We'll find whatever format works best for you.",
      },
      {
        question: "Can you help us rebuild after an affair?",
        answer:
          "Yes. Infidelity recovery is something I work with often. Counselling offers a calm, unbiased space to understand what happened, sit with the hurt, and decide together whether and how to rebuild trust.",
      },
    ],
  },
  fareham: {
    slug: "fareham",
    name: "Fareham",
    metaTitle: "Couples Counselling Fareham",
    metaDescription:
      "Couples counselling for Fareham with Marion Morris, BACP registered. Evening and online sessions to fit busy lives, plus in-person support in nearby Southsea.",
    intro: [
      "Life in and around Fareham moves quickly — long commutes, demanding jobs, and family routines that leave little room for each other. It's no surprise that many couples drift, or find the same tensions surfacing again and again. If that sounds familiar, couples counselling offers a calm, unhurried space to reconnect.",
      "I'm Marion Morris, a BACP registered counsellor with a Certificate in Working with Couples and over 2,500 hours of experience. I work with couples from Fareham, Portchester, Titchfield, Stubbington and Locks Heath, in person and online.",
    ],
    localHeading: "Couples counselling that fits around Fareham life",
    localBody: [
      "Fareham sits well-connected between Portsmouth and Southampton by the M27 and rail, and my Southsea practice is a straightforward drive for in-person sessions.",
      "For couples juggling work and childcare, evening appointments and online sessions by Zoom or telephone make it far easier to find a time you can both commit to — without one of you rushing in late and frazzled.",
    ],
    faqs: [
      {
        question: "Do you offer evening couples sessions?",
        answer:
          "Yes. Evening appointments are available specifically to help busy couples find a time that works around work and family commitments, in person or online.",
      },
      {
        question: "Where are in-person sessions held?",
        answer: `In-person couples sessions take place at my practice in Southsea (${postcode}), an easy drive from Fareham. Telephone and Zoom sessions are also available if travelling is difficult.`,
      },
      {
        question: "How much does couples counselling cost?",
        answer: `Couples sessions are £${couplesFee} for ${sessionLength}. A free introductory call is offered first so you can both see whether it feels like the right fit.`,
      },
      {
        question: "We keep having the same argument — can counselling help?",
        answer:
          "Yes. When the same conflict keeps returning, it usually means the real issue underneath hasn't yet been put into words. Together we slow those moments down and understand what each of you is really asking for, so you can respond differently.",
      },
    ],
  },
  havant: {
    slug: "havant",
    name: "Havant",
    metaTitle: "Couples Counselling Havant",
    metaDescription:
      "Couples counselling for Havant with Marion Morris, BACP registered. In-person sessions a short drive away in Southsea, plus telephone and Zoom for relationship support.",
    intro: [
      "When a relationship is under strain, the distance between you and your partner can feel far greater than the few miles from Havant into Portsmouth. Whether you're dealing with communication breakdown, a loss of trust, or simply growing apart, couples counselling gives you both a space to be heard and to begin finding your way back to each other.",
      "I'm Marion Morris, a BACP registered counsellor with a Certificate in Working with Couples and over 2,500 hours of one-to-one experience. I see couples from Havant, Emsworth, Hayling Island, Leigh Park and Bedhampton, in person and online.",
    ],
    localHeading: "Couples counselling a short journey from Havant",
    localBody: [
      "The A27 makes my Southsea practice an easy journey from Havant and the surrounding villages for in-person sessions in a private, comfortable therapy room.",
      "If getting there together is tricky, telephone and Zoom sessions are always an option and work well for couples across the Havant area, with evening appointments available too.",
    ],
    faqs: [
      {
        question: "How far is the practice from Havant?",
        answer: `In-person couples sessions are held at my Southsea practice (${postcode}), a short drive from Havant via the A27. Telephone and Zoom sessions are also available if you'd prefer to meet online.`,
      },
      {
        question: "How much does couples counselling cost?",
        answer: `Couples sessions are £${couplesFee} for ${sessionLength}, with a free introductory call first so you can both ask any questions before committing.`,
      },
      {
        question: "Do both partners need to come to every session?",
        answer:
          "Couples counselling works best when both partners attend together, as the focus is on the relationship between you. Occasionally an individual session can help, and we can discuss what suits your situation during the introductory call.",
      },
      {
        question: "Is this the same as relationship counselling?",
        answer:
          "Yes. Couples counselling and relationship counselling describe the same work — focusing on the relationship between you rather than on either person individually.",
      },
    ],
  },
  waterlooville: {
    slug: "waterlooville",
    name: "Waterlooville",
    metaTitle: "Couples Counselling Waterlooville",
    metaDescription:
      "Couples counselling for Waterlooville with Marion Morris, BACP registered. In-person sessions in Southsea plus telephone and Zoom for communication, trust and reconnection.",
    intro: [
      "For couples in and around Waterlooville, the pressures of family life, work and a busy household can quietly wear away at a relationship until you barely feel like a team any more. Couples counselling offers an unbiased, judgement-free space to slow down, understand what's happening between you, and rebuild a closer connection.",
      "I'm Marion Morris, a BACP registered counsellor with a Certificate in Working with Couples and over 2,500 hours of experience. I work with couples from Waterlooville, Cowplain, Denmead, Horndean and Purbrook, in person and online.",
    ],
    localHeading: "Couples counselling within easy reach of Waterlooville",
    localBody: [
      "The A3(M) gives Waterlooville couples a quick route down to my Southsea practice for in-person sessions in a calm, private setting.",
      "For families with packed schedules, online sessions by Zoom or telephone make it much easier to find a slot you can both keep, and evening appointments are available to fit around work and children.",
    ],
    faqs: [
      {
        question: "Where would our sessions take place?",
        answer: `In-person couples sessions are held at my practice in Southsea (${postcode}), a quick journey from Waterlooville via the A3(M). Telephone and Zoom sessions are also available.`,
      },
      {
        question: "How much does couples counselling cost?",
        answer: `Couples sessions are £${couplesFee} for ${sessionLength}. A free introductory call by phone or Zoom is offered first, with no obligation to continue.`,
      },
      {
        question: "We've grown apart rather than had a big falling-out. Is counselling still for us?",
        answer:
          "Absolutely. You don't need to be in crisis to benefit. Many couples I see have simply drifted under the weight of daily life, and counselling helps you turn back towards each other and rediscover what drew you together.",
      },
      {
        question: "Do you offer evening or online couples sessions?",
        answer:
          "Yes. Evening appointments and online sessions by Zoom or telephone are both available, which many Waterlooville couples find easier to fit around work and family.",
      },
    ],
  },
  chichester: {
    slug: "chichester",
    name: "Chichester",
    metaTitle: "Couples Counselling Chichester",
    metaDescription:
      "Couples counselling for Chichester with Marion Morris, BACP registered. Convenient online sessions plus in-person support in Southsea for relationship difficulties.",
    intro: [
      "Chichester may be a little further along the coast, but a relationship in difficulty deserves good support wherever you live. Whether you and your partner are struggling to communicate, working to rebuild trust, or feeling the distance grow between you, couples counselling offers a warm, unbiased space to be heard and to reconnect.",
      "I'm Marion Morris, a BACP registered counsellor with a Certificate in Working with Couples and over 2,500 hours of one-to-one experience. I support couples from Chichester, Bosham, Selsey and the surrounding West Sussex area, online and in person.",
    ],
    localHeading: "Couples counselling for Chichester — online or in person",
    localBody: [
      "For couples in Chichester, online sessions by Zoom or telephone are often the most convenient option, fitting around work and family without a long journey — and they're every bit as effective as meeting in the room.",
      "If you'd prefer to meet in person, my practice in Southsea is a manageable drive along the A27, with evening appointments available.",
    ],
    faqs: [
      {
        question: "Do you offer online couples counselling for Chichester couples?",
        answer:
          "Yes. Online sessions by Zoom or telephone are a popular choice for Chichester couples, removing the need to travel while remaining just as effective as in-person work.",
      },
      {
        question: "Can we still come in person?",
        answer: `Of course. In-person couples sessions are held at my practice in Southsea (${postcode}), a manageable drive from Chichester along the A27.`,
      },
      {
        question: "How much does couples counselling cost?",
        answer: `Couples sessions are £${couplesFee} for ${sessionLength}, with a free introductory call first so you can both ask questions before booking.`,
      },
      {
        question: "Can couples counselling help after an affair?",
        answer:
          "Yes. Many couples come to counselling while recovering from infidelity. It offers a calm, unbiased space to understand what happened, process the hurt, and decide together whether and how to rebuild.",
      },
    ],
  },
};

export const couplesAreaSlugs = Object.keys(couplesAreaContent);
