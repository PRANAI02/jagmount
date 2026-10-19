"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

/**
 * One engine for every declarative animation on a page. Server components
 * just tag elements:
 *   data-split          masked line reveal
 *   data-reveal         fade + rise (data-delay="0.2")
 *   data-stagger        children rise one after another
 *   data-clip           media fades in while settling from a slight zoom
 *   data-parallax="8"   yPercent drift while scrolling
 *   data-count="6000"   number counts up (data-decimals, data-format="in")
 *   data-draw           every path / line inside draws itself
 *   data-dim            CAD dimension line extends
 *
 * Everything animates transform and opacity only, so it stays on the
 * compositor and never forces a repaint mid-scroll.
 */
const EASE = "power3.out";

export default function Animator() {
  useEffect(() => {
    let ctx: gsap.Context | undefined;
    let cancelled = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = () => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        const q = <T extends Element = HTMLElement>(s: string) => Array.from(document.querySelectorAll<T & Element>(s)) as T[];

        if (reduce) {
          q("[data-count]").forEach((el) => {
            el.textContent = fmt(Number(el.dataset.count), el.dataset.format, Number(el.dataset.decimals || 0));
          });
          return;
        }

        q("[data-split]").forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            onSplit(self) {
              return gsap.from(self.lines, {
                yPercent: 100,
                duration: 0.9,
                ease: EASE,
                stagger: 0.07,
                delay: Number(el.dataset.delay || 0),
                scrollTrigger: { trigger: el, start: "top 92%", once: true },
              });
            },
          });
        });

        // clearProps: once settled, drop the transform so Safari re-rasterises at full resolution
        q("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 24,
            autoAlpha: 0,
            duration: 0.8,
            ease: EASE,
            clearProps: "transform",
            delay: Number(el.dataset.delay || 0),
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
        });

        q("[data-stagger]").forEach((el) => {
          gsap.from(el.children, {
            y: 24,
            autoAlpha: 0,
            duration: 0.7,
            ease: EASE,
            stagger: Number(el.dataset.stagger || 0.06),
            clearProps: "transform",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        q("[data-clip]").forEach((el) => {
          const media = el.querySelector("img, video, [data-clip-media]");
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 90%", once: true } });
          tl.from(el, { autoAlpha: 0, y: 20, duration: 0.9, ease: EASE, clearProps: "transform" });
          if (media) tl.from(media, { scale: 1.08, duration: 1.4, ease: "power2.out", clearProps: "transform" }, 0);
        });

        q("[data-parallax]").forEach((el) => {
          const amt = Number(el.dataset.parallax || 8);
          gsap.fromTo(
            el,
            { yPercent: -amt },
            { yPercent: amt, ease: "none", force3D: true, scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });

        q("[data-count]").forEach((el) => {
          const end = Number(el.dataset.count);
          const dec = Number(el.dataset.decimals || 0);
          const o = { v: 0 };
          el.textContent = fmt(0, el.dataset.format, dec);
          gsap.to(o, {
            v: end,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 95%", once: true },
            onUpdate: () => void (el.textContent = fmt(o.v, el.dataset.format, dec)),
          });
        });

        q<SVGElement>("[data-draw]").forEach((el) => {
          const parts = el.querySelectorAll("path, line, polyline, rect, circle");
          gsap.from(parts, {
            drawSVG: 0,
            duration: 1.3,
            ease: "power2.inOut",
            stagger: 0.03,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        q("[data-dim]").forEach((el) => {
          gsap.from(el, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.1,
            ease: "power2.inOut",
            scrollTrigger: { trigger: el, start: "top 95%", once: true },
          });
        });
      });
      ScrollTrigger.refresh();
    };

    const start = () => document.fonts.ready.then(() => requestAnimationFrame(run));
    if (window.__jmReady) start();
    else window.addEventListener("jm:ready", start, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("jm:ready", start);
      ctx?.revert();
    };
  }, []);

  return null;
}

function fmt(v: number, format?: string, dec = 0) {
  if (format === "in") return Math.round(v).toLocaleString("en-IN");
  return dec ? v.toFixed(dec) : Math.round(v).toString();
}
