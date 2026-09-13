# Psametra premium upgrade — current audit and AI handoff

**Updated:** 2026-09-13, ~23:15 PKT  
**Repository:** `rmspvtltdsoftware/psametra-website`  
**Branch:** `codex/psametra-site`

This is the current source-of-truth handoff. The complete historical premium-upgrade plan and the earlier 6.5/10 baseline remain available in Git history at commit `d77fefd7d71724365aa916ec9d7e74519cbd3a23` and its parent history. Read this file first; consult that historical version when exact original-plan wording is needed.

## 1. User instruction and scope for this continuation

Saad asked the AI to continue the audit where the previous run hit its usage limit, compare the implementation against the approved plan, audit the updated site for design, smoothness, bugs, and speed, and **push a handoff before stopping**.

For this continuation:

- Audit/documentation and pushing this handoff are authorized.
- **Do not change website implementation code.**
- **Do not deploy the upgraded website or change Vercel settings.**
- Do not create a new repository. Repository ownership stays with RMS.
- Connected GitHub identity in the current ChatGPT session is `msaad9632`, which has push access to the existing RMS repository.
- Keep updating and pushing the handoff before future AI usage/context limits are exhausted.

No product-code change was made by this continuation.

## 2. Repository and deployment state

Before this handoff commit:

- Branch HEAD: `d77fefd7d71724365aa916ec9d7e74519cbd3a23` — `Record premium upgrade progress and remaining acceptance checks`.
- Premium-upgrade implementation commit: `49a5691049cb8d51fb62a303aaa84497a1c9f10f` — `Upgrade Psametra layouts, motion, founders, and contact`.
- Earlier plan/handoff commit: `1886f1592d7cc8067a4724330a5adb4f80bfdc3d`.
- Current production deployment is still the **old build**, not the premium-upgrade implementation.
- Vercel team: `rmspvtltdsoftware-4375s-projects` / `team_K7mVodqcY51jB9vLxTygtBRm`.
- Vercel project: `psametra-website` / `prj_uegLEQdah5M3SMVjidjqqoPChpeK`.
- Production deployment: `dpl_6TmvkL75xh4tEg57nfuPbzB7qSRq`, state `READY`.
- Production deployment Git SHA: `698002c3faceb877faafd894a671271949bf1940`.
- Production URL: `https://psametra-website.vercel.app/`.

**Important:** the public website currently serves the pre-upgrade version. The upgraded code exists in GitHub but has not been deployed to production. Any audit result below that refers to the upgraded experience comes from the reviewed implementation/local build from the previous audit run, not the currently public production release.

The live production HTML was rechecked during this continuation and still contains old content such as the placeholder footer email `hello@psametra.example`, confirming the deployment mismatch.

## 3. Implementation vs approved plan

### Stage 1 — visual system + homepage: largely complete

The implementation matches the approved direction closely:

- restrained monochrome system with limited blue accent
- larger responsive typography
- oversized/cropped eclipse treatment and subtle glow
- stronger section pacing with dark/light contrast
- dark statement/capabilities/work sequence and lighter approach section
- one lead homepage project plus two secondary previews instead of three equal cards
- larger, more editorial work presentations
- expanded footer composition and wordmark treatment
- concept labels remain honest; no unsupported client-success claims were introduced

### Stage 2 — smooth motion + navigation: substantially complete, one confirmed bug

Implemented as planned:

- Lenis 1.3.26 is the single desktop glide owner
- `lerp: 0.12`
- enabled only for fine-pointer/hover desktop at width >=768px
- touch/mobile remains native
- reduced-motion users do not get eased desktop scrolling
- one automatic RAF owner
- section entrances are progressive and content remains visible without JavaScript
- ambient animation is locally contained and paused offscreen where appropriate
- page transition target was reduced to roughly 620ms nominal choreography
- destination loading begins earlier/concurrently
- trailing-slash active-state bug was fixed
- browser Back/Forward is intended to stay native
- transition/menu scroll locks were made composable

However, the audit found a real responsive-state bug described in section 5 below.

### Stage 3 — internal pages + About + Contact: largely complete

Implemented:

