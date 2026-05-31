"use client";

import Link from "next/link";
import {
  trackFreeCallClick,
  trackBookingClick,
  trackPhoneClick,
} from "@/lib/analytics";

type TrackedEvent = "free_call" | "booking" | "phone";

const trackers: Record<TrackedEvent, (location: string) => void> = {
  free_call: trackFreeCallClick,
  booking: trackBookingClick,
  phone: trackPhoneClick,
};

const ctaAttr: Record<TrackedEvent, string> = {
  free_call: "book-free-call",
  booking: "book-appointment",
  phone: "phone-click",
};

/**
 * Small client wrapper around next/link that fires a GA conversion event on
 * click. Lets the surrounding page/section stay a server component so we ship
 * less client JavaScript (better TBT/TTI).
 */
export function TrackedLink({
  href,
  event,
  location,
  className,
  children,
}: {
  href: string;
  event: TrackedEvent;
  location: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={() => trackers[event](location)}
      data-cta={ctaAttr[event]}
      data-cta-location={location}
      className={className}
    >
      {children}
    </Link>
  );
}

/** Tracked `tel:` anchor — keeps phone CTAs in server components. */
export function TrackedPhoneLink({
  phone,
  location,
  className,
  children,
}: {
  phone: string;
  location: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={`tel:${phone.replace(/\s+/g, "")}`}
      onClick={() => trackPhoneClick(location)}
      data-cta="phone-click"
      data-cta-location={location}
      className={className}
    >
      {children}
    </a>
  );
}
