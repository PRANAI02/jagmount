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
All brochure photos (not certificates or spec drawings) were AI-upscaled 4x with Real-ESRGAN (realesrgan-x4plus) from the original brochure files, then capped at 2000 px and next/image serves q90 (`images.qualities: [90]`) so retina/Safari gets 1080 to 1600 px files. Replace with originals when the client sends them.

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

## Client answers (Oct 22 2026, from Pulkit Mangla) + case-study sheet
- info@jagmount.com is the company email and receives PEB and fabrication enquiries (code default; no FABRICATION_TO needed).
- Enquiries go first to Pulkit Mangla: new leads default to follow-up owner "Pulkit Mangla" in /leads.
- New site goes live on jagmount.com (no existing site). **When changing DNS, keep the existing MX / SPF / DKIM / TXT records untouched** so their email keeps working; only add/replace the apex A record and www CNAME for Vercel. Resend records are additive (a `send.` subdomain), they don't touch MX on the root.
- No Google Analytics account yet.
- MP and Uttarakhand confirmed on the presence map.
- Fit-up, finishing and painting are in-house (Process now 6 steps; Manufacturing "In-house operations").
- Technical range: plate 5 to 35 mm, member width up to 1,500 mm, 350 MPa and above. Paint systems wording is vague in their reply.
- QA/QC section on /manufacturing#quality drafted from their list (material inspection, traceability, MTCs, dimensional, welding, dispatch docs). Client still to confirm final details/records.
- Project figures now come from `Jagmount_Projects_Case_Studies.docx`. **They differ from what we read off the certificate scans**: Inoflex 650 MT / 15 weeks (cert read ≈1,250 MT / 6 months), KS 300 MT / 4 weeks (cert 450 MT, May to Sep), Ambika 5 weeks (cert 3.5 months). Site uses the client sheet. Garg is not in the sheet; it keeps its certificate figures.
- Milestone: 4-ton single-piece main beam (Projects page). Dimensions, grade, project, inspection still to be confirmed.

## Confirm with the client
- Founder photos (slots ready on About; set `photo` in `src/app/about/page.tsx`, files in `public/img/founders/`).
- The "one additional client": we added Laxmi Engineering (a featured project missing from the wall). Send name + logo if they meant someone else.
- Higher-resolution photos, especially the hero (gallery/g18) and the Services image. Brochure photos are 400 to 800 px.
- Profile sheeting and shearing machines: hidden text in the brochure, no photos. Shown nowhere until confirmed.
- QA/QC final details and available records (section drafted from their list).
- Which figure is right for Inoflex / KS / Ambika (sheet vs certificate), and Laxmi's logo.
- Presence map = exactly the brochure map (Haryana plant; HP, Rajasthan, UP, Bihar, Maharashtra). Note the featured projects in Indore (MP) and Haridwar (Uttarakhand) are in states the brochure map does not mark: ask the client. "Farukhnagar, UP" and "Laxmi: Saharanpur, Uttarakhand (brochure)" vs UP on site.
- Certificate figures read from small scans: Inoflex ≈1,250 MT / 6 months; KS 450 MT; Garg 175 MT; Ambika 3.5 months.
- Suspected stock/AI images in the brochure (solar-aerial, fab-hall, g06, lattice) are no longer used on key pages.
- Domain: `metadataBase` + sitemap use jagmount.vercel.app; switch when jagmount.com points here.

## Motion map
- `components/Animator.tsx`: all `data-*` reveals, transform/opacity only.
- `components/peb/*`: Three.js PEB, scroll-scrubbed with smoothing inside the render loop.
- `PlasmaReveal`: transform-only cover + light canvas sparks. `Transition`: single sheet. `Preloader`: ~1 s, first load only.
- Pinned sections need a React-owned wrapper div (ScrollTrigger pin-spacer).
- Fonts self-hosted (`src/fonts`).
