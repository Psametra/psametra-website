# REPOSITORY MIGRATED — 2026-09-14

After this migration notice was written, the user directly requested this bounded header, About, and Team implementation in the current `D:\psametra-website` workspace and asked that the work be pushed. That direct request supersedes the document-only restriction for these completed changes. It does not authorize a production deployment.

## Latest repository state

- Repository: `rmspvtltdsoftware/psametra-website`.
- Branch: `codex/psametra-site`.
- Source and documentation commit after integrating remote handoff history: `41d415e` (`Refine header navigation and add team page`).
- This handoff is committed separately on top of that source commit; use `git log -1` for its exact hash.
- The user previously authorized pushes through the current ARKhan8604 credential because both founders collaborate on the RMS repository. Do not repeat the obsolete historical requirement to use `msaad9632`.
- Vercel Git connection updated with the user's explicit confirmation: RMS project `rmspvtltdsoftware-4375s-projects/psametra-website` is connected to `rmspvtltdsoftware/psametra-website`. Vercel reported “Connected Git Repository successfully.”
- A fresh production rebuild was then requested. Deployment `C45ZbaZ3yH547zDZYiXFVYCHABXv` completed with status Ready as a rebuild of preview `2u8asdL5PnSGwKFbJpKS2s3hGEx9`, which was built from commit `747ba9c` on `codex/psametra-site`.
- `https://psametra-website.vercel.app/` was checked after the rebuild and serves the updated site, including the five-item centered header and `/team/` route.
- With the user's explicit confirmation, Vercel Production branch tracking was changed from `main` to `codex/psametra-site`. Vercel confirmed “Branch tracking saved”; auto-assignment of production domains remains enabled, so every future push to this branch creates a production deployment.
- Automatic production deployment `EPGGyGpqL7zsR69DLK5dYyKLXMfi`, triggered by commit `c6d9ffc`, completed with status Ready. This verifies the branch-tracking configuration end to end.
- Production deployment `F7QBgLXRrPP4Fv1kHdet3Af3hRq2`, triggered by the transparent-caption commit `6efb1fd`, also completed with status Ready.
- Production deployment `Chv7fiweSWBRk5gYwSevwrift4Lj`, triggered by the hero-art grid correction `689d032`, completed with status Ready.
- Production deployment `GyMkS3DzhdQURcadMSM2LC3jg8xH`, triggered by the capability-orbit containment commit `0f679d4`, completed with status Ready.
- Production deployment `3JD246pvC5PfSQeqfU3bZ3gLBym3`, triggered by the distinct Services motion-study commit `507a7f2`, completed with status Ready.
- Production deployment `J6dZDsmRtSevE1hUjfGK8LCHmv5P`, triggered by the neutral Services-marker commit `58b342e`, completed with status Ready.
- Production deployment `CC4MC1PznYeZK8QdUdsRtbgbeHM2`, triggered by founder-admin commit `c0156c1`, completed with status Ready. Both founder profiles authenticated successfully against `https://psametra-website.vercel.app/admin/` and rendered the protected editor. The editor intentionally reports that Cloudinary publishing is unavailable until the RMS account connection below is completed.
- The local preview is `http://127.0.0.1:3000/` while the development server is running.
- Production deployment `CiDBTivmywsCJKca8KU8peH8LSte`, triggered by password-management commit `dbfe074`, completed with status Ready. Both founder recovery credentials reached their profile-specific `/admin/security` screen in production. Password writes were intentionally disabled at that deployment until the Cloudinary connection recorded below was completed.
- Production deployment `BXpSCRpLZatPjMorUVKz7zdsKjQS` completed with status Ready after the existing RMS Cloudinary account was activated on its free plan and `CLOUDINARY_URL` was added as a sensitive Production variable. `psametra/cms/site-content.json` was seeded through the authenticated production API and read back successfully. The editor, image uploads, and founder password changes are now enabled at `https://psametra-website.vercel.app/admin/`.

## Implemented

