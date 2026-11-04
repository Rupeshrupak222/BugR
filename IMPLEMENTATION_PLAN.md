# Bug Refinery implementation plan

This records the original plan. See [the approved stack decision](STACK_DECISION.md) and [development guide](DEVELOPMENT.md) for the current implementation.

**Decision to review:** Preserve the BRD/FRD static public architecture and documented Vercel/Supabase lead boundary. Build “The Digital Refinery” with lightweight motion and a CSS/SVG technical object that remains optional. Evaluate richer interactive WebGL in a separate prototype; approve any live scope and brand changes separately. Keep the Industry Simulation Platform outside this repository's implementation scope. The master prompt calls for architecture approval before implementation; this document does not start that phase.

## Public page and component plan

| Route | Structure and conversion |
|---|---|
| `/` | Sticky shared header → Beyond Theory hero with white “Production-” and orange “Ready”, four-domain lead, Get Early Access → Sign Up, and See How It Works → process anchor → two gap perspectives with approved quotations and four points each → Real Bugs. Real Artifacts. Real Pressure. teaser and Labs link → four area panels with exact teaser counts and terms → three-stage connected process → six required benefit cards → Ready to Close the Gap? with Hiring and Graduate routes → shared footer. |
| `/labs.html` | Four visible groups with counts 11/6/6/3, consistent terms and 26 named STARTING SOON cards linking to verified lab URLs. Optional search and category filter enhance static groups; reset and announce match counts. |
| `/labs/*.html` (26) | Eyebrow slug, title, approved description where available, four curriculum phases over nine weeks, pricing strip below curriculum, status, and lab-named signup modal. Shared assets and one accessible dialog pattern; retain approved source attribution. |
| `/students.html` | Graduate perspective, artifact work, phase summary, inspectable proof and student interest form. Review multi-area expansion and any claim changes with owner. |
| `/companies.html` | Employer perspective, job readiness and proof-based evaluation, company inquiry form. No implied network, guarantee or unapproved timeline. |
| `/about.html` | Identity, Beyond Theory method and future Foundry wing (Coming Soon, external). |
| `/contact.html` | Visible support address and contact form; address and mail link available when endpoint or scripts fail. |
| `/signup.html` | Register interest only, with system-supplied attribution and no account, payment or enrollment confirmation. |

Header: linked approved logo and wordmark, Companies, Students, Labs, external Foundry and Sign Up; responsive keyboard-friendly disclosure. Footer: Beyond Theory, approved links/social destinations and copyright. Apply cookie choice across all 33 URLs. Foundry is not URL 34. Verify verified production slugs/aliases against the deployed sitemap or source; do not derive filenames from titles and call them existing.

### Catalogue and content contract

| Area | Approved names (BRD §8 / FRD §6) | Home example selection for owner review |
|---|---|---|
| Tech (11) | Python Full Stack; Java Full Stack; Selenium Testing; Data Analytics; Data Engineering; AI / ML; Data Science; Cloud and DevOps; Cyber Security; UI/UX Design; App Development | Python Full Stack, Data Analytics, Cyber Security + 8 more |
| Management and Commerce (6) | Finance; Business Analytics; Supply Chain Management; Salesforce; SAP FICA; HRM | Finance, Business Analytics, Supply Chain Management + 3 more |
| Engineering and Non-IT (6) | Embedded Systems; IoT and Robotics; AutoCAD; CATIA; Quality and Safety; Construction Planning | Embedded Systems, AutoCAD, Quality and Safety + 3 more |
| Medical (3) | Medical Coding; Pharmacovigilance; Bioinformatics | All three; no more line |

All four Explore links go to `labs.html`. Use Rs 9,999 per lab, 9 weeks, cohort 30, STARTING SOON consistently. Weeks 1–2 brushup; 3–4 fix broken artifact; 5–7 navigate real work; 8–9 ship final deliverable. Proof is the reviewed deliverable, fixes, scorecard and capstone post-mortem, plus verified badge and completion certificate. The attachments provide names, phase model and domain examples, not 26 complete approved curricula, descriptions or verbatim approved homepage quotations. Recover those from the owner-approved source; mark gaps in planning, never fabricate copy or publish placeholders. Confirm Python-first versus uniform curriculum depth. Only the first founder cohort is Python Full Stack (Django + React); keep the overall offer multi-area.

