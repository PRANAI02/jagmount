import type { Metadata } from "next";
import Journeys from "@/components/Journeys";
import PlantCard from "@/components/PlantCard";
import { company, mailHref, telHref, whatsapp } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Jagmount Projects: +91 98712 08401, info@jagmount.com. Get a PEB quote or request fabrication pricing. Faridabad and Palwal, Haryana.",
};

export default function Contact() {
  return (
    <>
      <section className="wrap pb-12 pt-32 md:pt-40">
        <div className="mono mb-5 flex items-center gap-3 text-[11px] text-orange">
          <span className="h-2 w-2 bg-orange" />
          Contact
        </div>
        <h1 className="display text-[clamp(32px,4.6vw,60px)]" data-split>
          Contact us
        </h1>
        <p className="mt-5 max-w-2xl text-bone/75 md:text-lg" data-reveal>
          Choose the enquiry that fits your project, or call, WhatsApp or email us directly.
        </p>
      </section>

      <section className="wrap pb-14 md:pb-20">
        <Journeys compact />
      </section>

      <section className="wrap grid gap-4 border-t border-[var(--line)] py-14 md:grid-cols-2 md:py-20 lg:grid-cols-4" data-stagger>
        <div className="bg-graphite p-6">
          <div className="mono mb-3 text-[10px] text-orange">Call</div>
          <a href={telHref} className="display text-2xl hover:text-orange">
            {company.phone}
          </a>
        </div>
        <div className="bg-graphite p-6">
          <div className="mono mb-3 text-[10px] text-orange">WhatsApp</div>
          <a href={whatsapp()} target="_blank" rel="noreferrer" className="display text-2xl hover:text-orange">
            {company.phone}
          </a>
        </div>
        <div className="bg-graphite p-6">
          <div className="mono mb-3 text-[10px] text-orange">Email</div>
          <a href={mailHref} className="text-xl font-medium hover:text-orange">
            {company.email}
          </a>
        </div>
        <div className="bg-graphite p-6">
          <div className="mono mb-3 text-[10px] text-orange">Head office</div>
          <address className="not-italic leading-relaxed text-bone/85">{company.headOffice.join(", ")}</address>
        </div>
      </section>

      <section className="wrap grid gap-10 pb-16 md:pb-24 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <div>
          <div className="mono mb-3 text-[10px] text-orange">Manufacturing unit</div>
          <address className="text-lg not-italic leading-relaxed">{company.plant.join(", ")}</address>
          <p className="mt-4 max-w-sm text-bone/65">Plant visits for EPC teams and developers can be arranged on call.</p>
        </div>
        <PlantCard className="aspect-[16/9]" />
      </section>
    </>
  );
}
