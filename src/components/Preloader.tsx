"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * First-load sequence: a plasma torch cuts a line across the screen while the
 * capacity counter runs 0000 → 6000 MT, then the plate splits and drops away.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    const done = () => {
      window.__jmReady = true;
      window.dispatchEvent(new Event("jm:ready"));
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.style.display = "none";
      done();
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const num = el.querySelector<HTMLElement>("[data-num]")!;
    const o = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        el.style.display = "none";
      },
    });
    tl.set(el.querySelectorAll("[data-row]"), { yPercent: 105 })
      .to(el.querySelectorAll("[data-row]"), { yPercent: 0, duration: 0.8, ease: "expo.out", stagger: 0.08 })
      .to(o, { v: 6000, duration: 1.8, ease: "power3.inOut", onUpdate: () => void (num.textContent = String(Math.round(o.v)).padStart(4, "0")) }, 0.2)
      .fromTo(el.querySelector("[data-cut]"), { scaleX: 0 }, { scaleX: 1, duration: 1.8, ease: "power3.inOut" }, 0.2)
      .fromTo(el.querySelector("[data-torch]"), { left: "0%" }, { left: "100%", duration: 1.8, ease: "power3.inOut" }, 0.2)
      .to(el.querySelector("[data-torch]"), { autoAlpha: 0, duration: 0.2 })
      .to(el.querySelectorAll("[data-row]"), { yPercent: -105, duration: 0.6, ease: "expo.in", stagger: 0.04 }, "+=0.1")
      .add(() => {
        document.documentElement.style.overflow = "";
        done();
      }, "-=0.1")
      .to(el.querySelector("[data-top]"), { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "<-0.05")
      .to(el.querySelector("[data-bot]"), { yPercent: 100, duration: 1.1, ease: "expo.inOut" }, "<")
      .to(el.querySelector("[data-cut]"), { autoAlpha: 0, duration: 0.3 }, "<");
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={root} className="fixed inset-0 z-[100] select-none" aria-hidden>
      <div data-top className="absolute inset-x-0 top-0 h-1/2 bg-graphite blueprint" />
      <div data-bot className="absolute inset-x-0 bottom-0 h-1/2 bg-graphite blueprint" />
      <div className="absolute inset-x-0 top-1/2 h-0">
        <div data-cut className="absolute inset-x-0 -top-px h-[2px] origin-left bg-orange" style={{ boxShadow: "0 0 24px 4px rgba(255,106,0,.65)" }} />
        <div
          data-torch
          className="absolute -top-[30px] h-[60px] w-[60px] -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, #fff 0 8%, #ffb066 18%, rgba(255,106,0,.55) 38%, transparent 70%)" }}
        />
      </div>
      <div className="wrap absolute inset-x-0 bottom-1/2 flex items-end justify-between pb-5">
        <div className="overflow-hidden">
          <div data-row className="mono text-[11px] text-mute">
            Jagwati Metals Engineering LLP
          </div>
        </div>
        <div className="overflow-hidden">
          <div data-row className="mono text-[11px] text-mute">
            Palwal · Haryana
          </div>
        </div>
      </div>
      <div className="wrap absolute inset-x-0 top-1/2 flex items-start justify-between pt-4">
        <div className="overflow-hidden">
          <div data-row className="display text-[clamp(56px,13vw,200px)] leading-none text-bone">
            <span data-num>0000</span>
            <span className="ml-2 align-top text-[0.3em] text-orange">MT</span>
          </div>
        </div>
        <div className="overflow-hidden pt-2">
          <div data-row className="mono text-right text-[11px] text-mute">
            Annual
            <br />
            capacity
          </div>
        </div>
      </div>
    </div>
  );
}
