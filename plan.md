# Implementation Plan — Jack — 3D Creator

## Goal
Deliver a responsive, high-motion single-page portfolio for **Jack**, matching the supplied visual specification and content: a dark 3D-creator landing experience with a hero, scroll-driven reel, personal statement, services, and three sticky project cards.

## Architecture and serving arrangement
- **Framework:** Vite + React 18 + TypeScript.
- **Styling:** Tailwind CSS 3 with a small global stylesheet for font imports, reset rules, gradient text, and reduced-motion defaults.
- **Animation:** Framer Motion for entrance states, scroll transforms, character opacity, and card scaling. Components that depend on `window` attach passive listeners only in effects and clean them up on unmount.
- **Icons:** Lucide React for the small arrow affordance in CTA buttons.
- **Data:** Static typed arrays for marquee assets, services, decorative assets, and project galleries. No server or database is needed.
- **Serving:** Browser-rendered static SPA. Vite builds the production bundle into `dist/`, which includes `index.html`; the site has one current page route (`/`). Future static publication should use the Vite build command and static SPA fallback. Versioned JS/CSS asset filenames may be cached immutably; stable HTML remains uncached/revalidated so changes reach visitors.

## Project structure
| Path | Responsibility |
| --- | --- |
| `src/main.tsx` | React bootstrapping |
| `src/App.tsx` | Single-page composition, section components, static portfolio data |
| `src/components/` | Reusable `FadeIn`, `Magnet`, `ContactButton`, `LiveProjectButton`, `AnimatedText`, and section components |
| `src/index.css` | Google font, Tailwind layers, global color/reset rules, gradient and accessibility/reduced-motion rules |
| `public/manus-routes.json` | Complete route declaration for the single homepage |
| `public/favicon.svg` | Jack’s geometric monogram favicon |
| `app.config.ts` | Durable hosted project-logo metadata before checkpointing |

## Product implementation
1. Set Tailwind, TypeScript, Vite, Framer Motion, Lucide React, and Kanit; establish global #0C0C0C styling, gradient display treatment, clip-safe page wrapper, and a focused accessible navigation system.
2. Create a reusable animation and interaction layer:
   - `FadeIn` supports dynamic elements, supplied x/y/delay/duration values, required viewport options, and a shared easing curve.
   - `Magnet` moves the portrait relative to pointer proximity with the supplied padding, strength, and transition timing; it avoids persistent motion for coarse pointers/reduced-motion contexts.
   - `AnimatedText` scroll-reveals the About copy one character at a time.
   - CTA components reproduce the specified filled and outlined pill treatments.
3. Build the five specified sections in their stated order, preserving supplied headings, copy, images, dimensional constraints, rounded transitions, and responsive behavior.
4. Use semantic sections and IDs so nav links and CTAs move naturally to About, services (Price), projects, and contact. Add accessible labels, focus-visible styling, lazy image loading where applicable, and alt text that describes non-decorative content.
5. Build the static portfolio and use TypeScript typechecking/build output as primary feedback. Validate that the route manifest is served as JSON and HTTP-ready locally.

## Constraints and decisions
- Remote assets are used exactly from the supplied source URLs; `<img>` rendering avoids unneeded image-processing/server dependencies.
- Project links are intentionally presentational because no live destination URLs were supplied; the ghost buttons expose their status in an accessible, non-navigating way rather than inventing external destinations.
- The Contact CTA anchors to the contact point in the hero footer, preserving a clear, reversible single-page interaction.
- Provided artwork, not newly invented stock replacements, is the visual source. A distinct project logo is generated/registered solely for project branding and favicon metadata.

## Verification
- Install dependencies non-interactively with an explicit pnpm lifecycle-build policy.
- Register/check TypeScript diagnostics through the managed Webdev configuration and resolve actionable issues.
- Run the project’s TypeScript/build checks after implementation.
- Start the declared Vite development service on the configured Preview port and use an HTTP request to verify the homepage and `GET /manus-routes.json` return successfully.
- Perform the required independent read-only implementation validation against this plan and the tracked acceptance criteria before delivery; correct confirmed findings and re-run affected checks.
