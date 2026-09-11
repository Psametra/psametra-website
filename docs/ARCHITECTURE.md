# Architecture and engineering decisions

The supplied engineering rules guide the architecture. The relevant principles are information hiding, explicit ownership, small public interfaces, immutable editorial data, strict types, structural cleanup, and tests that force adverse ordering. Unrelated examples in the supplied rules do not introduce product requirements.

## Ownership

| Area                  | Owner                               | What callers need to know                                        |
| --------------------- | ----------------------------------- | ---------------------------------------------------------------- |
| Editable company data | `src/content/site.ts`               | Typed, immutable content; no rendering details                   |
| Routes                | `src/app/`                          | Compose server-rendered content and export metadata              |
| Branding              | `Brand`                             | Render the correct supplied asset for the current theme          |
| Navigation animation  | `TransitionProvider`                | Wrap the application once                                        |
| Transition ordering   | `runTransition`                     | Cover, commit, and reveal are promises, with explicit sequencing |
| Active link state     | `SiteLink`                          | The same public contract as Next Link                            |
| Theme preference      | `theme-config.ts`, `ThemeToggle`    | System, light, and dark, with optional local persistence         |
| Mobile navigation     | `MobileMenu`                        | Native dialog owns focus containment and Escape behavior         |
| Enquiry preparation   | `ContactForm`, `formatProjectBrief` | Validated local download or visitor-reviewed email draft         |
| Brand optimization    | `scripts/optimize-brand.mjs`        | Regenerate deployable derivatives from complete originals        |

## Rendering and dependencies

Pages, copy, illustrations, and shared sections are server components. Only navigation, theme preference, the mobile dialog, and the contact interaction require client code. The provider receives server-rendered children instead of importing route modules, so wrapping the tree does not turn every route into client code.

The requested Next.js stack was retained instead of adopting a different Sites starter. Static export is appropriate because the site does not need accounts, stored records, or server-side enquiries. CSS handles interaction states; the browser Web Animations API handles the finite eclipse choreography. No Framer Motion, Three.js, or icon library was needed.

Two transition designs were considered: independent animated link wrappers, and a single root owner. Independent wrappers would duplicate timing, route recovery, and exclusion state. A root owner keeps those decisions in one place while preserving ordinary anchors and Next prefetching.

## Transition invariants

- Exactly one sequence owns the overlay at a time; exclusion begins before the first await.
- `runTransition` enforces cover → rotation → committed destination → reveal.
- The route barrier matches the intended normalized pathname, not any unrelated render.
- Native history interrupts the old sequence without pushing its abandoned destination again.
- Every animation and timeout has one owner and structural cleanup on success, failure, or teardown.
- The page is inert while covered; a stable scrollbar gutter prevents width shifts.
- Keyboard focus goes to the new main region after an internal click navigation.
- The 90-degree mark uses duplicated, clipped SVG geometry, never a cropped brand PNG.
- Reduced motion skips rotation and translation and retains the route barrier.

## Error boundaries and honest behavior

Storage denial does not make the theme unusable: the current visit still works without persistence. Transition errors recover through ordinary browser navigation after logging; intentional unmount and history cancellation are not failures. Invalid contact fields are rejected by native browser validation. No fake submission success, clients, metrics, awards, or testimonials are present.

The contact form is deliberately explicit about its local behavior because no verified address or delivery provider was supplied. Portfolio compositions are labelled concept studies rather than represented as completed client products.

## Change discipline

Keep new business copy in the content module. Put reusable presentation in `components`, pure policy in `lib`, and operational tooling in `scripts` or `tests`. Add client boundaries only for browser interactions. Document preconditions and non-obvious decisions rather than restating the code. Prefer fixing selectors or ownership boundaries over accumulating layout exceptions or extending timeouts.
