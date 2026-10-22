import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import IndiaMap from "@/components/IndiaMap";
import Lightbox from "@/components/Lightbox";
import Button from "@/components/Button";
import { capabilities, certificates, codes, company, journeys, metrics, operations, projectStatesText, why } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Jagmount Projects is the PEB arm of Jagwati Metals Engineering LLP: 5+ years in pre-engineered buildings, founders with 20+ years in construction, and a 6000 MT plant in Palwal, Haryana.",
};

// Drop portraits into public/img/founders/ and set `photo`; without one, the name is shown on its own (no placeholder).
const founders: { name: string; photo?: string }[] = company.founders.map((name) => ({ name }));

const facts: [string, string][] = [
  ["Legal entity", company.legal],
  ["Brand", company.name],
  ["Founders", company.founders.join(", ")],
  ["Experience", `${metrics.pebYears} years in pre-engineered buildings; founders with ${metrics.founderYears} years in construction and infrastructure`],
  ["Projects delivered", metrics.delivered],
  ["Manufacturing unit", company.plant.join(", ")],
  ["Annual capacity", `${metrics.capacity} MT of structural steel`],
  ["In-house operations", operations.join(" · ")],
  ...capabilities.slice(0, 3),
  ["Head office", company.headOffice.join(", ")],
  ["Registrations", "DPIIT recognised · Udyam registered (MSME)"],
  ["Design codes", "AISC · Indian Standards"],
  ["Software", "STAAD Pro · Tekla Structures · AutoCAD"],
];

const approach = [
  { t: "Safety First", b: "Every design starts from load paths, wind and seismic checks." },
  { t: "Optimised Engineering", b: "Sections and spacing sized so steel goes where it works." },
  { t: "Precision Detailing", b: "Shop drawings detailed so members fit first time on site." },
  { t: "Compliance & Quality", b: "Designed to AISC and Indian Standards, checked at every stage." },
];