1. Centered the five desktop destinations and removed the header project button from desktop and mobile navigation.
2. Added a translucent scrolled header surface. Deliberate downward scrolling retracts the desktop header to an 8px top-edge target; upward scrolling, pointer hover, and keyboard focus reveal it.
3. Added hover and focus-within dropdowns for every desktop destination, with related links sourced from the typed central content module.
4. Added `/team` with equal profiles for co-founders Abdur Rafay Khan and Muhammad Saad. Founder names and LinkedIn actions open the exact approved profile URLs; existing portfolio links remain available.
5. Replaced the About illustration with the supplied original Psametra PNG artwork. The light artwork appears in dark theme and the dark artwork in light theme.
6. Added a pure `headerVisibilityChange` policy with tests, while `HeaderBehavior` remains the sole owner of scroll listeners and cleanup.
7. Updated README, architecture ownership, and browser QA records for the sixth route and new interactions.
8. Changed the large footer wordmark from `PSAMETRA` to lowercase `psametra` in commit `baedb98`; its existing scale and layout are unchanged.
9. Kept the complete homepage hero mark inside its art column at every breakpoint in commit `a3eacc2`. Removed the deliberate horizontal offset, constrained the mark to available width, and gave the mobile composition enough height for its caption.
10. Removed the Work page concept disclaimer and its unused notice styling in commit `4ba1bbb`.
11. Expanded the footer into responsive Explore, Capabilities, and Company directories in commit `9409766`. Links reuse the central navigation and service data where possible and include relevant About, Team, and Contact anchors.
12. Made the homepage hero-art caption transparent, then placed the coordinate label, complete mark, and caption in dedicated grid rows so none of the three elements can overlap. The coordinate label is intentionally omitted below the desktop breakpoint. This correction and handoff update are committed together; use `git log -1` for the exact hash.
13. Added height-aware maximum diameters to the capabilities orbit rings so the complete circular artwork stays inside its fixed-height artboard instead of clipping at the top and bottom. Breakpoint values remain centralized as custom properties on the art component. This correction and handoff update are committed together; use `git log -1` for the exact hash.
14. Replaced the four repeated Services wireframes with distinct code-native motion studies: a flowing software pipeline, an orbiting AI network, layered browser frames with scan/cursor motion, and a product-direction path. Motion uses CSS only, honors `prefers-reduced-motion`, and keeps the capability copy as the accessible explanation. This source and handoff update are committed together; use `git log -1` for the exact hash.
15. Replaced the diagonal-arrow prefixes on non-interactive Services deliverables with small blue circular markers so the rows no longer imply link behavior. Actual links retain their directional-arrow treatment. This source and handoff update are committed together; use `git log -1` for the exact hash.
16. Changed the approved site-wide contact address to `psametratech@gmail.com`. The central content model now owns one shared email value used by the Contact dropdown, Contact page, footer, and project-brief draft; the environment example, README, tests, and historical handoff references were updated with it. This source and handoff update are committed together; use `git log -1` for the exact hash.
17. Added a founder-only admin CMS at `/admin` in commit `c0156c1`. The two allowlisted profiles are `abdurrafaykhan@psametra.tech` and `muhammadsaad@psametra.tech`; production stores only their scrypt password hashes and a separate signing secret in Vercel encrypted environment variables. The editor covers identity, complete page copy, introductions, services, work, About, principles, process, founders, navigation, brand assets, SEO, and both theme palettes, with reorder/duplicate/remove controls, advanced validated JSON editing, media upload, and immediate publishing. Public routes now read a versioned Cloudinary raw JSON document and fall back to the reviewed repository seed if storage is unavailable. The RMS Cloudinary account and production persistence are now connected.
18. Added a compact founder-profile icon beside the header theme control. It uses the header's existing icon-button sizing and responsive behavior, exposes an accessible label/title, and opens `/admin` so authenticated founders reach the editor while other visitors reach the protected login flow.
19. Added `/admin/security` with a self-service password change form for both founder profiles. The endpoint requires the signed founder session, a same-origin request, the current password, and a 14–128 character replacement using at least three character groups. Successful changes write only a scrypt hash into an AES-256-GCM encrypted Cloudinary document, preserve the other founder's credential, and revoke the current session. The Vercel password hashes remain recovery fallbacks. The form intentionally stays disabled until both `CLOUDINARY_URL` and `ADMIN_CREDENTIALS_SECRET` are configured.
20. Replaced the temporary `p.` label in the protected admin sidebar with the supplied white Psametra logo. The logo remains a compact, accessible link back to the admin content screen and scales cleanly with the mobile sidebar layout.
21. Connected the existing RMS Cloudinary account without selecting a paid plan or creating a duplicate account. Added `CLOUDINARY_URL` to the RMS Vercel project as a sensitive Production variable, redeployed the current branch, and seeded `psametra/cms/site-content.json` through the authenticated CMS API. The production editor and Security screen now report connected storage.
22. Updated the About artwork to load the supplied full-resolution PNG without image recompression. The logo now has an accurate responsive size hint and sits in an explicit centered grid row, with the caption in a separate bottom row so alignment stays stable at desktop and mobile widths.
23. Added an animated metrics strip to the Work page for clients served, projects delivered, and satisfaction rate. Each item exposes an editable heading, number, prefix, and suffix in the admin panel's dedicated Work counters section. Repository defaults remain zero until the founders enter verified business figures; the site does not invent company performance claims.
24. Replaced the first generic Work placeholder with Psametra Logistics, a live Psametra-built concept experience at `https://psametra-logistics.vercel.app/`. The entry uses an optimized capture of the real deployed homepage, links to the live experience, describes only verified public functionality, and remains explicitly labeled as a live concept because the logistics site states that its shipment data is fictional. Its status, URL, image, copy, and tags are editable in the admin Work section; validation limits project links to HTTPS and project images to local or Cloudinary sources.
25. Removed rotation from the homepage hero mark's ambient animation so its two gaps remain vertically aligned throughout the cycle. The slow vertical float remains, preserving subtle motion without tilting the Psametra logo.

## Exact verification

