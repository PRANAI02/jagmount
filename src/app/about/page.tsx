import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import IndiaMap from "@/components/IndiaMap";
import Lightbox from "@/components/Lightbox";
import Button from "@/components/Button";
import { certificates, codes, company, stats, why } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Jagmount Projects is the PEB arm of Jagwati Metals Engineering LLP, founded by professionals with 20+ years in construction and infrastructure.",
};

const approach = [
  { t: "Safety First", b: "Every design starts from load paths, wind and seismic checks before economy." },
  { t: "Optimised Engineering", b: "Tapered sections and tuned spacing put steel only where it works." },
  { t: "Precision Detailing", b: "Shop drawings to the bolt, so members fit first time on site." },
  { t: "Compliance & Quality", b: "Designed to AISC and Indian Standards, checked at every stage." },
];

export default function About() {
  return (
    <>
      <PageHero
        n="01"
        kicker="About Jagmount"
        title="About"
        outline="Jagmount."
        img="/img/site/crane-hall.jpg"
        intro="Jagmount (Jagwati Metals Engineering LLP) is an established provider of pre-engineered building solutions, growing into a reliable partner for industrial and warehousing infrastructure."
        meta={[
          ["Entity", "LLP"],
          ["Experience", "20+ years"],
          ["Plant", "Palwal, HR"],
          ["Capacity", "6000 MT / yr"],
        ]}
      />

      {/* story */}
      <section className="wrap grid gap-16 py-28 md:py-40 lg:grid-cols-[1fr_1.2fr]">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden ticks" data-clip>
            <div className="absolute inset-[-10%_0]" data-parallax="8">
              <Image
                src="/img/site/erection-bw.jpg"
                alt="Steel frame being erected by crane"
                fill
                sizes="(min-width:1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="lg:pt-20">
          <div className="mono mb-10 flex items-center gap-3 text-[11px] text-mute">Our company</div>
          <p className="text-[clamp(24px,2.8vw,42px)] font-medium leading-[1.15] tracking-tight" data-scrub-words>
            Shaping the future of PEB with innovation and excellence. We provide complete solutions for PEB projects, starting from concept and design to
            project completion, built around the needs of industrial and warehousing developments.
          </p>
          <p className="mt-10 max-w-lg text-bone/65" data-reveal>
            With a strong focus on quality and efficiency, our engineering, fabrication and erection teams work as one, so the building you approve on drawing
            is the building you receive on site.
          </p>
        </div>
      </section>

      {/* stats band */}
      <section className="border-y border-[var(--line)] bg-graphite">
        <div className="wrap grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`py-10 md:py-14 ${i % 2 ? "pl-6" : ""} ${i > 0 ? "lg:border-l lg:border-[var(--line)] lg:pl-8" : ""}`}>
              <div className="display text-[clamp(40px,5vw,80px)]">
                <span data-count={s.value} data-format="in">
                  {s.value}
                </span>
                <span className="text-orange">{s.suffix}</span>
              </div>
              <p className="mono mt-2 max-w-[22ch] text-[10px] text-mute">
                {s.unit ? s.unit + " · " : ""}
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* founders */}
      <section className="relative overflow-hidden py-28 md:py-44">
        <div className="blueprint absolute inset-0 opacity-40" />
        <div className="wrap relative">
          <div className="mono mb-12 flex items-center gap-3 text-[11px] text-mute">Founder&apos;s message</div>
          <span
            className="display pointer-events-none absolute -top-8 right-[var(--gutter)] text-[clamp(160px,24vw,420px)] leading-none text-orange/15"
            aria-hidden
          >
            &ldquo;
          </span>
          <blockquote className="relative max-w-5xl">
            <p className="text-[clamp(26px,3.6vw,58px)] font-medium leading-[1.12] tracking-tight" data-scrub-words>
              We don&apos;t just build structures; we craft narratives of innovation and sustainability. Our journey doesn&apos;t end with construction. It
              begins with the impact we make on communities and the environment.
            </p>
            <footer className="mt-14 grid max-w-3xl gap-10 border-t border-[var(--line)] pt-8 sm:grid-cols-2" data-stagger>
              {company.founders.map((f) => (
                <div key={f} className="flex items-center gap-4">
                  <span className="display flex h-14 w-14 items-center justify-center bg-orange text-lg text-ink">
                    {f
                      .replace("Mr. ", "")
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <div>
                    <div className="text-lg font-semibold">{f}</div>
                    <div className="mono text-[10px] text-mute">Founder · {company.legal}</div>
                  </div>
                </div>
              ))}
            </footer>
          </blockquote>
          <p className="mt-14 max-w-2xl text-bone/65" data-reveal>
            It is our privilege to lead a team that turns visions into reality. In our pursuit of excellence we curate each project with craftsmanship and
            integrity, and we believe the seamless integration of talent and technology is the cornerstone of our success.
          </p>
        </div>
      </section>

      {/* codes & software */}
      <section className="wrap border-t border-[var(--line)] py-28 md:py-40">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <SectionHead
            n="03"
            label="Design codes & software"
            title="Design codes"
            outline="& software."
            intro="Every structure is engineered with precision, safety and performance in mind, following internationally recognised standards and modern design software."
          />
          <div className="grid content-start gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2" data-stagger>
            {codes.map((c, i) => (
              <div key={c.title} className={`group bg-ink p-6 transition-colors duration-500 hover:bg-steel md:p-8 ${i === 0 ? "sm:col-span-2" : ""}`}>
                <div className="mono mb-6 flex justify-between text-[10px] text-mute">
                  <span>{i < 2 ? "Design code" : "Software"}</span>
                </div>
                <div className="display text-[clamp(22px,2.2vw,34px)] transition-colors group-hover:text-orange">{c.title}</div>
                <p className="mt-2 text-sm text-bone/60">{c.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4" data-stagger>
          {approach.map((a, i) => (
            <div key={a.t} className="bg-graphite p-6 md:p-8">
              <svg viewBox="0 0 40 40" className="mb-8 h-10 w-10" data-draw aria-hidden>
                {i === 0 && <path d="M20 4 34 10v10c0 8-6 14-14 16C12 34 6 28 6 20V10z" fill="none" stroke="#ff6a00" strokeWidth="2" />}
                {i === 1 && <path d="M4 34h32M8 34V18l12-12 12 12v16M14 34V24h12v10" fill="none" stroke="#ff6a00" strokeWidth="2" />}
                {i === 2 && <path d="M6 6h28v28H6zM6 20h28M20 6v28M12 12l16 16" fill="none" stroke="#ff6a00" strokeWidth="2" />}
                {i === 3 && <path d="M6 21l9 9L34 10" fill="none" stroke="#ff6a00" strokeWidth="3" />}
              </svg>
              <h3 className="text-xl font-semibold">{a.t}</h3>
              <p className="mt-2 text-sm text-bone/60">{a.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* presence */}
      <section className="relative overflow-hidden bg-graphite py-28 md:py-40">
        <div className="blueprint absolute inset-0 opacity-50" />
        <div className="wrap relative grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
          <div className="mx-auto w-full max-w-[560px] lg:order-2">
            <IndiaMap className="h-auto w-full" />
          </div>
          <div>
            <SectionHead n="04" label="Our presence" title="Our" outline="presence." />
            <div className="mt-10 grid gap-6 sm:grid-cols-2" data-stagger>
              <div className="border-l-2 border-orange pl-5">
                <div className="mono text-[10px] text-orange">Head office</div>
                <p className="mt-2 text-bone/80">{company.headOffice.join(", ")}</p>
              </div>
              <div className="border-l-2 border-orange pl-5">
                <div className="mono text-[10px] text-orange">Manufacturing unit</div>
                <p className="mt-2 text-bone/80">{company.plant.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* why */}
      <section className="wrap py-28 md:py-40">
        <SectionHead n="05" label="Why us" title="Why" outline="choose us." className="mb-16" />
        <ul className="border-t border-[var(--line)]">
          {why.map((w) => (
            <li
              key={w.title}
              className="group grid gap-4 border-b border-[var(--line)] py-8 md:grid-cols-[80px_1fr_1fr] md:items-baseline md:py-10"
              data-reveal
            >
              <span className="h-2 w-8 bg-orange" />
              <h3 className="display text-[clamp(24px,3vw,46px)] transition-transform duration-500 group-hover:translate-x-3">{w.title}</h3>
              <p className="text-bone/65">{w.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* certificates */}
      <section className="wrap border-t border-[var(--line)] py-28 md:py-40">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHead n="06" label="Certificates" title="Our" outline="certificates." />
          <p className="max-w-sm text-bone/65" data-reveal>
            Government registrations and completion certificates issued by the clients we have built for.
          </p>
        </div>
        <Lightbox
          items={certificates.map((c) => ({ src: c.img, cap: c.title, sub: c.by }))}
          className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6"
          tileClass="aspect-[3/4] bg-bone/90"
          contain
        />
        <div className="mt-14" data-reveal>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact?type=vendor">Vendor empanelment</Button>
          </div>
        </div>
      </section>
    </>
  );
}
