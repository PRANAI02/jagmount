import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import MachineStack from "@/components/MachineStack";
import ProcessLine from "@/components/ProcessLine";
import PlasmaReveal from "@/components/PlasmaReveal";
import Marquee from "@/components/Marquee";
import Button from "@/components/Button";
import PlantCard from "@/components/PlantCard";
import { company, gallery } from "@/lib/content";

export const metadata: Metadata = {
  title: "Manufacturing",
  description:
    "Jagmount's Palwal plant: 6000 MT annual capacity with CNC plasma cutting (Hypertherm Maxpro 200), an automated H-beam line, pull-through welding, profile sheeting and shearing.",
};

const plantShots = [
  "/img/gallery/g10.jpg",
  "/img/gallery/g14.jpg",
  "/img/gallery/g03.jpg",
  "/img/gallery/g07.jpg",
  "/img/gallery/g12.jpg",
  "/img/gallery/g16.jpg",
  "/img/gallery/g19.jpg",
  "/img/site/h-beam-line.jpg",
];

export default function Manufacturing() {
  return (
    <>
      <PageHero
        n="03"
        kicker="Manufacturing"
        title="Our"
        outline="facility."
        img="/img/site/fab-hall-2.jpg"
        intro="A modern fabrication facility equipped with advanced cutting, welding and forming machinery, run by skilled professionals with rigorous quality control at every stage."
        meta={[
          ["Capacity", "6000 MT / yr"],
          ["Cutting", "CNC plasma"],
          ["Welding", "PTW + H-beam"],
          ["Location", "Palwal, HR"],
        ]}
      />

      {/* capacity */}
      <section className="wrap grid gap-16 py-28 md:py-40 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div>
          <div className="mono mb-6 text-[11px] text-mute">Annual capacity</div>
          <div className="display text-[clamp(90px,22vw,360px)] leading-[0.78]">
            <span data-count="6000">6000</span>
          </div>
          <div className="mono mt-4 flex items-center gap-4 text-[11px]">
            <span className="bg-orange px-2 py-1 text-ink">Metric tonnes</span>
            <span className="text-mute">of structural steel, every year</span>
          </div>
        </div>
        <p className="text-[clamp(20px,2vw,28px)] leading-snug text-bone/80" data-scrub-words>
          The backbone of every steel structure. Precision, quality and efficiency at every stage of production, from raw plate to painted, marked and bundled
          members ready for erection.
        </p>
      </section>

      {/* machines */}
      <section className="relative border-t border-[var(--line)] pb-28 pt-24 md:pb-40 md:pt-32">
        <div className="wrap">
          <SectionHead n="02" label="Machinery" title="Our" outline="machinery." className="mb-16" />
          <MachineStack />
        </div>
      </section>

      <PlasmaReveal src="/img/site/welder.jpg" alt="Welder working on a built-up section">
        <div className="wrap pb-8 md:pb-12">
          <p className="display max-w-4xl text-[clamp(30px,4.6vw,72px)]">Quality means doing it right when no one is looking.</p>
          <p className="mono mt-4 text-[11px] text-orange">Henry Ford</p>
        </div>
      </PlasmaReveal>

      {/* process */}
      <section className="wrap py-28 md:py-40">
        <SectionHead n="03" label="Process" title="Our" outline="process." className="mb-20 md:mb-28" />
        <ProcessLine />
      </section>

      {/* plant reel */}
      <section className="border-y border-[var(--line)] bg-graphite py-16 md:py-24" aria-label="Inside the plant">
        <div className="wrap mono mb-10 flex justify-between text-[11px] text-mute">
          <span>Inside the plant</span>
          <span>Palwal, Haryana</span>
        </div>
        <Marquee
          speed={40}
          sep={false}
          items={plantShots.map((src) => (
            <span key={src} className="relative mr-4 block h-[220px] w-[300px] overflow-hidden md:h-[320px] md:w-[440px]">
              <Image src={src} alt="" fill sizes="440px" className="object-cover" />
            </span>
          ))}
        />
        <Marquee
          reverse
          speed={34}
          sep={false}
          className="mt-4"
          items={gallery.slice(12, 20).map((g) => (
            <span key={g.src} className="relative mr-4 block h-[160px] w-[220px] overflow-hidden md:h-[240px] md:w-[320px]">
              <Image src={g.src} alt={g.cap} fill sizes="320px" className="object-cover grayscale" />
            </span>
          ))}
        />
      </section>

      {/* visit */}
      <section className="wrap grid gap-12 py-28 md:py-40 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHead n="05" label="Plant visit" title="Visit" outline="our plant." />
          <address className="mt-10 text-lg not-italic leading-relaxed text-bone/85" data-reveal>
            {company.plant.map((l) => (
              <div key={l}>{l}</div>
            ))}
          </address>
          <p className="mt-6 max-w-sm text-bone/60" data-reveal>
            EPC teams and developers are welcome to audit our lines, processes and quality checks before awarding a package.
          </p>
          <div className="mt-10" data-reveal>
            <Button href="/contact?type=visit">Book a plant visit</Button>
          </div>
        </div>
        <PlantCard className="aspect-[4/3]" />
      </section>
    </>
  );
}