export default function About() {
  return (
    <>
      <PageHero
        kicker="About Jagmount"
        title="About Jagmount"
        img="/img/site/crane-hall.jpg"
        imgAlt="Inside a steel building with an overhead crane"
        intro="Jagmount (Jagwati Metals Engineering LLP) provides pre-engineered building solutions for industrial and warehousing developments, from concept and design to project completion, with fabrication in our own plant."
        meta={[
          ["In PEB", `${metrics.pebYears} years`],
          ["Founders", `${metrics.founderYears} years`],
          ["Delivered", `${metrics.delivered} projects`],
          ["Capacity", `${metrics.capacity} MT/yr`],
        ]}
      />

      {/* company at a glance */}
      <section className="wrap grid gap-10 border-t border-[var(--line)] py-14 md:py-20 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionHead
            label="Our company"
            title="Company at a glance"
            intro="We provide complete solutions for PEB projects: design, fabrication, supply and erection. Our engineering, fabrication and erection teams work as one, so the building approved on drawing is the building delivered on site."
          />
          <div className="mt-8 flex flex-wrap gap-3" data-reveal>
            <Button href={journeys.peb.href}>{journeys.peb.cta}</Button>
            <Button href="/projects" variant="ghost">
              Our projects
            </Button>
          </div>
        </div>
        <dl className="border-t border-[var(--line)]" data-stagger="0.03">
          {facts.map(([k, v]) => (
            <div key={k} className="grid gap-1 border-b border-[var(--line)] py-3.5 sm:grid-cols-[180px_1fr]">
              <dt className="text-[14px] text-mute">{k}</dt>
              <dd className="text-[15px] font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* founders */}
      <section className="bg-graphite py-14 md:py-20">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className={`grid gap-6 ${founders.some((f) => f.photo) ? "grid-cols-2" : "content-center sm:grid-cols-2"}`} data-stagger>
            {founders.map((f) => (
              <figure key={f.name}>
                {f.photo ? (
                  <div className="relative mb-3 aspect-[4/5] overflow-hidden bg-steel">
                    <Image src={f.photo} alt={f.name} fill sizes="(min-width:1024px) 20vw, 50vw" className="object-cover" />
                  </div>
                ) : (
                  <span className="mb-4 block h-1.5 w-10 bg-orange" />
                )}
                <figcaption>
                  <div className="text-xl font-semibold">{f.name}</div>
                  <div className="text-[14px] text-mute">Founder · {company.legal}</div>
                </figcaption>
              </figure>
            ))}
          </div>
          <div>
            <SectionHead label="Founder's message" title="From our founders" />
            <blockquote className="mt-6 space-y-4 text-[17px] leading-relaxed text-bone/80" data-reveal>
              <p>
                &ldquo;At Jagmount by Jagwati Metals Engineering LLP, we don&apos;t just build structures; we craft narratives of innovation and sustainability.
                It is our privilege to lead a team that turns visions into reality, curating each project with craftsmanship and integrity.&rdquo;
              </p>
              <p>
                &ldquo;We believe the seamless integration of talent and technology is the cornerstone of our success. Our journey doesn&apos;t end with
                construction; it begins with the impact we make on communities and the environment.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* codes & software */}
      <section className="wrap py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <SectionHead
            label="Design codes & software"
            title="Design codes and software"
            intro="Every structure is engineered for safety and performance to internationally recognised standards, using modern design software."
          />
          <div className="grid content-start gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2" data-stagger>
            {codes.map((c, i) => (
              <div key={c.title} className={`bg-white p-5 md:p-6 ${i === 0 ? "sm:col-span-2" : ""}`}>
                <div className="mono mb-3 text-[10px] text-mute">{i < 2 ? "Design code" : "Software"}</div>
                <div className="text-xl font-semibold">{c.title}</div>
                <p className="mt-1 text-sm text-bone/60">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4" data-stagger>
          {approach.map((a, i) => (
            <div key={a.t} className="bg-graphite p-6">
              <svg viewBox="0 0 40 40" className="mb-5 h-9 w-9" data-draw aria-hidden>
                {i === 0 && <path d="M20 4 34 10v10c0 8-6 14-14 16C12 34 6 28 6 20V10z" fill="none" stroke="#ec6411" strokeWidth="2" />}
                {i === 1 && <path d="M4 34h32M8 34V18l12-12 12 12v16M14 34V24h12v10" fill="none" stroke="#ec6411" strokeWidth="2" />}
                {i === 2 && <path d="M6 6h28v28H6zM6 20h28M20 6v28M12 12l16 16" fill="none" stroke="#ec6411" strokeWidth="2" />}
                {i === 3 && <path d="M6 21l9 9L34 10" fill="none" stroke="#ec6411" strokeWidth="3" />}
              </svg>
              <h3 className="text-lg font-semibold">{a.t}</h3>
              <p className="mt-1.5 text-sm text-bone/65">{a.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* presence */}
      <section className="bg-graphite py-14 md:py-20">
        <div className="wrap grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="mx-auto w-full max-w-[500px] lg:order-2">
            <IndiaMap className="h-auto w-full" />
          </div>
          <div>
            <SectionHead label="Our presence" title="Our presence" intro={`Manufacturing in Haryana, with projects delivered across ${projectStatesText}.`} />
            <div className="mt-8 grid gap-6 sm:grid-cols-2" data-stagger>
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
      <section className="wrap py-14 md:py-20">
        <SectionHead label="Why us" title="Why choose us" className="mb-8" />
        <ul className="border-t border-[var(--line)]">
          {why.map((w) => (
            <li key={w.title} className="grid gap-2 border-b border-[var(--line)] py-5 md:grid-cols-[60px_1fr_1.2fr] md:items-baseline" data-reveal>
              <span className="h-1.5 w-8 bg-orange" />
              <h3 className="text-xl font-semibold">{w.title}</h3>
              <p className="text-bone/65">{w.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* certificates */}
      <section className="wrap border-t border-[var(--line)] py-14 md:py-20">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead label="Certificates" title="Our certificates" />
          <p className="max-w-sm text-bone/65" data-reveal>
            Government registrations and completion certificates issued by the clients we have built for.
          </p>
        </div>
        <Lightbox
          items={certificates.map((c) => ({ src: c.img, cap: c.title, sub: c.by }))}
          className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6"
          tileClass="aspect-[3/4] bg-graphite"
          contain
        />
      </section>
    </>
  );
}
