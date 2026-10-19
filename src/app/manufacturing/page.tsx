import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import MachineGrid from "@/components/MachineGrid";
import ProcessLine from "@/components/ProcessLine";
import PlasmaReveal from "@/components/PlasmaReveal";
import Lightbox from "@/components/Lightbox";
import Button from "@/components/Button";
import PlantCard from "@/components/PlantCard";
import { codes, company, journeys, metrics } from "@/lib/content";

export const metadata: Metadata = {
  title: "Manufacturing",
  description:
    "Jagmount's Palwal plant: 6000 MT annual capacity with CNC plasma cutting (Hypertherm Maxpro 200), an automated H-beam line and pull-through welding. Send your drawings for a fabrication quote.",
};

const plantShots = [
  { src: "/img/gallery/g10.jpg", cap: "CNC plasma cutting, Hypertherm Maxpro 200" },
  { src: "/img/site/h-beam-line.jpg", cap: "H-beam production line" },
  { src: "/img/gallery/g03.jpg", cap: "Welding line" },
  { src: "/img/site/ptw-machine.jpg", cap: "Pull-through welding machine" },
  { src: "/img/gallery/g14.jpg", cap: "H-beam line conveyor" },
  { src: "/img/site/peb-interior.jpg", cap: "Fabricated members in the bay" },
  { src: "/img/gallery/g07.jpg", cap: "Built-up members ready for finishing" },
  { src: "/img/gallery/g12.jpg", cap: "Fabricated built-up members" },
  { src: "/img/gallery/g16.jpg", cap: "Tapered rafter section" },
  { src: "/img/gallery/g19.jpg", cap: "Members staged at site" },
];

const qualification: { title: string; items: string[] }[] = [
  { title: "Design standards", items: ["AISC (American Institute of Steel Construction)", "Indian Standards", ...codes.slice(2).map((c) => `${c.title}: ${c.body.toLowerCase()}`)] },
  {
    title: "Materials on our product sheets",
    items: ["Purlins: 345 MPa yield, pre-galvanised 120 / 180 / 275 GSM, 1.5 to 3.0 mm", "Roof & wall sheets: ASTM A792M Grade 345, 0.3 to 0.8 mm", "Bracing: IS 2062, 250 / 345 MPa"],
  },
  { title: "Documents we can share", items: ["DPIIT recognition certificate", "Udyam (MSME) registration", "Client completion certificates with scope, tonnage and dates"] },
];

export default function Manufacturing() {
  return (
    <>
      <PageHero
        kicker="Manufacturing"
        title="Our manufacturing facility"
        img="/img/site/peb-interior.jpg"
        imgAlt="Fabricated built-up members inside the Jagmount plant at Palwal"
        intro="Our Palwal plant is equipped with cutting, assembly and welding machinery and backed by skilled professionals and quality control at every stage of production."
        meta={[
          ["Capacity", `${metrics.capacity} MT/yr`],
          ["Cutting", "CNC plasma"],
          ["Welding", "H-beam + PTW"],
          ["Location", "Palwal, HR"],
        ]}
      >
        <Button href={journeys.fab.href}>Send Your Drawings for a Fabrication Quote</Button>
      </PageHero>

      <section className="wrap border-t border-[var(--line)] py-14 md:py-20">
        <SectionHead
          label="Machinery"
          title="Our machinery"
          intro="The machines below are installed and running at our plant. Each card explains what the machine does and what it lets us make for you."
          className="mb-10"
        />
        <MachineGrid />
      </section>

      <section className="bg-graphite py-14 md:py-20">
        <div className="wrap">
          <SectionHead label="Process" title="From plate to erected frame" className="mb-12" />
          <ProcessLine />
        </div>
      </section>

      <section className="wrap py-14 md:py-20">
        <SectionHead
          label="Supplier qualification"
          title="Quality, standards and documentation"
          intro="Tell us the grades, finishing and inspection documents your package needs, and we will confirm them in our quotation."
          className="mb-10"
        />
        <div className="grid gap-4 lg:grid-cols-3" data-stagger>
          {qualification.map((q) => (
            <div key={q.title} className="border border-[var(--line-strong)] p-6">
              <h3 className="text-lg font-semibold">{q.title}</h3>
              <ul className="mt-4 space-y-2.5 text-[15px] text-bone/75">
                {q.items.map((i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-orange" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <PlasmaReveal src="/img/site/welder.jpg" alt="Welder working on a built-up section">
        <div className="wrap pb-8 md:pb-12">
          <p className="display max-w-3xl text-[clamp(24px,3.4vw,46px)]">Quality means doing it right when no one is looking.</p>
          <p className="mono mt-3 text-[11px] text-orange-2">Henry Ford</p>
        </div>
      </PlasmaReveal>

      <section className="wrap py-14 md:py-20">
        <SectionHead label="Inside the plant" title="Inside the plant" className="mb-8" />
        <Lightbox items={plantShots} className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-5" />
      </section>

      <section className="wrap pb-14 md:pb-20">
        <div className="flex flex-col gap-6 bg-night p-8 text-white md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <div className="mono text-[11px] text-orange-2">Fabrication & jobwork</div>
            <h2 className="display mt-2 text-[clamp(24px,3vw,38px)]">Send Your Drawings for a Fabrication Quote</h2>
            <p className="mt-2 max-w-xl text-white/70">Built-up beams, columns, rafters, crane beams, platforms and other structural steel, fabricated to your drawings.</p>
          </div>
          <Button href={journeys.fab.href}>{journeys.fab.cta}</Button>
        </div>
      </section>

      <section className="wrap grid gap-10 border-t border-[var(--line)] py-14 md:py-20 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHead label="Plant visit" title="Visit our plant" />
          <address className="mt-6 text-lg not-italic leading-relaxed" data-reveal>
            {company.plant.map((l) => (
              <div key={l}>{l}</div>
            ))}
          </address>
          <p className="mt-4 max-w-sm text-bone/65" data-reveal>
            EPC teams and developers are welcome to see our lines and processes before awarding a package. Call {company.phone} to arrange a visit.
          </p>
        </div>
        <PlantCard className="aspect-[4/3]" />
      </section>
    </>
  );
}
