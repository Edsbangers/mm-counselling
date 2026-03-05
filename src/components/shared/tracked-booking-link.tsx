"use client";

import Link from "next/link";
import { trackBookingClick } from "@/lib/analytics";

export function TrackedBookingLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} onClick={trackBookingClick} className={className}>
      {children}
    </Link>
  );
}
