import { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for MM Counselling. How we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-warm-white to-cream py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: January 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-slate">
            <h2>Introduction</h2>
            <p>
              MM Counselling (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;)
              is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, and safeguard your personal
              information when you use our website or counselling services.
            </p>

            <h2>Information We Collect</h2>
            <h3>Information you provide directly</h3>
            <ul>
              <li>
                <strong>Contact information:</strong> Name, email address, phone
                number when you contact us or book an appointment
              </li>
              <li>
                <strong>Session information:</strong> Notes and records from
                counselling sessions (kept confidentially)
              </li>
              <li>
                <strong>Website enquiries:</strong> Any information you provide
                through our contact form
              </li>
            </ul>

            <h3>Information collected automatically</h3>
            <ul>
              <li>
                <strong>Website analytics:</strong> We may use cookies and
                similar technologies to understand how visitors use our website
              </li>
              <li>
                <strong>Chat interactions:</strong> If you use our website chat
                feature, your messages may be processed to provide responses
              </li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use your personal information to:</p>
            <ul>
              <li>Respond to your enquiries and provide counselling services</li>
              <li>Schedule and manage appointments</li>
              <li>Maintain clinical records as required by professional standards</li>
              <li>Improve our website and services</li>
              <li>Comply with legal and professional obligations</li>
            </ul>

            <h2>Confidentiality</h2>
            <p>
              As a BACP-registered counsellor, I adhere to strict confidentiality
              standards. Information shared in counselling sessions is
              confidential, with limited exceptions:
            </p>
            <ul>
              <li>Where there is a serious risk of harm to yourself or others</li>
              <li>Where required by law (e.g., terrorism, money laundering)</li>
              <li>Where disclosure is ordered by a court</li>
            </ul>
            <p>
              I would always try to discuss any potential breach of
              confidentiality with you first, wherever possible.
            </p>

            <h2>Data Storage and Security</h2>
            <p>
              Your personal information is stored securely. Session notes are kept
              in encrypted digital or secure physical storage. We use appropriate
              technical and organisational measures to protect your data against
              unauthorised access, alteration, or destruction.
            </p>

            <h2>Data Retention</h2>
            <p>
              Counselling records are retained for 7 years after the end of
              therapy, in line with BACP recommendations and insurance
              requirements. Website enquiry data is retained for as long as
              necessary to respond to your query and for our legitimate business
              interests.
            </p>

            <h2>Your Rights</h2>
            <p>Under UK data protection law (UK GDPR), you have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information (subject to legal requirements)</li>
              <li>Object to processing of your information</li>
              <li>Request transfer of your information to another provider</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the details
              below.
            </p>

            <h2>Third-Party Services</h2>
            <p>
              Our website may use third-party services for analytics, hosting, and
              the chat feature. These services have their own privacy policies and
              may process data in accordance with their terms.
            </p>

            <h2>Cookies</h2>
            <p>
              Our website uses cookies to improve your experience. You can control
              cookies through your browser settings. Disabling cookies may affect
              some website functionality.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will
              be posted on this page with an updated revision date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or how we handle
              your personal information, please contact:
            </p>
            <p>
              {siteConfig.therapist.title}
              <br />
              MM Counselling
              <br />
              Email:{" "}
              <a href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
              <br />
              {siteConfig.location.area}, {siteConfig.location.city},{" "}
              {siteConfig.location.county}
            </p>

            <h2>Complaints</h2>
            <p>
              If you are unhappy with how we have handled your personal
              information, you have the right to complain to the Information
              Commissioner&apos;s Office (ICO):
            </p>
            <p>
              <a
                href="https://ico.org.uk"
                target="_blank"
                rel="noopener noreferrer"
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
