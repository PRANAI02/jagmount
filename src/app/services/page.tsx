import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import FrameTypes from "@/components/FrameTypes";
import Button from "@/components/Button";
import ProcessLine from "@/components/ProcessLine";
import { seoPages } from "@/lib/seo-pages";
import { accessories, accessoryList, advantages, components, journeys, machines, sectors, secondary, services, workTypes, type Spec } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Two service lines: complete pre-engineered industrial buildings (design, supply and erection), and structural steel fabrication jobwork to your drawings from our Palwal plant.",
};

function SpecTable({ specs }: { specs: Spec }) {
  return (
    <table className="mt-3 w-full border-collapse text-[13px]">
      <tbody>
        {specs.map(([k, v]) => (
          <tr key={k} className="border-t border-[var(--line)]">
            <th scope="row" className="py-1.5 pr-3 text-left font-normal text-mute">
              {k}
            </th>
            <td className="py-1.5 text-right">{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const workBodies: Record<string, string> = {
  "Built-up beams": "Welded I-sections from CNC-cut plate, assembled on the H-beam line.",
  Columns: "Straight and tapered built-up columns, including box columns.",
  Rafters: "Tapered and straight rafters for portal frames.",
  "Crane beams": "Crane girders and brackets for crane buildings.",
  Platforms: "Platforms, walkways and mezzanine steel.",
  "Other structural steel": "Plates, gussets, base plates and members fabricated to drawing.",
};

function Related({ journey }: { journey: "peb" | "fab" }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-2 text-[14px]">
      <span className="text-mute">Related:</span>
      {seoPages
        .filter((p) => p.journey === journey)
        .map((p) => (
          <Link key={p.slug} href={`/${p.slug}`} className="border border-[var(--line-strong)] px-3 py-1.5 hover:border-orange hover:text-orange">
            {p.nav}
          </Link>
        ))}
    </div>
  );
}

export default function Services() {
  const green = services.find((s) => s.slug === "green")!;
  return (
    <>
      <PageHero
        kicker="Services"
        title="Our services"
        img="/img/site/frames-wide.jpg"
        imgAlt="Primary steel frames erected on site"
        intro="Two service lines from one engineering team and one plant. Choose the one that fits you."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <a href="#peb-buildings" className="group border border-[var(--line-strong)] p-4 transition-colors hover:border-orange">
            <div className="mono text-[10px] text-orange">Owners & developers</div>
            <div className="mt-1 font-semibold">{journeys.peb.title} ↓</div>
          </a>
          <a href="#fabrication-jobwork" className="group border border-[var(--line-strong)] p-4 transition-colors hover:border-orange">
            <div className="mono text-[10px] text-orange">PEB makers, EPCs, fabricators</div>
            <div className="mt-1 font-semibold">{journeys.fab.title} ↓</div>
          </a>
        </div>
      </PageHero>

      {/* ============ PART 1: PEB ============ */}
      <section id="peb-buildings" className="scroll-mt-24 border-t-4 border-orange bg-graphite py-14 md:py-20">
        <div className="wrap grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <div className="mono mb-3 text-[11px] text-orange">Part 1 · For factory & warehouse owners, developers and consultants</div>
            <h2 className="display text-[clamp(28px,3.6vw,46px)]" data-split>
              Pre-engineered & industrial buildings
            </h2>
            <p className="mt-5 max-w-xl text-bone/75 md:text-lg" data-reveal>
              {services[0].body}
            </p>
            <div className="mt-7" data-reveal>
              <Button href={journeys.peb.href}>{journeys.peb.cta}</Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-steel" data-clip>
            <Image src="/img/gallery/g23.jpg" alt="Completed pre-engineered building with ridge ventilators and roll-up doors" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="wrap py-14 md:py-20">
        <SectionHead label="Components of PEB" title="Components of a PEB" className="mb-8" />
        <div className="grid gap-px border border-[var(--line)] bg-[var(--line)] md:grid-cols-2 lg:grid-cols-4" data-stagger>
          {components.map((c) => (
            <div key={c.n} className="bg-white p-6">
              <span className="mb-5 block h-1.5 w-8 bg-orange" />
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-[15px] text-bone/70">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap pb-14 md:pb-20">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHead label="Structural frames" title="Structural frames" />
          <p className="max-w-md text-bone/70" data-reveal>
            Clear span to multi-gable and single slope, each designed for strength, stability and your building&apos;s requirements.
          </p>
        </div>
        <FrameTypes />
      </section>

      <section className="wrap pb-14 md:pb-20">
        <SectionHead label="Advantages of PEB" title="Advantages of PEB" className="mb-8" />
        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
          {advantages.map((a) => (
            <div key={a.title} className="border-t border-[var(--line-strong)] pt-5">
              <h3 className="text-lg font-semibold">{a.title}</h3>
              <p className="mt-2 text-bone/65">{a.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="secondary" className="wrap scroll-mt-24 border-t border-[var(--line)] py-14 md:py-20">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead label="Secondary members & cladding" title="Secondary members" />
          <p className="max-w-md text-bone/65" data-reveal>
            {services[2].body}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
          {secondary.map((p) => (
            <article key={p.title} className="border border-[var(--line)] p-4">
              <div className="relative aspect-[4/3] overflow-hidden bg-graphite">
                <Image src={p.img} alt={p.title} fill sizes="(min-width:1024px) 30vw, 50vw" className="object-contain p-4" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
              <SpecTable specs={p.specs} />
            </article>
          ))}
        </div>
      </section>

      <section id="accessories" className="wrap scroll-mt-24 border-t border-[var(--line)] py-14 md:py-20">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead label="PEB accessories" title="PEB accessories" />
          <p className="max-w-md text-bone/65" data-reveal>
            {services[3].body}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
          {accessories.map((p) => (
            <article key={p.title} className="border border-[var(--line)] p-4">
              <div className="relative aspect-square overflow-hidden bg-graphite">
                <Image src={p.img} alt={p.title} fill sizes="(min-width:1024px) 22vw, 50vw" className="object-contain p-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
              <SpecTable specs={p.specs} />
            </article>
          ))}
        </div>
        <ul className="mt-8 flex flex-wrap gap-2" data-stagger="0.02">
          {accessoryList.map((a) => (
            <li key={a} className="bg-graphite px-3 py-1.5 text-[14px]">
              {a}
            </li>
          ))}
        </ul>
      </section>

      <section id="green" className="wrap scroll-mt-24 border-t border-[var(--line)] py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <SectionHead label="Sustainable & green buildings" title="Green building solutions" intro={green.body} />
            <ul className="mt-6 grid grid-cols-2 gap-2 text-[15px]" data-stagger>
              {["Photovoltaic panels", "Solar inverters", "Smart grid integration", "Solar monitoring", "Lower electricity bills", "Low maintenance"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="text-orange">+</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-steel" data-clip>
            <Image src="/img/products/solar-panels.jpg" alt="Photovoltaic panels" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="wrap border-t border-[var(--line)] py-14 md:py-20">
        <SectionHead label="Our solutions" title="Sectors we build for" className="mb-8" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-stagger>
          {sectors.map((s) => (
            <article key={s.title} className="border border-[var(--line)]">
              <div className="relative aspect-[16/10] overflow-hidden bg-steel">
                <Image src={s.img} alt={s.title} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-[14px] text-bone/65">{s.items.join(" · ")}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-4 bg-graphite p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <p className="text-lg font-medium">Planning a factory, warehouse or industrial building?</p>
          <Button href={journeys.peb.href}>{journeys.peb.cta}</Button>
        </div>
        <Related journey="peb" />
      </section>

      {/* ============ PART 2: FABRICATION ============ */}
      <section id="fabrication-jobwork" className="scroll-mt-24 border-t-4 border-night bg-night py-14 text-white md:py-20">
        <div className="wrap grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <div className="mono mb-3 text-[11px] text-orange-2">Part 2 · For PEB manufacturers, EPC contractors, fabricators and engineering companies</div>
            <h2 className="display text-[clamp(28px,3.6vw,46px)]" data-split>
              Structural steel fabrication & jobwork
            </h2>
            <p className="mt-5 max-w-xl text-white/75 md:text-lg" data-reveal>
              {journeys.fab.body} Send your drawings and quantities; we fabricate to your design.
            </p>
            <div className="mt-7" data-reveal>
              <Button href={journeys.fab.href}>{journeys.fab.cta}</Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-steel" data-clip>
            <Image src="/img/site/peb-interior.jpg" alt="Fabricated built-up members in the Jagmount plant" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="wrap py-14 md:py-20">
        <SectionHead label="Work categories" title="What we fabricate" className="mb-8" />
        <div className="grid gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3" data-stagger>
          {workTypes.map((w) => (
            <div key={w} className="bg-white p-6">
              <h3 className="text-lg font-semibold">{w}</h3>
              <p className="mt-1.5 text-[15px] text-bone/65">{workBodies[w]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap pb-14 md:pb-20">
        <SectionHead label="In-house machinery" title="Our fabrication lines" className="mb-8" />
        <div className="grid gap-4 md:grid-cols-3" data-stagger>
          {machines.map((m) => (
            <div key={m.title} className="border border-[var(--line)] p-5">
              <div className="mono text-[10px] text-orange">{m.spec}</div>
              <h3 className="mt-1.5 text-lg font-semibold">{m.title}</h3>
              <p className="mt-2 text-[15px] text-bone/70">{m.enables}</p>
            </div>
          ))}
        </div>
        <Link href="/manufacturing" className="mt-6 inline-block font-medium text-orange hover:underline">
          Machinery, process and quality details →
        </Link>
      </section>

      <section className="wrap border-t border-[var(--line)] py-14 md:py-20">
        <SectionHead label="Process" title="From drawing to dispatch" className="mb-12" />
        <ProcessLine />
        <div className="mt-14 flex flex-col gap-4 bg-night p-6 text-white md:flex-row md:items-center md:justify-between md:p-8">
          <p className="text-lg font-medium">Have drawings ready?</p>
          <Button href={journeys.fab.href}>Send Your Drawings for a Fabrication Quote</Button>
        </div>
        <Related journey="fab" />
      </section>
    </>
  );
}
