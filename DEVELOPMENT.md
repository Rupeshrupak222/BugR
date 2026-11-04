# Developing the React website

## Generated hero artwork

The original artwork was generated with the built-in Image Generation tool and is saved as `public/refinery-core.png`. The optimized website asset is `public/refinery-core.webp`.

Generation prompt:

> Create a premium photorealistic CGI sculptural website hero asset, no text anywhere, no logos, no UI. A single exquisite abstract digital refinery core, spherical intricate interwoven curved titanium ribbons and polished dark chrome fins around a luminous molten amber glass nucleus. The object is engineered, elegant, dimensional, reminiscent of an experimental computational sculpture, NOT a cube or a generic torus. Iridescent violet and icy cyan rim reflections on dark chrome, restrained warm orange light inside. On pure nearly black navy background #080b12 which fades evenly to black at all outer edges. Object centered, occupies 76% of square composition with generous clean margins. Luxury studio product lighting, extremely smooth curved materials, realistic occlusion, rich detail and cinematic contrast. No floor, no cast ground shadow, no smoke, no people, no letters. The asset will be composited on a dark website next to real HTML typography. Output a square high-resolution image.

The approved stack and scope are recorded in [STACK_DECISION.md](STACK_DECISION.md). The previous static replica remains in the checkout for audit reference. Build and serve the new site from its generated output.

1. Use Node 24 and run `npm ci`.
2. Run `npm run build` and `npm start`. Open http://127.0.0.1:3000. For frontend iteration use `npm run dev` with the Express server running for API requests.
3. Run `npm test` for API contract tests. Run `npx playwright install chromium` then `npm run test:browser` after building. Browser tests expect port 3000 to be free.
4. Build the Docker image with `docker build -t bug-refinery .`. For a test run use `docker run --rm -p 127.0.0.1:3000:3000 --env-file .env bug-refinery`.

Copy `.env.example` to a local `.env` and configure an isolated Supabase project and a Turnstile widget for its test hostname. Apply the migration to the isolated project. Configure expiry of rate records as described in the migration. Configure the trusted proxy count only for a known ingress topology that strips untrusted forwarding headers. Keep credentials in the deployment secret store. Use sanitized status and latency metrics without recording request bodies, raw addresses, or tokens. Only Turnstile's public site key reaches the browser. Without configuration the local forms indicate that submission is unavailable.

The test migration is a proposed schema. Reconcile production URLs, lead contract and schema, retention and keep-alive with the project owner before deployment. Obtain exact approved curriculum and homepage quotations before final content acceptance. Verify the existing logo assets and controlled claims with the owner. The implementation avoids adding unverified social proof. End-to-end acceptance needs a Supabase test project and real Turnstile verification. Production form tests and deployment require separate approval.
