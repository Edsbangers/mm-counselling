"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { trackPhoneClick, trackEmailClick } from "@/lib/analytics";

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
            <a href={`tel:${siteConfig.contact.phone}`} onClick={trackPhoneClick} className="hover:text-white transition-colors">
              {siteConfig.contact.phone}
            </a>
          </p>
          <p className="text-white/80 text-sm">
            Email:{" "}
            <a href={`mailto:${siteConfig.contact.email}`} onClick={trackEmailClick} className="hover:text-white transition-colors">
              {siteConfig.contact.email}
            </a>
          </p>
        </div>

        {/* BACP Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/bacp-logo.png"
            alt="BACP Registered Member 388689 - Accredited Register"
            width={160}
            height={64}
            className="object-contain brightness-0 invert opacity-80"
          />
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

        {/* Areas We Serve */}
        <div className="text-center mb-6">
          <p className="text-white/80 text-xs mb-2">Areas We Serve</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-white/60">
            {siteConfig.serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/counselling-in-${area.slug}`}
                className="hover:text-white transition-colors"
              >
                {area.name}
              </Link>
            ))}
          </div>
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
