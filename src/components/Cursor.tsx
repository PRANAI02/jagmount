"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * CAD-style reticle: a crosshair that trails the pointer and reads out its
 * coordinates in millimetres. Over links it opens into a ring; elements with
 * data-cursor="View" show that label inside it.
 */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const read = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08 });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08 });
    const tx = gsap.quickTo(read.current, "x", { duration: 0.6, ease: "power3" });
    const ty = gsap.quickTo(read.current, "y", { duration: 0.6, ease: "power3" });
    let shown = false;
    const coords = read.current!.querySelector("[data-xy]")!;

    const move = (e: PointerEvent) => {
      if (!shown) {
        shown = true;
        gsap.to([ring.current, dot.current, read.current], { autoAlpha: 1, duration: 0.3 });
      }
      rx(e.clientX);
      ry(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
      tx(e.clientX + 26);
      ty(e.clientY + 22);
      coords.textContent = `X ${String(Math.round(e.clientX * 10)).padStart(5, "0")}  Y ${String(Math.round((e.clientY + window.scrollY) * 10)).padStart(6, "0")}`;
    };
    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor], input, textarea, select, label");
      const label = t?.dataset.cursor;
      const isField = t && /INPUT|TEXTAREA|SELECT/.test(t.tagName);
      gsap.to(ring.current, {
        width: label ? 96 : t && !isField ? 54 : 28,
        height: label ? 96 : t && !isField ? 54 : 28,
        backgroundColor: label ? "rgba(255,106,0,0.95)" : "rgba(255,106,0,0)",
        borderColor: t ? "rgba(255,106,0,1)" : "rgba(236,232,224,0.55)",
        rotate: t ? 45 : 0,
        duration: 0.4,
        ease: "expo.out",
      });
      gsap.to(ring.current!.querySelectorAll("[data-tick]"), { opacity: t ? 0 : 1, duration: 0.2 });
      text.current!.textContent = label ?? "";
      gsap.to(text.current, { autoAlpha: label ? 1 : 0, rotate: label ? -45 : 0, duration: 0.3 });
      gsap.to(read.current, { autoAlpha: t ? 0 : 1, duration: 0.2 });
    };
    const leave = () => gsap.to([ring.current, dot.current, read.current], { autoAlpha: 0, duration: 0.3, onComplete: () => void (shown = false) });
    const down = () => gsap.to(ring.current, { scale: 0.7, duration: 0.15 });
    const up = () => gsap.to(ring.current, { scale: 1, duration: 0.4, ease: "elastic.out(1,0.4)" });

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div className="cursor-ui pointer-events-none fixed inset-0 z-[120]" aria-hidden>
      <div
        ref={ring}
        className="invisible fixed left-0 top-0 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center border opacity-0"
        style={{ borderColor: "rgba(236,232,224,.55)" }}
      >
        <span data-tick className="absolute left-1/2 top-[-7px] h-[6px] w-px bg-bone/60" />
        <span data-tick className="absolute bottom-[-7px] left-1/2 h-[6px] w-px bg-bone/60" />
        <span data-tick className="absolute left-[-7px] top-1/2 h-px w-[6px] bg-bone/60" />
        <span data-tick className="absolute right-[-7px] top-1/2 h-px w-[6px] bg-bone/60" />
        <span ref={text} className="mono invisible text-[11px] font-medium text-ink opacity-0" />
      </div>
      <div ref={dot} className="invisible fixed left-0 top-0 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 bg-orange opacity-0" />
      <div ref={read} className="mono invisible fixed left-0 top-0 whitespace-pre text-[9px] leading-tight text-mute opacity-0">
        <span data-xy />
      </div>
    </div>
  );
}
