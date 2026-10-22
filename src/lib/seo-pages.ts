/**
 * Service / location landing pages (client brief item 13). Every claim here is
 * taken from the company brochure or the clients' completion certificates.
 */
export type SeoPage = {
  slug: string;
  nav: string;
  h1: string;
  metaTitle: string;
  description: string;
  intro: string;
  img: string;
  imgAlt: string;
  journey: "peb" | "fab";
  capabilities: { title: string; body: string }[];
  scope: string[];
  evidence: string[]; // project slugs
  faqs: { q: string; a: string }[];
};

const faqCommon = {
  codes: { q: "Which design codes and software do you use?", a: "Structures are designed to AISC and Indian Standards, analysed in STAAD Pro and detailed in Tekla Structures and AutoCAD." },
  capacity: { q: "What is your fabrication capacity?", a: "Our plant at Pingore, Palwal (Haryana) has an annual fabrication capacity of 6000 MT." },
  files: { q: "What drawings can I send for a quote?", a: "PDF, DWG, DXF, Excel, images or a ZIP: up to 10 files of 100 MB each through the website form. Larger sets can be shared as a Google Drive, WeTransfer or Dropbox link, by email to info@jagmount.com, or on WhatsApp." },
  timeline: {
    q: "How long does a PEB project take?",
    a: "It depends on size and scope. On recent projects we delivered around 180 MT in 10 weeks, 320 MT in 11 weeks and 650 MT, with multiple building height levels, in 15 weeks.",
  },
};

