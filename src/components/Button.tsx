import Link from "next/link";
import Magnetic from "./Magnetic";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
};

/** Orange slab button. The label rolls over to a duplicate on hover. */
export default function Button({ href, children, variant = "solid", className = "" }: Props) {
  const file = href.endsWith(".pdf");
  const ext = file || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const cls = variant === "solid" ? "bg-orange text-ink hover:bg-bone" : "border border-[var(--line-strong)] text-bone hover:border-orange hover:text-orange";
  const inner = (
    <>
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover/btn:-translate-y-full">{children}</span>
        <span className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover/btn:translate-y-0">
          {children}
        </span>
      </span>
      <svg width="14" height="14" viewBox="0 0 14 14" className="transition-transform duration-500 group-hover/btn:rotate-45" aria-hidden>
        <path d="M2 12 12 2M4 2h8v8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </>
  );
  const classes = `group/btn mono inline-flex items-center gap-3 px-6 py-4 text-[12px] font-medium transition-colors duration-300 ${cls} ${className}`;
  return (
    <Magnetic strength={0.25}>
      {ext ? (
        <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" download={file || undefined}>
          {inner}
        </a>
      ) : (
        <Link href={href} className={classes}>
          {inner}
        </Link>
      )}
    </Magnetic>
  );
}
