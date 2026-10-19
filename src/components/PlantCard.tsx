import { company } from "@/lib/content";

/** Drawn location card for the Palwal plant (no third-party map imagery). */
export default function PlantCard({ className = "" }: { className?: string }) {
  return (
    <a
      href={company.plantLink}
      target="_blank"
      rel="noreferrer"
      className={`group relative block overflow-hidden border border-[var(--line)] bg-graphite ${className}`}
    >
      <div className="blueprint absolute inset-0 opacity-70" />
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden data-draw>
        <circle cx="200" cy="150" r="110" fill="none" stroke="rgba(23,24,27,.1)" />
        <circle cx="200" cy="150" r="70" fill="none" stroke="rgba(23,24,27,.14)" />
        <circle cx="200" cy="150" r="30" fill="none" stroke="#ec6411" strokeWidth="1.5" />
        <line x1="0" y1="150" x2="400" y2="150" stroke="rgba(23,24,27,.2)" strokeDasharray="4 6" />
        <line x1="200" y1="0" x2="200" y2="300" stroke="rgba(23,24,27,.2)" strokeDasharray="4 6" />
      </svg>
      <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 bg-orange" />
      <span className="pulse-ring absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange" />
      <div className="mono absolute left-4 top-4 text-[10px] leading-relaxed text-mute">
        <div className="text-orange">Manufacturing unit</div>
        28.14° N · 77.33° E
      </div>
      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4">
        <address className="text-sm not-italic leading-snug text-bone/85">{company.plant.join(", ")}</address>
        <span className="mono shrink-0 bg-orange px-3 py-2 text-[10px] text-white transition-colors group-hover:bg-night">Open in Maps ↗</span>
      </div>
    </a>
  );
}
