import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import Button from "@/components/Button";
import { company, journeys, projects, telHref } from "@/lib/content";
import { seoPages } from "@/lib/seo-pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return seoPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = seoPages.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.metaTitle, description: p.description, alternates: { canonical: `/${p.slug}` } };
}

export default async function SeoPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const p = seoPages.find((x) => x.slug === slug);
  if (!p) notFound();
  const j = p.journey === "peb" ? journeys.peb : journeys.fab;
  const evidence = p.evidence.map((s) => projects.find((x) => x.slug === s)!).filter(Boolean);
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: p.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <PageHero kicker={j.title} title={p.h1} img={p.img} imgAlt={p.imgAlt} intro={p.intro}>
        <div className="flex flex-wrap gap-3">
          <Button href={j.href}>{j.cta}</Button>
          <Button href={telHref} variant="ghost">
            Call {company.phone}
          </Button>
        </div>
      </PageHero>

      <section className="wrap border-t border-[var(--line)] py-16 md:py-20">
        <SectionHead label="Capabilities" title="What we bring" className="mb-10" />
        <div className="grid gap-4 md:grid-cols-3" data-stagger>
          {p.capabilities.map((c) => (
            <div key={c.title} className="bg-graphite p-6">
              <span className="mb-5 block h-1.5 w-8 bg-orange" />
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-bone/70">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap grid gap-10 py-16 md:py-20 lg:grid-cols-2">
        <div>
          <SectionHead label="Scope" title="What we deliver" />
          <ul className="mt-8 border-t border-[var(--line)]" data-stagger>
            {p.scope.map((s) => (
              <li key={s} className="flex items-center gap-4 border-b border-[var(--line)] py-3.5">
                <span className="h-2 w-2 shrink-0 bg-orange" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionHead label="Project evidence" title="Recent work" />
          <ul className="mt-8 space-y-3" data-stagger>
            {evidence.map((e) => (
              <li key={e.slug} className="border border-[var(--line-strong)] p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold">{e.name}</h3>
                  <span className="mono text-[10px] text-mute">
                    {e.place}, {e.state}
                  </span>
                </div>
                <p className="mt-1.5 text-[15px] text-bone/70">
                  {[e.type, e.sqft && `${e.sqft.toLocaleString("en-IN")} sq ft`, e.tonnage, e.duration].filter(Boolean).join(" · ")}
                </p>
                {e.scope && <p className="mt-2 text-[14px] text-bone/65">{e.scope}</p>}
              </li>
            ))}
          </ul>
          <Link href="/projects" className="mt-5 inline-block font-medium text-orange hover:underline">
            All projects →
          </Link>
        </div>
      </section>

      <section className="wrap border-t border-[var(--line)] py-16 md:py-20">
        <SectionHead label="FAQ" title="Common questions" className="mb-8" />
        <div className="max-w-3xl divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {p.faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-medium">
                {f.q}
                <span className="text-orange transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-bone/70">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="wrap pb-20">
        <div className="flex flex-col gap-6 bg-night p-8 text-white md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <h2 className="display text-[clamp(22px,2.6vw,34px)]">{p.journey === "peb" ? "Planning a building?" : "Have drawings ready?"}</h2>
            <p className="mt-2 text-white/70">{j.body}</p>
          </div>
          <Button href={j.href}>{j.cta}</Button>
        </div>
      </section>
    </>
  );
}