export const seoPages: SeoPage[] = [
  {
    slug: "peb-manufacturer-faridabad",
    nav: "PEB manufacturer, Faridabad",
    h1: "PEB manufacturer in Faridabad",
    metaTitle: "PEB Manufacturer in Faridabad",
    description: "Pre-engineered building manufacturer with its head office in Faridabad and a 6000 MT plant in Palwal. Design, fabrication, supply and erection of industrial and warehouse buildings.",
    intro:
      "Jagmount Projects is headquartered in Sector 11, Faridabad, with its manufacturing unit in neighbouring Palwal. We design, fabricate, supply and erect pre-engineered buildings for factories, warehouses and industrial developments.",
    img: "/img/gallery/g23.jpg",
    imgAlt: "Completed pre-engineered industrial building with ridge ventilators",
    journey: "peb",
    capabilities: [
      { title: "Design & detailing", body: "STAAD Pro analysis and Tekla Structures detailing to AISC and Indian Standards." },
      { title: "In-house fabrication", body: "CNC plasma cutting, an automated H-beam line and pull-through welding at our Palwal plant." },
      { title: "Supply & erection", body: "Primary frames, secondary members, roof and wall sheeting and accessories, erected to handover." },
    ],
    scope: ["Clear span, multi-span, multi-gable and single-slope frames", "Z & C purlins, roof and wall sheets, deck sheets and PUF panels", "Louvers, polycarbonate sheets, turbo ventilators and downtake pipes", "Solar-ready roofs"],
    evidence: ["gopal-garden", "ks-industries", "inoflex"],
    faqs: [
      { q: "Where are you located?", a: "Head office: 3rd Floor, SCO No. 8, Block-B, Sector-11, Faridabad. Manufacturing unit: Plot 23/2, Pingore, Palwal, Haryana 121105." },
      faqCommon.timeline,
      faqCommon.codes,
      { q: "Can we visit the plant before awarding the work?", a: "Yes. Call +91 98712 08401 or send an enquiry and we will arrange a visit to the Palwal plant." },
    ],
  },
  {
    slug: "peb-manufacturer-palwal",
    nav: "PEB manufacturer, Palwal",
    h1: "PEB manufacturer in Palwal",
    metaTitle: "PEB Manufacturer in Palwal, Haryana",
    description: "Pre-engineered building manufacturing plant at Pingore, Palwal (Haryana) with 6000 MT annual capacity. PEB design, fabrication, supply and erection.",
    intro:
      "Our manufacturing unit is at Plot 23/2, Pingore, Palwal. Every pre-engineered building we deliver is fabricated here, from CNC-cut plates to welded built-up members, then dispatched for erection on site.",
    img: "/img/site/peb-interior.jpg",
    imgAlt: "Fabricated members inside the Jagmount plant at Palwal",
    journey: "peb",
    capabilities: [
      { title: "6000 MT a year", body: "Annual fabrication capacity at the Palwal plant." },
      { title: "Plate to member", body: "Hypertherm Maxpro 200 CNC plasma cutting, H-beam assembly and pull-through welding under one roof." },
      { title: "Our own building", body: "The 31,000 sq ft Jagwati Metals plant in Palwal is itself one of our projects." },
    ],
    scope: ["Factories and manufacturing plants", "Warehouses and distribution centres", "Workshops and industrial sheds", "Crane buildings and mezzanines"],
    evidence: ["jagwati-metals", "garg", "ambika"],
    faqs: [faqCommon.capacity, faqCommon.timeline, { q: "Do you supply only, or also erect?", a: "Both. Recent completion certificates from our clients record complete supply and erection of the PEB with structure and sheeting." }, faqCommon.codes],
  },
  {
    slug: "structural-steel-fabrication-faridabad",
    nav: "Steel fabrication, Faridabad",
    h1: "Structural steel fabrication in Faridabad",
    metaTitle: "Structural Steel Fabrication in Faridabad",
    description: "Structural steel fabrication for Faridabad and NCR projects: built-up beams, columns, rafters, crane beams and platforms, fabricated to your drawings at our Palwal plant.",
    intro:
      "From our Faridabad office and Palwal plant we fabricate structural steel to drawings for PEB manufacturers, EPC contractors, fabricators and industrial engineering companies across NCR.",
    img: "/img/gallery/g07.jpg",
    imgAlt: "Built-up steel members in the fabrication bay",
    journey: "fab",
    capabilities: [
      { title: "CNC plasma cutting", body: "Hypertherm Maxpro 200 for accurate plate profiles, base plates, end plates, stiffeners and gussets." },
      { title: "H-beam line", body: "Automated assembly and tacking of built-up I-sections, including tapered members." },
      { title: "Pull-through welding", body: "Continuous flange-to-web welding with consistent weld quality on long members." },
    ],
    scope: ["Built-up beams", "Columns", "Rafters", "Crane beams", "Platforms", "Other structural steel to drawing"],
    evidence: ["gopal-garden", "inoflex"],
    faqs: [faqCommon.files, faqCommon.capacity, { q: "Who do you fabricate for?", a: "Other PEB manufacturers, EPC contractors, structural steel fabricators and industrial engineering companies, as well as our own PEB projects." }],
  },
  {
    slug: "built-up-beam-manufacturer",
    nav: "Built-up beam manufacturer",
    h1: "Built-up beam manufacturer",
    metaTitle: "Built-Up Beam Manufacturer",
    description: "Built-up I-beams, columns and tapered rafters made on an automated H-beam line with pull-through welding and CNC plasma-cut plates. Palwal, Haryana.",
    intro:
      "Built-up sections are the core of every pre-engineered building, and the core of our plant. Plates are profiled on CNC plasma, assembled on an automated H-beam line and welded on a pull-through welding machine.",
    img: "/img/gallery/g16.jpg",
    imgAlt: "Tapered built-up rafter section",
    journey: "fab",
    capabilities: [
      { title: "Plate profiling", body: "Flange and web plates cut on a Hypertherm Maxpro 200 CNC plasma system." },
      { title: "Assembly & tacking", body: "Automated H-beam line for dimensional accuracy and consistent fit-up." },
      { title: "Continuous welding", body: "Pull-through welding for consistent flange-to-web welds." },
    ],
    scope: ["Straight and tapered I-sections", "Columns and rafters", "Crane beams", "Members for PEB and conventional steel structures"],
    evidence: ["inoflex", "ks-industries"],
    faqs: [faqCommon.files, faqCommon.capacity, faqCommon.codes],
  },
  {
    slug: "structural-steel-fabrication-jobwork",
    nav: "Fabrication jobwork",
    h1: "Structural steel fabrication jobwork",
    metaTitle: "Structural Steel Fabrication Jobwork",
    description: "Fabrication jobwork to your drawings for PEB manufacturers, EPC contractors and fabricators. CNC plasma, H-beam line and PTW welding at our 6000 MT Palwal plant.",
    intro:
      "Short of shop capacity on a package? Send us your drawings. We fabricate structural steel to your design for other PEB manufacturers, EPC contractors, fabricators and industrial engineering companies.",
    img: "/img/gallery/g14.jpg",
    imgAlt: "H-beam production line conveyor at the Palwal plant",
    journey: "fab",
    capabilities: [
      { title: "Your drawings, our lines", body: "Members fabricated to your fabrication or shop drawings." },
      { title: "Capacity", body: "6000 MT per year at Pingore, Palwal, on the Delhi to Mumbai corridor." },
      { title: "One contact", body: "Estimating, production and dispatch coordinated from our Faridabad office." },
    ],
    scope: ["Built-up beams, columns and rafters", "Crane beams", "Platforms", "Other structural steel"],
    evidence: ["inoflex", "gopal-garden"],
    faqs: [
      faqCommon.files,
      { q: "What do you need to price a package?", a: "Drawings (or at least GA drawings), estimated quantity in MT, required delivery date and delivery location. The fabrication form asks for exactly these." },
      faqCommon.capacity,
    ],
  },
  {
    slug: "industrial-shed-warehouse-construction",
    nav: "Industrial sheds & warehouses",
    h1: "Industrial shed and warehouse construction",
    metaTitle: "Industrial Shed & Warehouse Construction",
    description: "Pre-engineered industrial sheds and warehouses: design, fabrication, supply and erection with structure and sheeting. Projects in UP, Uttarakhand, MP and Haryana.",
    intro:
      "Pre-engineered steel is the fastest way to put a roof over a factory floor or a warehouse. We design the frame around your process and plot, fabricate it in Palwal and erect it with structure and sheeting.",
    img: "/img/gallery/g18.jpg",
    imgAlt: "Aerial view of a delivered industrial shed",
    journey: "peb",
    capabilities: [
      { title: "Clear spans", body: "Clear span, multi-span and multi-gable frames sized to your layout." },
      { title: "Complete envelope", body: "Purlins, roof and wall sheets, PUF panels, louvers, skylights and ventilators." },
      { title: "Room to grow", body: "End walls can be designed for future expansion." },
    ],
    scope: ["Warehouses and distribution centres", "Factories and manufacturing plants", "Workshops", "Solar-ready roofs"],
    evidence: ["ks-industries", "garg", "ambika"],
    faqs: [faqCommon.timeline, { q: "What do you need for a quote?", a: "Project location, approximate built-up area and expected timeline. Drawings help but are not required to start." }, faqCommon.codes],
  },
  {
    slug: "heavy-steel-structure-fabrication",
    nav: "Heavy steel structures",
    h1: "Heavy steel structure fabrication",
    metaTitle: "Heavy Steel Structure Fabrication",
    description: "Heavy structural steel fabrication: built-up columns and rafters, crane beams, box columns and multi-storey frames, from a 6000 MT plant in Palwal, Haryana.",
    intro:
      "We fabricate plates from 5 mm to 35 mm thick into members up to 1,500 mm wide, including a 4-ton main beam built as a single piece. Our largest project used around 650 MT of steel for a 95,000 sq ft facility in Indore. Built-up sections, crane beams and box columns are fabricated in-house and erected by our teams.",
    img: "/img/gallery/g19.jpg",
    imgAlt: "Heavy built-up members staged on site",
    journey: "fab",
    capabilities: [
      { title: "Built-up sections", body: "Heavy I-sections assembled on the H-beam line and welded on the PTW machine." },
      { title: "Box columns", body: "Box columns, such as the multi-storey Gopal Garden building with mezzanine floors in Faridabad." },
      { title: "Crane buildings", body: "Crane beams and frames designed for the crane class of your facility." },
    ],
    scope: ["Built-up columns and rafters", "Crane beams", "Box columns", "Platforms and multi-storey frames"],
    evidence: ["inoflex", "gopal-garden", "ks-industries"],
    faqs: [faqCommon.capacity, faqCommon.files, faqCommon.codes],
  },
];
