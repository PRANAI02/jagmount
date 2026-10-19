export const company = {
  name: "Jagmount Projects",
  legal: "Jagwati Metals Engineering LLP",
  tagline: "Design to Completion.",
  email: "info@jagmount.com",
  phones: ["+91 98712 08401", "+91 95600 68276", "+91 97289 31777"],
  headOffice: ["3rd Floor, SCO No. 8", "Block-B, Sector-11", "Faridabad, Haryana"],
  plant: ["Plot 23/2, Pingore", "Palwal, Haryana", "121105"],
  plantLink: "https://www.google.com/maps/search/?api=1&query=Pingore,+Palwal,+Haryana+121105",
  founders: ["Mr. Satpal Mangla", "Mr. Dinesh Kumar Mangla"],
};

export const tel = (p: string) => "tel:" + p.replace(/[^+\d]/g, "");

export const nav = [
  { href: "/", label: "Home", n: "00" },
  { href: "/about", label: "About", n: "01" },
  { href: "/services", label: "Services", n: "02" },
  { href: "/manufacturing", label: "Manufacturing", n: "03" },
  { href: "/projects", label: "Projects", n: "04" },
  { href: "/contact", label: "Contact", n: "05" },
];

export const stats = [
  { value: 20, suffix: "+", label: "Years of founder experience in construction & infrastructure" },
  { value: 6000, suffix: "", unit: "MT", label: "Annual fabrication capacity" },
  { value: 20, suffix: "+", label: "Projects delivered" },
  { value: 378, suffix: "K", unit: "sq ft", label: "Covered area across eight featured builds" },
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
    img: "/img/site/fab-hall.jpg",
  },
  {
    slug: "secondary",
    n: "03",
    title: "Secondary Members & Cladding",
    short: "Z & C purlins, roof and wall sheets, deck sheets, PUF panels and bracing.",
    body: "Secondary elements provide support, stability and enclosure to the main structure. We roll-form and supply the components that complete the building system.",
    points: ["Z & C purlins", "Roof, wall & deck sheets", "PUF panels, rod & angle bracing"],
    img: "/img/site/peb-interior.jpg",
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

export const machines = [
  {
    n: "01",
    title: "CNC Plasma Cutting",
    spec: "Hypertherm Maxpro 200",
    body: "High-speed, precision cutting with excellent edge quality. Accurate fabrication, optimal material utilisation and consistent results for structural steel components.",
    img: "/img/site/cnc-plasma.jpg",
  },
  {
    n: "02",
    title: "H-Beam Production Line",
    spec: "Automated assembly & tacking",
    body: "Precise assembly and welding of structural beams with high efficiency. Maintains dimensional accuracy and delivers superior-quality fabricated sections for PEB projects.",
    img: "/img/site/h-beam-line.jpg",
  },
  {
    n: "03",
    title: "Pull Through Welding",
    spec: "PTW for built-up sections",
    body: "High-speed, continuous welding of built-up sections with exceptional accuracy and strength. Consistent weld quality and reliable performance.",
    img: "/img/site/ptw-machine.jpg",
  },
  {
    n: "04",
    title: "Profile Sheeting",
    spec: "Roll-forming line",
    body: "In-house roll forming of roof and wall profiles, so sheeting is matched to every frame we fabricate.",
    img: "/img/gallery/g07.jpg",
  },
  {
    n: "05",
    title: "Shearing",
    spec: "Plate & sheet shearing",
    body: "Clean, square cuts on plate and sheet for flanges, webs, gussets and flashings.",
    img: "/img/gallery/g12.jpg",
  },
];

export const process = [
  { n: "01", title: "Design", body: "Concept, load analysis and optimised design in STAAD Pro to AISC and Indian Standards." },
  { n: "02", title: "Detailing", body: "Every member, plate and bolt modelled and detailed in Tekla Structures and AutoCAD." },
  { n: "03", title: "Fabrication", body: "Cut, assembled and welded on our Palwal production lines with in-process quality checks." },
  { n: "04", title: "Dispatch", body: "Members marked, bundled and sequenced to arrive on site in erection order." },
  { n: "05", title: "Erection", body: "Our crews bolt up the frame, secondary members, sheeting and accessories to handover." },
];

export type Project = {
  slug: string;
  name: string;
  place: string;
  state: string;
  sqft: number;
  img: string;
  type: string;
};

export const projects: Project[] = [
  { slug: "inoflex", name: "Inoflex", place: "Indore", state: "Madhya Pradesh", sqft: 95000, img: "/img/projects/inoflex-indore.jpg", type: "Manufacturing plant" },
  { slug: "amber", name: "Amber Group", place: "Farukhnagar", state: "Uttar Pradesh", sqft: 70000, img: "/img/projects/amber-group.jpg", type: "Industrial facility" },
  { slug: "ks-industries", name: "KS Industries", place: "Haridwar", state: "Uttarakhand", sqft: 60000, img: "/img/projects/ks-industries.jpg", type: "Factory" },
  { slug: "rpm-creations", name: "RPM Creations", place: "Ghaziabad", state: "Uttar Pradesh", sqft: 50000, img: "/img/projects/rpm-creations.jpg", type: "Industrial facility" },
  { slug: "laxmi", name: "Laxmi Engineering", place: "Saharanpur", state: "Uttar Pradesh", sqft: 35000, img: "/img/projects/laxmi-saharanpur.jpg", type: "Workshop" },
  { slug: "jagwati-metals", name: "Jagwati Metals", place: "Palwal", state: "Haryana", sqft: 31000, img: "/img/projects/jagwati-palwal.jpg", type: "Fabrication plant" },
  { slug: "ambika", name: "Ambika Engineering Works", place: "Haridwar", state: "Uttarakhand", sqft: 27000, img: "/img/projects/ambika.jpg", type: "Factory" },
  { slug: "gopal-garden", name: "Gopal Garden", place: "Faridabad", state: "Haryana", sqft: 10000, img: "/img/projects/gopal-garden.jpg", type: "Box column structure" },
];

export const clients = [
  { name: "KS Industries", logo: "/img/clients/ks-industries.png" },
  { name: "Inoflex", logo: "/img/clients/inoflex.png" },
  { name: "Amardeep Constructions", logo: "/img/clients/amardeep.png" },
  { name: "RM Creations", logo: "/img/clients/rm-creations.png" },
  { name: "Amber", logo: "/img/clients/amber.png" },
  { name: "Pragati Constructions", logo: "/img/clients/pragati.png" },
  { name: "DK", logo: "/img/clients/dk.png" },
  { name: "Garg Plywood & Hardware", logo: "/img/clients/garg.png" },
  { name: "Ambika Engineering Works", logo: "/img/clients/aew.png" },
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
  { title: "IS 800 / IS 875", body: "Indian Standards for steel design & loads" },
  { title: "STAAD Pro", body: "Structural analysis & design" },
  { title: "Tekla Structures", body: "3D modelling & shop detailing" },
  { title: "AutoCAD", body: "Drafting & general arrangement drawings" },
];