- `npm run lint`: PASS, no errors or warnings.
- `npm run typecheck`: PASS, including generated Next route types.
- `npm test`: PASS, 11 tests and zero failures.
- `npm run build`: PASS with `/team`; all six routes and the custom 404 are statically prerendered.
- `npm run format:check`: PASS.
- `git diff --check`: PASS before commits.
- Browser responsive matrix: PASS for all six routes at 320, 390, 820, 821, 1024, and 1440 CSS pixels in both themes, 72 checks total, with no horizontal overflow or navigation overlap.
- Browser interaction review: centered header, removed project button, scrolled glass appearance, down-scroll retraction, top-edge reveal, dropdown visibility, mobile five-route dialog and focus restoration all passed.
- Browser content review: About selected the correct original logo for both themes; Team showed both equal profiles and exact LinkedIn destinations. No application error or warning appeared in the final pass.
- Lowercase footer change: `npm run lint`, `npm run typecheck`, `npm run build`, and `git diff --check` passed on 2026-09-14.
- Complete hero mark change: the same lint, typecheck, build, and diff checks passed. At 390px, browser geometry confirmed all four mark edges remain inside the 410px hero-art boundary and document overflow is zero.
- Work notice removal: `npm run lint`, `npm run typecheck`, `npm run build`, and `git diff --check` passed on 2026-09-14.
- Footer directory: the same checks passed. Browser review at 390px and 1440px confirmed readable link columns, correct destinations, and no layout overflow.
- Hero artwork separation: browser geometry checks at 1280, 1025, 1024, 820, 700, and 390px confirmed zero coordinate/mark overlap, zero mark/caption overlap, a fully contained mark, and zero horizontal document overflow at every width. The caption remains transparent.
- Capabilities orbit containment: browser geometry checks at 1280, 1025, 1024, 820, 700, and 390px confirmed the outer ring is fully contained, remains circular, preserves at least 30px of vertical clearance, never overlaps its caption, and produces zero horizontal document overflow.
- Services motion studies: browser review confirmed all four distinct visuals render as intended. At 390px each diagram remains inside the viewport at 235×139px, the document has zero horizontal overflow, and each capability exposes its expected CSS animation set; the animations are excluded when reduced motion is requested.
- Services deliverable markers: browser review confirmed the three non-interactive rows use compact blue dots with no arrow glyphs in their accessible text, while their dividers and alignment remain intact.
- Contact email change: source search confirms the former address has no remaining repository references. The Contact dropdown, Contact page, footer, and generated project-brief draft all resolve from the shared `site.email` value.
- Admin CMS: lint, strict type generation, 18 unit tests, production build, formatting, and diff checks passed. Both founder credentials completed the local login flow, returned authenticated `/admin` responses, and rendered the editor. The build exposes dynamic public routes, `/admin`, `/admin/login`, and five protected admin API routes. Same-origin enforcement is covered for local, proxied Vercel, missing-origin, and foreign-origin requests.
- Admin password changes: password policy and stored-hash validation have direct unit coverage. The protected security screen, current-password verification, encrypted credential persistence, founder isolation, and session revocation are implemented; final build and production verification are recorded in the latest repository history after deployment.
- Psametra Logistics feature: lint, strict type generation, all 18 tests, formatting, production build, and diff checks passed on 2026-09-16. Browser review confirmed that the optimized real-site capture renders unobstructed, the Work entry is labeled `LIVE CONCEPT`, and its external action resolves to `https://psametra-logistics.vercel.app/`.

## Remaining work

- Product-owner review and any requested visual refinement.
- Monitor Cloudinary free-plan usage as real content and media are added; no paid plan was selected during setup.
- The broader production performance, accessibility, full keyboard, reduced-motion, hardware touch, and interrupted-transition acceptance checks listed below remain pending.
- Future Vercel account, project, domain, or branch-tracking changes still require explicit authorization and must stay within the approved RMS scope. Ordinary pushes to `codex/psametra-site` now deploy automatically under the setting the user approved.

## Historical migration destination

Saad had moved future unrequested Psametra/logistics website work to:

- GitHub: `RMSPvtLtd/LogisticsWebsite`
- Local: `E:\LogisticsWebsite`
- Branch: `main`

That migration remains relevant for future unrequested work. The implementation above was made only because the user later gave a direct request in this repository.

---

# Psametra â€” A-Z audit, continuation checklist, and AI handoff

**Updated:** 2026-09-13, ~23:35 PKT  
**Repository:** `rmspvtltdsoftware/psametra-website`  
**Branch:** `codex/psametra-site`  
**HEAD before this handoff update:** `9b828bfc8ed69ac630875592ed3b97bcbd9c35b7`  
**Premium-upgrade implementation:** `49a5691049cb8d51fb62a303aaa84497a1c9f10f`

This is the current source-of-truth handoff for Saad and any AI continuing the Psametra site. The original detailed premium-upgrade plan and old ~6.5/10 baseline remain in Git history at `d77fefd7d71724365aa916ec9d7e74519cbd3a23` and its parents.

---

## 0. MANDATORY CONTINUATION PROTOCOL â€” DO NOT REPEAT FINISHED WORK

Every AI must follow this before doing anything:

1. **Read this entire HANDOFF.md first.**
2. Confirm current branch and HEAD and compare them with the hashes recorded here.
3. Work from the checklist below **item by item**.
4. Items marked **DONE** or **VERIFIED** must NOT be repeated merely to â€œbe safe.â€ Re-run them only when:
   - code affecting that item changed after the recorded verification, or
   - the item explicitly requires a fresh preview/production measurement.
5. Items marked **TODO** are the remaining work. Items marked **OPTIONAL** are recommendations, not permission to implement them.
6. Items marked **BLOCKED / NEEDS SAAD** require Saadâ€™s decision or authorization before implementation.
7. When an item is completed, change its state to **DONE** or **VERIFIED**, record the exact evidence/result and relevant commit, and remove it from the active TODO queue if appropriate.
8. If an attempted item cannot be completed, mark it **BLOCKED** and record exactly why. Do not leave ambiguous â€œprobably doneâ€ status.
9. After a code fix, re-run only the tests/checks affected by that code plus the standard build gate; do not blindly repeat the complete 90-viewport matrix unless the change can affect global layout.
10. **Before stopping, handing off, or nearing a model/context/usage limit, update, commit, and push this HANDOFF.md.** Never leave the next AI dependent on chat history.

### User control / authorization

- Repository ownership stays with RMS.
- Do not create a new repo.
- Do not modify website code merely because this audit recommends something.
- Do not deploy production or change Vercel settings without Saadâ€™s explicit approval.
- Documentation/handoff maintenance and pushing the handoff are authorized for continuity.
- Connected GitHub identity during the latest ChatGPT audit is `msaad9632` and has push access.

---

## 1. CURRENT REPOSITORY / DEPLOYMENT STATE

### GitHub

