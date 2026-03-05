declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string>
) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

export function trackPhoneClick() {
  trackEvent("phone_click", {
    event_category: "conversion",
    event_label: "phone_number",
  });
}

export function trackEmailClick() {
  trackEvent("email_click", {
    event_category: "conversion",
    event_label: "email_address",
  });
}

export function trackBookingClick() {
  trackEvent("booking_click", {
    event_category: "conversion",
    event_label: "cta_button",
  });
}

export function trackContactFormSubmit() {
  trackEvent("contact_form_submit", {
    event_category: "conversion",
    event_label: "contact_page_form",
  });
}

export function trackBlogRead(title: string) {
  trackEvent("blog_read", {
    event_category: "engagement",
    event_label: title,
  });
}
