import india from "@svg-maps/india";

type Loc = { id: string; name: string; path: string };
const map = india as unknown as { viewBox: string; locations: Loc[] };

// Mercator fit of the svg-maps India outline (viewBox 612 × 696)
const W = { lon0: 68.1, lon1: 97.42, lat0: 37.1, lat1: 6.74 };
const merc = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
export function project(lat: number, lon: number) {
  const x = ((lon - W.lon0) / (W.lon1 - W.lon0)) * 612;
  const y = ((merc(W.lat0) - merc(lat)) / (merc(W.lat0) - merc(W.lat1))) * 696;
  return { x, y };
}

const plant = { name: "Palwal", lat: 28.14, lon: 77.33 };

// as marked in the company brochure's "Our Presence" map
const PROJECT_STATES = ["hp", "rj", "up", "br", "mh"];

export default function IndiaMap({ className = "" }: { className?: string }) {
  const p = project(plant.lat, plant.lon);
  return (
    <svg
      viewBox="0 0 612 696"
      className={className}
      role="img"
      aria-label="Map of India: manufacturing unit in Haryana; projects delivered in Himachal Pradesh, Rajasthan, Uttar Pradesh, Bihar and Maharashtra"
    >
      <defs>
        <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,106,0,.6)" strokeWidth="2.2" />
        </pattern>
      </defs>
      <g data-draw>
        {map.locations.map((l) => {
          const proj = PROJECT_STATES.includes(l.id);
          const hr = l.id === "hr";
          return (
            <path
              key={l.id}
              d={l.path}
              fill={hr ? "#ff6a00" : proj ? "url(#hatch)" : "rgba(236,232,224,.03)"}
              stroke={hr || proj ? "#ff6a00" : "rgba(236,232,224,.28)"}
              strokeWidth={hr || proj ? 1.2 : 0.6}
            >
              <title>{l.name}</title>
            </path>
          );
        })}
      </g>
      <g>
        <circle cx={p.x} cy={p.y} r="14" fill="none" stroke="#ff6a00" strokeWidth="1.5" className="pulse-ring" />
        <rect x={p.x - 5} y={p.y - 5} width="10" height="10" fill="#111214" stroke="#ff6a00" strokeWidth="2.5" />
        <line x1={p.x - 7} y1={p.y - 7} x2={p.x - 55} y2={p.y - 55} stroke="#ff6a00" strokeWidth="1" />
        <line x1={p.x - 55} y1={p.y - 55} x2={p.x - 175} y2={p.y - 55} stroke="#ff6a00" strokeWidth="1" />
        <text x={p.x - 175} y={p.y - 63} fill="#ece8e0" fontSize="15" fontFamily="var(--font-jet)" letterSpacing="1">
          PALWAL PLANT
        </text>
        <text x={p.x - 175} y={p.y - 37} fill="#8c8f96" fontSize="11" fontFamily="var(--font-jet)" letterSpacing="1">
          6000 MT / YEAR
        </text>
      </g>
    </svg>
  );
}
