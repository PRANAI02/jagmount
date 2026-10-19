import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import CaseStudies from "@/components/CaseStudies";
import IndiaMap from "@/components/IndiaMap";
import Lightbox from "@/components/Lightbox";
import ClientWall from "@/components/ClientWall";
import Button from "@/components/Button";
import { certificates, clients, gallery, journeys, metrics, projects, projectStates } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Pre-engineered buildings delivered by Jagmount across Uttar Pradesh, Uttarakhand, Madhya Pradesh, Haryana and beyond, with scope, tonnage and timelines from client completion certificates.",
};

export default function Projects() {
  const documented = projects.filter((p) => p.scope).length;
  return (
    <>
      <PageHero
        kicker="Projects"
        title="Our projects"
        img="/img/gallery/g17.jpg"
        imgAlt="Completed industrial facility"
        intro={`${metrics.delivered} projects delivered. Below are ${projects.length} featured builds; for ${documented} of them the client's completion certificate records our scope of work, the steel tonnage and the timeline.`}
        meta={[
          ["Delivered", metrics.delivered],
          ["Featured", String(projects.length)],
          ["Largest", "95,000 sq ft"],
          ["Clients", String(clients.length)],
        ]}
      >
        <Button href={journeys.peb.href}>Discuss a Similar Project</Button>
      </PageHero>

      <section className="wrap border-t border-[var(--line)] py-14 md:py-20">
        <SectionHead
          label="Case studies"
          title="Featured projects"
          intro="Scope, tonnage and timelines are taken from the completion certificates our clients issued. Tap 'View certificate' to see the original."
          className="mb-10"
        />
        <CaseStudies />
      </section>

      <section className="bg-graphite py-14 md:py-20">
        <div className="wrap grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHead label="Footprint" title="Our presence" intro={`Projects delivered across ${projectStates.join(", ")}, all fabricated at our Palwal plant.`} />
            <ul className="mt-8 space-y-2 text-[15px]" data-stagger="0.03">
              {projects.map((p) => (
                <li key={p.slug} className="flex justify-between gap-4 border-b border-[var(--line)] pb-2">
                  <span>{p.name}</span>
                  <span className="text-mute">
                    {p.place}, {p.state}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-auto w-full max-w-[520px]">
            <IndiaMap className="h-auto w-full" />
          </div>
        </div>
      </section>

      <section className="wrap py-14 md:py-20">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHead label="Gallery" title="Project gallery" />
          <p className="text-[14px] text-mute" data-reveal>
            {gallery.length} photos · tap to enlarge
          </p>
        </div>
        <Lightbox items={gallery} className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4" />
      </section>

      <section className="wrap border-t border-[var(--line)] py-14 md:py-20">
        <SectionHead label="Our clients" title="Our clients" className="mb-8" />
        <ClientWall />
      </section>

      <section className="wrap border-t border-[var(--line)] py-14 md:py-20">
        <SectionHead label="Certificates" title="Our certificates" className="mb-8" />
        <Lightbox
          items={certificates.map((c) => ({ src: c.img, cap: c.title, sub: c.by }))}
          className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6"
          tileClass="aspect-[3/4] bg-graphite"
          contain
        />
        <div className="mt-12 flex flex-col gap-4 bg-graphite p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <p className="text-lg font-medium">Planning something similar?</p>
          <div className="flex flex-wrap gap-3">
            <Button href={journeys.peb.href}>Discuss a Similar Project</Button>
            <Button href={journeys.fab.href} variant="dark">
              {journeys.fab.cta}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
