import { Resend } from "resend";
import { siteConfig } from "./site-config";

let resendInstance: Resend | null = null;

export function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!resendInstance) {
    resendInstance = new Resend(process.env.RESEND_API_KEY);
  }
  return resendInstance;
}

export function getFromEmail(): string {
  return (
    process.env.RESEND_FROM_EMAIL ||
    `MM Counselling <noreply@${siteConfig.url.replace("https://www.", "")}>`
  );
}
