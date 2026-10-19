"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * A full-bleed photo that is "plasma cut" open as you scroll: a slanted cut
 * line sweeps across, the image appears behind it, and a shower of sparks
 * pours off the torch point.
 */
export default function PlasmaReveal({ src, alt, children }: { src: string; alt: string; children?: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = root.current!;
    const cv = canvas.current!;
    const mediaEl = media.current!;
    const lineEl = line.current!;
    const g = cv.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      mediaEl.style.clipPath = "none";
      lineEl.style.display = "none";
      return;
    }
    let w = 0;
    let h = 0;
    const dpr = Math.min(devicePixelRatio, 2);
    const resize = () => {
      w = el.clientWidth;
      h = el.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const SL = 0.18; // slant as fraction of width
    const state = { p: 0, v: 0 };
    let lastP = 0;
    type S = { x: number; y: number; vx: number; vy: number; life: number };
    const sparks: S[] = [];
    const st = ScrollTrigger.create({
      trigger: el,
      // finish the cut by the time the photo fills the screen
      start: "top 85%",
      end: "top 15%",
      scrub: 0.6,
      onUpdate: (s) => (state.p = s.progress),
    });
    const tick = (_t: number, dtMs: number) => {
      const dt = Math.min(dtMs / 1000, 0.05);
      const p = state.p;
      const speed = Math.abs(p - lastP) / Math.max(dt, 0.001);
      lastP = p;
      // cut x at top / bottom
      const xt = (p * (1 + SL) - SL) * 100;
      const xb = p * (1 + SL) * 100;
      mediaEl.style.clipPath = `polygon(0 0, ${xt}% 0, ${xb}% 100%, 0 100%)`;
      const ang = Math.atan2(h, SL * w) * (180 / Math.PI);
      lineEl.style.transform = `translateX(${(xt / 100) * w}px) rotate(${ang - 90}deg)`;
      lineEl.style.opacity = p > 0.001 && p < 0.999 ? "1" : "0";
      // torch point travels down the cut line
      const ty = ((performance.now() / 600) % 1) * h;
      const tx = (xt / 100) * w + (ty / h) * SL * w;
      if (p > 0.001 && p < 0.999) {
        const n = Math.min(10, 2 + speed * 30);
        for (let i = 0; i < n; i++) {
          const a = Math.PI * 0.15 + Math.random() * Math.PI * 0.7;
          const sp = 120 + Math.random() * 380;
          sparks.push({
            x: tx,
            y: ty,
            vx: Math.cos(a) * sp * (Math.random() < 0.5 ? -1 : 1),
            vy: Math.sin(a) * sp * 0.6 - 40,
            life: 0.4 + Math.random() * 0.6,
          });
        }
      }
      g.clearRect(0, 0, w, h);
      g.globalCompositeOperation = "lighter";
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life -= dt;
        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        s.vy += 900 * dt;
        const px = s.x;
        const py = s.y;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        const a = Math.min(1, s.life * 2);
        g.strokeStyle = `rgba(255,${150 + Math.floor(a * 90)},${Math.floor(a * 120)},${a})`;
        g.lineWidth = 1.6;
        g.beginPath();
        g.moveTo(px, py);
        g.lineTo(s.x, s.y);
        g.stroke();
      }
      if (sparks.length > 600) sparks.splice(0, sparks.length - 600);
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      st.kill();
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={root} className="relative h-[75svh] overflow-hidden bg-steel md:h-[90svh]">
      <div className="blueprint absolute inset-0 opacity-60" />
      <div ref={media} className="absolute inset-0" style={{ clipPath: "polygon(0 0,0 0,0 100%,0 100%)" }}>
        <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
      </div>
      <div
        ref={line}
        className="pointer-events-none absolute left-0 top-0 h-[200%] w-[3px] origin-top bg-orange opacity-0"
        style={{ boxShadow: "0 0 20px 6px rgba(255,106,0,.8), 0 0 4px 1px #fff" }}
      />
      <canvas ref={canvas} className="pointer-events-none absolute inset-0 h-full w-full" />
      {children && <div className="absolute inset-x-0 bottom-0">{children}</div>}
    </div>
  );
}
