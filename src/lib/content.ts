export const company = {
  name: "Jagmount Projects",
  legal: "Jagwati Metals Engineering LLP",
  tagline: "Design to Completion.",
  email: "info@jagmount.com",
  // the one public number (client brief, Oct 2026)
  phone: "+91 98712 08401",
  headOffice: ["3rd Floor, SCO No. 8", "Block-B, Sector-11", "Faridabad, Haryana"],
  plant: ["Plot 23/2, Pingore", "Palwal, Haryana", "121105"],
  plantLink: "https://www.google.com/maps/search/?api=1&query=Pingore,+Palwal,+Haryana+121105",
  founders: ["Mr. Satpal Mangla", "Mr. Dinesh Kumar Mangla"],
};

export const tel = (p: string) => "tel:" + p.replace(/[^+\d]/g, "");
export const telHref = tel(company.phone);
export const whatsapp = (text = "Hi Jagmount, I have an enquiry.") =>
  `https://wa.me/91${company.phone.replace(/\D/g, "").slice(-10)}?text=${encodeURIComponent(text)}`;
export const mailHref = `mailto:${company.email}`;

/** Single source for every count shown on the site (brochure + completion certificates). */
export const metrics = {
  pebYears: "5+",
  founderYears: "20+",
  capacity: "6000",
  delivered: "20+",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/manufacturing", label: "Manufacturing" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

/** The two buyer journeys (client brief items 06 to 09). */
export const journeys = {
  peb: {
    href: "/quote/peb",
    cta: "Get a PEB Quote",
    title: "PEB & industrial buildings",
    who: ["Factory owners", "Warehouse owners", "Industrial developers", "Project consultants"],
    body: "Complete pre-engineered buildings: design, fabrication, supply and erection, with secondary members, cladding and accessories.",
    points: ["Clear span, multi-span and multi-gable frames", "Roof & wall sheeting, purlins, PUF panels", "Supply and erection to handover"],
  },
  fab: {
    href: "/quote/fabrication",
    cta: "Request Fabrication Pricing",
    title: "Structural steel fabrication & jobwork",
    who: ["PEB manufacturers", "EPC contractors", "Structural steel fabricators", "Industrial engineering companies"],
    body: "Built-up members fabricated to your drawings at our Palwal plant, on CNC plasma cutting, an automated H-beam line and pull-through welding.",
    points: ["Built-up beams, columns & rafters", "Crane beams & platforms", "Other structural steel to drawing"],
  },
};

export const workTypes = ["Built-up beams", "Columns", "Rafters", "Crane beams", "Platforms", "Other structural steel"];

export const stats = [
  { value: 5, suffix: "+", label: "Years in pre-engineered buildings" },
  { value: 6000, suffix: "", unit: "MT", label: "Annual fabrication capacity" },
  { value: 20, suffix: "+", label: "Projects delivered" },
  { value: 20, suffix: "+", label: "Years of founder experience in construction & infrastructure" },
];

export const components = [
  {
    n: "01",
    title: "Primary Frame",
    body: "Steel columns and rafters form the main support structure of the building, engineered for the span, load and crane class of your facility.",
  },
  {
    n: "02",
    title: "Secondary Frame",
    body: "Girts, purlins and eave struts give additional support and attachment points for the wall and roof panels.",
  },
  {
    n: "03",
    title: "Roof & Wall Panels",
    body: "Profiled steel panels form the exterior skin, built for durability and protection against the elements.",
  },
  {
    n: "04",
    title: "Accessories",
    body: "Skylights, ventilators, louvers, gutters, canopies, rolling shutters, cranes, solar panels and more. Everything that turns a frame into a working building.",
  },
];

export const advantages = [
  { title: "Cost Effective", body: "Optimised steel tonnage and factory production keep the total build cost lower than conventional construction." },
  { title: "Time Efficient", body: "Components are fabricated while the site is prepared, then bolted together for fast erection." },
  { title: "Durability", body: "Engineered members and coated steel built to stand for decades with low maintenance." },
  { title: "Design Flexibility", body: "Clear spans, mezzanines, cranes and custom facades, designed to your process and plot." },
  { title: "Sustainability", body: "Steel is recyclable, and our roofs are ready for solar, skylights and natural ventilation." },
  { title: "Scalability", body: "End walls can be designed for future expansion, so the building grows with your business." },
];

export const services = [
  {
    slug: "peb",
    n: "01",
    title: "Pre-Engineered Buildings",
    short: "Complete PEB systems from concept and design to erection and handover.",
    body: "Structures designed and manufactured in our factory, then transported to site for quick and easy assembly. Lower construction cost, faster completion and flexible design options for industrial and warehousing developments.",
    points: ["Clear span, multi-span and multi-gable frames", "Crane buildings & mezzanines", "Turnkey design, supply and erection"],
    img: "/img/site/skylight-frame.jpg",
  },
  {
    slug: "fabrication",
    n: "02",
    title: "Structural Steel Fabrication",
    short: "Built-up sections, H-beams and heavy structural steel cut, welded and finished in-house.",
    body: "Our Palwal plant runs CNC plasma cutting, an automated H-beam production line and pull-through welding to produce accurate, consistent structural members for PEB and conventional steel structures.",
    points: ["CNC plasma cutting with Hypertherm Maxpro 200", "Automated H-beam assembly & welding", "Built-up and tapered sections"],
    img: "/img/site/peb-interior.jpg",
  },
  {
    slug: "secondary",
    n: "03",
    title: "Secondary Members & Cladding",
    short: "Z & C purlins, roof and wall sheets, deck sheets, PUF panels and bracing.",
    body: "Secondary elements provide support, stability and enclosure to the main structure. We roll-form and supply the components that complete the building system.",
    points: ["Z & C purlins", "Roof, wall & deck sheets", "PUF panels, rod & angle bracing"],
    img: "/img/gallery/g15.jpg",
  },
  {
    slug: "accessories",
    n: "04",
    title: "PEB Accessories",
    short: "Louvers, skylights, turbo ventilators, downtake pipes and custom doors.",
    body: "Accessories add functionality, safety and comfort to steel buildings, improving the efficiency and usability of every structure we deliver.",
    points: ["Fixed louvers & polycarbonate sheets", "Turbo ventilators", "Gutters & downtake pipes"],
    img: "/img/site/crane-hall.jpg",
  },
  {
    slug: "green",
    n: "05",
    title: "Solar & Green Buildings",
    short: "Solar-ready roofs and energy-efficient industrial infrastructure.",
    body: "We design buildings that reduce environmental impact while improving operational efficiency, with photovoltaic panels, inverters, smart grid integration and solar monitoring.",
    points: ["Rooftop photovoltaic systems", "Smart grid integration", "Solar monitoring systems"],
    img: "/img/site/solar-aerial.jpg",
  },
];

export const sectors = [
  {
    title: "Industrial Facilities",
    img: "/img/solutions/industrial.jpg",
    items: ["Warehouses", "Distribution Centres", "Manufacturing Plants", "Factories", "Workshops"],
  },
  {
    title: "Retail & Commercial",
    img: "/img/solutions/retail.jpg",
    items: ["Business Centres", "Petrol Pumps", "Office Buildings", "Shopping Malls", "Car Dealerships"],
  },
  {
    title: "Institutional & Exhibitions",
    img: "/img/solutions/institutional.jpg",
    items: ["Trade Show Buildings", "Convention Halls", "School Buildings", "College Campuses", "Healthcare Facilities"],
  },
  {
    title: "Recreational & Sports",
    img: "/img/solutions/sports.jpg",
    items: ["Gymnasiums", "Swimming Pools", "Community Centres", "Stadiums", "Sports Arenas"],
  },
  {
    title: "Transportation & Infrastructure",
    img: "/img/solutions/transport.jpg",
    items: ["Bus Terminals", "Aircraft Hangars", "Metro Stations", "Airports", "Cargo Terminals"],
  },
  {
    title: "Plants & Heavy Industries",
    img: "/img/solutions/plants.jpg",
    items: ["Power Plants", "Control Rooms", "Renewable Energy Plants", "Water Treatment Plants"],
  },
];

// Verified against brochure p.15. The brochure also carries hidden "Profile Sheeting" and
// "Shearing" labels with no photos; those stay off the site until the client confirms them.
export const machines = [
  {
    title: "CNC Plasma Cutting",
    spec: "Hypertherm Maxpro 200",
    body: "High-speed, precision cutting with excellent edge quality, accurate fabrication, optimal material utilisation and consistent results for structural steel components.",
    enables: "Flange and web plates, base plates, end plates, stiffeners and gussets cut to CNC profiles.",
    img: "/img/gallery/g10.jpg",
  },
  {
    title: "H-Beam Production Line",
    spec: "Automated assembly & tacking",
    body: "Precise assembly and welding of structural beams with high efficiency and consistency, maintaining dimensional accuracy for PEB projects.",
    enables: "Built-up I-sections for columns, rafters and beams, including tapered members.",
    img: "/img/site/h-beam-line.jpg",
  },
  {
    title: "Pull Through Welding",
    spec: "PTW machine",
    body: "High-speed, continuous welding of built-up sections with exceptional accuracy and strength, consistent weld quality and reliable performance.",
    enables: "Continuous flange-to-web welds on long built-up members.",
    img: "/img/site/ptw-machine.jpg",
  },
];

export const process = [
  { n: "01", title: "Design", body: "Concept, load analysis and design in STAAD Pro to AISC and Indian Standards." },
  { n: "02", title: "Detailing", body: "Members, plates and connections detailed in Tekla Structures and AutoCAD." },
  { n: "03", title: "Cutting", body: "Plates profiled on the CNC plasma cutter (Hypertherm Maxpro 200)." },
  { n: "04", title: "Assembly & welding", body: "Sections assembled on the H-beam line and welded on the PTW machine." },
  { n: "05", title: "Dispatch & erection", body: "Members dispatched to site and erected with structure and sheeting to handover." },
];

export type Project = {
  slug: string;
  name: string;
  place: string;
  state: string;
  sqft?: number;
  img: string;
  type: string;
  /** facts from the client's completion certificate, where one exists */
  scope?: string;
  tonnage?: string;
  duration?: string;
  completed?: string;
  cert?: string;
  note?: string;
};

export const projects: Project[] = [
  {
    slug: "inoflex", name: "Inoflex", place: "Indore", state: "Madhya Pradesh", sqft: 95000, img: "/img/projects/inoflex-indore.jpg", type: "Pre-engineered building",
    scope: "PEB project designed, fabricated and handed over to approved drawings, specifications and quality standards.",
    tonnage: "≈1,250 MT", duration: "Within 6 months", completed: "Oct 2025", cert: "/img/certs/inoflex-completion.jpg",
    note: "Our largest build to date: around 1,250 MT of structural steel for a 95,000 sq ft facility, completed and handed over within six months.",
  },
  { slug: "amber", name: "Amber Group", place: "Farukhnagar", state: "Uttar Pradesh", sqft: 70000, img: "/img/projects/amber-group.jpg", type: "Pre-engineered building" },
  {
    slug: "ks-industries", name: "KS Industries", place: "Haridwar", state: "Uttarakhand", sqft: 60000, img: "/img/projects/ks-industries.jpg", type: "Pre-engineered building",
    scope: "Complete supply and erection of the pre-engineered building with structure and sheeting.",
    tonnage: "450 MT", duration: "May to Sep 2025 (under 4 months)", completed: "Sep 2025", cert: "/img/certs/ks-completion.jpg",
    note: "450 tonnes supplied and erected with structure and sheeting, from start to handover in under four months.",
  },
  { slug: "rpm-creations", name: "RPM Creations", place: "Ghaziabad", state: "Uttar Pradesh", sqft: 50000, img: "/img/projects/rpm-creations.jpg", type: "Pre-engineered building" },
  { slug: "laxmi", name: "Laxmi Engineering", place: "Saharanpur", state: "Uttar Pradesh", sqft: 35000, img: "/img/projects/laxmi-saharanpur.jpg", type: "Pre-engineered building" },
  { slug: "jagwati-metals", name: "Jagwati Metals", place: "Palwal", state: "Haryana", sqft: 31000, img: "/img/projects/jagwati-palwal.jpg", type: "Our own fabrication plant" },
  {
    slug: "ambika", name: "Ambika Engineering Works", place: "Haridwar", state: "Uttarakhand", sqft: 27000, img: "/img/projects/ambika.jpg", type: "Pre-engineered building",
    scope: "PEB project completed to the approved drawings, specifications and agreed scope of work.",
    duration: "3.5 months", completed: "Sep 2025", cert: "/img/certs/aew-completion.jpg",
    note: "Completed in three and a half months to the approved drawings and agreed scope.",
  },
  {
    slug: "garg", name: "Garg Plywood & Hardware Store", place: "Mathura", state: "Uttar Pradesh", img: "/img/certs/garg-completion.jpg", type: "Pre-engineered building",
    scope: "Complete supply and erection of the pre-engineered building with structure and sheeting.",
    tonnage: "175 MT", duration: "May to Aug 2025 (about 3 months)", completed: "Aug 2025", cert: "/img/certs/garg-completion.jpg",
    note: "175 tonnes supplied and erected with structure and sheeting in about three months.",
  },
  { slug: "gopal-garden", name: "Gopal Garden", place: "Faridabad", state: "Haryana", sqft: 10000, img: "/img/projects/gopal-garden.jpg", type: "Box column structure" },
];

/** Brochure presence-map states plus MP and Uttarakhand (featured projects there; awaiting client confirmation). */
export const projectStates = ["Himachal Pradesh", "Uttarakhand", "Rajasthan", "Uttar Pradesh", "Madhya Pradesh", "Bihar", "Maharashtra"];
export const projectStatesText = `${projectStates.slice(0, -1).join(", ")} and ${projectStates.at(-1)}`;

export const clients: { name: string; logo?: string }[] = [
  { name: "KS Industries", logo: "/img/clients/ks-industries.png" },
  { name: "Inoflex", logo: "/img/clients/inoflex.png" },
  { name: "Amardeep Constructions", logo: "/img/clients/amardeep.png" },
  { name: "RM Creations", logo: "/img/clients/rm-creations.png" },
  { name: "Amber", logo: "/img/clients/amber.png" },
  { name: "Pragati Constructions", logo: "/img/clients/pragati.png" },
  { name: "DK", logo: "/img/clients/dk.png" },
  { name: "Garg Plywood & Hardware", logo: "/img/clients/garg.png" },
  { name: "Ambika Engineering Works", logo: "/img/clients/aew.png" },
  // added Oct 2026 (brief item 05); a featured project that was missing from the client wall. Swap in a logo when supplied.
  { name: "Laxmi Engineering" },
];

export const certificates = [
  { title: "DPIIT Recognition", by: "Department for Promotion of Industry and Internal Trade", img: "/img/certs/dpiit.jpg" },
  { title: "Udyam Registration", by: "Ministry of MSME, Government of India", img: "/img/certs/udyam.jpg" },
  { title: "Certificate of Completion", by: "Inoflex Pvt. Ltd., Indore", img: "/img/certs/inoflex-completion.jpg" },
  { title: "Completion Certificate", by: "KS Industries", img: "/img/certs/ks-completion.jpg" },
  { title: "Certificate of Completion", by: "Ambika Engineering Works", img: "/img/certs/aew-completion.jpg" },
  { title: "Completion Certificate", by: "Garg Plywood & Hardware Store", img: "/img/certs/garg-completion.jpg" },
];

export const gallery = [
  { src: "/img/gallery/g06.jpg", cap: "Finished clear-span interior" },
  { src: "/img/gallery/g21.jpg", cap: "Frame erection with crane" },
  { src: "/img/gallery/g17.jpg", cap: "Completed industrial facility" },
  { src: "/img/gallery/g10.jpg", cap: "CNC plasma cutting" },
  { src: "/img/gallery/g01.jpg", cap: "Multi-storey steel frame" },
  { src: "/img/gallery/g15.jpg", cap: "Cladding & ventilation complete" },
  { src: "/img/gallery/g14.jpg", cap: "H-beam production line" },
  { src: "/img/gallery/g05.jpg", cap: "Night erection" },
  { src: "/img/gallery/g18.jpg", cap: "Aerial of a delivered plant" },
  { src: "/img/gallery/g12.jpg", cap: "Fabricated built-up members" },
  { src: "/img/gallery/g09.jpg", cap: "Canopy structure" },
  { src: "/img/gallery/g23.jpg", cap: "Roof with ridge ventilation" },
  { src: "/img/gallery/g20.jpg", cap: "Primary frames up" },
  { src: "/img/gallery/g08.jpg", cap: "Facade & rolling shutter" },
  { src: "/img/gallery/g16.jpg", cap: "Tapered rafter section" },
  { src: "/img/gallery/g02.jpg", cap: "Shed handed over" },
  { src: "/img/gallery/g19.jpg", cap: "Members staged at site" },
  { src: "/img/gallery/g22.jpg", cap: "Admin block & plant" },
  { src: "/img/gallery/g11.jpg", cap: "Portal frames & block wall" },
  { src: "/img/gallery/g24.jpg", cap: "Box column structure" },
  { src: "/img/gallery/g03.jpg", cap: "Hydraulic press, Palwal plant" },
  { src: "/img/gallery/g13.jpg", cap: "Columns ready to lift" },
  { src: "/img/gallery/g04.jpg", cap: "Sheeting in progress" },
  { src: "/img/gallery/g07.jpg", cap: "Inside the fabrication bay" },
];

export type Spec = [string, string][];

export const secondary: { title: string; img: string; specs: Spec }[] = [
  { title: "Z & C Purlins", img: "/img/products/zc-purlins.jpg", specs: [["Thickness", "1.5 to 3.0 mm"], ["Profile width", "200 to 300 mm"], ["Yield strength", "345 MPa"], ["Finish", "Pre-galvanised 120/180/275 GSM"]] },
  { title: "Roof & Wall Sheets", img: "/img/products/roof-wall-sheets.jpg", specs: [["Thickness", "0.3 to 0.8 mm"], ["Effective width", "1000 mm"], ["Yield strength", "345 to 550 MPa"], ["Finish", "ASTM A792M Grade 345"]] },
  { title: "Deck Sheets", img: "/img/products/deck-sheets.jpg", specs: [["Thickness", "0.8 to 1.2 mm"], ["Effective width", "1000 mm"], ["Yield strength", "345 MPa"], ["Finish", "Galvanised coils"]] },
  { title: "PUF Panels", img: "/img/products/puf-panels.jpg", specs: [["Thickness", "30 to 150 mm"], ["U-value", "0.482 to 0.208 W/m²K"], ["BTU/ft²h°F", "0.085 to 0.037"], ["kcal/m²h°C", "0.414 to 0.179"]] },
  { title: "Rod Bracings", img: "/img/products/rod-bracing.jpg", specs: [["Yield strength", "250 / 345 MPa"], ["Material", "IS 2062 Grade 50"], ["Fittings", "Galvanised hillside washer"]] },
  { title: "Angle Bracings", img: "/img/products/angle-bracing.jpg", specs: [["Yield strength", "250 / 345 MPa"], ["Material", "IS 2062 Grade 50"], ["Connection", "Gusset plate, angle clip, H.S. bolts"]] },
];

export const accessories: { title: string; img: string; specs: Spec }[] = [
  { title: "Fixed Louvers", img: "/img/products/louvers.jpg", specs: [["JM Type-1", "1 m W × 1 m H"], ["JM Type-2", "2 m W × 1 m H"]] },
  { title: "Polycarbonate Sheets", img: "/img/products/polycarbonate.jpg", specs: [["Thickness", "2 mm"], ["JM Type-1", "1 m L × 3 m W"]] },
  { title: "Turbo Ventilators", img: "/img/products/turbo-ventilator.jpg", specs: [["Diameter", "600 mm"], ["Material", "FRP / Polycarbonate"]] },
  { title: "Downtake Pipes", img: "/img/products/downtake-pipes.jpg", specs: [["Thickness", "0.5 to 6.0 mm"], ["JM Type", "Custom"]] },
];

export const accessoryList = [
  "Gutters & Downspouts", "Skylights", "Ridge Caps & Flashings", "Ventilation Systems", "Canopies & Awnings", "Louvers",
  "Partitions", "False Ceilings", "Roof Monitors", "Walkways & Platforms", "Dock Levellers", "Rolling Shutters",
  "Curtain Walls", "Emergency Exits", "Solar Panels", "Fire Protection", "Foundation Bolts", "Cranes & Hoists",
  "Seismic Bracing", "Expansion Joints",
];

export const why = [
  { title: "Proven industry experience", body: "Founded by professionals with more than two decades in construction and infrastructure." },
  { title: "Innovative & customised solutions", body: "Every frame is designed around your process, plot and future expansion." },
  { title: "Competitive pricing, high quality", body: "In-house fabrication and optimised design keep tonnage and cost in check." },
  { title: "Timely project delivery", body: "Fabrication runs parallel to site work, with erection sequenced for speed." },
];

export const codes = [
  { title: "AISC", body: "American Institute of Steel Construction" },
  { title: "Indian Standards", body: "Bureau of Indian Standards codes for steel design" },
  { title: "STAAD Pro", body: "Structural analysis & design" },
  { title: "Tekla Structures", body: "3D modelling & shop detailing" },
  { title: "AutoCAD", body: "Drafting & general arrangement drawings" },
];
