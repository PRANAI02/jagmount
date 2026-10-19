"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

export type Shot = { src: string; cap: string; sub?: string };

/**
 * Grid of thumbnails that open into a full-screen viewer. The viewer opens
 * from the clicked tile, supports arrows / Esc / swipe.
 */
export default function Lightbox({
  items,
  className = "",
  tileClass = "aspect-[4/3]",
  contain = false,
}: {
  items: Shot[];
  className?: string;
  tileClass?: string;
  contain?: boolean;
}) {
  const [idx, setIdx] = useState<number | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const touch = useRef(0);

  const close = useCallback(() => {
    gsap.to(box.current, {
      autoAlpha: 0,
      duration: 0.35,
      onComplete: () => {
        setIdx(null);
        window.__lenis?.start();
      },
    });
  }, []);

  const go = useCallback((d: number) => setIdx((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (idx === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [idx, close, go]);

  useEffect(() => {
    if (idx === null || !box.current) return;
    gsap.fromTo(
      box.current.querySelector("[data-lb-img]"),
      { scale: 0.94, autoAlpha: 0, clipPath: "inset(0 0 100% 0)" },
      { scale: 1, autoAlpha: 1, clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "expo.out" },
    );
  }, [idx]);

  const open = (i: number) => {
    window.__lenis?.stop();
    setIdx(i);
    requestAnimationFrame(() => gsap.fromTo(box.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 }));
  };

  return (
    <>
      <div className={className} data-stagger="0.04">
        {items.map((it, i) => (
          <button
            key={it.src + i}
            onClick={() => open(i)}
            data-cursor="View"
            className={`group relative block w-full overflow-hidden bg-steel text-left ${tileClass}`}
            aria-label={`Open ${it.cap}`}
          >
            <Image
              src={it.src}
              alt={it.cap}
              fill
              sizes="(min-width:1024px) 25vw, 50vw"
              className={`img-steel ${contain ? "object-contain p-3" : "object-cover"} group-hover:scale-105`}
            />
            <span className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/85 p-3 text-[13px] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:translate-y-0">
              {it.cap}
            </span>
          </button>
        ))}
      </div>

      {idx !== null &&
        createPortal(
          <div
            ref={box}
            className="fixed inset-0 z-[110] flex flex-col bg-ink/95 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={items[idx].cap}
            onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              const d = e.changedTouches[0].clientX - touch.current;
              if (Math.abs(d) > 50) go(d < 0 ? 1 : -1);
            }}
          >
            <div className="wrap mono flex h-16 items-center justify-between text-[11px] text-mute">
              <span>
                <span className="text-orange">{String(idx + 1).padStart(2, "0")}</span> / {String(items.length).padStart(2, "0")}
              </span>
              <button onClick={close} className="flex items-center gap-2 text-bone hover:text-orange" aria-label="Close">
                Close
                <span className="text-lg leading-none">×</span>
              </button>
            </div>
            <div className="relative flex-1" onClick={close}>
              <div data-lb-img className="absolute inset-4 md:inset-x-24 md:inset-y-6" onClick={(e) => e.stopPropagation()}>
                <Image src={items[idx].src} alt={items[idx].cap} fill sizes="100vw" className="object-contain" />
              </div>
              <button
                onClick={(e) => (e.stopPropagation(), go(-1))}
                className="absolute left-2 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center border border-[var(--line-strong)] hover:border-orange hover:text-orange md:flex"
                aria-label="Previous"
              >
                ←
              </button>
              <button
                onClick={(e) => (e.stopPropagation(), go(1))}
                className="absolute right-2 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center border border-[var(--line-strong)] hover:border-orange hover:text-orange md:flex"
                aria-label="Next"
              >
                →
              </button>
            </div>
            <div className="wrap flex min-h-16 items-center justify-between gap-4 py-3">
              <span className="text-base">{items[idx].cap}</span>
              {items[idx].sub && <span className="mono text-[11px] text-mute">{items[idx].sub}</span>}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
