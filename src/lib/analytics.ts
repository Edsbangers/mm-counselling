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
