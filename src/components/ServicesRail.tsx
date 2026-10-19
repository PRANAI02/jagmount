"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

/**
 * Desktop: the section pins and the service cards travel sideways, each image
 * counter-panning inside its frame. Mobile: a plain vertical stack.
 */
export default function ServicesRail() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const tr = track.current!;
      const dist = () => tr.scrollWidth - innerWidth;
      const tween = gsap.to(tr, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => "+=" + dist(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (s) => {
            const p = root.current!.querySelector<HTMLElement>("[data-rail-progress]");
            if (p) p.style.transform = `scaleX(${s.progress})`;
          },
        },
      });
      tr.querySelectorAll<HTMLElement>("[data-pan]").forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -12 },
          {
            xPercent: 12,
            ease: "none",
            scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          },
        );
      });
    });
    return () => mm.revert();
  }, []);

  // ScrollTrigger's pin wraps the section in a pin-spacer; the outer div keeps
  // React's parent node stable so unmounting on navigation doesn't throw.
  return (
    <div>
      <section ref={root} className="relative overflow-hidden bg-graphite lg:h-[100svh]">
        <div className="blueprint absolute inset-0 opacity-50" />
        <div ref={track} className="relative flex flex-col gap-6 py-24 lg:h-full lg:w-max lg:flex-row lg:items-stretch lg:gap-0 lg:py-0">
          <div className="wrap flex shrink-0 flex-col justify-center lg:w-[42vw] lg:pr-16">
            <div className="mono mb-8 flex items-center gap-3 text-[11px] text-mute">What we do</div>
            <h2 className="display text-[clamp(30px,4.6vw,80px)]">
              <span className="block" data-split>
                Our
              </span>
              <span className="outline-orange block" data-split data-delay="0.1">
                services.
              </span>
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-bone/70 md:text-lg" data-reveal>
              From the first load calculation to the last turbo ventilator, every part of your building comes from one engineering team and one factory.
            </p>
            <div className="mono mt-10 hidden items-center gap-4 text-[10px] text-mute lg:flex">
              <span>Scroll</span>
              <span className="relative h-px w-40 bg-[var(--line-strong)]">
                <span data-rail-progress className="absolute inset-0 origin-left bg-orange" style={{ transform: "scaleX(0)" }} />
              </span>
            </div>
          </div>

          {services.map((s) => (
            <article key={s.slug} className="wrap group relative shrink-0 lg:flex lg:w-[min(46vw,720px)] lg:items-center lg:px-6">
              <Link
                href={`/services#${s.slug}`}
                className="block w-full border border-[var(--line)] bg-ink/60 p-4 transition-colors duration-500 hover:border-orange md:p-6"
                data-cursor="Open"
              >
                <div className="relative aspect-[16/10] overflow-hidden ticks" data-clip>
                  <div data-pan className="absolute inset-[0_-14%]">
                    <Image src={s.img} alt={s.title} fill sizes="(min-width:1024px) 46vw, 100vw" className="img-steel object-cover" />
                  </div>
                </div>
                <div className="mt-6 flex items-start justify-between gap-6">
                  <h3 className="display text-[clamp(24px,2.4vw,38px)]">{s.title}</h3>
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--line-strong)] transition-all duration-500 group-hover:rotate-45 group-hover:border-orange group-hover:bg-orange group-hover:text-ink">
                    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                      <path d="M2 12 12 2M4 2h8v8" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </span>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-bone/70">{s.short}</p>
                <ul className="mono mt-5 flex flex-wrap gap-2 text-[10px] text-mute">
                  {s.points.map((p) => (
                    <li key={p} className="border border-[var(--line)] px-2.5 py-1.5">
                      {p}
                    </li>
                  ))}
                </ul>
              </Link>
            </article>
          ))}
          <div className="hidden w-[10vw] shrink-0 lg:block" />
        </div>
      </section>
    </div>
  );
}
