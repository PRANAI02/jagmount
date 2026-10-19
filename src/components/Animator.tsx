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
 *   data-split          masked line reveal (data-split="chars" for characters)
 *   data-scrub-words    words light up as they scroll through the viewport
 *   data-reveal         fade + rise (data-delay="0.2")
 *   data-stagger        children rise one after another
 *   data-clip           image wipes in behind an orange cutting bar
 *   data-parallax="15"  yPercent drift while scrolling
 *   data-count="6000"   number counts up (data-decimals, data-format="in")
 *   data-draw           every path / line inside draws itself
 *   data-dim            CAD dimension line extends
 *   data-scale-in       element scales from 0.85 with clip
 */
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
          const chars = el.dataset.split === "chars";
          SplitText.create(el, {
            type: chars ? "lines,words,chars" : "lines",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            onSplit(self) {
              return gsap.from(chars ? self.chars : self.lines, {
                yPercent: 110,
                rotate: chars ? 6 : 2,
                duration: chars ? 1.1 : 1.2,
                ease: "expo.out",
                stagger: chars ? 0.025 : 0.09,
                delay: Number(el.dataset.delay || 0),
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              });
            },
          });
        });

        q("[data-scrub-words]").forEach((el) => {
          const split = SplitText.create(el, { type: "words" });
          gsap.fromTo(
            split.words,
            { opacity: 0.12 },
            {
              opacity: 1,
              stagger: 0.1,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
            },
          );
        });

        q("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 50,
            autoAlpha: 0,
            duration: 1.1,
            ease: "expo.out",
            delay: Number(el.dataset.delay || 0),
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        q("[data-stagger]").forEach((el) => {
          gsap.from(el.children, {
            y: 60,
            autoAlpha: 0,
            duration: 1,
            ease: "expo.out",
            stagger: Number(el.dataset.stagger || 0.08),
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        q("[data-clip]").forEach((el) => {
          const bar = document.createElement("span");
          bar.className = "pointer-events-none absolute inset-x-0 z-[4] h-[3px] bg-orange";
          bar.style.boxShadow = "0 0 18px 4px rgba(255,106,0,.7)";
          bar.style.top = "100%";
          if (getComputedStyle(el).position === "static") el.style.position = "relative";
          el.appendChild(bar);
          const media = el.querySelector("img, video, [data-clip-media]");
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
          tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" })
            .fromTo(bar, { top: "100%", opacity: 1 }, { top: "0%", duration: 1.3, ease: "expo.inOut" }, 0)
            .to(bar, { opacity: 0, duration: 0.3 }, ">-0.1");
          if (media) tl.fromTo(media, { scale: 1.35 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0);
        });

        q("[data-parallax]").forEach((el) => {
          const amt = Number(el.dataset.parallax || 15);
          gsap.fromTo(
            el,
            { yPercent: -amt },
            { yPercent: amt, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });

        q("[data-count]").forEach((el) => {
          const end = Number(el.dataset.count);
          const dec = Number(el.dataset.decimals || 0);
          const o = { v: 0 };
          el.textContent = fmt(0, el.dataset.format, dec);
          gsap.to(o, {
            v: end,
            duration: 2.2,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
            onUpdate: () => void (el.textContent = fmt(o.v, el.dataset.format, dec)),
          });
        });

        q<SVGElement>("[data-draw]").forEach((el) => {
          const parts = el.querySelectorAll("path, line, polyline, rect, circle");
          gsap.from(parts, {
            drawSVG: 0,
            duration: 1.6,
            ease: "power2.inOut",
            stagger: 0.04,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });

        q("[data-dim]").forEach((el) => {
          gsap.from(el, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.4,
            ease: "expo.inOut",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
        });

        q("[data-scale-in]").forEach((el) => {
          gsap.from(el, {
            scale: 0.86,
            clipPath: "inset(12% 12% 12% 12%)",
            duration: 1.6,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
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
