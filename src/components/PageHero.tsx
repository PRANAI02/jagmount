import Image from "next/image";

/** Inner-page hero: oversized split title over a parallax photo with a CAD title block. */
export default function PageHero({
  kicker,
  title,
  outline,
  img,
  intro,
  meta,
}: {
  n?: string;
  kicker: string;
  title: string;
  outline?: string;
  img: string;
  intro: string;
  meta: [string, string][];
}) {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-10 pt-32 md:pb-14">
      <div className="absolute inset-0">
        <div className="absolute inset-[-12%_0]" data-parallax="10">
          <Image src={img} alt="" fill priority sizes="100vw" className="object-cover opacity-45" style={{ filter: "grayscale(.5) contrast(1.1)" }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        <div className="blueprint absolute inset-0 opacity-60" />
      </div>
      <div className="wrap relative">
        <div className="mono mb-6 flex items-center gap-3 text-[11px] text-orange">
          <span className="h-2 w-2 bg-orange" />
          {kicker}
        </div>
        <h1 className="display text-[clamp(32px,9.4vw,170px)]">
          <span className="block" data-split="chars">
            {title}
          </span>
          {outline && (
            <span className="outline-orange block" data-split="chars" data-delay="0.2">
              {outline}
            </span>
          )}
        </h1>
        <div className="mt-10 grid gap-8 border-t border-[var(--line)] pt-6 md:grid-cols-[1.4fr_1fr]">
          <p className="max-w-xl text-base leading-relaxed text-bone/75 md:text-lg" data-reveal data-delay="0.4">
            {intro}
          </p>
          <dl className="mono grid grid-cols-2 gap-px self-end border border-[var(--line)] bg-[var(--line)] text-[10px]" data-reveal data-delay="0.5">
            {meta.map(([k, v]) => (
              <div key={k} className="bg-ink/80 p-3">
                <dt className="text-mute">{k}</dt>
                <dd className="mt-1 text-[12px] text-bone">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
