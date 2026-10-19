"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORD = "JAGMOUNT";

/**
 * Giant wordmark at the foot of every page. The orange fill rises as it
 * scrolls in, and each letter's weight and width respond to pointer distance
 * through Archivo's variable axes.
 */
export default function FooterMark() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { "--p": "0%" }, { "--p": "100%", ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: true } });
    }, el);

    const letters = Array.from(el.querySelectorAll<HTMLElement>("[data-l]"));
    const state = letters.map(() => ({ w: 300, s: 125 }));
    let raf = 0;
    let px = -9999;
    let py = -9999;
    const loop = () => {
      letters.forEach((l, i) => {
        const r = l.getBoundingClientRect();
        const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2));
        const k = Math.max(0, 1 - d / 420);
        const tw = 300 + k * 600;
        const ts = 125 - k * 45;
        state[i].w += (tw - state[i].w) * 0.12;
        state[i].s += (ts - state[i].s) * 0.12;
        l.style.fontVariationSettings = `"wght" ${state[i].w.toFixed(0)}, "wdth" ${state[i].s.toFixed(1)}`;
      });
      raf = requestAnimationFrame(loop);
    };
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const move = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
    };
    const io = new IntersectionObserver(([en]) => {
      cancelAnimationFrame(raf);
      if (en.isIntersecting && fine) raf = requestAnimationFrame(loop);
    });
    io.observe(el);
    window.addEventListener("pointermove", move);
    return () => {
      ctx.revert();
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  const letterStyle: React.CSSProperties = {
    backgroundImage: "linear-gradient(to top, var(--orange) var(--p), transparent var(--p))",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
  };

  return (
    <div ref={root} style={{ ["--p" as string]: "0%" }} className="relative select-none overflow-hidden px-2 pt-6" aria-hidden>
      <div
        className="outline-text whitespace-nowrap text-center text-[12.6vw] uppercase leading-[0.8]"
        style={{ fontFamily: "var(--font-archivo)", fontVariationSettings: '"wght" 300, "wdth" 125' }}
      >
        {WORD.split("").map((c, i) => (
          <span key={i} data-l className="inline-block" style={letterStyle}>
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
