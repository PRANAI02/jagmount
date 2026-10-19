"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { company, journeys, mailHref, metrics, nav, telHref, whatsapp } from "@/lib/content";

const ticker = [
  "DPIIT recognised",
  "Udyam registered MSME",
  "Designed to AISC & Indian Standards",
  "STAAD Pro · Tekla · AutoCAD",
  "Hypertherm Maxpro 200 CNC plasma",
  `${metrics.delivered} projects delivered`,
  "PEB supply & erection · Fabrication jobwork",
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const progress = useRef<HTMLDivElement>(null);

  // hide on scroll down, show on scroll up. Only tween when the direction flips,
  // and batch the work into one rAF per frame.
  useEffect(() => {
    let last = window.scrollY;
    let hidden = false;
    let queued = false;
    const update = () => {
      queued = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      const el = bar.current;
      if (!el) return;
      el.dataset.solid = y > 20 ? "1" : "0";
      const hide = y > last && y > 300;
      if (Math.abs(y - last) > 4 && hide !== hidden) {
        hidden = hide;
        gsap.to(el, { yPercent: hide ? -100 : 0, duration: 0.45, ease: "power2.out", overwrite: true });
      }
      last = y;
    };
    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const m = menu.current!;
    tl.current = gsap
      .timeline({ paused: true })
      .set(m, { visibility: "visible" })
      .fromTo(m.querySelector("[data-m-panel]"), { yPercent: -100 }, { yPercent: 0, duration: 0.55, ease: "power3.inOut" })
      .fromTo(m.querySelectorAll("[data-m-item]"), { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out", stagger: 0.04 }, "-=0.2");
  }, []);

  useEffect(() => {
    if (open) {
      window.__lenis?.stop();
      tl.current?.timeScale(1).play();
    } else {
      window.__lenis?.start();
      tl.current?.timeScale(1.5).reverse();
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
        className="fixed inset-x-0 top-0 z-[70] border-b border-transparent bg-white/95 transition-[border-color,box-shadow] duration-300 data-[solid=1]:border-[var(--line)] data-[solid=1]:shadow-[0_6px_24px_-18px_rgba(0,0,0,.35)]"
      >
        <div className="hidden h-8 items-center border-b border-[var(--line)] bg-graphite text-[10px] md:flex">
          <a href={telHref} className="wrap mono flex shrink-0 items-center gap-2 text-bone hover:text-orange">
            <span className="h-1.5 w-1.5 bg-orange" />
            {company.phone}
          </a>
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <div className="marquee-track mono flex w-max gap-10 whitespace-nowrap text-mute" style={{ ["--dur" as string]: "60s" }}>
              {[0, 1].map((k) => (
                <span key={k} className="flex gap-10" aria-hidden={k === 1}>
                  {ticker.map((t) => (
                    <span key={t} className="flex items-center gap-10">
                      {t}
                      <span className="h-1 w-1 rotate-45 bg-orange/70" />
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
          <a href={mailHref} className="wrap mono shrink-0 text-bone hover:text-orange">
            {company.email}
          </a>
        </div>
        <div className="wrap flex h-[76px] items-center justify-between gap-6 md:h-[88px]">
          <Link href="/" aria-label="Jagmount Projects home" className="relative z-10 shrink-0">
            <Image src="/img/site/logo-dark.png" alt="Jagmount Projects" width={1749} height={582} priority className="h-11 w-auto md:h-14" />
          </Link>

          <nav className="hidden items-center xl:flex" aria-label="Primary">
            {nav.slice(1).map((n) => {
              const active = pathname === n.href;
              return (
                <Link key={n.href} href={n.href} className="group relative px-3.5 py-2">
                  <span className={`text-[15px] transition-colors duration-200 group-hover:text-orange ${active ? "text-orange" : "text-bone"}`}>{n.label}</span>
                  <span
                    className={`absolute inset-x-3.5 -bottom-0.5 h-[2px] origin-left bg-orange transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={journeys.fab.href}
              className="hidden border border-[var(--line-strong)] px-4 py-3 text-[13px] font-medium transition-colors hover:border-orange hover:text-orange lg:inline-flex"
            >
              Fabrication pricing
            </Link>
            <Link
              href={journeys.peb.href}
              className="hidden bg-orange px-4 py-3 text-[13px] font-medium text-white transition-colors hover:bg-night sm:inline-flex"
            >
              {journeys.peb.cta}
            </Link>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-10 flex h-12 w-12 flex-col items-center justify-center gap-[6px] border border-[var(--line-strong)] xl:hidden"
            >
              <span className={`h-[2px] w-5 bg-bone transition-transform duration-300 ${open ? "translate-y-[4px] rotate-45" : ""}`} />
              <span className={`h-[2px] w-5 bg-bone transition-transform duration-300 ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
        <div ref={progress} className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-orange" style={{ transform: "scaleX(0)" }} />
      </header>

      <div ref={menu} className="fixed inset-0 z-[65] xl:hidden" style={{ visibility: "hidden" }} data-lenis-prevent>
        <div data-m-panel className="absolute inset-0 bg-white" />
        <div className="wrap relative flex h-full flex-col justify-between overflow-y-auto pb-8 pt-28">
          <ul className="space-y-1">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} data-m-item className="block py-1.5" onClick={() => n.href === pathname && setOpen(false)}>
                  <span className={`display text-[clamp(30px,8vw,48px)] ${pathname === n.href ? "text-orange" : "text-bone"}`}>{n.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 space-y-3">
            <Link data-m-item href={journeys.peb.href} className="flex justify-between bg-orange px-5 py-4 font-medium text-white">
              {journeys.peb.cta} <span>→</span>
            </Link>
            <Link data-m-item href={journeys.fab.href} className="flex justify-between bg-night px-5 py-4 font-medium text-white">
              {journeys.fab.cta} <span>→</span>
            </Link>
            <div data-m-item className="grid grid-cols-2 gap-3 pt-3 text-sm">
              <a href={telHref} className="border border-[var(--line-strong)] px-4 py-3">
                Call {company.phone}
              </a>
              <a href={whatsapp()} target="_blank" rel="noreferrer" className="border border-[var(--line-strong)] px-4 py-3">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
