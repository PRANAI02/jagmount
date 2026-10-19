import Link from "next/link";
import Image from "next/image";
import { journeys } from "@/lib/content";

/** The two buyer journeys side by side, each with its own CTA and enquiry form. */
export default function Journeys({ compact = false }: { compact?: boolean }) {
  const cards = [
    { ...journeys.peb, key: "peb", img: "/img/gallery/g23.jpg", alt: "Completed pre-engineered building with ridge ventilators", label: "For building owners" },
    { ...journeys.fab, key: "fab", img: "/img/gallery/g07.jpg", alt: "Built-up steel members in the Jagmount fabrication bay", label: "For the steel trade" },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2" data-stagger="0.1">
      {cards.map((c) => (
        <article key={c.key} className="group flex flex-col border border-[var(--line-strong)] bg-white transition-colors duration-300 hover:border-orange">
          {!compact && (
            <div className="relative aspect-[16/8] overflow-hidden bg-steel">
              <Image src={c.img} alt={c.alt} fill sizes="(min-width:768px) 50vw, 100vw" className="img-steel object-cover group-hover:scale-[1.03]" />
            </div>
          )}
          <div className="flex flex-1 flex-col p-6 md:p-8">
            <div className="mono text-[11px] text-orange">{c.label}</div>
            <h3 className="display mt-2 text-[clamp(22px,2.2vw,30px)]">{c.title}</h3>
            <p className="mt-3 text-bone/70">{c.body}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {c.who.map((w) => (
                <span key={w} className="bg-graphite px-2.5 py-1 text-[13px] text-bone/80">
                  {w}
                </span>
              ))}
            </div>
            {!compact && (
              <ul className="mt-5 space-y-1.5 text-[15px]">
                {c.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-orange" />
                    {p}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-auto pt-7">
              <Link
                href={c.href}
                className={`flex items-center justify-between px-5 py-4 font-medium text-white transition-colors ${c.key === "peb" ? "bg-orange hover:bg-night" : "bg-night hover:bg-orange"}`}
              >
                {c.cta}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
