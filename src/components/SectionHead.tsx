/** Section label with a CAD dimension line, then a plain heading. */
export default function SectionHead({
  label,
  title,
  outline,
  intro,
  className = "",
  as: H = "h2",
}: {
  n?: string;
  label: string;
  title: string;
  outline?: string;
  intro?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={className}>
      <div className="mono mb-5 flex items-center gap-4 text-[11px] text-mute">
        <span>{label}</span>
        <span className="relative h-px max-w-24 flex-1 bg-[var(--line-strong)]" data-dim>
          <span className="absolute -top-[4px] right-0 h-[9px] w-px bg-[var(--line-strong)]" />
        </span>
      </div>
      <H className="display text-[clamp(26px,3.2vw,42px)]" data-split>
        {title}
        {outline ? ` ${outline.replace(/\.$/, "")}` : ""}
      </H>
      {intro && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-bone/70 md:text-[17px]" data-reveal>
          {intro}
        </p>
      )}
    </div>
  );
}
