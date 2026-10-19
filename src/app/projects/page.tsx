import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import ProjectGrid from "@/components/ProjectGrid";
import IndiaMap from "@/components/IndiaMap";
import Lightbox from "@/components/Lightbox";
import { certificates, clients, gallery, projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Pre-engineered buildings delivered by Jagmount across Uttar Pradesh, Rajasthan, Himachal Pradesh, Bihar and Maharashtra, from 10,000 to 95,000 sq ft.",
};

export default function Projects() {
  const total = projects.reduce((a, p) => a + p.sqft, 0);
  return (
    <>
      <PageHero
        n="04"
        kicker="Projects"
        title="Our"
        outline="projects."
        img="/img/site/frames-wide.jpg"
        intro="Each Jagmount project reflects our commitment to excellence and scalability, adding value to our clients' business vision."
        meta={[
          ["Delivered", "20+"],
          ["Featured area", `${(total / 1000).toFixed(0)}K sq ft`],
          ["Largest", "95,000 sq ft"],
          ["States", "05"],
        ]}
      />

      <section className="wrap py-28 md:py-36">
        <SectionHead n="01" label="Featured projects" title="Featured" outline="projects." className="mb-14" />
        <ProjectGrid />
      </section>

      <section className="relative overflow-hidden bg-graphite py-28 md:py-40">
        <div className="blueprint absolute inset-0 opacity-50" />
        <div className="wrap relative grid items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHead
              n="02"
              label="Footprint"
              title="Our"
              outline="presence."
              intro="Projects delivered across Uttar Pradesh, Rajasthan, Himachal Pradesh, Bihar and Maharashtra, all fabricated at our Palwal plant."
            />
            <ul className="mono mt-10 space-y-2 text-[11px]" data-stagger>
              {projects.map((p) => (
                <li key={p.slug} className="flex justify-between border-b border-[var(--line)] pb-2">
                  <span>{p.place}</span>
                  <span className="text-mute">{p.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-auto w-full max-w-[560px]">
            <IndiaMap className="h-auto w-full" />
          </div>
        </div>
      </section>

      <section className="wrap py-28 md:py-40">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHead n="03" label="Gallery" title="Project" outline="gallery." />
          <p className="mono text-[11px] text-mute" data-reveal>
            {gallery.length} frames · tap to enlarge
          </p>
        </div>
        <Lightbox items={gallery} className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4" />
      </section>

      <section className="wrap border-t border-[var(--line)] py-28 md:py-36">
        <SectionHead n="04" label="Our clients" title="Our" outline="clients." className="mb-14" />
        <div className="grid grid-cols-2 gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-3 lg:grid-cols-5" data-stagger="0.05">
          {clients.map((c) => (
            <div key={c.name} className="group flex aspect-[3/2] items-center justify-center bg-ink p-6 transition-colors duration-500 hover:bg-steel">
              <Image
                src={c.logo}
                alt={c.name}
                width={300}
                height={150}
                className="max-h-16 w-auto object-contain opacity-60 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 md:max-h-20"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="wrap border-t border-[var(--line)] py-28 md:py-36">
        <SectionHead n="05" label="Certificates" title="Our" outline="certificates." className="mb-14" />
        <Lightbox
          items={certificates.map((c) => ({ src: c.img, cap: c.title, sub: c.by }))}
          className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6"
          tileClass="aspect-[3/4] bg-bone/90"
          contain
        />
      </section>
    </>
  );
}
