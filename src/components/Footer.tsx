import Link from "next/link";
import Image from "next/image";
import { company, journeys, mailHref, nav, telHref, whatsapp } from "@/lib/content";
import { seoPages } from "@/lib/seo-pages";
import Button from "./Button";

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--line)] bg-graphite">
      <section className="wrap grid gap-10 py-16 md:py-20 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <div className="mono mb-4 flex items-center gap-3 text-[11px] text-mute">
            <span className="h-2 w-2 bg-orange" /> Start an enquiry
          </div>
          <h2 className="display text-[clamp(28px,3.6vw,48px)]" data-split>
            Get in touch with our team.
          </h2>
          <p className="mt-4 max-w-lg text-bone/70" data-reveal>
            Building a factory or warehouse, or need structural steel fabricated to your drawings? Choose the route that fits and our team will get back to you.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end" data-reveal>
          <Button href={journeys.peb.href}>{journeys.peb.cta}</Button>
          <Button href={journeys.fab.href} variant="dark">
            {journeys.fab.cta}
          </Button>
        </div>
      </section>

      <div className="wrap grid gap-10 border-t border-[var(--line)] py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Image src="/img/site/logo-dark.png" alt="Jagmount Projects" width={1749} height={582} className="mb-5 h-16 w-auto" />
          <p className="max-w-xs text-sm text-mute">
            {company.legal}. Pre-engineered buildings and structural steel fabrication from our plant in Palwal, Haryana.
          </p>
          <ul className="mt-6 space-y-1.5 text-sm">
            <li>
              <a href={telHref} className="font-medium hover:text-orange">
                {company.phone}
              </a>
            </li>
            <li>
              <a href={whatsapp()} target="_blank" rel="noreferrer" className="hover:text-orange">
                WhatsApp us
              </a>
            </li>
            <li>
              <a href={mailHref} className="hover:text-orange">
                {company.email}
              </a>
            </li>
          </ul>
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
          <div className="mono mb-4 text-[10px] text-orange">Company</div>
          <ul className="space-y-1.5 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="transition-colors hover:text-orange">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mono mb-4 text-[10px] text-orange">Capabilities</div>
          <ul className="space-y-1.5 text-sm">
            {seoPages.map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}`} className="transition-colors hover:text-orange">
                  {p.nav}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="wrap flex flex-col justify-between gap-2 border-t border-[var(--line)] py-6 text-[11px] text-mute sm:flex-row">
        <span className="mono">
          © {new Date().getFullYear()} {company.legal}
        </span>
        <span className="mono">Faridabad · Palwal, Haryana</span>
      </div>
    </footer>
  );
}
