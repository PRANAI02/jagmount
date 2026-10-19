"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { machines } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

/**
 * Machine cards stack like plates on a bed: each one sticks, and as the next
 * slides over it the one underneath sinks back, dims and tilts.
 */
export default function MachineStack() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-mcard]", root.current);
      cards.forEach((c, i) => {
        if (i === cards.length - 1) return;
        gsap.to(c.querySelector("[data-inner]"), {
          scale: 0.93,
          filter: "brightness(0.6)",
          ease: "none",
          scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top 18%", scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className="relative" style={{ perspective: "1400px" }}>
      {machines.map((m, i) => (
        <div key={m.n} data-mcard className="sticky pb-6" style={{ top: `calc(90px + ${i * 14}px)` }}>
          <div
            data-inner
            className="grid origin-top overflow-hidden border border-[var(--line-strong)] bg-graphite md:grid-cols-[1.1fr_1fr]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative aspect-[16/11] md:aspect-auto md:min-h-[440px]">
              <Image src={m.img} alt={m.title} fill sizes="(min-width:768px) 55vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-graphite/40" />
              <span className="mono absolute left-4 top-4 bg-orange px-2 py-1 text-[10px] text-ink">{m.spec}</span>
            </div>
            <div className="relative flex flex-col justify-between gap-8 p-6 md:p-10">
              <div className="blueprint-fine absolute inset-0 opacity-70" />
              <div className="relative">
                <h3 className="display text-[clamp(28px,3.4vw,54px)]">{m.title}</h3>
                <p className="mt-5 max-w-md text-bone/70">{m.body}</p>
              </div>
              <dl className="mono relative grid grid-cols-2 border-t border-[var(--line)] pt-4 text-[10px]">
                <div>
                  <dt className="text-mute">Spec</dt>
                  <dd className="mt-1 text-[12px] text-bone">{m.spec}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
