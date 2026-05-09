"use client";

import Link from "next/link";
import { trackBookingClick } from "@/lib/analytics";

export function TrackedBookingLink({
  href,
  className,
  location = "tracked_booking_link",
  children,
}: {
  href: string;
  className?: string;
  location?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={() => trackBookingClick(location)}
      data-cta="book-appointment"
      data-cta-location={location}
      className={className}
    >
      {children}
    </Link>
  );
}
