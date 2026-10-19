# Jagmount Projects website: handoff notes

Live: https://jagmount.vercel.app
Deploy: `vercel deploy --prod --yes --scope pranaimarru20-3921s-projects`
Copy lives in `src/lib/content.ts` (company, metrics, projects, clients, machines) and `src/lib/seo-pages.ts` (7 service landing pages).
Sources: company brochure PDF + the clients' completion certificates (scope, tonnage, dates on the Projects page come from those).

## Oct 19 2026 revision (client brief "Website revision & lead-generation brief")
- White theme, lighter/smaller type, bigger logo, default cursor, no footer wordmark, no "clients and counting".
- One public number everywhere: +91 98712 08401 (header, footer, contact, forms, dock, confirmation email).
- Hero: real photo + recommended headline + "Get a PEB Quote" / "Request Fabrication Pricing".
- Two journeys, two forms: `/quote/peb` ("Tell Us About Your Project") and `/quote/fabrication` ("Send Your Drawings for a Fabrication Quote").
- Services split into Part 1 PEB / Part 2 fabrication & jobwork; Advantages moved after Structural Frames.
- Manufacturing: machine cards no longer dim/fade; only the 3 machines verified in the brochure (CNC plasma, H-beam line, PTW).
- Projects: case-study cards with certificate facts; Garg (Mathura) added as a project; Laxmi Engineering added to clients (text tile, no logo yet); 5th certificate rotated.
- 3D PEB model moved below the fold as "Components of a PEB" (starts building when scrolled to).
- SEO pages at `/peb-manufacturer-faridabad`, `/peb-manufacturer-palwal`, `/structural-steel-fabrication-faridabad`, `/built-up-beam-manufacturer`, `/structural-steel-fabrication-jobwork`, `/industrial-shed-warehouse-construction`, `/heavy-steel-structure-fabrication`; sitemap.xml + robots.txt.

## Lead tracker (Oct 19 2026)
- `/leads` (noindex, password = env `LEADS_PASSWORD`, cookie signed with `LEADS_SECRET`). Every enquiry is saved to the private Vercel Blob store `jagmount-leads` (bom1) as `leads/<ref>.json`; drawings upload browser→Blob under `enquiries/` (private, 100 MB/file) via `/api/enquiry/upload`, downloaded only through `/api/leads/file` when logged in.
- Tracker fields: status, est. value, follow-up owner/date, quotation, outcome, notes; CSV export. First-touch lead source (UTM/referrer/landing) stored in localStorage `jm_src`.
- Delete test blobs with `vercel blob del <path> --rw-token "$BLOB_READ_WRITE_TOKEN"` (plain `vercel blob` trips over OIDC vars in .env.local).
- Client status PDF: ~/Downloads/Jagmount website revision - status 19 Oct 2026.pdf

## Images
All brochure JPGs were upscaled ~2x (Lanczos + light unsharp) and next/image serves q90 (`images.qualities: [90]`) so retina/Safari gets 1080 to 1600 px files. Replace with originals when the client sends them.

## Needs external setup (env vars in Vercel → jagmount → Settings → Environment Variables)
| Variable | What | Without it |
|---|---|---|
| `RESEND_API_KEY` | Resend account; verify jagmount.com domain (DNS records) | Form falls back to pre-filled email/WhatsApp |
| `ENQUIRY_FROM` | e.g. `Jagmount Website <enquiries@jagmount.com>` (verified domain) | Resend test sender, can only mail the account owner |
| `ENQUIRY_TO` / `FABRICATION_TO` | Sales and estimating inboxes (default info@jagmount.com) | Both go to info@ |
| `LEADS_WEBHOOK_URL` | Google Sheet (Apps Script) / Zapier / CRM webhook: one JSON row per lead | No lead log |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID (G-XXXX) | No analytics |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Search Console HTML-tag token | Verify via DNS instead |
GA4 events: `generate_lead` (form accepted by server, param `form`=peb/fabrication), `drawing_upload`, `phone_click`, `whatsapp_click`, `email_click`, `cta_click`. Mark `generate_lead` as a key event in GA4.
Without RESEND the enquiry is still stored in the tracker and the buyer is nudged to also send it on WhatsApp.

## Confirm with the client
- Founder photos (slots ready on About; set `photo` in `src/app/about/page.tsx`, files in `public/img/founders/`).
- The "one additional client": we added Laxmi Engineering (a featured project missing from the wall). Send name + logo if they meant someone else.
- Higher-resolution photos, especially the hero (gallery/g18) and the Services image. Brochure photos are 400 to 800 px.
- Profile sheeting and shearing machines: hidden text in the brochure, no photos. Shown nowhere until confirmed.
- Quality procedures, inspection records, material traceability, plate thickness / member size ranges, paint systems: not stated anywhere we have. Manufacturing only lists verified items.
- Scope/challenge write-ups for projects without a completion certificate (Amber, RPM, Laxmi, Gopal Garden).
- Presence map now = brochure states + featured-project states (MP, Uttarakhand). "Farukhnagar, UP" and "Laxmi: Saharanpur, Uttarakhand (brochure)" vs UP on site.
- Certificate figures read from small scans: Inoflex ≈1,250 MT / 6 months; KS 450 MT; Garg 175 MT; Ambika 3.5 months.
- Suspected stock/AI images in the brochure (solar-aerial, fab-hall, g06, lattice) are no longer used on key pages.
- Domain: `metadataBase` + sitemap use jagmount.vercel.app; switch when jagmount.com points here.

## Motion map
- `components/Animator.tsx`: all `data-*` reveals, transform/opacity only.
- `components/peb/*`: Three.js PEB, scroll-scrubbed with smoothing inside the render loop.
- `PlasmaReveal`: transform-only cover + light canvas sparks. `Transition`: single sheet. `Preloader`: ~1 s, first load only.
- Pinned sections need a React-owned wrapper div (ScrollTrigger pin-spacer).
- Fonts self-hosted (`src/fonts`).
