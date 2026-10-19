import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PlantCard from "@/components/PlantCard";
import { company, tel } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a quote for a pre-engineered building or structural steel package. Jagmount Projects, Faridabad and Palwal, Haryana.",
};

export default function Contact() {
  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-44">
        <div className="blueprint absolute inset-0 opacity-60" />
        <div className="wrap relative">
          <div className="mono mb-6 flex items-center gap-3 text-[11px] text-orange">
            <span className="h-2 w-2 bg-orange" />
            05 · Contact
          </div>
          <h1 className="display text-[clamp(36px,11vw,210px)]">
            <span className="block" data-split="chars">
              Contact
            </span>
            <span className="outline-orange block" data-split="chars" data-delay="0.2">
              us.
            </span>
          </h1>
        </div>
      </section>

      <section className="wrap grid gap-16 border-t border-[var(--line)] py-20 md:py-28 lg:grid-cols-[1.5fr_1fr]">
        <div data-reveal>
          <ContactForm />
        </div>

        <aside className="space-y-px border border-[var(--line)] bg-[var(--line)] self-start" data-stagger>
          <div className="bg-graphite p-6 md:p-8">
            <div className="mono mb-4 text-[10px] text-orange">Call the team</div>
            <ul className="space-y-2">
              {company.phones.map((p) => (
                <li key={p}>
                  <a href={tel(p)} className="display text-2xl transition-colors hover:text-orange md:text-3xl">
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-graphite p-6 md:p-8">
            <div className="mono mb-4 text-[10px] text-orange">Email</div>
            <a href={`mailto:${company.email}`} className="text-xl transition-colors hover:text-orange">
              {company.email}
            </a>
          </div>
          <div className="bg-graphite p-6 md:p-8">
            <div className="mono mb-4 text-[10px] text-orange">Head office</div>
            <address className="not-italic leading-relaxed text-bone/85">{company.headOffice.join(", ")}</address>
          </div>
          <div className="bg-graphite p-6 md:p-8">
            <div className="mono mb-4 text-[10px] text-orange">Manufacturing unit</div>
            <address className="not-italic leading-relaxed text-bone/85">{company.plant.join(", ")}</address>
          </div>
          <PlantCard className="aspect-[4/3]" />
        </aside>
      </section>
    </>
  );
}
