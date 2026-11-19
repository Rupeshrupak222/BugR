# Bug Refinery / Liquid Glass Landing

The current homepage adapts the supplied Asme recreation prompt and screen recording to Bug Refinery. It keeps black and orange, the documented lab and signup content, and a single cinematic landing page. This is an isolated local review build, not a production deployment.

## Preview

From the repository root with Node 24:

```sh
npm ci
npm run demo:build
npm run demo:start
```

Open http://127.0.0.1:4173/.

## Design and implementation

React, TypeScript, Vite and Tailwind are retained. Framer Motion supplies restrained once-only section reveals; Lucide supplies interface icons. The landing page uses Instrument Serif, liquid-glass navigation and buttons, a centred hero, editorial sections, a collapsible four-industry lab index and existing registration links. The hero capsule links to the catalogue; it does not pretend to subscribe users to a newsletter. No login, payment or account functionality was added.

The five source videos specified by the user are colour-graded to orange and black, resized to 1280 pixels, encoded at 24 fps without audio, and delivered locally with MP4 fast-start metadata. Combined video payload is 2,672,625 bytes, reduced from 78,562,735 source bytes. The hero is 514,487 bytes and its WebP poster is 20,180 bytes. Source files and the recording analysis are retained only under ignored test-results, not shipped. Small WebP posters are used throughout. Instrument Serif is self-hosted rather than depending on a Google Fonts request, with its OFL included.

Only the desktop hero may autoplay. Mobile, reduced motion, Data Saver and reported slow connections begin with a still image. Every film has a play/pause control. Lower-page videos receive no source URL until requested and play once. Offscreen or hidden-document videos pause. Hero fades use requestAnimationFrame and a short fade-to-black restart, as requested. Loading failures retain the poster and all content and links remain usable. Autoplay is a browser capability, not guaranteed.

The previous Three.js journey is no longer imported into the application. No WebGL or camera journey is shipped in the active JavaScript bundle. Other public pages use static SVG illustrations. Historical source modules remain in the demo for reference, but are not part of the running site.

## Structure

- `src/landing/LandingPage.tsx`: hero, navigation, industry index, outcomes and footer.
- `src/landing/AboutSection.tsx`, `FeaturedVideoSection.tsx`, `PhilosophySection.tsx`, `ServicesSection.tsx`: reference-inspired sections with Bug Refinery content.
- `src/landing/QuietVideo.tsx`: media loading, playback, fade, visibility and failure handling.
- `src/landing/Reveal.tsx`: progressively enhanced motion, with visible prerendered HTML.
- `src/landing/index.css`: liquid-glass styling, local Instrument Serif and responsive layouts.
- `public/assets/landing/`: optimised media, posters and fonts.

## Retained business behaviour

All seven main URLs and 26 lab pages remain prerendered, with distinct metadata, canonicals, sitemap and robots. The 11 / 6 / 6 / 3 lab distribution, curriculum, proof, pricing, nine-week duration and cohort terms are retained from the approved fixture.

The existing Express preview disables lead storage by default. Only an isolated configured test environment should use `npm run demo:start -- --isolated-leads`. The existing `/api/public-config` and `/api/lead` contracts, validation, Turnstile rules and Supabase RPC behaviour are preserved. No real credentials or production submissions were used. Production Vercel compatibility and actual database writes remain separate release checks.

## Verification

```sh
npm run demo:test
```

Set `BUGR_TEST_BROWSER=chrome` for installed Chrome. The suite checks video pause/restart, optional video loading, mobile/reduced-motion/Data Saver defaults, failed-media posters, keyboard navigation and lab disclosures, no WebGL downloads, 33 routes, metadata, 132 responsive page checks, original curriculum/proof hashes, 30 mocked lead attributions, validation, retry/idempotency, rate limiting and no-JavaScript content. Screenshots are in `test-results/glass-landing/`. Mobile testing uses browser emulation; physical device and real network performance are not certified.

## Single-page navigation update

The landing page now contains all public information and enquiry actions. Navigation, footer links, the hero catalogue CTA and registration CTAs use in-page anchors. All 26 labs expand inline with the original curriculum, proof and pricing. Student programme details and company information are included in expandable sections. A shared enquiry form supports general registration, Students, Companies, Contact and every individual lab, keeping the existing source attribution and Turnstile rules. Support contact details appear beside that form. Older public URLs remain available for compatibility, but the landing-page journey no longer links out to them.

`demo/verify-single-page.mjs` checks every internal anchor, all 26 inline curriculum and proof hashes, expanded mobile layouts, and all 30 mocked enquiry sources without leaving the landing page.
