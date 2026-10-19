"use client";

import { company, telHref, whatsapp } from "@/lib/content";

/**
 * Always-visible call + WhatsApp buttons, bottom-right. Small enough not to
 * cover content, visible on every page on mobile and desktop.
 */
export default function QuickDock() {
  const chip =
    "flex h-12 w-12 items-center justify-center rounded-full shadow-[0_8px_24px_-8px_rgba(0,0,0,.35)] transition-transform duration-300 hover:-translate-y-0.5";
  return (
    <div className="fixed bottom-4 right-4 z-[75] flex flex-col gap-2.5 md:bottom-6 md:right-6">
      <a href={whatsapp()} target="_blank" rel="noreferrer" aria-label={`WhatsApp Jagmount on ${company.phone}`} className={`${chip} bg-[#25d366] text-white`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2m0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2m4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.6.5-.1 1.5-.6 1.7-1.2s.2-1.1.1-1.2-.2-.1-.4-.2" />
        </svg>
      </a>
      <a href={telHref} aria-label={`Call Jagmount on ${company.phone}`} className={`${chip} bg-orange text-white`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
        </svg>
      </a>
    </div>
  );
}
