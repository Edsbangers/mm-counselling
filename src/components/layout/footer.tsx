import Link from "next/link";
import { Instagram } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="bg-[#808080] text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* NAP Section - Name, Address, Phone */}
        <div className="text-center mb-8">
          <p className="font-serif text-xl mb-3">MM Counselling</p>
          <p className="text-white/80 text-sm">
            {siteConfig.therapist.fullName}, BACP Registered Counsellor
          </p>
          <p className="text-white/80 text-sm">
            {siteConfig.location.area}, {siteConfig.location.city}, {siteConfig.location.county} {siteConfig.location.postcode}
          </p>
          <p className="text-white/80 text-sm mt-2">
            Phone:{" "}
            <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white transition-colors">
              {siteConfig.contact.phone}
            </a>
          </p>
          <p className="text-white/80 text-sm">
            Email:{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
              {siteConfig.contact.email}
            </a>
          </p>
        </div>

        {/* Social */}
        <div className="flex justify-center mb-8">
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </div>

        {/* Bottom Links */}
        <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/60 text-xs">
            &copy; {new Date().getFullYear()}, MM Counselling. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/60">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
