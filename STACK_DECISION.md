# Public website stack decision

## Visual direction amendment

The owner requested a distinct theme with the same BRD/FRD functionality. The revised local visual identity is Ultraviolet Refinery, using indigo, violet, mint, sans-serif display typography and monospace technical labels. This supersedes the production theme's orange and all-monospace requirements for this local redesign. The sculptural hero uses original generated artwork with motion and pointer depth. It is a rendered image, with CSS animation, rather than an interactive WebGL model.

The owner approved the screenshot stack for the public website on 4 November 2026. This supersedes the static runtime constraint in the audit and BRD/FRD for implementation. The functional scope remains the 33 public URLs and lead capture. React and TypeScript render the pages, Tailwind and shared CSS style them, and Express handles the JSON lead endpoint with private Supabase Postgres. Prerendering keeps core content in HTML. Docker packages the app and CI verifies it. Prisma is optional and omitted. Auth, file storage, scheduled platform jobs and isolated code execution belong to the separate platform scope.

Existing production URLs, curricula, and data contracts still require verification before release. The implementation uses proposed slugs, the documented common curriculum phases, and a separate migration for a new test database. Do not apply that migration to an existing production database without reconciliation. Deployment requires separate approval.
