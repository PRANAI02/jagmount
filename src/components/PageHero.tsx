import Image from "next/image";

/** Inner-page hero: title and intro beside a framed photo, with a small spec block. */
export default function PageHero({
  kicker,
  title,
  outline,
  img,
  imgAlt = "",
  intro,
  meta,
  children,
}: {
  n?: string;
  kicker: string;
  title: string;
  outline?: string;
  img: string;
  imgAlt?: string;
  intro: string;
  meta?: [string, string][];
  children?: React.ReactNode;
}) {
  return (
    <section className="wrap grid gap-10 pb-14 pt-32 md:pb-20 md:pt-40 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
      <div>
        <div className="mono mb-5 flex items-center gap-3 text-[11px] text-orange">
          <span className="h-2 w-2 bg-orange" />
          {kicker}
        </div>
        <h1 className="display text-[clamp(32px,4.6vw,60px)]" data-split>
          {title}
          {outline ? ` ${outline.replace(/\.$/, "")}` : ""}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-bone/75 md:text-lg" data-reveal data-delay="0.15">
          {intro}
        </p>
        {children && (
          <div className="mt-8" data-reveal data-delay="0.25">
            {children}
          </div>
        )}
        {meta && (
          <dl className="mt-10 grid grid-cols-2 border-l border-t border-[var(--line)] sm:grid-cols-4" data-reveal data-delay="0.3">
            {meta.map(([k, v]) => (
              <div key={k} className="border-b border-r border-[var(--line)] p-3">
                <dt className="mono text-[10px] text-mute">{k}</dt>
                <dd className="mt-1 text-[15px] font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      <div className="relative aspect-[4/3] overflow-hidden bg-steel" data-clip>
        <Image src={img} alt={imgAlt} fill priority sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
      </div>
    </section>
  );
}
