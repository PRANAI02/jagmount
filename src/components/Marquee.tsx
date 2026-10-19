"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Infinite marquee whose speed and skew react to scroll velocity: scrolling
 * hard makes the rows race and lean like they're being dragged.
 */
export default function Marquee({
  items,
  reverse = false,
  speed = 60,
  className = "",
  itemClass = "",
  sep = true,
}: {
  items: React.ReactNode[];
  reverse?: boolean;
  speed?: number;
  className?: string;
  itemClass?: string;
  sep?: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let x = 0;
    let boost = 0;
    let skew = 0;
    let half = el.scrollWidth / 2;
    const ro = new ResizeObserver(() => (half = el.scrollWidth / 2));
    ro.observe(el);
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const v = self.getVelocity();
        boost = gsap.utils.clamp(-8, 8, v / 250);
      },
    });
    const dir = reverse ? 1 : -1;
    const tick = (_t: number, dt: number) => {
      boost *= 0.94;
      skew += (boost * 1.6 - skew) * 0.1;
      x += dir * (speed * (dt / 1000)) * (1 + Math.abs(boost));
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      el.style.transform = `translate3d(${x}px,0,0) skewX(${-skew * dir}deg)`;
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      st.kill();
      ro.disconnect();
    };
  }, [reverse, speed]);

  const row = (k: string) =>
    items.map((it, i) => (
      <span key={k + i} className={`flex shrink-0 items-center ${itemClass}`}>
        {it}
        {sep && <span className="mx-[0.4em] inline-block h-[0.22em] w-[0.22em] rotate-45 bg-orange" />}
      </span>
    ));

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={track} className="flex w-max will-change-transform">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
