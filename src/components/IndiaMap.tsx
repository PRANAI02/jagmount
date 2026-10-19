import india from "@svg-maps/india";

type Loc = { id: string; name: string; path: string };
const map = india as unknown as { viewBox: string; locations: Loc[] };

// Mercator fit of the svg-maps India outline (viewBox 612 × 696)
const W = { lon0: 68.1, lon1: 97.42, lat0: 37.1, lat1: 6.74 };
const merc = (lat: number) =>
  Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
export function project(lat: number, lon: number) {
  const x = ((lon - W.lon0) / (W.lon1 - W.lon0)) * 612;
  const y = ((merc(W.lat0) - merc(lat)) / (merc(W.lat0) - merc(W.lat1))) * 696;
  return { x, y };
}

const plant = { name: "Palwal", lat: 28.14, lon: 77.33 };

// brochure "Our Presence" map (Haryana = manufacturing unit) plus Madhya Pradesh (Inoflex, Indore) and
// Uttarakhand (KS Industries & Ambika, Haridwar), where featured projects are. Pending client confirmation.
const PROJECT_STATES = ["hp", "rj", "up", "br", "mh", "mp", "ut"];

export default function IndiaMap({ className = "" }: { className?: string }) {
  const p = project(plant.lat, plant.lon);
  return (
    <figure>
      <svg
        viewBox="0 0 612 696"
        className={className}
        role="img"
        aria-label="Map of India: manufacturing unit in Haryana; projects delivered in Himachal Pradesh, Uttarakhand, Rajasthan, Uttar Pradesh, Madhya Pradesh, Bihar and Maharashtra"
      >
        <g data-draw>
          {map.locations.map((l) => {
            const proj = PROJECT_STATES.includes(l.id);
            const hr = l.id === "hr";
            return (
              <path
                key={l.id}
                d={l.path}
                fill={hr ? "#ec6411" : proj ? "#3a3d44" : "#e3e4e1"}
                stroke={hr || proj ? "#ffffff" : "#9a9da3"}
                strokeWidth={hr || proj ? 1 : 0.7}
              >
                <title>{l.name}</title>
              </path>
            );
          })}
        </g>
        <g>
          <circle
            cx={p.x}
            cy={p.y}
            r="14"
            fill="none"
            stroke="#ff6a00"
            strokeWidth="1.5"
            className="pulse-ring"
          />
          <rect
            x={p.x - 5}
            y={p.y - 5}
            width="10"
            height="10"
            fill="#ffffff"
            stroke="#ff6a00"
            strokeWidth="2.5"
          />
          <line
            x1={p.x - 7}
            y1={p.y - 7}
            x2={p.x - 55}
            y2={p.y - 100}
            stroke="#ff6a00"
            strokeWidth="1"
          />
          <line
            x1={p.x - 55}
            y1={p.y - 100}
            x2={p.x - 175}
            y2={p.y - 100}
            stroke="#ff6a00"
            strokeWidth="1"
          />
          <text
            x={p.x - 175}
            y={p.y - 108}
            fill="#17181b"
            fontSize="15"
            fontFamily="var(--font-jet)"
            letterSpacing="1"
          >
            PALWAL PLANT
          </text>
          <text
            x={p.x - 175}
            y={p.y - 82}
            fill="#63666d"
            fontSize="11"
            fontFamily="var(--font-jet)"
            letterSpacing="1"
          >
            6000 MT / YEAR
          </text>
        </g>
      </svg>
      <figcaption className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px]">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 bg-[#ec6411]" /> Manufacturing unit
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 bg-[#3a3d44]" /> Projects delivered
        </span>
      </figcaption>
    </figure>
  );
}