- Repo: `rmspvtltdsoftware/psametra-website`
- Branch: `codex/psametra-site`
- Premium implementation: `49a5691` â€” `Upgrade Psametra layouts, motion, founders, and contact`
- Previous audit handoff: `9b828bf` â€” `Audit upgraded Psametra and record latest handoff`
- No product code was changed by the A-Z audit that produced this handoff.

### Vercel

- Team: `rmspvtltdsoftware-4375s-projects`
- Team ID: `team_K7mVodqcY51jB9vLxTygtBRm`
- Project: `psametra-website`
- Project ID: `prj_uegLEQdah5M3SMVjidjqqoPChpeK`
- Production deployment: `dpl_6TmvkL75xh4tEg57nfuPbzB7qSRq`
- Production state: READY
- Production Git SHA: `698002c3faceb877faafd894a671271949bf1940`
- Public URL: `https://psametra-website.vercel.app/`

**CRITICAL:** production is still the OLD build. The premium-upgrade implementation in GitHub is NOT what the public site currently serves. The live production HTML was rechecked and still contains old content such as `hello@psametra.example`.

Do not use the current production URL to judge whether the premium upgrade is visually correct.

---

## 2. WHAT THE PREVIOUS HANDOFF SAID

The previous handoff said the premium implementation was approximately **8.4/10**, substantially improved from the old ~6.5/10 baseline. It recorded that:

- Stages 1â€“3 of the approved plan are largely implemented.
- Stage 4 â€” final performance/accessibility/release acceptance â€” remains incomplete.
- Build/lint/type/tests had passed.
- 90 settled responsive layout checks had passed with no horizontal document overflow.
- Production is stale and still points at the older build.
- One real release-blocking responsive-state bug was confirmed: opening the mobile menu and then resizing into desktop can leave scroll locked.
- Fresh Lighthouse, accessibility, real-device touch, reduced-motion, interrupted-navigation stress, full orbit-cycle checks, external-link verification, and final product-owner review remain pending.
- No product code should be changed without Saadâ€™s authorization.

This A-Z audit extends that handoff rather than replacing those facts.

---

## 3. A-Z REPOSITORY AUDIT SCOPE â€” COMPLETED

**Status: VERIFIED â€” do not repeat this source inventory unless the repo changes materially.**

The latest audit inspected the repository from root through application code and deployment state, excluding only binary image bytes from line-by-line text review.

### Root/config/docs reviewed

- `.env.example`
- `.gitignore`
- `.openai/hosting.json`
- `AGENTS.md`
- `CLAUDE.md`
- `README.md`
- `docs/ARCHITECTURE.md`
- `docs/QA.md`
- `eslint.config.mjs`
- `next.config.ts`
- `package.json`
- `package-lock.json` inventory/version context
- `postcss.config.mjs`
- `tsconfig.json`
- `scripts/optimize-brand.mjs`
- public brand asset inventory and sizes
- GitHub branch/commit state
- Vercel team/project/deployment state

### App/routes reviewed

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/services/page.tsx`
- `src/app/work/page.tsx`
- `src/app/about/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/not-found.tsx`
- `src/app/globals.css`

### Components reviewed

- `brand.tsx`
- `contact-form.tsx`
- `footer.tsx`
- `motion-observer.tsx`
- `ui.tsx`
- navigation: header, mobile menu, scroll provider, site link, theme config/toggle, transition provider/CSS
- shared sections: contact CTA, page intro, project card/visual, service diagrams

### Data/libs reviewed

- `src/content/site.ts`
- `src/lib/navigation.ts`
- `src/lib/project-brief.ts`
- `src/lib/transition-sequence.ts`

### Styling reviewed

- tokens
- base
- navigation
- home
- diagrams
- projects
- pages
- footer
- sections import index

### Tests reviewed

- navigation tests
- project brief tests
- theme bootstrap tests
- transition sequence tests

### A-Z conclusion

Architecture is disciplined and small. There is no reason to rebuild it or introduce a large framework. Editorial data is centralized, static export fits the current product, client code is restricted to actual browser interactions, contact behavior is honest, and transition/scroll ownership is substantially better than the original version.

No second critical code bug was found during static inspection beyond the already-confirmed responsive mobile-menu scroll-lock bug.

---

## 4. APPROVED PLAN IMPLEMENTATION STATUS

### VIS-01 â€” shared visual system / typography / palette

**DONE / VERIFIED**

- restrained monochrome palette
- limited blue accent
- larger responsive type
- stronger hierarchy
- dark/light surface choreography
- responsive container system

Do not redesign from scratch.

### VIS-02 â€” premium homepage hero

**DONE / VERIFIED**

- large asymmetric typography
- cropped eclipse
- faint edge glow
- immediately readable headline
- ambient drift with reduced-motion support

### VIS-03 â€” homepage pacing

**DONE / VERIFIED**

- dark statement
- dark capabilities
- dark work
- off-white approach section
- dark closing CTA/footer

### VIS-04 â€” homepage work hierarchy

**DONE / VERIFIED**

- one lead concept + two secondary previews
- not three equal cards
- honest concept labels retained

### VIS-05 â€” footer upgrade

**DONE / VERIFIED**

- oversized PSAMETRA wordmark
- compact navigation
- real RMS contact link in upgraded source

### MOT-01 â€” Lenis desktop glide

**DONE / VERIFIED IN CODE + PREVIOUS LOCAL BROWSER PASS**

- pinned Lenis `1.3.26`
- single owner
- one automatic RAF
- `lerp: 0.12`
- only fine-pointer / hover / >=768px / no reduced motion
- native touch retained

### MOT-02 â€” page transition architecture

**DONE / VERIFIED**

- one root transition owner
- 80ms cover
- route loading concurrent with ~220ms rotation
- reveal ~320ms
- route barrier prevents stale reveal
- browser history can interrupt transition
- reduced-motion path avoids rotation/translation-heavy choreography

### MOT-03 â€” progressive entrances / ambient pause

**DONE / VERIFIED**

- content visible without JS
- 16px / ~450ms reveal treatment
- intersection observer
- ambient state tracks viewport
- reduced motion cancels running entrance animation

### INT-01 â€” Services page

**DONE / VERIFIED**

- editorial rows
- four services retained
- code-native diagrams
- deliverables retained

### INT-02 â€” Work page

**DONE / VERIFIED**

- larger editorial visual studies
- explicit concept disclaimer
- challenge/direction groupings
- concept status remains honest

### INT-03 â€” About / founders

**DONE / VERIFIED**

- Muhammad Saad and Abdur Rafay Khan represented equally
- portfolio links present
- no invented titles/metrics/outcomes

### INT-04 â€” Contact

**DONE / VERIFIED IN SOURCE + PARTIAL BROWSER QA**

- real default email `psametratech@gmail.com`
- explicit mailto draft
- local brief download
- whitespace validation
- no backend/storage/fake â€œsentâ€ state

---

## 5. EXISTING VERIFICATION â€” DO NOT BLINDLY REPEAT

**VERIFIED at premium-upgrade checkpoint unless relevant code changes:**

- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm test`: PASS â€” 9 tests / 0 failures
- `npm run build`: PASS â€” five routes + 404 statically exported
- `npm run format:check`: PASS at recorded checkpoint
- `git diff --check`: PASS at recorded checkpoint
- 90 settled route/width/theme layout checks: PASS
- widths: 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920
- both themes in that matrix
- zero horizontal document overflow in those settled checks
- trailing-slash active nav: checked
- same-page history: checked
- cross-page hash placement: checked
- main focus after internal navigation: checked
- ordinary mobile menu Escape/focus/scroll restoration: checked
- whitespace validation: checked
- local brief download action: checked
- desktop homepage/About/founders/work visual review: completed
- mobile homepage/contact/footer visual review: completed

