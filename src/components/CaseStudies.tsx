import Image from "next/image";
import Link from "next/link";
import { journeys, projects } from "@/lib/content";
import CertThumb from "./CertThumb";

/**
 * Project cards. Projects with a completion certificate show the documented
 * scope, tonnage and timeline from that certificate; the rest show what the
 * brochure records (location, area, structure type).
 */
export default function CaseStudies({ limit, documentedOnly = false }: { limit?: number; documentedOnly?: boolean }) {
  let list = documentedOnly ? projects.filter((p) => p.scope) : [...projects.filter((p) => p.scope), ...projects.filter((p) => !p.scope)];
  if (limit) list = list.slice(0, limit);
  return (
    <div className="grid gap-4 md:grid-cols-2" data-stagger="0.08">
      {list.map((p) => (
        <article key={p.slug} id={p.slug} className="flex scroll-mt-28 flex-col border border-[var(--line-strong)] bg-white sm:flex-row">
          <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-steel sm:aspect-auto sm:w-[42%]">
            <Image
              src={p.img}
              alt={`${p.name}, ${p.place}`}
              fill
              sizes="(min-width:768px) 22vw, 100vw"
              className={p.img.includes("/certs/") ? "object-contain p-3" : "object-cover"}
            />
          </div>
          <div className="flex flex-1 flex-col p-5 md:p-6">
            <div className="mono text-[10px] text-mute">
              {p.place}, {p.state}
            </div>
            <h3 className="display mt-1.5 text-[clamp(19px,1.7vw,24px)]">{p.name}</h3>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[14px]">
              <div>
                <dt className="mono text-[10px] text-mute">Structure</dt>
                <dd>{p.type}</dd>
              </div>
              {p.sqft && (
                <div>
                  <dt className="mono text-[10px] text-mute">Covered area</dt>
                  <dd>{p.sqft.toLocaleString("en-IN")} sq ft</dd>
                </div>
              )}
              {p.tonnage && (
                <div>
                  <dt className="mono text-[10px] text-mute">Steel</dt>
                  <dd>{p.tonnage}</dd>
                </div>
              )}
              {p.duration && (
                <div>
                  <dt className="mono text-[10px] text-mute">Timeline</dt>
                  <dd>{p.duration}</dd>
                </div>
              )}
            </dl>
            {p.scope && (
              <p className="mt-4 border-l-2 border-orange pl-3 text-[14px] leading-relaxed text-bone/80">
                <span className="font-medium text-bone">Scope: </span>
                {p.scope}
              </p>
            )}
            {p.note && <p className="mt-3 text-[14px] leading-relaxed text-bone/65">{p.note}</p>}
            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
              <Link href={`${journeys.peb.href}?ref=${p.slug}`} className="text-[14px] font-medium text-orange hover:text-bone">
                Discuss a similar project →
              </Link>
              {p.cert && <CertThumb src={p.cert} name={p.name} />}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
