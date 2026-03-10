import { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for MM Counselling. How we collect, use, and protect your personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-12 bg-white border-b border-border">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl font-serif text-foreground mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: January 2024
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 space-y-8 text-muted-foreground leading-relaxed">
          <div>
            <h2 className="font-serif text-xl text-foreground mb-3">Introduction</h2>
            <p>
              {siteConfig.therapist.fullName}, a self-employed counsellor operating as
              MM Counselling, has established this policy to protect the personal
              data of clients and safeguard their privacy and security.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-foreground mb-3">Information We Collect</h2>
            <p className="mb-3">
              We collect identifying information including names, contact details,
              dates of birth, gender, and occupation. This information is gathered
              to provide counselling services, maintain client records, and
              communicate with clients.
            </p>
            <p>
              Personal information will be used exclusively for its original
              purpose, with explicit consent from clients before using their
              personal data for any new purposes.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-foreground mb-3">Confidentiality</h2>
            <p className="mb-3">
              As a BACP-registered counsellor, Marion adheres to strict
              confidentiality standards. Information shared in counselling sessions
              is confidential, with limited exceptions:
            </p>
            <ul className="space-y-1 ml-4">
              <li>&#8226; Where there is a serious risk of harm to yourself or others</li>
              <li>&#8226; Where required by law (e.g., terrorism, money laundering)</li>
              <li>&#8226; Where disclosure is ordered by a court</li>
            </ul>
            <p className="mt-3">
              Marion would always try to discuss any potential breach of
              confidentiality with you first, wherever possible.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-foreground mb-3">Data Storage and Security</h2>
            <p>
              Client data is stored securely and in compliance with applicable
              data protection laws. Access is restricted to authorised personnel
              only. Session notes are kept in encrypted digital or secure physical
              storage.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-foreground mb-3">Data Retention</h2>
            <p>
              Counselling records are retained for 7 years after the end of
              therapy, in line with BACP recommendations and insurance
              requirements.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-foreground mb-3">Your Rights</h2>
            <p className="mb-3">Under UK data protection law (UK GDPR), you have the right to:</p>
            <ul className="space-y-1 ml-4">
              <li>&#8226; Access the personal information we hold about you</li>
              <li>&#8226; Request correction of inaccurate information</li>
              <li>&#8226; Request deletion of your information (subject to legal requirements)</li>
              <li>&#8226; Object to processing of your information</li>
              <li>&#8226; Request transfer of your information to another provider</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-xl text-foreground mb-3">Cookies</h2>
            <p>
              This website uses cookies for traffic analysis and user experience
              optimisation. Data will be aggregated with all other user data. You
              can control cookies through your browser settings.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-foreground mb-3">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact:
            </p>
            <p className="mt-2">
              {siteConfig.therapist.fullName}
              <br />
              MM Counselling
              <br />
              Email:{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-foreground hover:text-muted-foreground transition-colors border-b border-foreground"
              >
                {siteConfig.contact.email}
              </a>
              <br />
              {siteConfig.location.area}, {siteConfig.location.city},{" "}
              {siteConfig.location.county}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-foreground mb-3">Complaints</h2>
            <p>
              If you are unhappy with how we have handled your personal
              information, you have the right to complain to the Information
              Commissioner&apos;s Office (ICO):{" "}
              <a
                href="https://ico.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-muted-foreground transition-colors border-b border-foreground"
              >
                https://ico.org.uk
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
