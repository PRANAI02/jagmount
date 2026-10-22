import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import CaseStudies from "@/components/CaseStudies";
import IndiaMap from "@/components/IndiaMap";
import Lightbox from "@/components/Lightbox";
import ClientWall from "@/components/ClientWall";
import Button from "@/components/Button";
import { certificates, clients, gallery, journeys, metrics, milestone, projects, projectStatesText } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Pre-engineered buildings and steel structures delivered by Jagmount across Uttar Pradesh, Uttarakhand, Madhya Pradesh, Haryana and beyond, with steel quantity and delivery period for each project.",
};

export default function Projects() {
  const certified = projects.filter((p) => p.cert).length;
  return (
    <>
      <PageHero
        kicker="Projects"
        title="Our projects"
        img="/img/gallery/g17.jpg"
        imgAlt="Completed industrial facility"
        intro={`${metrics.delivered} projects delivered across pre-engineered buildings, structural steel and multi-storey buildings. Below are ${projects.length} featured builds with the steel quantity and delivery period for each.`}
        meta={[
          ["Delivered", metrics.delivered],
          ["Featured", String(projects.length)],
          ["Largest", "650 MT"],
          ["Clients", String(clients.length)],
        ]}
      >
        <Button href={journeys.peb.href}>Discuss a Similar Project</Button>
      </PageHero>

      <section className="wrap border-t border-[var(--line)] py-14 md:py-20">
        <SectionHead
          label="Case studies"
          title="Featured projects"
          intro={`Project type, approximate steel quantity and delivery period for each build. ${certified} projects also carry the completion certificate the client issued: tap 'View certificate' to see the original.`}
          className="mb-10"
        />
        <CaseStudies />

        <div className="mt-10 grid gap-6 border border-[var(--line-strong)] bg-graphite p-6 md:grid-cols-[1.2fr_1fr] md:items-center md:p-8" data-reveal>
          <div>
            <div className="mono text-[11px] text-orange">Engineering milestone</div>
            <h3 className="display mt-2 text-[clamp(22px,2.4vw,32px)]">{milestone.title}</h3>
            <p className="mt-3 max-w-lg text-bone/70">{milestone.body}</p>
          </div>
          <dl className="border-t border-[var(--line)]">
            {milestone.facts.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[130px_1fr] gap-3 border-b border-[var(--line)] py-3">
                <dt className="text-[14px] text-mute">{k}</dt>
                <dd className="text-[15px] font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-graphite py-14 md:py-20">
        <div className="wrap grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHead label="Footprint" title="Our presence" intro={`Projects delivered across ${projectStatesText}, all fabricated at our Palwal plant in Haryana.`} />
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
