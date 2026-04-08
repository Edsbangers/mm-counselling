import { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { ContactForm } from "./contact-form";
import { ContactTracking } from "./contact-tracking";

export const metadata: Metadata = {
  title: "Contact | Book a Therapy Appointment",
  description:
    "Get in touch to book a counselling session in Portsmouth or online. Free introductory consultation available. Based in Southsea, serving Hampshire.",
  alternates: { canonical: "/contact" },
};

function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        name: "Contact MM Counselling",
        description: "Book a counselling appointment in Portsmouth. Free introductory consultation available.",
        mainEntity: {
          "@id": `${siteConfig.url}/#localbusiness`,
        },
        url: `${siteConfig.url}/contact`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Contact", item: `${siteConfig.url}/contact` },
        ],
      },
    ],
  };
}

export default function ContactPage() {
  const structuredData = generateStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            Book Your Therapy Appointment in Portsmouth
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Ready to take the first step? I offer a free introductory
            consultation where you can discuss your needs and see if it&apos;s a
            good fit. There&apos;s no obligation to continue.
          </p>
        </div>
      </section>

      {/* Prominent Phone Section */}
      <section className="py-8 md:py-10 bg-[#faf9f6]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-muted-foreground mb-2">Prefer to talk?</p>
          <ContactTracking />
          <p className="text-xs text-muted-foreground mt-2">
            Leave a message and Marion will call you back
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-[#f9f9f9]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-serif text-foreground mb-3">
                Send a Message
              </h2>

              {/* Trust Signals */}
              <ul className="text-sm text-muted-foreground space-y-1.5 mb-5">
                <li>&#10003; BACP Registered Counsellor</li>
                <li>&#10003; No obligation &mdash; just a conversation</li>
                <li>&#10003; I aim to respond within 24 hours</li>
                <li>&#10003; Everything you share is confidential</li>
              </ul>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Taking this step takes courage, and I want you to know
                there&apos;s absolutely no pressure. You can ask questions,
                share what&apos;s on your mind, or simply see if it feels right.
              </p>

              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-serif text-foreground mb-6">
                Contact Information
              </h2>

              <div className="space-y-6 mb-8">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="text-foreground hover:text-muted-foreground transition-colors"
                  >
                    {siteConfig.contact.phone}
                  </a>
                  <p className="text-xs text-muted-foreground mt-1">
                    Leave a message and Marion will call back
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="text-foreground">
                    {siteConfig.contact.email}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Or use the form to get a quicker response
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <p className="text-foreground">
                    {siteConfig.location.area}, {siteConfig.location.city}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {siteConfig.location.county}, {siteConfig.location.postcode}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Sessions Available</p>
                  <p className="text-foreground">In-Person, Telephone &amp; Zoom</p>
                </div>
              </div>

              {/* What to Expect */}
              <div className="bg-white p-6 border border-border">
                <h3 className="font-serif text-lg text-foreground mb-3">
                  What to Expect
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  When you get in touch, Marion will arrange a free introductory
                  consultation where you can:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>&#8226; Discuss what brings you to counselling</li>
                  <li>&#8226; Answer any questions you have</li>
                  <li>&#8226; See if you&apos;re a good fit for working together</li>
                  <li>&#8226; Arrange your first session if you&apos;d like to proceed</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-3">
                  All contact is completely confidential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