### Re-test rule

If only the mobile-menu resize-lock fix changes, do NOT automatically redo all 90 settled layout checks. Re-run:

- lint
- typecheck
- tests
- build
- mobile-menu open/close/resize regression
- affected widths around the breakpoint (e.g. 390/430/700/701/768)
- scroll ownership after transition/menu overlap

Run the full matrix again only if global CSS/layout/navigation structure changes materially.

---

## 6. CONFIRMED BUG QUEUE

### BUG-01 â€” mobile menu resize can retain scroll lock

**TODO â€” P0 BEFORE RELEASE / NEEDS SAAD AUTHORIZATION TO FIX**

Reproduction:

1. viewport <=700px
2. open mobile dialog
3. resize above mobile breakpoint while dialog is still open
4. `.mobile-menu` becomes hidden by CSS
5. dialog component remains mounted and the `suspend()` release may never run
6. desktop-looking page can remain scroll locked

Root cause is confirmed in `MobileMenu` + `navigation.css`:

- `suspend()` is acquired before `showModal()`
- release occurs on `close`, pathname change, or unmount
- CSS breakpoint hides the wrapper but does not unmount/close it

Recommended bounded fix:

- observe the mobile breakpoint with `matchMedia`
- when leaving mobile, explicitly close an open dialog and release the lock
- make release idempotent
- add a browser/component regression covering `open -> cross breakpoint -> unlocked`

Do not implement until Saad authorizes website code changes.

### BUG-02 â€” none confirmed

**VERIFIED:** static A-Z inspection found no second release-critical bug.

Do not invent additional bugs without reproduction/evidence.

---

## 7. NEW A-Z AUDIT FINDINGS / RECOMMENDATIONS

These did not all appear in the earlier handoff.

### QA-01 â€” browser-level regression coverage

**TODO â€” P1 RECOMMENDATION / NEEDS SAAD FOR IMPLEMENTATION**

Current tests are valuable but pure/unit-oriented. They cover transition ordering, URL policy, theme bootstrap, and contact formatting. They do not mount the actual dialog/viewport behavior, which is exactly why BUG-01 escaped.

Recommended:

- add a minimal Playwright or equivalent browser regression suite
- keep it small: mobile menu resize lock, transition completion, native back/forward, contact validation, reduced-motion mode
- do not create a giant brittle screenshot suite

### CI-01 â€” GitHub CI

**TODO â€” P1 RECOMMENDATION / NEEDS SAAD FOR IMPLEMENTATION**

The latest GitHub commit has no reported CI/status checks. Local checks passed, but there is no durable automated gate visible on GitHub.

Recommended lightweight workflow on push/PR:

- `npm ci`
- lint
- typecheck
- tests
- build

If browser tests are later added, run the small critical suite after the build gate.

### SEO-01 â€” canonical / metadata base / share completeness

**TODO â€” P1 RECOMMENDATION**

Current root metadata has title, description, and basic Open Graph fields, and pages have titles/descriptions. The repository does not currently provide a complete public-share/SEO layer.

Consider after the final domain is known:

- `metadataBase`
- canonical URLs
- Twitter metadata
- a purpose-built OG/social image
- consistent per-page share metadata where useful

Do not hard-code a temporary Vercel URL as the permanent canonical if Psametra will use a custom domain.

### SEO-02 â€” robots / sitemap / structured organization data

**TODO â€” P1 RECOMMENDATION**

No `robots.ts`/`robots.txt` or `sitemap.ts`/`sitemap.xml` is present in the current tree. Consider:

