"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { process } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

/** Five-step flow; a weld bead runs down the rail and lights each node as it passes. */
export default function ProcessLine() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const bead = root.current!.querySelector<HTMLElement>("[data-bead]")!;
      const fill = root.current!.querySelector<HTMLElement>("[data-fill]")!;
      const nodes = gsap.utils.toArray<HTMLElement>("[data-node]");
      ScrollTrigger.create({
        trigger: root.current,
        start: "top 65%",
        end: "bottom 65%",
        scrub: 0.5,
        onUpdate: (s) => {
          fill.style.transform = `scaleY(${s.progress})`;
          bead.style.top = `${s.progress * 100}%`;
          nodes.forEach((n, i) => n.toggleAttribute("data-on", s.progress >= i / (nodes.length - 1) - 0.02));
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative pl-12 md:pl-0">
      <div className="absolute bottom-0 left-[11px] top-0 w-px bg-[var(--line-strong)] md:left-1/2">
        <div data-fill className="absolute inset-0 origin-top bg-orange" style={{ transform: "scaleY(0)" }} />
        <div
          data-bead
          className="absolute left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          style={{ top: 0, boxShadow: "0 0 18px 6px rgba(255,106,0,.8)" }}
        />
      </div>
      <ol className="space-y-16 md:space-y-28">
        {process.map((p, i) => (
          <li key={p.n} data-node className="group relative md:grid md:grid-cols-2 md:gap-24">
            <span className="absolute -left-12 top-2 flex h-6 w-6 items-center justify-center border border-[var(--line-strong)] bg-ink transition-colors duration-300 group-data-[on]:border-orange group-data-[on]:bg-orange md:left-1/2 md:-translate-x-1/2">
              <span className="h-1.5 w-1.5 bg-bone group-data-[on]:bg-ink" />
            </span>
            <div className={i % 2 ? "md:col-start-2" : "md:text-right"}>
              <h3 className="display mt-2 text-[clamp(32px,4.4vw,72px)] text-bone/25 transition-colors duration-500 group-data-[on]:text-bone">{p.title}</h3>
              <p className={`mt-3 max-w-sm text-bone/65 ${i % 2 ? "" : "md:ml-auto"}`}>{p.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
