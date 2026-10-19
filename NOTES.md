# Jagmount Projects website: handoff notes

Live: https://jagmount.vercel.app
Deploy: `vercel deploy --prod --yes --scope pranaimarru20-3921s-projects`
All copy lives in `src/lib/content.ts`. Source material: the company brochure PDF.

## Confirm with the client before launch
- **Project states as printed in the brochure.** "Farukhnagar, UP": Farrukhnagar is in Haryana (Gurugram district). "Saharanpur, Uttarakhand": Saharanpur is in Uttar Pradesh. The site currently says UP for both.
- **WhatsApp number**: the quick-contact dock opens WhatsApp on +91 98712 08401 (first brochure number). Confirm that number is on WhatsApp.
- **Enquiry form has no backend**: submitting opens the visitor's email app with the enquiry filled in, addressed to info@jagmount.com. Hook up Resend/Formspree etc. if they want submissions captured server-side.
- **"378K sq ft" stat** is the sum of the 8 featured projects in the brochure, not total company output.
- **Founder initials** (SM, DK) stand in for portraits. Swap for real photos if available.
- **Hero 3D model** is a generic 30 m × 60 m clear-span shed, not a specific project. The HUD numbers are the model's dimensions.
- Domain: `metadataBase` is set to jagmount.vercel.app; change it when jagmount.com is pointed here.

## Client decisions (Oct 14 2026)
- Only images from the company brochure PDF. No outside photos.
- Presence map uses the brochure's states: Haryana (manufacturing); HP, Rajasthan, UP, Bihar, Maharashtra (projects delivered). No city pins.
- Plain section titles (no slogan-style headings), no decorative 01/02 numbering, no company-profile PDF download.

## Assets
- Logo was cut from the brochure's vector page and recoloured for the dark ground (`public/img/site/logo-light.png`).
- Photos are the brochure's own images (low-res: 400 to 800 px). Higher-res originals from the client would sharpen every page.
- PUF panel product photo was cropped to remove a third-party (PHOENIXX) watermark.

## Motion map
- `components/peb/*`: Three.js PEB that builds itself on load; scroll explains the 4 PEB component layers.
- `components/Animator.tsx`: one engine for every `data-*` animation (split text, clip reveals, counters, SVG draw, parallax).
- `Transition.tsx`: steel-shutter page transitions. Pinned sections need a React-owned wrapper div (see ServicesRail).
- Fonts are self-hosted (`src/fonts`), Archivo variable (wght + wdth) + JetBrains Mono.
