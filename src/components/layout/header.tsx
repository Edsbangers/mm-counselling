"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { trackPhoneClick, trackEmailClick } from "@/lib/analytics";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Sessions and Fees", href: "/sessions-and-fees" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Me", href: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b border-border/40 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-serif text-2xl text-foreground tracking-tight">
              MM Counselling
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-[#1b1b1b] text-white px-4 py-2 text-sm hover:bg-[#333] transition-colors"
            >
              Book Free Call
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border/40 bg-white">
          <nav className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-base text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block bg-[#1b1b1b] text-white text-center px-4 py-3 text-base hover:bg-[#333] transition-colors mt-2"
            >
              Book Free Call
            </Link>
            <div className="pt-3 border-t border-border/40 space-y-1 text-sm text-muted-foreground">
              <a href={`tel:${siteConfig.contact.phone}`} onClick={trackPhoneClick} className="block py-1">
                {siteConfig.contact.phone}
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} onClick={trackEmailClick} className="block py-1">
                {siteConfig.contact.email}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
