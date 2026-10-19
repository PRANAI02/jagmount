import Image from "next/image";
import { clients } from "@/lib/content";

export default function ClientWall() {
  return (
    <div className="grid grid-cols-2 border-l border-t border-[var(--line)] sm:grid-cols-3 lg:grid-cols-5" data-stagger="0.04">
      {clients.map((c) => (
        <div key={c.name} className="flex aspect-[3/2] items-center justify-center border-b border-r border-[var(--line)] bg-white p-6">
          {c.logo ? (
            <Image src={c.logo} alt={c.name} width={300} height={150} className="max-h-14 w-auto object-contain opacity-80 md:max-h-16" />
          ) : (
            <span className="text-center text-[17px] font-semibold leading-tight tracking-tight text-[#2b2d33]">{c.name}</span>
          )}
        </div>
      ))}
    </div>
  );
}
