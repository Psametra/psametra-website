# Architecture and engineering decisions

The supplied engineering rules guide the architecture. The relevant principles are information hiding, explicit ownership, small public interfaces, immutable editorial data, strict types, structural cleanup, and tests that force adverse ordering. Unrelated examples in the supplied rules do not introduce product requirements.

## Ownership

| Area                  | Owner                               | What callers need to know                                        |
| --------------------- | ----------------------------------- | ---------------------------------------------------------------- |
| Editable company data | `content-store.ts`, Cloudinary      | Validated content with a version-controlled fallback             |
| Admin authentication  | `admin-auth.ts`                     | Two allowlisted profiles, scrypt hashes, signed HTTP-only cookie |
| Admin interface       | `/admin`, `AdminEditor`             | Complete visual and JSON editing surface                         |
| Routes                | `src/app/`                          | Compose server-rendered content and export metadata              |
| Branding              | `Brand`                             | Render the correct supplied asset for the current theme          |
| Navigation animation  | `TransitionProvider`                | Wrap the application once                                        |
| Transition ordering   | `runTransition`                     | Cover, commit, and reveal are promises, with explicit sequencing |
| Active link state     | `SiteLink`                          | The same public contract as Next Link                            |
| Header visibility     | `HeaderBehavior`                    | Scroll direction and hover/focus visibility policy               |
| Theme preference      | `theme-config.ts`, `ThemeToggle`    | System, light, and dark, with optional local persistence         |
| Mobile navigation     | `MobileMenu`                        | Native dialog owns focus containment and Escape behavior         |
| Enquiry preparation   | `ContactForm`, `formatProjectBrief` | Validated local download or visitor-reviewed email draft         |
| Brand optimization    | `scripts/optimize-brand.mjs`        | Regenerate deployable derivatives from complete originals        |

## Rendering and dependencies

Pages, copy, illustrations, and shared sections are server components. Only navigation, theme preference, the mobile dialog, and the contact interaction require client code. The provider receives server-rendered children instead of importing route modules, so wrapping the tree does not turn every route into client code.

The requested Next.js stack was retained instead of adopting a different Sites starter. Public pages are dynamically server-rendered so Cloudinary content changes appear immediately. Cloudinary raw storage holds one validated JSON document and its media folder holds admin uploads. Repository content remains the outage/setup fallback. CSS handles interaction states; the browser Web Animations API handles the finite eclipse choreography. No animation or icon library was added.

## Admin security and content consistency

Only the two explicit founder identifiers can authenticate. Password material is never committed: deployments receive scrypt hashes and a separate session-signing secret through encrypted environment variables. Sessions use signed, HTTP-only, secure, same-site cookies with an eight-hour lifetime. Every mutation checks same-origin headers and repeats authorization inside the route handler. Image uploads accept only image MIME types and enforce a 6 MB server limit.

The content adapter validates document shape, collection limits, total serialized size, and theme color syntax before overwrite. Cloudinary keeps versions of the raw asset, while CDN invalidation and uncached reads make published edits visible to public routes. Failed reads and initial setup degrade to the reviewed repository defaults; failed writes never mutate that fallback.

Two transition designs were considered: independent animated link wrappers, and a single root owner. Independent wrappers would duplicate timing, route recovery, and exclusion state. A root owner keeps those decisions in one place while preserving ordinary anchors and Next prefetching.

## Transition invariants

- Exactly one sequence owns the overlay at a time; exclusion begins before the first await.
- `runTransition` enforces cover → concurrent rotation/route commit → reveal.
- The route barrier matches the intended normalized pathname, not any unrelated render.
- Native history interrupts the old sequence without pushing its abandoned destination again.
- Every animation and timeout has one owner and structural cleanup on success, failure, or teardown.
- The page is inert while covered; a stable scrollbar gutter prevents width shifts.
- Keyboard focus goes to the new main region after an internal click navigation.
- The 90-degree mark uses duplicated, clipped SVG geometry, never a cropped brand PNG.
- Reduced motion skips rotation and translation and retains the route barrier.

## Error boundaries and honest behavior

Storage denial does not make the theme unusable: the current visit still works without persistence. Transition errors recover through ordinary browser navigation after logging; intentional unmount and history cancellation are not failures. Invalid contact fields are rejected by native browser validation. No fake submission success, clients, metrics, awards, or testimonials are present.

The approved RMS mailbox is configured. Draft creation and download are explicit local actions; no delivery provider or backend is implied. Portfolio compositions are labelled concept studies rather than represented as completed client products.

## Change discipline

Keep new business copy in the content module. Put reusable presentation in `components`, pure policy in `lib`, and operational tooling in `scripts` or `tests`. Add client boundaries only for browser interactions. Document preconditions and non-obvious decisions rather than restating the code. Prefer fixing selectors or ownership boundaries over accumulating layout exceptions or extending timeouts.

## Premium upgrade ownership (2026-09-13)

- `ScrollProvider`: a single dynamically imported Lenis engine, responsive eligibility, native-input exclusions, inertia cancellation, and composable modal/route locks. Each suspension returns an idempotent release function; only the last release restores the prior overflow state. Media changes destroy the old engine; a revision guard prevents stale imports from creating a second engine.
- `MotionObserver`: one intersection observer per route. Selected groups animate 16px over 450ms once; ambient graphics pause outside the viewport. Content is visible in server HTML, without animation classes that could strand it hidden. Reduced-motion changes cancel running entrances.
- `ServiceDiagram`: typed code-native decorative illustrations. Service explanations and founder facts live in the editorial source, not in SVG labels.
- CSS modules are grouped by visual responsibility and contain their own breakpoint rules. `sections.css` is only an import index. The shared `.container` explicitly neutralizes Tailwind’s default max-width; decorative orbit overflow is clipped locally, not hidden on the document.
- `briefFieldError` and `projectEmailUrl`: pure validation/encoding policies shared with tests. Both contact actions reuse the same validated data and formatting. No user inputs are persisted or automatically sent.
- The normal transition budget is 80 + max(220, route readiness) + 320ms. Reduced motion uses two 100ms fades. The route commit barrier, native history cancellation, and 8-second navigation recovery bound remain intact.

Lenis API reference: https://github.com/darkroomengineering/lenis (verified against installed 1.3.26 types and stylesheet). No additional animation framework was introduced.

## Header and team ownership (2026-09-14)

- `HeaderBehavior` owns scroll observation and exposes only `data-scrolled` and `data-hidden` state to CSS. The pure `headerVisibilityChange` policy is tested independently from React and browser event wiring.
- Desktop dropdowns are CSS hover and focus-within interactions, so pointer and keyboard access share the same content. The mobile dialog reuses the primary route list without duplicating a header call to action.
- Founder names, roles, biographies, portfolio URLs, and approved LinkedIn URLs remain immutable editorial data in `src/content/site.ts`. The Team route renders that source directly.
- `Brand` selects optimized artwork by default and supports the supplied original PNG pair where the complete logo treatment is required on About.
