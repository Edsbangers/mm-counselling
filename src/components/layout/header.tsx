"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { trackPhoneClick, trackEmailClick, trackFreeCallClick } from "@/lib/analytics";

const services = [
  { name: "Couples Counselling", href: "/couples-counselling-portsmouth" },
  { name: "Anxiety Counselling", href: "/anxiety-counselling-portsmouth" },
];

// Nav split so the Counselling dropdown can sit between About and Sessions.
const navBefore = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];
const navAfter = [
  { name: "Sessions and Fees", href: "/sessions-and-fees" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Me", href: "/contact" },
];

function ServicesDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
      >
        Counselling
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full pt-3 z-50"
        >
          <div className="min-w-[15rem] border border-border/60 bg-white shadow-sm py-2">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-[#f9f9f9] transition-colors"
              >
                {service.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

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
            {navBefore.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}

            <ServicesDropdown />

            {navAfter.map((item) => (
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
              onClick={() => trackFreeCallClick("header_desktop")}
              data-cta="book-free-call"
              data-cta-location="header_desktop"
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
            {navBefore.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-base text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {item.name}
              </Link>
            ))}

            {/* Counselling services */}
            <div className="py-1">
              <p className="text-xs uppercase tracking-wide text-muted-foreground/70 mb-1">
                Counselling
              </p>
              {services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  onClick={() => setIsOpen(false)}
                  className="block pl-3 py-2 text-base text-muted-foreground hover:text-foreground transition-colors"
                >
                  {service.name}
                </Link>
              ))}
            </div>

            {navAfter.map((item) => (
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
              onClick={() => {
                setIsOpen(false);
                trackFreeCallClick("header_mobile");
              }}
              data-cta="book-free-call"
              data-cta-location="header_mobile"
              className="block bg-[#1b1b1b] text-white text-center px-4 py-3 text-base hover:bg-[#333] transition-colors mt-2"
            >
              Book Free Call
            </Link>
            <div className="pt-3 border-t border-border/40 space-y-1 text-sm text-muted-foreground">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                onClick={() => trackPhoneClick("header_mobile")}
                data-cta="phone-click"
                data-cta-location="header_mobile"
                className="block py-1"
              >
                {siteConfig.contact.phone}
              </a>
              <a
                href="/contact"
                onClick={() => trackEmailClick("header_mobile")}
                data-cta="email-click"
                data-cta-location="header_mobile"
                className="block py-1"
              >
                {siteConfig.contact.email}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
