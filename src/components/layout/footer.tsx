import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const footerLinks = {
  services: [
    { name: "ADHD Support", href: "/services/adhd" },
    { name: "Trauma Therapy", href: "/services/trauma" },
    { name: "Anxiety & Depression", href: "/services/anxiety-depression" },
    { name: "Relationship Issues", href: "/services/relationships" },
  ],
  company: [
    { name: "About Marion", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-slate-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-sage flex items-center justify-center">
                <span className="text-white font-semibold text-lg">MM</span>
              </div>
              <span className="font-semibold text-lg">MM Counselling</span>
            </div>
            <p className="text-slate-light text-sm mb-4">
              Professional counselling services in Southsea, Portsmouth.
              Specialising in ADHD support and trauma therapy across Hampshire.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sage-light transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-light hover:text-sage-light transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-light hover:text-sage-light transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2 text-slate-light hover:text-sage-light transition-colors text-sm"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center gap-2 text-slate-light hover:text-sage-light transition-colors text-sm"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-slate-light text-sm">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>
                  {siteConfig.location.area}, {siteConfig.location.city}
                  <br />
                  {siteConfig.location.county}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-brand mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-light text-sm">
            &copy; {new Date().getFullYear()} MM Counselling. All rights reserved.
          </p>
          <p className="text-slate-light text-xs">
            Registered member of BACP | Southsea, Portsmouth, Hampshire
          </p>
        </div>
      </div>
    </footer>
  );
}
