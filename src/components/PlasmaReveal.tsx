"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * A full-bleed photo that is "plasma cut" open as you scroll: a slanted cover
 * slides off to the right with a glowing cut edge and a light shower of sparks.
 * The cover moves by transform only, so the photo is never repainted mid-scroll.
 */
export default function PlasmaReveal({ src, alt, children }: { src: string; alt: string; children?: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const cover = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = root.current!;
    const cv = canvas.current!;
    const cov = cover.current!;
    const g = cv.getContext("2d")!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cov.style.display = "none";
      return;
    }
    let w = 0;
    let h = 0;
    const dpr = Math.min(devicePixelRatio, 1.5);
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

    const SL = 0.18; // slant as a fraction of width
    let target = 0;
    let p = 0;
    let inView = false;
    type S = { x: number; y: number; vx: number; vy: number; life: number };
    const sparks: S[] = [];
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      end: "top 15%",
      onUpdate: (s) => (target = s.progress),
      onToggle: (s) => (inView = s.isActive),
    });
    const io = new IntersectionObserver(([e]) => (inView = e.isIntersecting));
    io.observe(el);

    const tick = (_t: number, dtMs: number) => {
      if (!inView && !sparks.length) return;
      const dt = Math.min(dtMs / 1000, 0.05);
      const prev = p;
      p += (target - p) * Math.min(1, dt * 8);
      if (Math.abs(target - p) < 0.0005) p = target;
      // the cover's slanted left edge sits at the cut: x(top) = (p(1+SL) - SL) * w
      const xt = (p * (1 + SL) - SL) * w;
      cov.style.transform = `translate3d(${xt}px,0,0)`;
      const cutting = p > 0.001 && p < 0.999;
      if (cutting) {
        const speed = Math.abs(p - prev) / Math.max(dt, 0.001);
        const ty = ((performance.now() / 700) % 1) * h;
        const tx = xt + (ty / h) * SL * w;
        const n = Math.min(5, 1 + speed * 14);
        for (let i = 0; i < n; i++) {
          const a = Math.PI * 0.15 + Math.random() * Math.PI * 0.7;
          const sp = 120 + Math.random() * 320;
          sparks.push({ x: tx, y: ty, vx: Math.cos(a) * sp * (Math.random() < 0.5 ? -1 : 1), vy: Math.sin(a) * sp * 0.6 - 40, life: 0.3 + Math.random() * 0.5 });
        }
      }
      if (!sparks.length) return;
      g.clearRect(0, 0, w, h);
      g.globalCompositeOperation = "lighter";
      g.lineWidth = 1.5;
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
        const al = Math.min(1, s.life * 2);
        g.strokeStyle = `rgba(255,${150 + Math.floor(al * 90)},${Math.floor(al * 120)},${al})`;
        g.beginPath();
        g.moveTo(px, py);
        g.lineTo(s.x, s.y);
        g.stroke();
      }
      if (!sparks.length) g.clearRect(0, 0, w, h);
      if (sparks.length > 220) sparks.splice(0, sparks.length - 220);
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      st.kill();
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={root} className="relative h-[60svh] overflow-hidden bg-night md:h-[80svh]">
      <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      {/* cover: a wide panel whose left edge is slanted to match the cut */}
      <div
        ref={cover}
        className="absolute inset-y-0 left-0 w-[260%] will-change-transform"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 7% 100%)", transform: "translate3d(-7%,0,0)" }}
      >
        <div className="blueprint absolute inset-0 bg-graphite" />
        <div
          className="absolute inset-y-0 left-0 w-[7%]"
          style={{
            background: "linear-gradient(to top right, transparent calc(50% - 2px), #ff6a00 calc(50% - 1px), #fff 50%, #ff6a00 calc(50% + 1px), transparent calc(50% + 2px))",
            filter: "drop-shadow(0 0 8px rgba(255,106,0,.9))",
          }}
        />
      </div>
      <canvas ref={canvas} className="pointer-events-none absolute inset-0 h-full w-full" />
      {children && <div className="absolute inset-x-0 bottom-0 text-white">{children}</div>}
    </div>
  );
}