- robots
- sitemap for the five public routes
- Organization/ProfessionalService-style structured data only with factual, approved company information

Do not invent address, awards, clients, ratings, founding dates, or other schema facts.

### BRAND-01 â€” generated app icon is not square

**TODO â€” P2 RECOMMENDATION**

`scripts/optimize-brand.mjs` resizes the supplied dark logo to width 192 while preserving its original aspect ratio. The resulting `src/app/icon.png` is therefore approximately 192Ã—128 rather than a conventional square app/favicon asset.

Recommended:

- create a deliberate square icon treatment while preserving the approved mark/artwork
- optionally add an Apple touch icon
- visually verify it at very small sizes

Do not crop/redraw the logo without Saadâ€™s approval.

### PERF-01 â€” brand images are always `priority`

**TODO â€” P2 PERFORMANCE POLISH**

`Brand()` renders both light/dark WebPs with `priority`, and the component is used in both header and footer. The assets are already small (~16.9KB dark WebP and ~26.7KB light WebP), so this is not a serious problem, but the footer does not need LCP priority and both theme variants do not necessarily need eager treatment.

Recommended only if fresh Lighthouse/trace shows value:

- allow `Brand` to accept a priority/eager prop
- header may remain priority
- footer should be normal/lazy
- avoid changing the visual/logo assets just for micro-optimization

### PERF-02 â€” keep current dependency discipline

**VERIFIED / DO NOT CHANGE WITHOUT EVIDENCE**

- no Framer Motion
- no Three.js
- no icon library
- Lenis is the only motion dependency
- static export stays appropriate

Do not add 3D/heavy animation libraries merely to chase â€œpremium.â€

### CODE-01 â€” `SiteLink` client subscription scope

**OPTIONAL P3 CLEANUP**

`SiteLink` calls `usePathname()` for every use, including many ordinary content/CTA links where active-route semantics are unnecessary. This is not a current bug and may not matter measurably.

Possible future cleanup only if profiling/build analysis justifies it:

- reserve active-route hook behavior for navigation links
- use ordinary Next `Link` for non-nav CTAs/content links

Do not refactor this before release acceptance simply for theoretical purity.

### CODE-02 â€” minor repo housekeeping

**OPTIONAL P3**

`.gitignore` contains `.vercel` twice. Harmless; clean only when touching nearby configuration.

### CONTENT-01 â€” generic concepts are now the largest credibility limitation

**P1 PRODUCT/SALES RECOMMENDATION â€” NEEDS SAAD DECISION**

The current Work page is intentionally honest, but every item is a generic concept study. For a software company trying to win work, verified real builds will create more trust than another layer of visual polish.

Potential direction:

- retain concept studies if desired
- add a distinct â€œSelected buildsâ€ / â€œFounder-built productsâ€ section using real, verifiable projects
- candidates may include real founder/RMS work such as QuickSign, logistics/business software, AI extraction tooling, or other actually built products â€” **only after verifying ownership, public links, screenshots, status, and what claims may be made**
- describe the actual problem, what was built, technologies, and current status
- never invent client outcomes, revenue, adoption, launch status, or testimonials

This is probably the highest-impact path from ~8.4 visual quality toward a company site that also sells effectively.

### CONTENT-02 â€” founder proof links

**OPTIONAL P2 / NEEDS SAAD CONTENT APPROVAL**

Current founder profiles link to portfolios. If useful and approved, add verified professional proof such as GitHub/LinkedIn links. Keep both founders balanced. Do not assign CEO/CTO or other executive titles unless Saad explicitly approves them for Psametra.

### PROOF-01 â€” verified external project proof inventory (2026-09-14)

**VERIFIED / AUDIT EVIDENCE ONLY â€” NO SITE CHANGE**

Founder portfolios and the private RMS logistics repository materially strengthen the evidence available for future Work-page copy, but personal/freelance work must not be silently relabeled as Psametra company client work.

- Abdur Rafay Khanâ€™s public portfolio lists **APPNA New Jersey** as 2026 freelance Full-Stack Developer work, with a live public link at `https://www.appnanj.org/` and a Next.js/React/TypeScript/Tailwind/Vercel stack.
- The same portfolio describes APPNA New Jersey as a nonprofit website covering programs, leadership/events, membership, and donations. The live APPNA NJ site was independently fetched during this audit and currently publishes `10,000+ patients served` and `200+ students mentored` (plus other organization metrics). If these are ever referenced, attribute them as APPNA-reported organizational impact â€” **not as outcomes caused by Psametra/the website unless that causality is separately evidenced**.
- Muhammad Saadâ€™s public portfolio provides additional founder-built proof candidates: QuickSign, `extract`, Ledger, and DineSync. These are evidence of founder capability, not automatically Psametra client engagements.
- Existing Psametra founder portfolio links are already present; do not repeat work to add them.

### CASE-01 â€” APPNA New Jersey case-study candidate

**VERIFIED REAL PUBLIC BUILD / NEEDS ATTRIBUTION + COPY APPROVAL BEFORE USE**

APPNA New Jersey is the strongest immediately public client-style proof found in the audit. It can support a real-work case study once ownership/agency attribution is phrased truthfully. Prefer verifiable scope, screenshots, stack, and public URL. Do not invent outcomes, engagement metrics, or imply Psametra contracted the work unless Saad confirms that relationship.

### CASE-02 â€” Raaziq logistics platform case-study candidate

**VERIFIED REAL PRODUCT EVIDENCE / NEEDS PUBLICATION + CLAIM APPROVAL BEFORE USE**

