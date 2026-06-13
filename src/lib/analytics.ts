declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

// Google Ads conversion tracking (account AW-18152509976).
const GOOGLE_ADS_ID = "AW-18152509976";

export const ADS_CONVERSION_LABELS = {
  // "Book appointment" website conversion — fired on contact-form submission.
  bookAppointment: "s3gICKff1aocEJik5c9D",
} as const;

/** Fire a Google Ads conversion for the given action label. */
export function trackAdsConversion(label: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/${label}` });
  }
}

function pagePath(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return window.location.pathname + window.location.search;
}

export function trackPhoneClick(location: string = "unknown") {
  trackEvent("phone_click", {
    event_category: "conversion",
    event_label: "phone_number",
    cta_location: location,
    page_path: pagePath() || "",
  });
}

export function trackEmailClick(location: string = "unknown") {
  trackEvent("email_click", {
    event_category: "conversion",
    event_label: "email_address",
    cta_location: location,
    page_path: pagePath() || "",
  });
}

export function trackBookingClick(location: string = "unknown") {
  trackEvent("booking_click", {
    event_category: "conversion",
    event_label: "cta_button",
    cta_location: location,
    page_path: pagePath() || "",
  });
}

export function trackFreeCallClick(location: string = "unknown") {
  trackEvent("free_call_click", {
    event_category: "conversion",
    event_label: "free_consultation_cta",
    cta_location: location,
    page_path: pagePath() || "",
  });
}

export function trackContactFormSubmit() {
  trackEvent("contact_form_submit_success", {
    event_category: "conversion",
    event_label: "contact_page_form",
    page_path: pagePath() || "",
  });
  // Report the enquiry to Google Ads as a "Book appointment" conversion.
  trackAdsConversion(ADS_CONVERSION_LABELS.bookAppointment);
}

export function trackContactFormStart() {
  trackEvent("form_start", {
    event_category: "engagement",
    event_label: "contact_page_form",
    page_path: pagePath() || "",
  });
}

export function trackChatOpen() {
  trackEvent("chat_open", {
    event_category: "engagement",
    event_label: "chat_widget",
    page_path: pagePath() || "",
  });
}

export function trackChatMessageSent() {
  trackEvent("chat_message_sent", {
    event_category: "engagement",
    event_label: "chat_widget",
    page_path: pagePath() || "",
  });
}

export function trackBlogRead(title: string) {
  trackEvent("blog_read", {
    event_category: "engagement",
    event_label: title,
    page_path: pagePath() || "",
  });
}
