import { siteConfig } from "@/lib/site-config";

export interface AreaData {
  name: string;
  slug: string;
  distance: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  paragraphs: string[];
}

export const areaContent: Record<string, AreaData> = {
  portsmouth: {
    name: "Portsmouth",
    slug: "portsmouth",
    distance: "based in Southsea",
    metaTitle: "Counselling in Portsmouth | Southsea",
    metaDescription: `Professional counselling in Portsmouth. ${siteConfig.therapist.fullName}, BACP registered counsellor based in Southsea, offering individual and couples therapy for anxiety, depression, trauma and more.`,
    heading: "Counselling in Portsmouth",
    paragraphs: [
      "MM Counselling is based in the heart of Southsea, Portsmouth, offering professional therapy for individuals and couples across the city. Whether you're in the city centre, Old Portsmouth, Fratton, Copnor, or anywhere on Portsea Island, the practice is easy to reach by car, bus, or on foot.",
      `${siteConfig.therapist.fullName} is a BACP registered psychotherapeutic counsellor with experience in anxiety, depression, trauma and PTSD, relationship difficulties, neurodiversity (ADHD and autism), low self-worth, and addiction. Marion's psychodynamic approach explores how past experiences shape present feelings and behaviours, helping you develop deeper self-understanding and lasting change.`,
      "Sessions take place in a comfortable, confidential therapy room in Southsea. Evening appointments are available to fit around work and family commitments, and a free initial consultation is offered so you can ask questions and see whether counselling feels right for you.",
    ],
  },
  southsea: {
    name: "Southsea",
    slug: "southsea",
    distance: "based locally",
    metaTitle: "Counselling in Southsea | Portsmouth",
    metaDescription: `Local counselling in Southsea, Portsmouth. ${siteConfig.therapist.fullName}, BACP registered counsellor offering individual and couples therapy. Free initial consultation available.`,
    heading: "Counselling in Southsea",
    paragraphs: [
      "MM Counselling is based right here in Southsea, making it one of the most convenient options for local residents seeking professional therapy. Whether you live near Albert Road, Palmerston Road, the seafront, or anywhere in Southsea, you're just minutes from the practice.",
      `${siteConfig.therapist.fullName} is a BACP registered psychotherapeutic counsellor offering a warm, non-judgmental space for individuals and couples. Marion works with a wide range of issues including anxiety, panic attacks, depression, trauma, relationship difficulties, occupational stress, and neurodiversity. Her psychodynamic approach helps you understand how past experiences and patterns influence your present life.`,
      "Having a counsellor in your local area means therapy fits more easily into your routine. Sessions are held in a private, comfortable therapy room with evening appointments available. A free initial consultation is offered with no obligation — it's simply a chance to talk about what's brought you to counselling and to see if it feels like the right fit.",
    ],
  },
  gosport: {
    name: "Gosport",
    slug: "gosport",
    distance: "around 20 minutes",
    metaTitle: "Counselling in Gosport | Portsmouth",
    metaDescription: `Professional counselling for Gosport residents. ${siteConfig.therapist.fullName}, BACP registered counsellor based in Southsea, offering individual and couples therapy. Book a free consultation.`,
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
    metaDescription: `Counselling services for Fareham residents. ${siteConfig.therapist.fullName}, BACP registered counsellor in Southsea, offers individual and couples therapy for anxiety, depression, trauma and more.`,
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
    metaDescription: `Counselling for Havant residents. ${siteConfig.therapist.fullName}, BACP registered counsellor in Southsea, Portsmouth. Individual and couples therapy for anxiety, trauma, depression and more.`,
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
    metaDescription: `Counselling services for Waterlooville residents. ${siteConfig.therapist.fullName}, BACP registered counsellor in Southsea. Therapy for anxiety, depression, trauma, couples and more.`,
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
    metaDescription: `Counselling for Chichester area residents. ${siteConfig.therapist.fullName}, BACP registered counsellor in Southsea, Portsmouth. Individual and couples therapy with evening appointments available.`,
    heading: "Counselling for Chichester Area Residents",
    paragraphs: [
      "If you're based in or around Chichester and looking for counselling, MM Counselling is located in Southsea, Portsmouth — around 30 minutes east along the A27. While there are counsellors in Chichester itself, some clients prefer to see a therapist outside their immediate area for added privacy and a fresh perspective.",
      `${siteConfig.therapist.fullName} is a BACP registered psychotherapeutic counsellor offering individual and couples therapy. Marion specialises in a range of areas including anxiety, depression, trauma and PTSD, relationship difficulties, low self-worth, and neurodiversity. Her psychodynamic approach explores how early experiences and relationship patterns influence your present life.`,
      "Sessions are held in a private, comfortable therapy room in Southsea. Evening appointments are available, and a free initial consultation is offered so you can ask any questions and see if counselling feels right for you.",
    ],
  },
};

export const areaSlugs = Object.keys(areaContent);