Evidence reviewed from `E:\LogisticSoftware\sea-and-air` and the live branded shell at `https://frontend-beryl-three.vercel.app/` confirms Raaziq is a substantial logistics build rather than a concept mockup. The air vertical documents quotation-to-shipment workflows, ops/worker/customer/public-tracking surfaces, a 17-stage air-freight lifecycle, FastAPI + React architecture, and a documented integration-test suite. The sea vertical provides public container lookup through a provider abstraction and shares the customer-facing tracking UI.

Claim boundaries are important: current documentation explicitly does **not** support claims of live carrier integrations for air, ETA prediction, GPS/IoT, AI pricing/prediction, payments/ERP, or other future capabilities. The sea SAPT connector has an explicit authorization/commercial-use caveat; never market it as an official SAPT partnership/integration unless separately authorized. Air documentation is internally stale/inconsistent around ops authentication, so avoid detailed auth claims until runtime/source behavior is specifically re-verified. Public shell/branding was verified; authenticated live workflow verification was not completed in this audit.

### CONTENT-03 â€” recommended real-work information architecture

**P1 PRODUCT/SALES RECOMMENDATION â€” NEEDS SAAD DECISION**

For credibility, the strongest evidence-backed direction is a distinct **Selected Work / Real Builds** area led by APPNA New Jersey and Raaziq, plus a separately labeled **Founder-built products** area if QuickSign, `extract`, Ledger, or DineSync are used. This separation prevents personal/freelance work from being presented as company client history while still proving the founders can ship real systems.

### TESTIMONIAL-01 â€” temporary testimonial evidence boundary

**OWNER-REPORTED POSITIVE FEEDBACK / STAGING PLACEHOLDER ONLY / NEEDS APPROVED QUOTE FOR FACTUAL PUBLICATION**

Saad reports that both the APPNA New Jersey client and the Raaziq client were happy with the work and intends to use temporary testimonials. No exact approved client quotation, speaker name/title, or publication permission was verified during this audit. A testimonial component may use clearly marked staging/placeholder copy during development, but fabricated attributed quotes must not ship as factual customer statements. Before production, use an exact approved quote or owner/client-approved paraphrase with truthful attribution.

### AUDIT-01 â€” one-pass local audit confirmation (2026-09-14)

**VERIFIED / AUDIT ONLY â€” NO PRODUCT CODE CHANGE**

A single local audit script inspected Git state, package/config files, the filtered source tree, tests, TODO/FIXME/error patterns, existing handoff items, relevant navigation/scroll/SEO/performance patterns, and attempted the standard quality gates. At the start of the pass, branch `codex/psametra-site` and `origin/codex/psametra-site` both pointed to `1051fed7e43645ece769fce616b14e8ef0f71188`; the only working-tree change was this handoff update.

- No additional critical source bug was identified beyond **BUG-01**.
- No source `TODO`/`FIXME`/`HACK`/`XXX`, `@ts-ignore`, or `@ts-expect-error` debt was found by the pass; TODO hits were confined to this handoff/checklist.
- The single source `console.error` remains in transition failure handling and was not identified as a new defect.
- Existing findings for SEO metadata, missing robots/sitemap, always-priority brand images, Lenis ownership, and the mobile-menu scroll-lock path were reconfirmed rather than duplicated as new issues.
- Unit tests executed successfully: **9/9 passed**.
- `lint`, `typecheck`, and `build` could not start in this checkout because the local `eslint`/`next` executables are unavailable (`node_modules` is not installed). Treat this as a local environment precondition, **not a code-gate failure**. Earlier successful lint/typecheck/build evidence in this handoff remains the latest completed gate evidence until dependencies are installed and the gate is rerun.
- The temporary audit report is not a project artifact and must not be committed.

### BIZ-01 â€” custom company domain

**P1 BEFORE SERIOUS PUBLIC LAUNCH / NEEDS SAAD**

Current production is on a `vercel.app` hostname. A real Psametra domain would materially improve trust, email/brand consistency, canonical SEO, and sharing.

Do not buy/configure a domain without Saadâ€™s approval.

### ANALYTICS-01 â€” lightweight conversion measurement

**OPTIONAL P2 AFTER LAUNCH / NEEDS SAAD**

README confirms there is currently no analytics. Once the upgraded site is live, consider lightweight measurement for:

- Start a project clicks
- contact-page visits
- Open email draft
- Download brief
- portfolio/case-study clicks

Use a privacy-conscious setup and document it. Do not add analytics before Saad chooses the provider and privacy approach.

---

## 8. RELEASE ACCEPTANCE TODO QUEUE â€” EXECUTE IN THIS ORDER

This is the list the next AI should work through rather than starting another general audit.

### REL-01 â€” BUG-01 fix

**TODO / BLOCKED ON SAAD AUTHORIZATION**

Fix mobile-menu breakpoint scroll lock and add regression coverage.

### REL-02 â€” standard code gate after BUG-01

**TODO AFTER REL-01**

Run lint, typecheck, tests, build. Re-run breakpoint-focused browser checks, not automatically the entire old matrix.

### REL-03 â€” upgraded Vercel preview

**TODO / NEEDS SAAD AUTHORIZATION IF DEPLOYMENT ACTION REQUIRED**

Create or identify a preview containing the upgraded HEAD. Verify it is built from the correct new SHA. Do not promote production yet.

### REL-04 â€” fresh Lighthouse / Core Web Vitals lab checks

**TODO ON UPGRADED PREVIEW**

Targets retained from plan:

- mobile performance >=95
- desktop performance >=99
- LCP <=2.5s
- CLS <=0.05

Record actual scores and test conditions. Do not reuse old production scores.

### REL-05 â€” upgraded accessibility acceptance

