"use client";

import Script from "next/script";
import { useEffect } from "react";
import { track } from "@/lib/track";

const GA = process.env.NEXT_PUBLIC_GA_ID;

/** Loads GA4 (when NEXT_PUBLIC_GA_ID is set) and reports contact-link and CTA clicks site-wide. */
export default function Analytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const where = location.pathname;
      if (href.startsWith("tel:")) track("phone_click", { where });
      else if (href.includes("wa.me/")) track("whatsapp_click", { where });
      else if (href.startsWith("mailto:")) track("email_click", { where });
      else if (href.startsWith("/quote/")) track("cta_click", { where, journey: href.includes("fabrication") ? "fabrication" : "peb", label: a.textContent?.trim() ?? "" });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (!GA) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA}');`}
      </Script>
    </>
  );
}
