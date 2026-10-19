"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
    __jmReady?: boolean;
  }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    // mobile URL-bar show/hide must not re-measure every trigger mid-scroll
    ScrollTrigger.config({ ignoreMobileResize: true });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    // one ticker drives Lenis and GSAP so scroll position and tweens update in the same frame
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: true, anchors: { offset: -100 }, autoRaf: false });
    window.__lenis = lenis;
    const onReady = () => lenis.start();
    if (!window.__jmReady) {
      lenis.stop();
      window.addEventListener("jm:ready", onReady, { once: true });
    }
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(500, 33);
    return () => {
      window.removeEventListener("jm:ready", onReady);
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
