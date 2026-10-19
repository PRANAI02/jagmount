/** Section label with a CAD dimension line, then a split-reveal heading. */
export default function SectionHead({
  label,
  title,
  outline,
  intro,
  className = "",
}: {
  n?: string;
  label: string;
  title: string;
  outline?: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="mono mb-8 flex items-center gap-4 text-[11px] text-mute">
        <span className="relative h-px flex-1 bg-[var(--line-strong)]" data-dim>
          <span className="absolute -top-[4px] left-0 h-[9px] w-px bg-[var(--line-strong)]" />
          <span className="absolute -top-[4px] right-0 h-[9px] w-px bg-[var(--line-strong)]" />
        </span>
        <span>{label}</span>
      </div>
      <h2 className="display text-[clamp(30px,4.6vw,80px)]">
        <span className="block" data-split>
          {title}
        </span>
        {outline && (
          <span className="outline-orange block" data-split data-delay="0.12">
            {outline}
          </span>
        )}
      </h2>
      {intro && (
        <p className="mt-8 max-w-xl text-base leading-relaxed text-bone/70 md:text-lg" data-reveal>
          {intro}
        </p>
      )}
    </div>
  );
}
