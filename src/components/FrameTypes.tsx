const frames: { code: string; name: string; paths: string[]; thin?: string[]; hatch?: string[] }[] = [
  { code: "CS", name: "Clear Span", paths: ["M20 110V52L100 36L180 52V110"] },
  { code: "MS-1", name: "Multi-Span 1", paths: ["M20 110V52L100 36L180 52V110"], thin: ["M100 110V40"] },
  { code: "MS-2", name: "Multi-Span 2", paths: ["M20 110V52L100 36L180 52V110"], thin: ["M73 110V42", "M127 110V42"] },
  { code: "MG", name: "Multi-Gable", paths: ["M20 110V54L60 40L100 54L140 40L180 54V110"], thin: ["M100 110V56"] },
  { code: "SS", name: "Single Slope", paths: ["M20 110V38L180 60V110"] },
  { code: "LT", name: "Lean-To", paths: ["M60 50L170 66V110"], hatch: ["M30 110V30H60V110"] },
  { code: "TC", name: "T-Canopy", paths: ["M100 110V48", "M22 58L100 46L178 58"] },
  { code: "RS", name: "Roof System", paths: ["M20 60L100 44L180 60"], hatch: ["M20 110V62H44V110", "M156 110V62H180V110"] },
];

export default function FrameTypes() {
  return (
    <div className="grid grid-cols-2 border-l border-t border-[var(--line)] md:grid-cols-4">
      {frames.map((f) => (
        <div key={f.code} className="group relative border-b border-r border-[var(--line)] p-4 transition-colors duration-500 hover:bg-steel md:p-6">
          <div className="mono flex justify-between text-[10px] text-mute">
            <span>Frame</span>
            <span className="text-orange">{f.code}</span>
          </div>
          <svg viewBox="0 0 200 130" className="mt-2 w-full" data-draw>
            <line x1="0" y1="110.5" x2="200" y2="110.5" stroke="rgba(236,232,224,.25)" strokeWidth="1" />
            {f.hatch?.map((d) => (
              <path key={d} d={d} fill="none" stroke="rgba(236,232,224,.4)" strokeWidth="1.2" strokeDasharray="3 3" />
            ))}
            {f.thin?.map((d) => (
              <path key={d} d={d} fill="none" stroke="#ff6a00" strokeWidth="2.2" />
            ))}
            {f.paths.map((d) => (
              <path
                key={d}
                d={d}
                fill="none"
                stroke="#ff6a00"
                strokeWidth="4.2"
                strokeLinejoin="round"
                className="transition-[stroke-width] duration-500 group-hover:[stroke-width:5.5]"
              />
            ))}
            {/* dimension line */}
            <line x1="20" y1="122" x2="180" y2="122" stroke="rgba(236,232,224,.45)" strokeWidth="0.8" />
            <line x1="20" y1="117" x2="20" y2="127" stroke="rgba(236,232,224,.45)" strokeWidth="0.8" />
            <line x1="180" y1="117" x2="180" y2="127" stroke="rgba(236,232,224,.45)" strokeWidth="0.8" />
          </svg>
          <div className="mt-2 text-[15px] font-semibold md:text-base">{f.name}</div>
        </div>
      ))}
    </div>
  );
}
