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