## Design system: The Digital Refinery

Translate the references into Bug Refinery's own language. From the first image take sculptural depth, a focal object and layered glass. From the second take a dark technical field, fine connected nodes and strong contrast between a large headline and its environment. Create an original **Refinery Core**: a hex/flask assembly around a fractured artifact that aligns and emits a single orange signal. Surround it with four quiet domain markers (code, statements/models, drawings, charts). Keep the brand logo an independent approved mark; the hero object is illustration. No copied or implied metrics, brand marks or testimonials.

| Token / pattern | Proposal |
|---|---|
| Color | Canvas `#080B12`, raised `#111722`, border `#2B3544`, text `#F8FAFC`, secondary `#B5C0CF`. Approved brand `#F97316` → `#EA580C`; dark text on orange buttons and visible light focus rings. Restrained cyan/violet reflection in the demo; production brand changes require review. Test actual composited contrast. |
| Typography | JetBrains Mono for all production text under BR-02; local licensed WOFF2 or system mono fallback. Proposed hero clamp 2–4.5rem, body 1rem/1.65, short line length, 0.75–0.875rem telemetry labels. |
| Layout | 4/8 spacing scale (8, 16, 24, 32, 48, 64, 96); responsive wrapper capped around 76rem. One column on phones; asymmetric split hero on wide screens; use 12-column alignment without forcing cards everywhere. |
| Surfaces | 12–20px radius, hairline borders and limited glass only where it creates depth; opaque forms/text panels. Distinguish domains with glyph, label and circuit motif, never color alone. |
| Composition | Sculptural hero, split gap panels, horizontal artifact strip, varied four-area grid, connected process rail, compact benefits grid and simple closing split. Lab detail is an editorial reading page with phase markers, not a second hero showcase. |
| Interaction | Focus/hover/active/disabled/loading/error/success states; labelled inputs with inline messages, readable status beyond color, 44px target proposal; strong reduced-motion and touch defaults. |

### Motion and fallback

- **Hero:** CSS perspective plus layered SVG shapes for initial depth; animate 350–600 ms typographic groups as whole phrases, not character-spans that damage reading. Keep heading and CTA visible before scripts. Add subtle pointer tilt for fine pointers only, with bounded angles. Offer pause for continuous motion, and freeze motion when offscreen or tab hidden.
- **Choreography:** transform/opacity reveals via intersection observation, short 120–220 ms controls, and at most one ambient grid layer. Scroll progress is decorative, updated at most once per animation frame. Use an ordinary navigation fallback for optional page transitions. Never pin visitors or delay a navigation/form to finish animation.
- **Interactive process:** buttons/focusable links can highlight a stage and artifact; all stage text exists in HTML. Animate verified facts such as 26 labs/4 areas with static numbers and a reveal; no fabricated metrics or count flicker. Label any terminal sequence as illustrative; offer a transcript and no actual commands.
- **Forms and cards:** use same-size loading state, inline error summary and focus first invalid field; preserve values on failed save. Use CSS focus/hover treatments and native dialog where appropriate, with focus return, Escape/backdrop discard when idle and an accessible confirmed/failure state. Closing during a pending request needs an agreed policy because a committed request cannot be undone.
- **Fallback:** reduced motion disables tilt, ambient drift, auto playback and animated navigation. Without JS all core content and navigation are present; forms show an honest unavailable path and never default to GET. Without storage, only banner persistence degrades. Without GPU or on constrained devices use the same-size SVG/poster.
- **WebGL demo only:** one small scene, optional lazy load after primary content, capped pixel ratio and asset size, context-loss handling and disposal, independently review visual benefit and device cost. No required canvas on any page. Proposed budgets for review: at most 100 KB compressed initial public CSS/JS combined (excluding separately measured fonts/optional visuals), no initial WebGL bytes on baseline, no layout shift from hero artwork; tighten after measuring verified baseline on a representative low-end Android device. Track transfer by asset, LCP, CLS and interaction responsiveness under declared conditions.

