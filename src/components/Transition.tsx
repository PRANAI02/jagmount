"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { nav } from "@/lib/content";
import Animator from "./Animator";

const COLS = 6;

/**
 * Page transition: six steel "shutter" panels rise to cover the page, the
 * route changes underneath, then the panels continue upward to reveal it.
 */
export default function Transition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlay = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const busy = useRef(false);
  const first = useRef(true);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;
      const url = new URL(href, location.href);
      if (url.pathname === location.pathname) {
        if (url.hash) return;
        e.preventDefault();
        e.stopPropagation();
        window.__lenis?.scrollTo(0, { duration: 1.2 });
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      if (busy.current) return;
      busy.current = true;
      window.dispatchEvent(new Event("jm:navstart"));
      const name = nav.find((n) => n.href === url.pathname)?.label ?? url.pathname.slice(1);
      if (label.current) label.current.textContent = name;
      const panels = overlay.current!.querySelectorAll<HTMLElement>("[data-panel]");
      gsap.set(overlay.current, { visibility: "visible" });
      gsap.set(panels, { yPercent: 100 });
      gsap
        .timeline({ onComplete: () => router.push(url.pathname + url.search + url.hash) })
        .to(panels, { yPercent: 0, duration: 0.6, ease: "power4.inOut", stagger: { each: 0.05, from: "start" } })
        .fromTo(overlay.current!.querySelector("[data-label]"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.3 }, "-=0.25");
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [router]);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window.__lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    const ov = overlay.current;
    if (!ov) return;
    const panels = ov.querySelectorAll<HTMLElement>("[data-panel]");
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      const target = location.hash && document.querySelector(location.hash);
      if (target) setTimeout(() => window.__lenis?.scrollTo(target as HTMLElement, { offset: -70, immediate: true }), 400);
      gsap
        .timeline({
          delay: 0.15,
          onComplete: () => {
            gsap.set(ov, { visibility: "hidden" });
            busy.current = false;
          },
        })
        .to(ov.querySelector("[data-label]"), { autoAlpha: 0, y: -20, duration: 0.25 })
        .to(panels, { yPercent: -100, duration: 0.7, ease: "power4.inOut", stagger: { each: 0.05, from: "end" } }, "-=0.1");
    });
  }, [pathname]);

  return (
    <>
      <Animator key={pathname} />
      {children}
      <div ref={overlay} className="pointer-events-none fixed inset-0 z-[80] flex" style={{ visibility: "hidden" }} aria-hidden>
        {Array.from({ length: COLS }).map((_, i) => (
          <div key={i} data-panel className="relative h-full flex-1 bg-steel" style={{ borderRight: "1px solid rgba(236,232,224,.06)" }}>
            <div className="absolute inset-x-0 top-0 h-[3px] bg-orange" />
          </div>
        ))}
        <div data-label className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-4">
            <span className="h-3 w-3 bg-orange" />
            <span ref={label} className="display text-[clamp(32px,7vw,110px)] text-bone" />
          </div>
        </div>
      </div>
    </>
  );
}
