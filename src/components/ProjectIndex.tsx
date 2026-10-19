"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { projects } from "@/lib/content";

/**
 * Project ledger. On desktop a framed photo trails the pointer and swaps to
 * the hovered row; on touch each row carries its own thumbnail.
 */
export default function ProjectIndex({ limit }: { limit?: number }) {
  const list = limit ? projects.slice(0, limit) : projects;
  const root = useRef<HTMLDivElement>(null);
  const float = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const r = root.current!;
    const f = float.current!;
    const xTo = gsap.quickTo(f, "x", { duration: 0.7, ease: "power3" });
    const yTo = gsap.quickTo(f, "y", { duration: 0.7, ease: "power3" });
    const rTo = gsap.quickTo(f, "rotate", { duration: 0.9, ease: "power3" });
    let lx = 0;
    const imgs = f.querySelectorAll<HTMLElement>("[data-i]");
    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      rTo(gsap.utils.clamp(-10, 10, (e.clientX - lx) * 0.6));
      lx = e.clientX;
    };
    const enterRow = (i: number) => {
      gsap.to(f, { scale: 1, autoAlpha: 1, duration: 0.5, ease: "expo.out" });
      imgs.forEach((im, j) => {
        gsap.to(im, { clipPath: j === i ? "inset(0% 0 0 0)" : j < i ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)", duration: 0.7, ease: "expo.out" });
      });
    };
    const leave = () => gsap.to(f, { scale: 0.6, autoAlpha: 0, duration: 0.4 });
    const rows = r.querySelectorAll<HTMLElement>("[data-row]");
    const handlers = Array.from(rows).map((row, i) => {
      const h = () => enterRow(i);
      row.addEventListener("pointerenter", h);
      return h;
    });
    r.addEventListener("pointermove", move);
    r.addEventListener("pointerleave", leave);
    return () => {
      rows.forEach((row, i) => row.removeEventListener("pointerenter", handlers[i]));
      r.removeEventListener("pointermove", move);
      r.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={root} className="relative">
      <div className="mono hidden grid-cols-[1.6fr_1fr_1fr_120px] gap-4 border-b border-[var(--line-strong)] pb-3 text-[10px] text-mute md:grid">
        <span>Client</span>
        <span>Location</span>
        <span>Type</span>
        <span className="text-right">Area</span>
      </div>
      <ul data-stagger="0.06">
        {list.map((p) => (
          <li
            key={p.slug}
            data-row
            className="group relative grid grid-cols-[88px_1fr] items-center gap-4 border-b border-[var(--line)] py-5 md:grid-cols-[1.6fr_1fr_1fr_120px] md:py-7"
          >
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-night transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-y-100" />
            <span className="relative aspect-[4/3] w-[88px] overflow-hidden md:hidden">
              <Image src={p.img} alt="" fill sizes="88px" className="object-cover" />
            </span>
            <span className="relative">
              <span className="display block text-[clamp(19px,2vw,28px)] transition-colors duration-300 group-hover:text-white">{p.name}</span>
              <span className="mono mt-1 block text-[10px] text-mute md:hidden">
                {p.place}, {p.state} · {p.sqft ? p.sqft.toLocaleString("en-IN") + " sq ft" : p.tonnage}
              </span>
            </span>
            <span className="relative hidden text-[15px] text-bone/80 transition-colors group-hover:text-white md:block">
              {p.place}, {p.state}
            </span>
            <span className="relative hidden text-[15px] text-bone/60 transition-colors group-hover:text-white md:block">{p.type}</span>
            <span className="mono relative hidden text-right text-[13px] transition-colors group-hover:text-white md:block">
              {p.sqft ? (
                <>
                  {p.sqft.toLocaleString("en-IN")} <span className="text-[10px] text-mute group-hover:text-white/80">sq ft</span>
                </>
              ) : (
                p.tonnage
              )}
            </span>
          </li>
        ))}
      </ul>

      <div
        ref={float}
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-[260px] w-[360px] -translate-x-1/2 -translate-y-1/2 scale-50 opacity-0 md:block"
        style={{ visibility: "hidden" }}
        aria-hidden
      >
        <div className="relative h-full w-full overflow-hidden bg-steel shadow-xl">
          {list.map((p, i) => (
            <div key={p.slug} data-i className="absolute inset-0" style={{ clipPath: i === 0 ? "inset(0 0 0 0)" : "inset(100% 0 0 0)" }}>
              <Image src={p.img} alt="" fill sizes="360px" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
