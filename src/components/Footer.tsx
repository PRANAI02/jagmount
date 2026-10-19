import Link from "next/link";
import Image from "next/image";
import { company, nav, tel } from "@/lib/content";
import Button from "./Button";
import FooterMark from "./FooterMark";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--line)] bg-graphite">
      <div className="blueprint pointer-events-none absolute inset-0 opacity-60" />

      <section className="wrap relative pb-20 pt-24 md:pt-36">
        <div className="mono mb-8 flex items-center gap-3 text-[11px] text-mute">
          <span className="h-2 w-2 bg-orange" /> Start a project
        </div>
        <h2 className="display text-[clamp(44px,10.5vw,190px)]" data-split="chars">
          Let&apos;s get
        </h2>
        <h2 className="display outline-orange text-[clamp(44px,10.5vw,190px)]" data-split="chars" data-delay="0.15">
          in touch.
        </h2>
        <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-lg text-bone/70" data-reveal>
            Send us your plot size, span and timeline. Our engineers will come back with a design concept and a budgetary quote.
          </p>
          <div className="flex flex-wrap gap-3" data-reveal data-delay="0.1">
            <Button href="/contact">Get a quote</Button>
            <Button href={tel(company.phones[0])} variant="ghost">
              {company.phones[0]}
            </Button>
          </div>
        </div>
      </section>

      <div className="wrap relative grid gap-10 border-t border-[var(--line)] py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image src="/img/site/logo-light.png" alt="Jagmount Projects" width={1749} height={582} className="mb-5 h-12 w-auto" />
          <p className="max-w-xs text-sm text-mute">
            {company.legal}. Pre-engineered buildings, structural steel and industrial infrastructure, from design to completion.
          </p>
        </div>
        <div>
          <div className="mono mb-4 text-[10px] text-orange">Head office</div>
          <address className="text-sm not-italic leading-relaxed text-bone/80">
            {company.headOffice.map((l) => (
              <div key={l}>{l}</div>
            ))}
          </address>
          <div className="mono mb-4 mt-6 text-[10px] text-orange">Manufacturing unit</div>
          <address className="text-sm not-italic leading-relaxed text-bone/80">
            {company.plant.map((l) => (
              <div key={l}>{l}</div>
            ))}
          </address>
        </div>
        <div>
          <div className="mono mb-4 text-[10px] text-orange">Contact</div>
          <ul className="space-y-1 text-sm">
            {company.phones.map((p) => (
              <li key={p}>
                <a href={tel(p)} className="transition-colors hover:text-orange">
                  {p}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a href={`mailto:${company.email}`} className="transition-colors hover:text-orange">
                {company.email}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="mono mb-4 text-[10px] text-orange">Index</div>
          <ul className="space-y-1 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="group inline-flex items-center gap-2 transition-colors hover:text-orange">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <FooterMark />

      <div className="wrap relative flex flex-col justify-between gap-2 border-t border-[var(--line)] py-6 text-[11px] text-mute sm:flex-row">
        <span className="mono">
          © {new Date().getFullYear()} {company.legal}
        </span>
        <span className="mono">28.14° N · 77.33° E · Palwal, Haryana</span>
      </div>
    </footer>
  );
}
