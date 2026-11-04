# Local verification

## Ultraviolet Refinery visual revision

The revised build passed. Headless Edge checks passed at widths 320, 375, 425, 768, 1024, 1440 and 1920 with no horizontal overflow. Mobile menu navigation, Finance search, lab dialog open/Escape, disabled form fallback without JavaScript and browser error checks passed. Desktop and mobile screenshots were visually inspected. The hero WebP is approximately 156 KB. This is animated artwork with pointer tilt. Full interactive WebGL geometry is not implemented.

- Production build passed. Generated 33 sitemap entries and a separate not-found response. Compressed initial JavaScript and CSS total approximately 81 KB as reported by Vite. This is a build measurement.
- Five Express API tests passed against synthetic provider responses. They cover validation, attribution, Turnstile failure, rate rejection and unavailable database/configuration.
- Four Playwright tests passed in headless Edge. They cover metadata and HTTP responses for all 33 sitemap entries, catalogue search, lab modal focus restoration, homepage widths from 320 to 1920 pixels, and public navigation and form fallback with scripts disabled.
- Real Supabase RLS, concurrent rate claims, duplicate writes and Turnstile verification require a configured isolated environment. Mobile hardware, production URLs, visual approval, and final BRD/FRD acceptance remain pending. No production data or deployment was changed.
