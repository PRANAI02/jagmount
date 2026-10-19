"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { company, nav, tel } from "@/lib/content";
import Magnetic from "./Magnetic";

const ticker = [
  "DPIIT recognised",
  "Udyam registered MSME",
  "Designed to AISC & Indian Standards",
  "STAAD Pro · Tekla · AutoCAD",
  "Hypertherm Maxpro 200 CNC plasma",
  "20+ projects across 5 states",
  "Turnkey design, supply & erection",
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const progress = useRef<HTMLDivElement>(null);

  // hide on scroll down, show on scroll up; scroll progress hairline
  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      if (!bar.current) return;
      bar.current.dataset.solid = y > 40 ? "1" : "0";
      if (y > last && y > 300) gsap.to(bar.current, { yPercent: -110, duration: 0.5, ease: "power3.out", overwrite: true });
      else gsap.to(bar.current, { yPercent: 0, duration: 0.5, ease: "power3.out", overwrite: true });
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const m = menu.current!;
    tl.current = gsap
      .timeline({ paused: true })
      .set(m, { visibility: "visible" })
      .fromTo(m.querySelectorAll("[data-m-panel]"), { scaleY: 0 }, { scaleY: 1, duration: 0.7, ease: "expo.inOut", stagger: 0.06, transformOrigin: "top" })
      .fromTo(m.querySelectorAll("[data-m-item]"), { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: "expo.out", stagger: 0.05 }, "-=0.35")
      .fromTo(m.querySelectorAll("[data-m-fade]"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.05 }, "-=0.7");
  }, []);

  useEffect(() => {
    if (open) {
      window.__lenis?.stop();
      tl.current?.timeScale(1).play();
    } else {
      window.__lenis?.start();
      tl.current?.timeScale(1.6).reverse();
    }
  }, [open]);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("jm:navstart", close);
    return () => window.removeEventListener("jm:navstart", close);
  }, []);

  return (
    <>
      <header
        ref={bar}
        data-solid="0"
        className="group/h fixed inset-x-0 top-0 z-[70] transition-[background-color,backdrop-filter] duration-500 data-[solid=1]:bg-ink/70 data-[solid=1]:backdrop-blur-md"
      >
        <div className="hidden h-8 items-center border-b border-[var(--line)] bg-graphite/80 text-[10px] md:flex">
          <div className="wrap mono flex shrink-0 items-center gap-2 text-orange">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-orange" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-orange" />
            </span>
            Palwal plant · 6000 MT / yr
          </div>
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <div className="marquee-track mono flex w-max gap-10 whitespace-nowrap text-mute" style={{ ["--dur" as string]: "50s" }}>
              {[0, 1].map((k) => (
                <span key={k} className="flex gap-10" aria-hidden={k === 1}>
                  {ticker.map((t) => (
                    <span key={t} className="flex items-center gap-10">
                      {t}
                      <span className="h-1 w-1 rotate-45 bg-orange/60" />
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="wrap flex h-[72px] items-center justify-between gap-6 md:h-[76px]">
          <Link href="/" aria-label="Jagmount Projects home" className="relative z-10 shrink-0">
            <Image src="/img/site/logo-light.png" alt="Jagmount Projects" width={1749} height={582} priority className="h-9 w-auto md:h-11" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.slice(1).map((n) => {
              const active = pathname === n.href;
              return (
                <Link key={n.href} href={n.href} className="group relative px-4 py-2">
                  <span className="relative inline-block overflow-hidden align-bottom text-[14px] font-medium">
                    <span className="block transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:-translate-y-full">{n.label}</span>
                    <span className="absolute inset-0 block translate-y-full text-orange transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:translate-y-0">
                      {n.label}
                    </span>
                  </span>
                  {active && <span className="absolute inset-x-4 -bottom-0.5 h-[2px] bg-orange" />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block">
              <Magnetic>
                <Link
                  href="/contact"
                  className="mono inline-flex items-center gap-2 bg-orange px-5 py-3 text-[11px] font-medium text-ink transition-colors hover:bg-bone"
                >
                  <span className="h-1.5 w-1.5 bg-ink" />
                  Request a quote
                </Link>
              </Magnetic>
            </span>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-10 flex h-12 w-12 flex-col items-center justify-center gap-[6px] border border-[var(--line-strong)] lg:hidden"
            >
              <span className={`h-[2px] w-5 bg-bone transition-transform duration-500 ${open ? "translate-y-[4px] rotate-45" : ""}`} />
              <span className={`h-[2px] w-5 bg-bone transition-transform duration-500 ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
        <div ref={progress} className="absolute bottom-0 left-0 h-px w-full origin-left bg-orange" style={{ transform: "scaleX(0)" }} />
      </header>

      <div ref={menu} className="fixed inset-0 z-[65] lg:hidden" style={{ visibility: "hidden" }} data-lenis-prevent>
        <div className="absolute inset-0 flex">
          {[0, 1, 2].map((i) => (
            <div key={i} data-m-panel className="h-full flex-1 bg-graphite" />
          ))}
        </div>
        <div className="blueprint absolute inset-0 opacity-50" />
        <div className="wrap relative flex h-full flex-col justify-between overflow-y-auto pb-8 pt-28">
          <ul className="space-y-1">
            {nav.map((n) => (
              <li key={n.href} className="overflow-hidden">
                <Link href={n.href} data-m-item className="flex items-baseline gap-4 py-1" onClick={() => n.href === pathname && setOpen(false)}>
                  <span className={`display text-[clamp(40px,11vw,80px)] ${pathname === n.href ? "text-orange" : "text-bone"}`}>{n.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-[var(--line)] pt-6 text-sm">
            <div data-m-fade>
              <div className="mono mb-2 text-[10px] text-mute">Call</div>
              {company.phones.map((p) => (
                <a key={p} href={tel(p)} className="block">
                  {p}
                </a>
              ))}
            </div>
            <div data-m-fade>
              <div className="mono mb-2 text-[10px] text-mute">Write</div>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
