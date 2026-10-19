import Image from "next/image";
import PebBuild from "@/components/peb/PebBuild";
import FrameTypes from "@/components/FrameTypes";
import PlasmaReveal from "@/components/PlasmaReveal";
import ProjectIndex from "@/components/ProjectIndex";
import IndiaMap from "@/components/IndiaMap";
import SectionHead from "@/components/SectionHead";
import Button from "@/components/Button";
import Journeys from "@/components/Journeys";
import ClientWall from "@/components/ClientWall";
import { journeys, machines, metrics, projects, projectStates, stats, why } from "@/lib/content";

export default function Home() {
  return (
    <>
      {/* hero: real photograph, recommended headline, two journeys */}
      <section className="wrap grid gap-10 pb-14 pt-32 md:pb-20 md:pt-40 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
        <div>
          <div className="mono mb-5 flex items-center gap-3 text-[11px] text-orange">
            <span className="h-2 w-2 bg-orange" />
            Pre-engineered buildings · Structural steel
          </div>
          <h1 className="display text-[clamp(34px,4.8vw,64px)]" data-split>
            Industrial Steel Buildings. Engineered for Your Next Stage of Growth.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-bone/75 md:text-lg" data-reveal data-delay="0.2">
            Jagmount designs, fabricates and erects pre-engineered buildings for industrial and warehousing projects, and fabricates structural steel to
            drawings for the trade, from our 6000 MT plant in Palwal, Haryana.
          </p>
          <div className="mt-8 flex flex-wrap gap-3" data-reveal data-delay="0.3">
            <Button href={journeys.peb.href}>{journeys.peb.cta}</Button>
            <Button href={journeys.fab.href} variant="dark">
              {journeys.fab.cta}
            </Button>
          </div>
          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-[var(--line)] pt-6" data-reveal data-delay="0.4">
            {[
              [metrics.capacity + " MT", "Annual capacity"],
              [metrics.delivered, "Projects delivered"],
              [metrics.pebYears + " yrs", "In PEB"],
            ].map(([v, k]) => (
              <div key={k}>
                <dd className="display text-[clamp(20px,2.2vw,28px)]">{v}</dd>
                <dt className="mt-1 text-[13px] text-mute">{k}</dt>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative">
          <div className="relative aspect-[10/9] overflow-hidden bg-steel" data-clip>
            <Image src="/img/gallery/g18.jpg" alt="Aerial view of a completed Jagmount pre-engineered industrial building" fill priority sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <div className="mono absolute -bottom-4 left-4 bg-white px-3 py-2 text-[10px] shadow-md">Completed industrial building</div>
        </div>
      </section>

      {/* two journeys */}
      <section className="wrap pb-16 md:pb-24">
        <SectionHead
          label="How can we help?"
          title="Two ways to work with us"
          intro="Building owners and developers get a complete PEB. The steel trade gets fabrication capacity to their own drawings. Each has its own enquiry form."
          className="mb-10"
        />
        <Journeys />
      </section>

      {/* intro + stats */}
      <section className="bg-graphite py-16 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <SectionHead
              label="Who we are"
              title="The PEB arm of Jagwati Metals Engineering LLP"
              intro="Founded by professionals with more than twenty years in construction and infrastructure, Jagmount takes industrial and warehousing projects from concept and design to completion, with fabrication in our own plant."
            />
            <div className="mt-8" data-reveal>
              <Button href="/about" variant="ghost">
                About Jagmount
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 border-l border-t border-[var(--line-strong)] bg-white">
            {stats.map((s) => (
              <div key={s.label} className="border-b border-r border-[var(--line-strong)] p-5 md:p-7">
                <div className="display flex items-baseline gap-1 text-[clamp(30px,3.4vw,46px)]">
                  <span data-count={s.value} data-format="in">
                    {s.value.toLocaleString("en-IN")}
                  </span>
                  <span className="text-orange">{s.suffix}</span>
                  {s.unit && <span className="ml-1 text-[0.4em] text-mute">{s.unit}</span>}
                </div>
                <p className="mt-2 text-[14px] text-bone/65">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D: components of a PEB */}
      <PebBuild />

      {/* frame types */}
      <section className="wrap py-16 md:py-24">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <SectionHead label="Structural frames" title="Structural frames" />
          <p className="max-w-md text-bone/70" data-reveal>
            Clear span, multi-span, multi-gable or single slope. Each frame is designed for strength, stability and the building your process needs.
          </p>
        </div>
        <FrameTypes />
      </section>

      {/* manufacturing teaser */}
      <section aria-label="Manufacturing">
        <PlasmaReveal src="/img/site/welder.jpg" alt="Welder fabricating built-up steel members at the Palwal plant">
          <div className="wrap flex flex-col justify-between gap-4 pb-8 md:flex-row md:items-end md:pb-12">
            <div>
              <div className="mono mb-2 text-[11px] text-orange-2">Our manufacturing</div>
              <div className="display text-[clamp(48px,8vw,120px)] leading-none">
                <span data-count="6000">6000</span>
                <span className="ml-2 align-top text-[0.3em]">MT</span>
              </div>
            </div>
            <p className="mono max-w-xs text-[11px] leading-relaxed text-white/85">Annual fabrication capacity · Plot 23/2, Pingore, Palwal, Haryana</p>
          </div>
        </PlasmaReveal>
        <div className="wrap grid gap-10 py-14 md:py-20 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHead label="In-house fabrication" title="The backbone of every structure" />
            <div className="mt-8 flex flex-wrap gap-3" data-reveal>
              <Button href="/manufacturing" variant="ghost">
                Inside the plant
              </Button>
              <Button href={journeys.fab.href} variant="dark">
                {journeys.fab.cta}
              </Button>
            </div>
          </div>
          <ol className="border-t border-[var(--line)]" data-stagger>
            {machines.map((m) => (
              <li key={m.title} className="grid grid-cols-1 gap-1 border-b border-[var(--line)] py-5 md:grid-cols-[1fr_1.2fr]">
                <span className="text-lg font-semibold">{m.title}</span>
                <span className="text-[15px] text-bone/70">{m.enables}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* projects */}
      <section className="wrap border-t border-[var(--line)] py-16 md:py-24">
        <SectionHead label="Selected projects" title="Our projects" className="mb-10" />
        <ProjectIndex limit={6} />
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6" data-reveal>
          <p className="text-[14px] text-mute">
            {projects.length} featured of {metrics.delivered} projects delivered
          </p>
          <Button href="/projects">All projects</Button>
        </div>
      </section>

      {/* presence */}
      <section className="bg-graphite py-16 md:py-24">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHead
              label="Our presence"
              title="Our presence"
              intro={`Our manufacturing unit is in Palwal, Haryana, on the Delhi to Mumbai industrial corridor, with projects delivered across ${projectStates.slice(0, -1).join(", ")} and Haryana.`}
            />
            <ul className="mono mt-8 grid grid-cols-2 gap-3 text-[11px]" data-stagger>
              <li className="flex items-center gap-3">
                <span className="h-3 w-3 bg-orange" /> Manufacturing unit
              </li>
              <li className="flex items-center gap-3">
                <span
                  className="h-3 w-3 border border-orange"
                  style={{ background: "repeating-linear-gradient(45deg,rgba(236,100,17,.5) 0 2px,transparent 2px 5px)" }}
                />
                Projects delivered
              </li>
            </ul>
          </div>
          <div className="mx-auto w-full max-w-[520px]">
            <IndiaMap className="h-auto w-full" />
          </div>
        </div>
      </section>

      {/* clients */}
      <section className="wrap py-16 md:py-24" aria-label="Clients">
        <SectionHead label="Our clients" title="Our clients" className="mb-10" />
        <ClientWall />
      </section>

      {/* why us */}
      <section className="wrap border-t border-[var(--line)] py-16 md:py-24">
        <SectionHead label="Why Jagmount" title="Why choose us" className="mb-10" />
        <div className="grid gap-px border border-[var(--line)] bg-[var(--line)] md:grid-cols-2 lg:grid-cols-4" data-stagger>
          {why.map((w) => (
            <div key={w.title} className="bg-white p-6 md:p-8">
              <span className="mb-6 block h-1.5 w-8 bg-orange" />
              <h3 className="text-lg font-semibold">{w.title}</h3>
              <p className="mt-2 text-bone/65">{w.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
