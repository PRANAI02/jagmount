import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost" | "dark";
  className?: string;
};

/** Slab button. The label rolls over to a duplicate on hover (transform only). */
export default function Button({ href, children, variant = "solid", className = "" }: Props) {
  const ext = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const cls =
    variant === "solid"
      ? "bg-orange text-white hover:bg-[#c4520b]"
      : variant === "dark"
        ? "bg-night text-white hover:bg-orange"
        : "border border-[var(--line-strong)] bg-white text-bone hover:border-orange hover:text-orange";
  const inner = (
    <>
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover/btn:-translate-y-full">{children}</span>
        <span
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover/btn:translate-y-0"
          aria-hidden
        >
          {children}
        </span>
      </span>
      <svg width="13" height="13" viewBox="0 0 14 14" className="shrink-0 transition-transform duration-500 group-hover/btn:rotate-45" aria-hidden>
        <path d="M2 12 12 2M4 2h8v8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </>
  );
  const classes = `group/btn inline-flex items-center justify-between gap-3 px-5 py-3.5 text-[14px] font-medium transition-colors duration-300 ${cls} ${className}`;
  return ext ? (
    <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
