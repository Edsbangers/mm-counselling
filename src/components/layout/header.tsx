"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site-config";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "ADHD Support", href: "/services/adhd" },
  { name: "Trauma Therapy", href: "/services/trauma" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar with contact info */}
      <div className="hidden md:block bg-slate-brand text-white">
        <div className="container mx-auto px-4 py-2 flex justify-end items-center gap-6 text-sm">
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex items-center gap-2 hover:text-sage-light transition-colors"
          >
            <Mail className="h-4 w-4" />
            {siteConfig.contact.email}
          </a>
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="flex items-center gap-2 hover:text-sage-light transition-colors"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.contact.phone}
          </a>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-sage flex items-center justify-center">
              <span className="text-white font-semibold text-lg">MM</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-semibold text-lg text-foreground">
                MM Counselling
              </span>
              <span className="block text-xs text-muted-foreground">
                Southsea, Portsmouth
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Button asChild>
              <Link href="/contact">Book a Session</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-border">
                  <Button asChild className="w-full">
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      Book a Session
                    </Link>
                  </Button>
                </div>
                <div className="pt-4 space-y-2 text-sm text-muted-foreground">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    {siteConfig.contact.email}
                  </a>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
