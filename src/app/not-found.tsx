import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-serif text-foreground mb-4">404</h1>
        <h2 className="text-xl font-serif text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Sorry, the page you&apos;re looking for doesn&apos;t exist. If
          you&apos;re looking for counselling support in Portsmouth, I&apos;d
          love to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block border border-foreground text-foreground px-6 py-3 text-sm tracking-wide hover:bg-foreground hover:text-white transition-all duration-300"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-block border border-foreground bg-foreground text-white px-6 py-3 text-sm tracking-wide hover:bg-transparent hover:text-foreground transition-all duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
