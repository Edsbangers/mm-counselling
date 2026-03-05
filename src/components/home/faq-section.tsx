export const faqData = [
  {
    question: "What types of counselling does MM-Counselling offer in Portsmouth?",
    answer: "Marion Morris offers individual counselling (\u00a350/session) and couples counselling (\u00a360/session) from her practice in Southsea, Portsmouth. She specialises in anxiety, trauma, depression, relationship difficulties, self-esteem, ADHD, neurodiversity, and LGBTQ+ support.",
  },
  {
    question: "How can I book a counselling appointment in Portsmouth?",
    answer: "You can book by calling 07864 281701, emailing mmcounselling1@gmail.com, or using the contact form on the website. A free introductory phone or Zoom call is offered before your first paid session.",
  },
  {
    question: "Is counselling at MM-Counselling confidential?",
    answer: "Yes. Marion is a BACP-registered counsellor and follows strict confidentiality guidelines. All sessions are conducted in a safe, non-judgmental space.",
  },
  {
    question: "Do you offer online or phone counselling in Portsmouth?",
    answer: "Yes. Sessions are available in-person at the Southsea (PO4) practice, or via telephone and Zoom for clients who prefer remote support.",
  },
  {
    question: "What are the session fees and cancellation policy?",
    answer: "Individual sessions are \u00a350 and couples sessions are \u00a360. Sessions are 50 minutes. 24 hours notice is required for cancellations, and payment is due 24 hours before each appointment.",
  },
  {
    question: "How does MM-Counselling compare to other counselling services in Portsmouth?",
    answer: "MM-Counselling offers a highly personalised, psychodynamic approach with strong client feedback. Marion has specialist training in trauma, attachment, couples work, and neurodiversity \u2014 and offers a free introductory call so you can see if it\u2019s the right fit.",
  },
  {
    question: "What if I don\u2019t know what to say in my first session?",
    answer: "That\u2019s completely okay, and more common than you might think. There\u2019s no script to follow. My role is to create a space where you feel comfortable enough to share at your own pace. We start wherever feels right for you \u2014 even if that\u2019s just telling me you\u2019re not sure where to start.",
  },
  {
    question: "Do I need a referral from my GP to see a counsellor?",
    answer: "No, you don\u2019t need a referral. You can contact me directly. Many people self-refer and that\u2019s perfectly fine. If you\u2019d like to talk first before committing, I offer a free introductory call.",
  },
  {
    question: "Is counselling right for me? My problems might not be \u2018big enough\u2019.",
    answer: "There\u2019s no threshold you need to reach before you \u2018deserve\u2019 support. If something is affecting your wellbeing, your happiness, or how you relate to others \u2014 that matters. Counselling is for anyone who wants to understand themselves better, not just people in crisis.",
  },
  {
    question: "How long will I need counselling for?",
    answer: "That depends entirely on you and what you\u2019re working through. Some people find a few sessions helpful, others benefit from longer-term support. We\u2019ll talk about this together, review as we go, and you\u2019re always in control of how long we work together.",
  },
];

export function FAQSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Short, factual answers about counselling services in Portsmouth.
          </p>
        </div>

        <div className="space-y-8">
          {faqData.map((item, index) => (
            <div key={index} className="border-b border-border pb-8 last:border-b-0">
              <h3 className="font-serif text-lg text-foreground mb-3">
                {item.question}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
