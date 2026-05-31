import { siteConfig } from "@/lib/site-config";

export interface AreaSection {
  heading: string;
  body: string[];
}

export interface AreaFaq {
  question: string;
  answer: string;
}

export interface AreaData {
  name: string;
  slug: string;
  distance: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  paragraphs: string[];
  /** Optional rich sections rendered after the intro (priority local pages). */
  sections?: AreaSection[];
  /** Optional FAQs rendered with FAQPage schema. */
  faqs?: AreaFaq[];
}

export const areaContent: Record<string, AreaData> = {
  portsmouth: {
    name: "Portsmouth",
    slug: "portsmouth",
    distance: "based in Southsea",
    metaTitle: "Counselling in Portsmouth | Southsea",
    metaDescription: "BACP-registered counselling in Portsmouth and Southsea for anxiety, trauma, depression, relationships and couples support.",
    heading: "Counselling in Portsmouth",
    paragraphs: [
      "MM Counselling is based in the heart of Southsea, Portsmouth, offering professional therapy for individuals and couples across the city. Whether you're in the city centre, Old Portsmouth, Fratton, Copnor, or anywhere on Portsea Island, the practice is easy to reach by car, bus, or on foot.",
      `${siteConfig.therapist.fullName} is a BACP registered psychotherapeutic counsellor with experience in anxiety, depression, trauma and PTSD, relationship difficulties, neurodiversity (ADHD and autism), low self-worth, and addiction. Marion's psychodynamic approach explores how past experiences shape present feelings and behaviours, helping you develop deeper self-understanding and lasting change.`,
      "Sessions take place in a comfortable, confidential therapy room in Southsea. Evening appointments are available to fit around work and family commitments, and a free initial consultation is offered so you can ask questions and see whether counselling feels right for you.",
    ],
    sections: [
      {
        heading: "Getting to the practice from across Portsmouth",
        body: [
          "The practice is based in Southsea on Portsea Island, making it straightforward to reach from anywhere in Portsmouth. From the city centre, Fratton, Copnor, North End, Hilsea, or Old Portsmouth you can usually be here within ten to fifteen minutes by car. The A2030 and A288 bring you into Southsea, and there is local on-street parking close by, with some bays requiring a permit or paid ticket at busier times.",
          "If you prefer not to drive, several bus routes run through Southsea, and Fratton and Portsmouth & Southsea railway stations are both a short bus ride or walk away. The room is on a quiet residential street, so it's an easy and discreet place to come for your sessions.",
        ],
      },
      {
        heading: "How I can help — services for Portsmouth residents",
        body: [
          "I offer counselling for individuals and couples across a wide range of difficulties. Many people come for support with anxiety, low mood and depression, the effects of trauma, relationship difficulties, low self-worth, stress, or neurodiversity such as ADHD and autism. Whatever has brought you here, the aim is the same: a calm, confidential space to be heard without judgement.",
          "If you're looking for support with a specific issue, you may find my dedicated pages on anxiety counselling and couples counselling helpful. We can talk through what you're experiencing during your free introductory call and decide together how best to work.",
        ],
      },
      {
        heading: "Who counselling is for",
        body: [
          "You don't need to be in crisis to benefit from counselling, and there's no threshold of difficulty you need to reach before your feelings count. If something is weighing on you — whether that's a recent change, a long-standing pattern, or simply a sense that things aren't quite right — counselling offers room to understand it. People come at all stages of life and from all walks of life across Portsmouth.",
        ],
      },
      {
        heading: "In-person, telephone and online sessions",
        body: [
          "Most clients see me in person at the Southsea practice, but sessions are also available by telephone and Zoom. Remote sessions can be a good fit if you have a busy schedule, live a little further out, or simply feel more comfortable talking from home. Whichever format you choose, sessions are 50 minutes and the same confidential, considered approach applies.",
        ],
      },
    ],
    faqs: [
      {
        question: "Where exactly is the counselling practice in Portsmouth?",
        answer:
          "The practice is in Southsea, on Portsea Island in Portsmouth (PO4). The full address and directions are shared when you book. It's easy to reach from across the city by car or bus, with local street parking nearby.",
      },
      {
        question: "Is there parking near the practice?",
        answer:
          "Yes, there is on-street parking close to the practice. Some bays require a permit or paid ticket at busier times, and there are alternative parking options within a short walk.",
      },
      {
        question: "How much do sessions cost?",
        answer:
          "Individual sessions are £50 and couples sessions are £60, each lasting 50 minutes. A free introductory call by phone or Zoom is offered before your first paid session.",
      },
      {
        question: "Do I need a GP referral to start counselling in Portsmouth?",
        answer:
          "No. You can contact me directly to arrange a free introductory call — there's no need for a referral from your GP or anyone else.",
      },
    ],
  },
  southsea: {
    name: "Southsea",
    slug: "southsea",
    distance: "based locally",
    metaTitle: "Counselling in Southsea | Portsmouth",
    metaDescription: "Local counselling in Southsea with Marion Morris, offering individual and couples therapy in person, online or by phone.",
    heading: "Counselling in Southsea",
    paragraphs: [
      "MM Counselling is based right here in Southsea, making it one of the most convenient options for local residents seeking professional therapy. Whether you live near Albert Road, Palmerston Road, the seafront, or anywhere in Southsea, you're just minutes from the practice.",
      `${siteConfig.therapist.fullName} is a BACP registered psychotherapeutic counsellor offering a warm, non-judgmental space for individuals and couples. Marion works with a wide range of issues including anxiety, panic attacks, depression, trauma, relationship difficulties, occupational stress, and neurodiversity. Her psychodynamic approach helps you understand how past experiences and patterns influence your present life.`,
      "Having a counsellor in your local area means therapy fits more easily into your routine. Sessions are held in a private, comfortable therapy room with evening appointments available. A free initial consultation is offered with no obligation — it's simply a chance to talk about what's brought you to counselling and to see if it feels like the right fit.",
    ],
    sections: [
      {
        heading: "A local practice, right on your doorstep",
        body: [
          "Being based in Southsea means many of my clients are able to walk or cycle to their sessions. Whether you live near Albert Road, Palmerston Road, Eastney, the seafront, or out towards Fratton, the practice is only a short journey away. For a counsellor, this kind of local familiarity matters — it removes one more barrier to getting started, and makes it easier to keep sessions a steady, regular part of your week.",
          "There is on-street parking close to the practice for those who drive, with some bays requiring a permit or ticket at busier times, and frequent local bus routes pass through Southsea. The therapy room is on a quiet residential street, offering a calm and discreet setting.",
        ],
      },
      {
        heading: "Support for a wide range of difficulties",
        body: [
          "I work with individuals and couples on issues including anxiety, panic attacks, depression and low mood, trauma, relationship difficulties, occupational stress, low self-worth, and neurodiversity such as ADHD and autism. Sessions are warm and non-judgemental, and shaped around what you need rather than a fixed programme.",
          "If you have a particular concern in mind, you might like to read more about anxiety counselling or couples and relationship counselling. We can also talk it through together during your free introductory call.",
        ],
      },
      {
        heading: "Who I work with",
        body: [
          "Counselling is for anyone who wants to feel more like themselves, not only people in crisis. Clients in Southsea come at every stage of life — students, working people, parents, and those navigating retirement or later-life change. If something is affecting your wellbeing or your relationships, that's reason enough to reach out.",
        ],
      },
      {
        heading: "Flexible in-person, telephone and online sessions",
        body: [
          "As well as face-to-face sessions in Southsea, I offer counselling by telephone and Zoom. This flexibility means therapy can fit around work, caring responsibilities, or days when getting out feels harder. Sessions are 50 minutes, and we can arrange them weekly, fortnightly, or monthly to suit you.",
        ],
      },
    ],
    faqs: [
      {
        question: "Whereabouts in Southsea is the practice?",
        answer:
          "The practice is in a quiet residential part of Southsea (PO4), within easy reach of Albert Road, Palmerston Road and the seafront. Full directions are shared when you book your first session.",
      },
      {
        question: "Can I have sessions online if I live in Southsea?",
        answer:
          "Yes. Although the practice is local, many Southsea clients choose telephone or Zoom sessions for convenience. In-person and remote sessions follow the same confidential, considered approach.",
      },
      {
        question: "How much does counselling cost in Southsea?",
        answer:
          "Individual sessions are £50 and couples sessions are £60, each lasting 50 minutes, with a free introductory call beforehand.",
      },
      {
        question: "Are evening appointments available?",
        answer:
          "Yes. Evening appointments are available to fit around work and family commitments — we can find a time that works for you when you get in touch.",
      },
    ],
  },
  gosport: {
    name: "Gosport",
    slug: "gosport",
    distance: "around 20 minutes",
    metaTitle: "Counselling in Gosport | Portsmouth",
    metaDescription: "Counselling for Gosport residents with Marion Morris in Southsea, offering individual and couples therapy with a free intro call.",
    heading: "Counselling for Gosport Residents",
    paragraphs: [
      "If you're looking for a counsellor near Gosport, MM Counselling is based just across the harbour in Southsea, Portsmouth — around 20 minutes by car via the A32 or a short trip on the Gosport Ferry followed by a brief bus ride.",
      `${siteConfig.therapist.fullName} is a BACP registered psychotherapeutic counsellor offering a warm, empathic space for individuals and couples from Gosport and the surrounding areas. Whether you're dealing with anxiety, depression, relationship difficulties, trauma, or simply feel that something isn't quite right, counselling can help you make sense of what you're experiencing.`,
      "Sessions take place in a comfortable, confidential therapy room in Southsea. Evening appointments are available to fit around work and family commitments. If you'd like to find out more, you're welcome to book a free initial consultation to see whether counselling feels right for you.",
    ],
  },
  fareham: {
    name: "Fareham",
    slug: "fareham",
    distance: "around 20 minutes",
    metaTitle: "Counselling in Fareham | Portsmouth",
    metaDescription: "Counselling for Fareham residents, including support for anxiety, trauma, depression, self-esteem and relationships.",
    heading: "Counselling for Fareham Residents",
    paragraphs: [
      "MM Counselling serves clients from Fareham and the surrounding area. Based in Southsea, Portsmouth, the practice is around 20 minutes from Fareham by car along the M27 or A27, with good transport links making it an easy journey.",
      `${siteConfig.therapist.fullName} provides professional, person-centred counselling in a safe and confidential setting. With experience in areas including anxiety, depression, trauma, relationship difficulties, neurodiversity and low self-worth, Marion works with each client to understand their unique situation and support meaningful change.`,
      "Whether you're going through a difficult period or want to explore longer-standing patterns, counselling offers a space to be heard without judgement. Evening appointments are available, and a free initial consultation is offered so you can decide if counselling is the right step for you.",
    ],
  },
  havant: {
    name: "Havant",
    slug: "havant",
    distance: "around 15 minutes",
    metaTitle: "Counselling in Havant | Portsmouth",
    metaDescription: "Counselling for Havant residents with a BACP-registered Southsea counsellor offering in-person, online and phone sessions.",
    heading: "Counselling for Havant Residents",
    paragraphs: [
      "If you live in Havant or the surrounding area and are looking for professional counselling support, MM Counselling is conveniently located in Southsea, Portsmouth — around 15 minutes by car along the A2030 or A27.",
      `${siteConfig.therapist.fullName} is a BACP registered psychotherapeutic counsellor who works with individuals and couples facing a wide range of challenges, from anxiety and depression to trauma, relationship difficulties, and occupational stress. Marion's psychodynamic approach looks at how past experiences shape present feelings and behaviours, helping you develop deeper self-understanding.`,
      "Sessions are held in a comfortable, private therapy room in Southsea, with evening appointments available. A free initial consultation is offered to help you decide whether counselling is the right fit. There's no pressure — just an opportunity to talk about what's on your mind.",
    ],
  },
  waterlooville: {
    name: "Waterlooville",
    slug: "waterlooville",
    distance: "around 20 minutes",
    metaTitle: "Counselling in Waterlooville | Portsmouth",
    metaDescription: "Counselling for Waterlooville residents, with individual and couples sessions from Marion Morris in Southsea.",
    heading: "Counselling for Waterlooville Residents",
    paragraphs: [
      "MM Counselling offers professional therapy for individuals and couples from Waterlooville and the surrounding area. The practice is based in Southsea, Portsmouth, around 20 minutes south by car via the A3 or B2150.",
      `${siteConfig.therapist.fullName} is a BACP registered counsellor with experience across a broad range of issues including anxiety, panic attacks, depression, trauma, addiction, relationship difficulties, and neurodiversity (ADHD and autism). Marion's warm, empathic approach creates a space where you can explore what's troubling you at your own pace.`,
      "If you've been thinking about counselling but aren't sure where to start, a free initial consultation is available with no obligation. Sessions take place in a confidential, comfortable setting in Southsea, with evening appointments to suit your schedule.",
    ],
  },
  chichester: {
    name: "Chichester",
    slug: "chichester",
    distance: "around 30 minutes",
    metaTitle: "Counselling near Chichester | Portsmouth",
    metaDescription: "Counselling for Chichester area residents with Marion Morris, offering individual and couples therapy from Southsea and online.",
    heading: "Counselling for Chichester Area Residents",
    paragraphs: [
      "If you're based in or around Chichester and looking for counselling, MM Counselling is located in Southsea, Portsmouth — around 30 minutes east along the A27. While there are counsellors in Chichester itself, some clients prefer to see a therapist outside their immediate area for added privacy and a fresh perspective.",
      `${siteConfig.therapist.fullName} is a BACP registered psychotherapeutic counsellor offering individual and couples therapy. Marion specialises in a range of areas including anxiety, depression, trauma and PTSD, relationship difficulties, low self-worth, and neurodiversity. Her psychodynamic approach explores how early experiences and relationship patterns influence your present life.`,
      "Sessions are held in a private, comfortable therapy room in Southsea. Evening appointments are available, and a free initial consultation is offered so you can ask any questions and see if counselling feels right for you.",
    ],
  },
};

export const areaSlugs = Object.keys(areaContent);
