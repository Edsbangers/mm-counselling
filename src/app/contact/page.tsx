import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact | Book a Counselling Session",
  description:
    "Get in touch to book a counselling session in Portsmouth or online. Free initial consultation available. Based in Southsea, serving Hampshire.",
};

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
    description: "I aim to respond within 24 hours",
  },
  {
    icon: Phone,
    title: "Phone",
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone}`,
    description: "Leave a message and I'll call back",
  },
  {
    icon: MapPin,
    title: "Location",
    value: `${siteConfig.location.area}, ${siteConfig.location.city}`,
    href: null,
    description: "Hampshire, UK",
  },
  {
    icon: Clock,
    title: "Hours",
    value: "Mon-Fri, 9am-6pm",
    href: null,
    description: "Evening slots available",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-warm-white to-cream py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground">
              Ready to take the first step? I offer a free initial consultation
              where we can discuss your needs and see if we&apos;re a good fit.
              There&apos;s no obligation to continue.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Send a Message
              </h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Contact Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {contactMethods.map((method) => (
                  <Card key={method.title} className="border-border/50">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-sage/10 flex items-center justify-center">
                          <method.icon className="h-5 w-5 text-sage" />
                        </div>
                        <CardTitle className="text-base">{method.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {method.href ? (
                        <a
                          href={method.href}
                          className="font-medium text-foreground hover:text-sage transition-colors"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className="font-medium text-foreground">{method.value}</p>
                      )}
                      <p className="text-sm text-muted-foreground mt-1">
                        {method.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* What to Expect */}
              <Card className="bg-cream border-0">
                <CardHeader>
                  <CardTitle>What to Expect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    When you get in touch, I&apos;ll arrange a free initial
                    consultation (usually 15-20 minutes) where we can:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-sage font-bold">•</span>
                      Discuss what brings you to counselling
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sage font-bold">•</span>
                      Answer any questions you have
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sage font-bold">•</span>
                      See if we&apos;re a good fit for working together
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sage font-bold">•</span>
                      Arrange your first session if you&apos;d like to proceed
                    </li>
                  </ul>
                  <p className="text-muted-foreground">
                    All contact is completely confidential. There&apos;s no
                    pressure to commit to anything.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Do you offer online sessions?
                </h3>
                <p className="text-muted-foreground">
                  Yes, I offer both in-person sessions at my Southsea practice and
                  online sessions via secure video call. Online therapy works well
                  for many people and allows flexibility if you&apos;re not local
                  to Portsmouth.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  How long does counselling take?
                </h3>
                <p className="text-muted-foreground">
                  This varies from person to person. Some people find a few
                  sessions helpful, while others benefit from longer-term support.
                  We&apos;ll regularly review how things are going and you can end
                  therapy whenever you feel ready.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Is everything confidential?
                </h3>
                <p className="text-muted-foreground">
                  Yes, what you share in sessions is confidential. The only
                  exceptions are if there&apos;s a serious risk of harm to yourself
                  or others, which I would discuss with you first wherever possible.
                  I follow the BACP ethical framework.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  What if I need to cancel a session?
                </h3>
                <p className="text-muted-foreground">
                  I ask for 48 hours notice for cancellations where possible.
                  Sessions cancelled with less notice may be charged. I understand
                  that emergencies happen, and we can discuss this on a case-by-case
                  basis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