## Sequence and exit criteria

| Order | Work | Exit evidence |
|---|---|---|
| 0 | Approve architecture; obtain production source/deploy mapping, endpoint contract, approved brand and content. Resolve FRD ambiguities and establish test environment. | Owner/maintainer confirm repo, paths, change approvals, preview and rollback approach. No edits to source before architecture approval. |
| 1 | Design tokens, shell, navigation, footer and privacy pattern; mock one Home view and one lab view. | Approved visual direction and static/mobile/keyboard fallback; no prototype attached to production. |
| 2 | Implement Home structure then Labs catalogue and one lab template. Add remaining 25 after content sign-off. | Complete offer, approved copy, 26 links and terms; one shared lab template/asset contract. |
| 3 | Students, Companies, About, Contact and Sign Up. Verify actual legacy links/Foundry disposition. | Seven main pages, clear CTAs and honest disconnected form state. |
| 4 | Recover/preserve verified lead endpoint and wire forms; if unavailable, implement a replacement only after the contract, schema, ownership and deployment are approved. Use test data and separate test database. | Validation, attribution, service-role-only writes, RLS, concurrency/idempotency, rate limits and Turnstile verified; no duplicate or false success. |
| 5 | Add motion, responsive refinements, metadata and performance checks. | Reduced motion, offscreen/static fallback, unique SEO metadata, robots/sitemap with 33 entries, device and script-failure checks. |
| 6 | Run automated/regression QA, update README and deployment/testing documentation, assemble review evidence. | FRD TC-01–14 mapped to outcomes. Test browser console, routing, focus/contrast, modal, catalogue, cookies, form failure/edge cases and SEO. |
| 7 | After separate explicit deployment approval, verify live and record results/rollback status. | Confirm all 33 routes, approved content, links, assets and metadata. Production writes require explicit test permission; clean and record approved test rows. |

Test viewport widths 320, 375, 425, 768, 1024, 1440, 1920; representative Android and desktop, touch/keyboard, reduced motion, JS disabled, unavailable local storage and degraded network. Exercise required fields/lengths/email/phone/source, double tap, retries and lost responses, rate-limit sixth attempt/concurrency, honeypot, Turnstile missing/expired and provider failure, DB outage, and successful attributed inserts in isolated test infrastructure. Use Playwright and contract/unit checks as development tools if available without altering the production runtime. Check browser console and regressions after each phase. Never report a mocked insert as production verification.

## Risks, dependencies and release decisions

- **Wrong production source:** local and GitHub match but disagree with the docs. Locate Vercel project linkage, current source revision, shared lab asset names, deployment behavior and verified sitemap before branching from this replica for a release.
- **Lead outage or privacy regression:** obtain documented payload, response, schema, service roles, RLS, rate-limit store, idempotency and Turnstile config through authorized channels. Confirm server-side secret setup without recording keys. Use only synthetic test data; separate preview and production environments.
- **Content readiness:** need approved 26 descriptions/curricula, slug list, approved marks, exact quotations and claim decisions. Confirm actual mailbox/link readiness, reconcile Students/Companies content depth and do not add independent company proof from visual references.
- **Mobile performance and brand drift:** optional motion only; measure real phones, verify static fallback and obtain separate amendment if proposed theme crosses BRD constraints.
- **Release operations:** confirm owner/maintainer and Vercel preview capability. The BRD says pushes to main deploy; keep review on an isolated branch/preview. Capture prior working deployment and rollback steps before merge; no deployment or real leads are authorized by this audit.
- **Platform creep:** if commissioned separately, obtain roles/MVP/technical decisions, domain experts, pilot content, upload/runner security review, storage and durable job infrastructure. No dependency on these for website launch.

**Architecture approval requested for implementation:** static HTML/CSS/JS public site, verified Vercel lead function and private Supabase lead table, lightweight Digital Refinery motion and an isolated 3D prototype, with the authenticated platform deferred to a separate project.
