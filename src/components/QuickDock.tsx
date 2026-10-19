"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { company, tel } from "@/lib/content";

const wa = `https://wa.me/91${company.phones[0].replace(/\D/g, "").slice(-10)}?text=${encodeURIComponent("Hi Jagmount, I'd like a quote for a steel building.")}`;

/**
 * Floating quick-contact: a square orange button that unfolds into call,
 * WhatsApp and quote actions. Appears once the visitor scrolls.
 */
export default function QuickDock() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const shown = useRef(false);

  useEffect(() => {
    const el = root.current!;
    gsap.set(el, { autoAlpha: 0, y: 30 });
    const onScroll = () => {
      const want = window.__jmReady && scrollY > innerHeight * 0.6;
      if (want !== shown.current) {
        shown.current = !!want;
        gsap.to(el, { autoAlpha: want ? 1 : 0, y: want ? 0 : 30, duration: 0.5, ease: "expo.out" });
        if (!want) setOpen(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const items = root.current!.querySelectorAll("[data-dock-item]");
    gsap.to(items, {
      autoAlpha: open ? 1 : 0,
      x: open ? 0 : 20,
      duration: 0.4,
      ease: "expo.out",
      stagger: { each: 0.05, from: open ? "end" : "start" },
    });
  }, [open]);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("jm:navstart", close);
    return () => window.removeEventListener("jm:navstart", close);
  }, []);

  const item = "mono flex items-center justify-end gap-3 text-[11px]";
  const chip =
    "flex h-11 w-11 items-center justify-center border border-[var(--line-strong)] bg-graphite/95 backdrop-blur transition-colors hover:border-orange hover:text-orange";

  return (
    <div ref={root} className="fixed bottom-4 right-4 z-[75] flex flex-col items-end gap-2 md:bottom-6 md:right-6">
      <div className="flex flex-col items-end gap-2" aria-hidden={!open}>
        <a data-dock-item href={tel(company.phones[0])} className={`${item} invisible`} tabIndex={open ? 0 : -1}>
          <span className="bg-ink/90 px-2 py-1">Call</span>
          <span className={chip}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
            </svg>
          </span>
        </a>
        <a data-dock-item href={wa} target="_blank" rel="noreferrer" className={`${item} invisible`} tabIndex={open ? 0 : -1}>
          <span className="bg-ink/90 px-2 py-1">WhatsApp</span>
          <span className={chip}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2m0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2m4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.6.5-.1 1.5-.6 1.7-1.2s.2-1.1.1-1.2-.2-.1-.4-.2" />
            </svg>
          </span>
        </a>
        <Link data-dock-item href="/contact" className={`${item} invisible`} tabIndex={open ? 0 : -1}>
          <span className="bg-ink/90 px-2 py-1">Request a quote</span>
          <span className={chip}>
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
              <path d="M2 12 12 2M4 2h8v8" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </span>
        </Link>
      </div>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close quick contact" : "Open quick contact"}
        className="relative flex h-14 w-14 items-center justify-center bg-orange text-ink shadow-[0_10px_40px_-10px_rgba(255,106,0,.8)]"
      >
        <span className={`absolute h-[2px] w-5 bg-ink transition-transform duration-500 ${open ? "rotate-45" : ""}`} />
        <span className={`absolute h-[2px] w-5 bg-ink transition-transform duration-500 ${open ? "-rotate-45" : "rotate-90"}`} />
        {!open && <span className="absolute inset-0 animate-ping bg-orange opacity-20" />}
      </button>
    </div>
  );
}
