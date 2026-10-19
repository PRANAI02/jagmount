"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { projects } from "@/lib/content";

gsap.registerPlugin(Flip);

const states = ["All", ...Array.from(new Set(projects.map((p) => p.state)))];

/** Filterable project cards; filtering re-flows the grid with a FLIP animation. */
export default function ProjectGrid() {
  const [f, setF] = useState("All");
  const grid = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);

  const pick = (s: string) => {
    flipState.current = Flip.getState(grid.current!.querySelectorAll("[data-card]"));
    setF(s);
  };

  useEffect(() => {
    if (!flipState.current) return;
    Flip.from(flipState.current, {
      duration: 0.8,
      ease: "expo.inOut",
      absolute: true,
      stagger: 0.03,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "expo.out" }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.85, duration: 0.4 }),
    });
    flipState.current = null;
  }, [f]);

  const total = projects.filter((p) => f === "All" || p.state === f).reduce((a, p) => a + p.sqft, 0);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by state">
          {states.map((s) => (
            <button
              key={s}
              role="tab"
              aria-selected={f === s}
              onClick={() => pick(s)}
              className={`mono border px-4 py-2.5 text-[11px] transition-colors duration-300 ${f === s ? "border-orange bg-orange text-ink" : "border-[var(--line-strong)] text-bone hover:border-orange hover:text-orange"}`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="mono text-[11px] text-mute">
          Covered area <span className="ml-2 text-lg text-bone">{total.toLocaleString("en-IN")}</span> sq ft
        </div>
      </div>

      <div ref={grid} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => {
          const show = f === "All" || p.state === f;
          return (
            <article
              key={p.slug}
              data-card
              data-flip-id={p.slug}
              className={`group relative overflow-hidden border border-[var(--line)] bg-graphite ${show ? "" : "hidden"} ${i === 0 ? "sm:col-span-2" : ""}`}
            >
              <div className={`relative overflow-hidden ${i === 0 ? "aspect-[4/3] sm:aspect-[8/3]" : "aspect-[4/3]"}`} data-clip>
                <Image
                  src={p.img}
                  alt={`${p.name}, ${p.place}`}
                  fill
                  sizes={i === 0 ? "(min-width:1024px) 66vw, 100vw" : "(min-width:1024px) 33vw, 50vw"}
                  className="img-steel object-cover group-hover:scale-[1.06]"
                />
                <span className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-orange transition-transform duration-700 group-hover:scale-x-100" />
              </div>
              <div className="flex items-end justify-between gap-4 p-5">
                <div>
                  <h3 className="display text-[clamp(20px,2vw,30px)]">{p.name}</h3>
                  <p className="mono mt-2 text-[10px] text-mute">
                    {p.place}, {p.state} · {p.type}
                  </p>
                </div>
                <div className="text-right">
                  <div className="display text-[clamp(20px,2vw,30px)] text-orange">{(p.sqft / 1000).toFixed(0)}K</div>
                  <div className="mono text-[10px] text-mute">sq ft</div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
