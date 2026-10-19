import Image from "next/image";
import { machines } from "@/lib/content";

/** Verified machinery: photo, what it is, and what it lets us make. Always fully legible. */
export default function MachineGrid() {
  return (
    <div className="grid gap-4 lg:grid-cols-3" data-stagger="0.1">
      {machines.map((m) => (
        <article key={m.title} className="flex flex-col border border-[var(--line-strong)] bg-white">
          <div className="relative aspect-[4/3] overflow-hidden bg-steel">
            <Image src={m.img} alt={`${m.title} at the Jagmount plant, Palwal`} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" />
            <span className="mono absolute left-3 top-3 bg-white px-2 py-1 text-[10px] text-bone">{m.spec}</span>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="display text-[clamp(20px,1.8vw,26px)]">{m.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-bone/70">{m.body}</p>
            <div className="mt-auto border-t border-[var(--line)] pt-4">
              <div className="mono mt-4 text-[10px] text-orange">What it lets us make</div>
              <p className="mt-1.5 text-[15px] font-medium">{m.enables}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