**TODO ON UPGRADED PREVIEW**

- automated accessibility scan
- contrast scan
- keyboard-only pass
- focus visibility
- dialog behavior
- both themes

### REL-06 â€” navigation stress

**TODO**

- rapid repeated internal clicks
- Back during cover
- Back during rotation
- Back during reveal
- throttled destination readiness
- transition + mobile-menu lock overlap

### REL-07 â€” motion / device acceptance

**TODO**

- desktop wheel trace
- emulated midrange phone trace
- real/native touch if available
- OS/browser-level reduced motion
- full ambient orbit cycle without overflow
- do not claim stable 60fps until measured

### REL-08 â€” contact end-to-end acceptance

**TODO**

- inspect downloaded brief bytes/content/filename
- verify mailto result in real browser
- no fake sent state
- real RMS address everywhere

### REL-09 â€” external links

**TODO**

- Saad portfolio link
- Rafay portfolio link
- any future real case-study links

### REL-10 â€” product-owner visual review

**TODO / NEEDS SAAD**

Saad reviews the actual upgraded preview on desktop/mobile and both themes. Record concrete requested refinements instead of launching another generic redesign audit.

### REL-11 â€” production promotion

**TODO / BLOCKED ON SAAD EXPLICIT APPROVAL**

Only after the release queue above is acceptable. Confirm RMS Vercel scope and deployed commit SHA after promotion.

---

## 9. WHAT REMOTE DESKTOP COMMANDER IS / IS NOT NEEDED FOR

### Not needed for current source audit

**VERIFIED:** GitHub + Vercel connectors were enough to inspect the committed repo and deployment state A-Z.

### Useful later

Remote Desktop Commander can be useful if Saad authorizes it for:

- inspecting the exact local working tree if it has unpushed changes
- launching the upgraded local build
- physical/local browser interaction the connector cannot reproduce
- local Lighthouse/DevTools/performance tracing
- checking downloaded brief files on disk
- verifying touch/emulation/reduced-motion settings available on the local machine

Do not require RDC merely to reread source files already audited in GitHub.

---

## 10. PROVISIONAL SCORES â€” UPGRADED IMPLEMENTATION

These are subjective design/readiness scores for the upgraded implementation reviewed locally/source-side, NOT scores for the stale public production build.

| Area                    |                              Score | Status                                                  |
| ----------------------- | ---------------------------------: | ------------------------------------------------------- |
| Overall premium feel    |                         **8.4/10** | strong improvement; final acceptance pending            |
| Hero / identity         |                            **8.8** | visually strong                                         |
| Typography              |                            **8.7** | close to intended hierarchy                             |
| Section pacing          |                            **8.6** | deliberate and varied                                   |
| Services                |                            **8.5** | editorial treatment works                               |
| Work presentation       | **8.6 visual / lower sales proof** | presentation strong; generic concepts limit credibility |
| About/founders          |                            **8.6** | balanced and credible within supplied facts             |
| Contact                 |                            **8.4** | honest and usable; final browser acceptance pending     |
| Navigation/motion       |                            **8.1** | BUG-01 blocks release-grade score                       |
| Desktop glide           |                **8.5 provisional** | architecture good; measured traces pending              |
| Mobile responsiveness   |                            **8.5** | settled layouts strong; breakpoint bug remains          |
| Accessibility readiness |                **8.5 provisional** | final upgraded preview scan pending                     |
| Performance readiness   |                **8.7 provisional** | lean architecture; fresh measured results pending       |

Do not raise these scores merely because code was changed. Raise them only after evidence/product review supports it.

---

## 11. NON-NEGOTIABLE PRODUCT CONSTRAINTS

- RMS repository ownership remains unchanged.
- Existing routes/core concepts/logo assets remain unless Saad changes scope.
- Default theme follows system; manual theme switch stays.
- Desktop may use gentle Lenis easing; touch stays native.
- Contact has no backend/database unless Saad explicitly changes that decision.
- Approved address: `psametratech@gmail.com`.
- Never claim an enquiry was sent when only a mail draft opens.
- Keep concept/prototype status honest.
- Do not invent customers, outcomes, testimonials, revenue, awards, addresses, launch status, executive titles, or metrics.
- Do not add heavy animation/3D dependencies without a demonstrated need.
- Performance and responsiveness must not be sacrificed for visual spectacle.
- Suggestions in this handoff are not automatic authorization to implement them.

---

## 12. FINAL STATUS AT THIS HANDOFF

- A-Z committed-repo audit: **VERIFIED COMPLETE**
- Latest one-pass local audit transport check (2026-09-14): **VERIFIED â€” HANDOFF-only findings; 9/9 unit tests passed; lint/typecheck/build blocked locally by missing installed dependencies**
- Original premium plan comparison: **VERIFIED COMPLETE**
- Premium implementation in GitHub: **DONE at `49a5691`**
- Public production upgraded: **NO â€” still old `698002c` release**
- Product code changed by latest A-Z audit: **NONE**
- Vercel settings/deployment changed by latest A-Z audit: **NONE**
- Confirmed release bug: **BUG-01 mobile menu resize scroll lock**
- Fresh upgraded Lighthouse/a11y/perf acceptance: **TODO**
- Browser regression/CI improvements: **TODO recommendation**
- SEO/share completeness: **TODO recommendation**
- Real project/case-study proof: **P1 product recommendation / NEEDS SAAD**
- Custom domain: **P1 before serious launch / NEEDS SAAD**
- Next coding action: **REL-01 only after Saad approval**

**Next AI: do not start another A-Z audit. Start at the first applicable TODO in Section 8, respecting authorization, and update this checklist as each item is actually completed.**
