"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Animator from "./Animator";

/**
 * Page transition: one light sheet with an orange edge slides up to cover the
 * page, the route changes underneath, then the sheet carries on upward.
 * Transform-only, so it stays smooth on low-end phones.
 */
export default function Transition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const sheet = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const first = useRef(true);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//") || href.startsWith("/api/")) return;
      const url = new URL(href, location.href);
      if (url.pathname === location.pathname) {
        if (url.hash || url.search !== location.search) return;
        e.preventDefault();
        e.stopPropagation();
        window.__lenis?.scrollTo(0, { duration: 1 });
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      if (busy.current) return;
      busy.current = true;
      window.dispatchEvent(new Event("jm:navstart"));
      gsap.set(sheet.current, { visibility: "visible", yPercent: 100 });
      gsap.to(sheet.current, {
        yPercent: 0,
        duration: 0.45,
        ease: "power3.inOut",
        onComplete: () => router.push(url.pathname + url.search + url.hash),
      });
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
    const el = sheet.current;
    if (!el) return;
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      const target = location.hash && document.querySelector(location.hash);
      if (target) setTimeout(() => window.__lenis?.scrollTo(target as HTMLElement, { offset: -100, immediate: true }), 300);
      gsap.to(el, {
        yPercent: -100,
        duration: 0.55,
        delay: 0.05,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(el, { visibility: "hidden" });
          busy.current = false;
        },
      });
    });
  }, [pathname]);

  return (
    <>
      <Animator key={pathname} />
      {children}
      <div ref={sheet} className="pointer-events-none fixed inset-0 z-[80] bg-graphite will-change-transform" style={{ visibility: "hidden" }} aria-hidden>
        <div className="absolute inset-x-0 top-0 h-[3px] bg-orange" />
      </div>
    </>
  );
}
