import Image from "next/image";
import HeroBuild from "@/components/peb/HeroBuild";
import Marquee from "@/components/Marquee";
import ServicesRail from "@/components/ServicesRail";
import FrameTypes from "@/components/FrameTypes";
import PlasmaReveal from "@/components/PlasmaReveal";
import ProjectIndex from "@/components/ProjectIndex";
import IndiaMap from "@/components/IndiaMap";
import SectionHead from "@/components/SectionHead";
import Button from "@/components/Button";
import { clients, machines, sectors, stats, why } from "@/lib/content";

export default function Home() {
  const sectorWords = sectors.flatMap((s) => s.items.slice(0, 3));
  return (
    <>
      <HeroBuild />

      {/* sectors marquee */}
      <section className="relative border-y border-[var(--line)] bg-ink py-8 md:py-12" aria-label="Sectors we build for">
        <Marquee items={sectorWords.slice(0, 9).map((w) => w)} className="display text-[clamp(40px,7vw,120px)]" speed={70} />
        <Marquee items={sectorWords.slice(9).map((w) => w)} reverse className="display outline-text mt-2 text-[clamp(40px,7vw,120px)]" speed={55} />
      </section>

      {/* intro */}
      <section className="wrap relative grid gap-16 py-28 md:py-40 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <div className="mono mb-10 flex items-center gap-3 text-[11px] text-mute">Who we are</div>
          <p className="text-[clamp(26px,3.4vw,52px)] font-medium leading-[1.12] tracking-tight" data-scrub-words>
            Jagmount is the PEB arm of Jagwati Metals Engineering LLP. Founded by people with more than twenty years in construction and infrastructure, we take
            industrial and warehousing projects from concept and design all the way to completion.
          </p>
          <div className="mt-12" data-reveal>
            <Button href="/about">Our story</Button>
          </div>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden ticks" data-clip>
            <Image
              src="/img/site/welder.jpg"
              alt="Welder fabricating built-up steel members"
              fill
              sizes="(min-width:1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="mono absolute -bottom-5 left-4 bg-orange px-3 py-2 text-[10px] text-ink md:-left-6">Fabrication bay · Palwal</div>
        </div>
      </section>

      {/* stats */}
      <section className="wrap pb-28 md:pb-40">
        <div className="grid grid-cols-2 border-l border-t border-[var(--line)] lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="group relative overflow-hidden border-b border-r border-[var(--line)] p-5 md:p-8">
              <span className="absolute inset-0 origin-left scale-x-0 bg-steel transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-x-100" />
              <div className="relative">
                <div className="display flex items-baseline gap-1 text-[clamp(40px,6vw,92px)]">
                  <span data-count={s.value} data-format="in">
                    {s.value.toLocaleString("en-IN")}
                  </span>
                  <span className="text-orange">{s.suffix}</span>
                </div>
                {s.unit && <div className="mono mt-1 text-[11px] text-orange">{s.unit}</div>}
                <p className="mt-4 max-w-[24ch] text-sm text-bone/65">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ServicesRail />

      {/* frame types */}
      <section className="wrap py-28 md:py-40">
        <div className="mb-14 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <SectionHead n="03" label="Structural frames" title="Structural" outline="frames." />
          <p className="max-w-md text-base leading-relaxed text-bone/70 md:text-lg" data-reveal>
            Clear span, multi-span, multi-gable or single slope. Each frame is designed for strength, stability and the exact building your process needs.
          </p>
        </div>
        <FrameTypes />
      </section>

      {/* manufacturing teaser */}
      <section className="relative" aria-label="Manufacturing">
        <PlasmaReveal src="/img/site/fab-hall.jpg" alt="Jagmount fabrication hall with built-up H-beams">
          <div className="wrap flex flex-col justify-between gap-6 pb-8 md:flex-row md:items-end md:pb-12">
            <div>
              <div className="mono mb-3 text-[11px] text-orange">Our manufacturing</div>
              <div className="display text-[clamp(64px,15vw,260px)] leading-[0.8]">
                <span data-count="6000">6000</span>
                <span className="ml-3 align-top text-[0.25em] text-orange">MT</span>
              </div>
            </div>
            <p className="mono max-w-xs text-[11px] leading-relaxed text-bone/80">Annual fabrication capacity · Plot 23/2, Pingore, Palwal, Haryana</p>
          </div>
        </PlasmaReveal>
        <div className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="display text-[clamp(34px,4.6vw,72px)]">
              <span className="block" data-split>
                The backbone of
              </span>
              <span className="outline-orange block" data-split data-delay="0.1">
                every structure.
              </span>
            </h2>
            <div className="mt-10" data-reveal>
              <Button href="/manufacturing">Inside the plant</Button>
            </div>
          </div>
          <ol className="border-t border-[var(--line)]" data-stagger>
            {machines.map((m) => (
              <li key={m.n} className="group grid grid-cols-1 items-baseline gap-1 border-b border-[var(--line)] py-5 md:grid-cols-[1fr_1fr]">
                <span className="text-xl font-semibold transition-transform duration-500 group-hover:translate-x-2 md:text-2xl">{m.title}</span>
                <span className="mono text-[11px] text-mute md:text-right">{m.spec}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* projects */}
      <section className="wrap border-t border-[var(--line)] py-28 md:py-40">
        <div className="mb-16 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <SectionHead n="05" label="Selected projects" title="Our" outline="projects." className="flex-1" />
        </div>
        <ProjectIndex limit={6} />
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6" data-reveal>
          <p className="mono text-[11px] text-mute">6 of 20+ delivered projects</p>
          <Button href="/projects">All projects</Button>
        </div>
      </section>

      {/* presence */}
      <section className="relative overflow-hidden bg-graphite py-28 md:py-40">
        <div className="blueprint absolute inset-0 opacity-50" />
        <div className="wrap relative grid items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHead
              n="06"
              label="Our presence"
              title="Our"
              outline="presence."
              intro="Our manufacturing unit sits on the Delhi to Mumbai industrial corridor in Haryana, with projects delivered across Uttar Pradesh, Rajasthan, Himachal Pradesh, Bihar and Maharashtra."
            />
            <ul className="mono mt-10 grid grid-cols-2 gap-3 text-[11px]" data-stagger>
              <li className="flex items-center gap-3">
                <span className="h-3 w-3 bg-orange" /> Manufacturing unit
              </li>
              <li className="flex items-center gap-3">
                <span
                  className="h-3 w-3 border border-orange"
                  style={{ background: "repeating-linear-gradient(45deg,rgba(255,106,0,.5) 0 2px,transparent 2px 5px)" }}
                />{" "}
                Projects delivered
              </li>
            </ul>
          </div>
          <div className="mx-auto w-full max-w-[560px]">
            <IndiaMap className="h-auto w-full" />
          </div>
        </div>
      </section>

      {/* clients */}
      <section className="border-y border-[var(--line)] py-16 md:py-20" aria-label="Clients">
        <div className="wrap mono mb-10 flex items-center justify-between text-[11px] text-mute">
          <span>Trusted by</span>
          <span>{clients.length} clients and counting</span>
        </div>
        <Marquee
          speed={45}
          sep={false}
          items={clients.map((c) => (
            <span
              key={c.name}
              className="mx-8 flex h-16 w-40 items-center justify-center opacity-60 transition-opacity hover:opacity-100 md:mx-14 md:h-20 md:w-48"
            >
              <Image src={c.logo} alt={c.name} width={300} height={150} className="max-h-full w-auto object-contain" />
            </span>
          ))}
        />
      </section>

      {/* why us */}
      <section className="wrap py-28 md:py-40">
        <SectionHead n="08" label="Why Jagmount" title="Why" outline="choose us." className="mb-16" />
        <div className="grid gap-px border border-[var(--line)] bg-[var(--line)] md:grid-cols-2" data-stagger>
          {why.map((w) => (
            <div key={w.title} className="group relative overflow-hidden bg-ink p-6 md:p-10">
              <div className="relative">
                <span className="mb-8 block h-2 w-8 bg-orange" />
                <h3 className="display text-[clamp(24px,2.6vw,40px)]">{w.title}</h3>
                <p className="mt-4 max-w-sm text-bone/65">{w.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