- services moved toward editorial rows with restrained diagrams
- work studies enlarged toward 16:10 editorial layouts
- About contains equal founder profiles
- Muhammad Saad and Abdur Rafay Khan portfolio destinations were added
- company positioning is software/products/business systems/websites without invented claims
- contact uses the real RMS address `rmspvtltd.software@gmail.com`
- email draft action is separated from brief download
- whitespace validation and mailto encoding are handled with pure helpers/tests
- no backend/database/fake sent state was added

### Stage 4 — acceptance/performance/accessibility: only partially complete

A strong verification pass was done, but release acceptance is not complete. Do **not** call this a verified 9/10 production release yet.

## 4. Verification already completed on the upgraded implementation

The previous audit run recorded:

- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm test`: PASS — 9 tests, 0 failures
- `npm run build`: PASS — all five routes plus 404 statically exported
- `npm run format:check`: PASS before the final documentation-only QA update
- `git diff --check`: PASS before commits
- 90 settled responsive layout checks: 5 routes × 9 widths × 2 themes
- widths checked: 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920
- zero horizontal **document** overflow in the settled matrix
- trailing-slash active links checked
- same-page history and cross-page hash placement checked
- main-focus behavior checked
- menu Escape/focus/lock restoration checked in ordinary open/close flows
- whitespace rejection and local brief-download status checked
- desktop homepage/About/founders/work visually reviewed
- mobile homepage/contact/footer visually reviewed

The implementation also corrected an unintended Tailwind container max-width and removed brittle positional selectors during that review.

What has **not** been freshly established for this new implementation:

- new Lighthouse mobile/desktop score
- measured LCP/CLS for the upgraded build
- automated full accessibility/contrast scan of the upgraded build
- measured 60fps trace
- real-device touch verification
- OS-level reduced-motion verification
- full interrupted/rapid navigation stress test

The old production Lighthouse baseline (97 mobile / 100 desktop performance, with excellent initial-load metrics) belongs to the older deployed version and must not be presented as the upgraded build’s score.

## 5. Confirmed bug — mobile menu can leave scrolling locked after desktop resize

**Severity:** P1 before production release.  
**Status:** confirmed by browser testing and supported by code inspection.  
**Fix made:** none; user requested audit only.

Reproduction:

1. Use a viewport <=700px.
2. Open the mobile navigation dialog.
3. While it is still open, widen the viewport above the mobile breakpoint.
4. The mobile-menu wrapper becomes hidden by CSS, but the dialog state/scroll suspension is not explicitly closed/released on that breakpoint change.
5. The page can therefore appear back in desktop layout while scrolling remains locked.

Root cause in current code:

- `MobileMenu` calls `suspend()` before `showModal()` and stores the release callback.
- The release callback runs on the dialog `close` event, pathname change, or component unmount.
- `.mobile-menu` is switched from `display: block` to its default `display: none` when the viewport grows past the `max-width: 700px` media query.
- CSS hiding does not unmount the React component or necessarily fire the dialog close event, so the scroll lock can survive the breakpoint transition.

Recommended fix when Saad authorizes implementation:

- observe the mobile breakpoint (for example with `matchMedia`) and, when leaving mobile while the dialog is open, explicitly close the dialog and release the scroll suspension; or otherwise centralize dialog/breakpoint state so an invisible menu can never own a scroll lock.
- add an automated regression test for `open menu -> cross breakpoint -> scroll lock released`.

Do not fix it without Saad’s approval in a future coding session.

## 6. Provisional updated scores for the upgraded implementation

These are **subjective audit scores for the reviewed upgraded build**, not fresh Lighthouse metrics and not scores for the currently public production deployment.

| Area | Updated /10 | Audit note |
|---|---:|---|
| Overall premium feel | **8.4** | Major improvement from the old ~6.5 baseline; release verification and final polish remain |
| Hero / visual identity | **8.8** | Stronger scale, eclipse treatment, restraint, and hierarchy |
| Typography | **8.7** | Much closer to the intended editorial/premium hierarchy |
| Section pacing / composition | **8.6** | Less repetitive and more deliberate than the old build |
| Services presentation | **8.5** | Editorial treatment and diagrams improve distinctiveness |
| Work presentation | **8.6** | Larger studies and hierarchy materially improve impact |
| About / founder credibility | **8.6** | Both founders are represented equally with real portfolio destinations |
| Contact experience | **8.4** | Real RMS address and honest mail-draft/download behavior; needs final browser acceptance |
| Navigation / transition motion | **8.1** | Faster and better coordinated, but resize-lock bug prevents release-grade score |
| Desktop scrolling / motion | **8.5** | Architecture matches plan; needs measured trace before claiming performance quality |
| Mobile responsiveness | **8.5** | Settled layouts are strong across matrix; breakpoint-state bug remains |
| Accessibility readiness | **8.5** | Good foundations and reduced-motion design, but full upgraded-build automated/manual acceptance still pending |
| Performance readiness | **8.7** | Build remains lean/static-oriented, but new Lighthouse/frame measurements are still required |

Target remains approximately **9/10 without sacrificing performance**.

## 7. Priority recommendations

### P0 / release blockers

1. **Fix and regression-test the mobile-menu breakpoint scroll-lock bug.**
2. Create/identify an authorized Vercel preview of the upgraded commit before production promotion; do not test the old production URL as though it contains the upgrade.
3. Run fresh Lighthouse on the upgraded preview. Targets from the approved plan remain mobile >=95, desktop >=99, LCP <=2.5s, CLS <=0.05.
4. Run an automated accessibility + contrast scan on the upgraded preview and complete a keyboard/focus pass in both themes.

### P1 / high-value acceptance work

5. Stress rapid/interrupted navigation, including Back during cover/rotation/reveal and slow/throttled destinations.
6. Finish explicit dark-mode and light-mode visual review of every route at representative desktop/mobile widths.
7. Verify the downloaded brief bytes/filename and the complete contact mailto result in-browser.
8. Verify both external founder portfolio links from the rendered About page.
9. Verify a full ambient-orbit cycle and real-device/native touch behavior without horizontal scroll or scroll ownership conflicts.
10. Verify OS-level `prefers-reduced-motion`, not only code-path/unit behavior.

### P2 / polish after acceptance

11. Only after performance traces are clean, tune any motion that still feels slightly long/heavy. Do not add another animation framework or 3D stack merely for spectacle.
12. Use product-owner visual review to decide whether remaining differences from a 9/10 feel are typography/spacing refinements rather than architecture changes.

## 8. Exact next steps for the next AI

1. Read this handoff first.
2. Confirm current branch/HEAD because this handoff commit will sit on top of `d77fefd`.
3. Do not deploy production or alter Vercel settings without Saad’s approval.
4. If Saad authorizes code changes, fix **only** the confirmed resize/menu lock bug first and add a regression test.
5. Re-run lint, typecheck, tests, build, and the responsive/browser checks affected by that fix.
6. Ask Saad before any product-code push/deployment unless he has already explicitly authorized that bounded action.
7. Complete Stage 4 acceptance on an upgraded preview.
8. Report the new measured Lighthouse/accessibility/performance evidence separately from the old production baseline.
9. **Before stopping or reaching a model/context limit, update and push this handoff again.** Never leave continuation state only in chat.

## 9. Non-negotiable product constraints carried forward

- Repository ownership remains RMS.
- Existing routes/core concepts/logo assets remain unless Saad explicitly changes scope.
- Default theme follows system; manual theme switch stays.
- Desktop scroll may use gentle Lenis easing; touch remains native.
- No backend/database is required for contact.
- Contact address is `rmspvtltd.software@gmail.com`.
- Do not claim an enquiry was sent when only a mail draft is opened.
- Do not invent client outcomes, executive titles, portraits, revenue/customer metrics, or shipped-client claims for concept work.
- Keep honest concept/prototype labels.
- Do not add a heavy animation/3D framework without a demonstrated need.
- Do not change the website merely because an audit recommendation exists; Saad controls implementation scope.

## 10. Handoff status

At this checkpoint:

- Premium-upgrade implementation: **implemented in GitHub at `49a5691`, not deployed to production**
- Current branch documentation checkpoint before this commit: **`d77fefd`**
- Product code changed by this continuation: **none**
- Vercel deployment/settings changed by this continuation: **none**
- Confirmed unresolved bug: **mobile-menu breakpoint resize can retain scroll lock**
- Fresh upgraded-build Lighthouse/accessibility/performance acceptance: **pending**
- Next code action: **requires Saad’s approval**
- Handoff push: **authorized by Saad and performed as this documentation-only commit**
