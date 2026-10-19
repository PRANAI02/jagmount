declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Analytics events. A click on a CTA, phone or WhatsApp link is only interest
 * ("*_click"); a lead is a form the server accepted ("generate_lead"). Whether a
 * lead is qualified or won is tracked offline in the lead sheet / CRM.
 */
export type JmEvent = "phone_click" | "whatsapp_click" | "email_click" | "cta_click" | "generate_lead" | "drawing_upload";

export function track(event: JmEvent, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
}
