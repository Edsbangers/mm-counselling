"use client";

import { useState } from "react";
import { trackContactFormSubmit } from "@/lib/analytics";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      trackContactFormSubmit();
      setIsSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send message. Please try calling instead."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="border border-border bg-white p-8 text-center">
        <p className="font-serif text-xl text-foreground mb-2">Message Sent</p>
        <p className="text-sm text-muted-foreground">
          Thank you for getting in touch. Marion will respond within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="block text-sm text-muted-foreground mb-1.5"
        >
          Name <span className="text-red-600">*</span>
        </label>
        <input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Your name"
          className="w-full px-4 py-3 min-h-[48px] border border-border bg-white text-foreground text-base focus:outline-none focus:border-[#808080] transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm text-muted-foreground mb-1.5"
        >
          Email <span className="text-red-600">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="your@email.com"
          className="w-full px-4 py-3 min-h-[48px] border border-border bg-white text-foreground text-base focus:outline-none focus:border-[#808080] transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm text-muted-foreground mb-1.5"
        >
          Telephone (optional)
        </label>
        <input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="07XXX XXXXXX"
          className="w-full px-4 py-3 min-h-[48px] border border-border bg-white text-foreground text-base focus:outline-none focus:border-[#808080] transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm text-muted-foreground mb-1.5"
        >
          How can I help?
        </label>
        <p className="text-xs text-muted-foreground mb-1.5">
          This is optional &mdash; we can discuss everything when we speak.
        </p>
        <textarea
          id="message"
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell me a bit about what brings you to counselling..."
          className="w-full px-4 py-3 min-h-[48px] border border-border bg-white text-foreground text-base focus:outline-none focus:border-[#808080] transition-colors resize-none"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <p className="text-xs text-muted-foreground">
        Your information is confidential and will only be used to respond to
        your enquiry.
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full border border-foreground text-foreground px-8 py-3 min-h-[48px] text-sm tracking-wide hover:bg-foreground hover:text-white transition-all duration-300 disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
