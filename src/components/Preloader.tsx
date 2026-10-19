"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

/** First load only: the logo settles in, a hairline fills, and the sheet lifts away (about one second). */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    const done = () => {
      window.__jmReady = true;
      window.dispatchEvent(new Event("jm:ready"));
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.display = "none";
      done();
      return;
    }
    const tl = gsap.timeline({ onComplete: () => void (el.style.display = "none") });
    tl.from(el.querySelector("[data-logo]"), { autoAlpha: 0, y: 12, duration: 0.5, ease: "power3.out" })
      .fromTo(el.querySelector("[data-bar]"), { scaleX: 0 }, { scaleX: 1, duration: 0.55, ease: "power2.inOut" }, 0.1)
      .add(done, "+=0.05")
      .to(el, { yPercent: -100, duration: 0.7, ease: "power3.inOut" }, "<");
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={root} className="fixed inset-0 z-[100] flex select-none items-center justify-center bg-white" aria-hidden>
      <div className="flex flex-col items-center gap-5">
        <Image data-logo src="/img/site/logo-dark.png" alt="" width={1749} height={582} priority className="h-14 w-auto md:h-20" />
        <div className="h-[2px] w-40 bg-steel">
          <div data-bar className="h-full w-full origin-left bg-orange" />
        </div>
      </div>
    </div>
  );
}
