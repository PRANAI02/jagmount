import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import FrameTypes from "@/components/FrameTypes";
import Marquee from "@/components/Marquee";
import Button from "@/components/Button";
import { accessories, accessoryList, advantages, components, sectors, secondary, services, type Spec } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Pre-engineered buildings, structural steel fabrication, secondary members, PEB accessories and solar-ready green buildings from Jagmount Projects.",
};

function SpecTable({ specs }: { specs: Spec }) {
  return (
    <table className="mono mt-4 w-full border-collapse text-[10px]">
      <tbody>
        {specs.map(([k, v]) => (
          <tr key={k} className="border-t border-[var(--line)]">
            <th scope="row" className="py-2 pr-3 text-left font-normal text-mute">
              {k}
            </th>
            <td className="py-2 text-right text-[11px] text-bone">{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Services() {
  const [peb, fab, sec, acc, green] = services;
  return (
    <>
      <PageHero
        n="02"
        kicker="Services"
        title="Our"
        outline="services."
        img="/img/site/skylight-frame.jpg"
        intro="One engineering team and one factory for the whole building: primary frames, secondary members, cladding, accessories and solar, designed, fabricated and erected by Jagmount."
        meta={[
          ["Service lines", "05"],
          ["Frame types", "08"],
          ["Codes", "AISC · IS"],
          ["Delivery", "Turnkey"],
        ]}
      />

      {/* index */}
      <nav className="sticky top-0 z-30 border-y border-[var(--line)] bg-ink/85 backdrop-blur-md" aria-label="Services">
        <ul className="wrap mono flex gap-6 overflow-x-auto py-4 text-[11px] [scrollbar-width:none]">
          {services.map((s) => (
            <li key={s.slug} className="shrink-0">
              <a href={`#${s.slug}`} className="flex items-center gap-2 text-mute transition-colors hover:text-orange">
                <span className="h-1.5 w-1.5 bg-orange" /> {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* PEB */}
      <section id={peb.slug} className="scroll-mt-20 py-28 md:py-40">
        <div className="wrap grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <SectionHead n={peb.n} label="Pre-engineered buildings" title="Pre-engineered" outline="buildings." intro={peb.body} />
          <div className="relative aspect-[4/3] overflow-hidden ticks" data-clip>
            <Image
              src="/img/site/peb-interior.jpg"
              alt="Inside a pre-engineered steel building under construction"
              fill
              sizes="(min-width:1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="wrap mt-24">
          <div className="mono mb-8 text-[11px] text-mute">Components of PEB</div>
          <div className="grid gap-px border border-[var(--line)] bg-[var(--line)] md:grid-cols-2 lg:grid-cols-4" data-stagger>
            {components.map((c) => (
              <div key={c.n} className="group relative overflow-hidden bg-ink p-6 md:p-8">
                <span className="absolute inset-x-0 bottom-0 h-0 bg-orange transition-all duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:h-full" />
                <div className="relative transition-colors duration-300 group-hover:text-ink">
                  <h3 className="display text-[clamp(22px,2vw,30px)]">{c.title}</h3>
                  <p className="mt-3 text-sm opacity-70">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="wrap mt-24">
          <div className="mono mb-8 text-[11px] text-mute">Advantages of PEB</div>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
            {advantages.map((a) => (
              <div key={a.title} className="border-t border-[var(--line-strong)] pt-6">
                <div className="mono flex justify-between text-[10px] text-mute">
                  <span>Advantage</span>
                </div>
                <h3 className="display mt-4 text-[clamp(24px,2.4vw,36px)]">{a.title}</h3>
                <p className="mt-3 text-bone/65">{a.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="wrap mt-24">
          <div className="mono mb-8 flex items-center justify-between text-[11px] text-mute">
            <span>Structural frames</span>
            <span>Clear span to multi-gable</span>
          </div>
          <FrameTypes />
        </div>
      </section>

      {/* fabrication */}
      <section id={fab.slug} className="relative scroll-mt-20 overflow-hidden bg-graphite py-28 md:py-40">
        <div className="blueprint absolute inset-0 opacity-50" />
        <div className="wrap relative grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden" data-scale-in>
            <div className="absolute inset-[-10%_0]" data-parallax="8">
              <Image
                src="/img/site/fab-hall-2.jpg"
                alt="Built-up H-beams in the fabrication bay"
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <SectionHead n={fab.n} label="Structural steel fabrication" title="Structural steel" outline="fabrication." intro={fab.body} />
            <ul className="mt-10 space-y-3" data-stagger>
              {fab.points.map((p) => (
                <li key={p} className="flex items-center gap-4 border-b border-[var(--line)] pb-3">
                  <span className="h-2 w-2 shrink-0 bg-orange" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-10" data-reveal>
              <Button href="/manufacturing">See the machines</Button>
            </div>
          </div>
        </div>
      </section>

      {/* secondary */}
      <section id={sec.slug} className="wrap scroll-mt-20 py-28 md:py-40">
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead n={sec.n} label="Secondary members & cladding" title="Secondary" outline="members." />
          <p className="max-w-md text-bone/65" data-reveal>
            {sec.body}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
          {secondary.map((p) => (
            <article key={p.title} className="group border border-[var(--line)] bg-graphite p-4 transition-colors duration-500 hover:border-orange">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f3f2ef]">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  sizes="(min-width:1024px) 30vw, 50vw"
                  className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{p.title}</h3>
              <SpecTable specs={p.specs} />
            </article>
          ))}
        </div>
      </section>

      {/* accessories */}
      <section id={acc.slug} className="scroll-mt-20 border-t border-[var(--line)] py-28 md:py-40">
        <div className="wrap mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead n={acc.n} label="PEB accessories" title="PEB" outline="accessories." />
          <p className="max-w-md text-bone/65" data-reveal>
            {acc.body}
          </p>
        </div>
        <div className="wrap grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
          {accessories.map((p) => (
            <article key={p.title} className="group border border-[var(--line)] bg-graphite p-4 transition-colors duration-500 hover:border-orange">
              <div className="relative aspect-square overflow-hidden bg-[#f3f2ef]">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  sizes="(min-width:1024px) 22vw, 50vw"
                  className="object-contain p-5 transition-transform duration-700 group-hover:rotate-2 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
              <SpecTable specs={p.specs} />
            </article>
          ))}
        </div>
        <div className="mt-16 border-y border-[var(--line)] py-6">
          <Marquee items={accessoryList} speed={50} className="display text-[clamp(26px,3.6vw,56px)] text-bone/80" />
        </div>
      </section>

      {/* green */}
      <section id={green.slug} className="relative scroll-mt-20 overflow-hidden py-28 md:py-40">
        <div className="absolute inset-0">
          <div className="absolute inset-[-12%_0]" data-parallax="10">
            <Image src="/img/site/solar-aerial-2.jpg" alt="" fill sizes="100vw" className="object-cover opacity-30" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/75 to-ink" />
        </div>
        <div className="wrap relative grid gap-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHead n={green.n} label="Sustainable & green buildings" title="Green building" outline="solutions." intro={green.body} />
            <div className="mt-12 grid gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2" data-stagger>
              {[
                "Promote solar energy to reduce carbon emissions",
                "Enhance energy independence and sustainability",
                "Provide accessible, affordable clean energy",
                "Educate communities on the benefits of solar",
              ].map((g) => (
                <div key={g} className="bg-ink/80 p-6 backdrop-blur">
                  <div className="mono text-[10px] text-orange">Goal</div>
                  <p className="mt-3 text-bone/85">{g}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:pt-24">
            <div className="relative aspect-square overflow-hidden" data-clip>
              <Image src="/img/products/solar-panels.jpg" alt="Photovoltaic panels" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            </div>
            <ul className="mono mt-8 grid grid-cols-2 gap-3 text-[11px]" data-stagger>
              {["Photovoltaic panels", "Solar inverters", "Smart grid integration", "Solar monitoring", "Lower electricity bills", "Low maintenance"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="text-orange">+</span>
                    {t}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* sectors */}
      <section className="wrap border-t border-[var(--line)] py-28 md:py-40">
        <SectionHead n="06" label="Our solutions" title="Our" outline="solutions." className="mb-16" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-stagger>
          {sectors.map((s) => (
            <article key={s.title} className="group relative aspect-[4/5] overflow-hidden bg-steel md:aspect-[4/4.6]">
              <Image src={s.img} alt={s.title} fill sizes="(min-width:1024px) 33vw, 100vw" className="img-steel object-cover group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent transition-opacity duration-500 group-hover:opacity-95" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="display text-[clamp(22px,2.2vw,32px)]">{s.title}</h3>
                <ul className="mt-4 grid max-h-0 gap-1 overflow-hidden text-sm text-bone/80 transition-[max-height] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:max-h-60 max-md:max-h-60">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-center gap-2">
                      <span className="h-1 w-3 bg-orange" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
