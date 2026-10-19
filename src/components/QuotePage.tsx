import Link from "next/link";
import EnquiryForm, { type FormKind } from "./EnquiryForm";
import { company, journeys, mailHref, telHref, whatsapp } from "@/lib/content";

const copy = {
  peb: {
    kicker: "PEB & industrial buildings",
    title: "Tell Us About Your Project",
    intro: "Share the basics of your factory, warehouse or industrial building. Our projects team will review it and come back with next steps and a budgetary quote.",
    steps: ["We review your requirement and location", "A call to clarify span, height, cranes and site", "Design concept and budgetary quote"],
    other: journeys.fab,
    otherLine: "Need structural steel fabricated to your own drawings?",
  },
  fabrication: {
    kicker: "Structural steel fabrication & jobwork",
    title: "Send Your Drawings for a Fabrication Quote",
    intro: "For PEB manufacturers, EPC contractors, fabricators and engineering companies. Send your drawings and quantities and our estimating team will price the package.",
    steps: ["Estimating reviews drawings and quantities", "Questions on grades, finishing and delivery", "Fabrication pricing and schedule"],
    other: journeys.peb,
    otherLine: "Planning a complete building instead?",
  },
};

export default function QuotePage({ kind }: { kind: FormKind }) {
  const c = copy[kind];
  return (
    <section className="wrap grid gap-12 pb-20 pt-36 md:pt-48 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
      <div>
        <div className="mono mb-4 flex items-center gap-3 text-[11px] text-orange">
          <span className="h-2 w-2 bg-orange" />
          {c.kicker}
        </div>
        <h1 className="display text-[clamp(30px,4vw,52px)]" data-split>
          {c.title}
        </h1>
        <p className="mt-5 max-w-2xl text-bone/75 md:text-lg" data-reveal>
          {c.intro}
        </p>
        <div className="mt-10" data-reveal data-delay="0.1">
          <EnquiryForm kind={kind} />
        </div>
      </div>
      <aside className="space-y-4 self-start lg:sticky lg:top-40" data-stagger>
        <div className="bg-graphite p-6">
          <div className="mono mb-4 text-[11px] text-mute">What happens next</div>
          <ol className="space-y-3">
            {c.steps.map((s, i) => (
              <li key={s} className="flex gap-3 text-[15px]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-orange text-[12px] font-medium text-white">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        </div>
        <div className="border border-[var(--line-strong)] p-6">
          <div className="mono mb-3 text-[11px] text-mute">Prefer to talk?</div>
          <a href={telHref} className="display block text-2xl hover:text-orange">
            {company.phone}
          </a>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[15px]">
            <a href={whatsapp()} target="_blank" rel="noreferrer" className="text-orange hover:underline">
              WhatsApp
            </a>
            <a href={mailHref} className="text-orange hover:underline">
              {company.email}
            </a>
          </div>
        </div>
        <div className="border border-[var(--line-strong)] p-6">
          <p className="text-[15px] text-bone/75">{c.otherLine}</p>
          <Link href={c.other.href} className="mt-2 inline-block font-medium text-orange hover:underline">
            {c.other.cta} →
          </Link>
        </div>
      </aside>
    </section>
  );
}
