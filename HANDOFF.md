# Psametra premium upgrade — audit, scores, implementation plan, and AI handoff

## READ THIS FIRST

This file is the source-of-truth handoff for continuing the Psametra website work after the previous Astra/Codex session reached its usage limit.

**User instruction:** do not make changes beyond the work the user has explicitly approved. Ask Saad before editing code, committing, pushing, deploying, changing Vercel settings, or making any other repo/product change. If the user approves a bounded action, stay within that scope.

### Mandatory handoff rule for every AI

Before stopping work, handing the task to another AI, handing the work back to Saad, or getting close to a context/usage limit, you MUST:

1. Update this `HANDOFF.md` with the exact current state.
2. Include current branch and commit, changed/uncommitted files, completed work, exact checks/tests and results, unresolved issues, deployment/preview links, user decisions, and next concrete steps.
3. Commit and **push the updated `HANDOFF.md` to the existing RMS repository** so the next AI can actually read it from GitHub.
4. Do not leave the handoff only in chat or only as an uncommitted local file.
5. Never mark untested work as complete.

If you are approaching a model/session limit, do this **before** the limit is exhausted. Preserve the user’s decisions exactly. Leave the same quality of handoff for Saad’s AI when returning the work.

---

## 1. Repository and current state

- Repository: `rmspvtltdsoftware/psametra-website`
- Repository ownership must remain with RMS. **Do not create a new personal repo.**
- Working/default branch: `codex/psametra-site`
- Audited base commit before this handoff: `698002c3faceb877faafd894a671271949bf1940`
- That commit message: `Ignore local Vercel project metadata`
- Connected personal GitHub identity requested for future pushes: `msaad9632`
- Production: `https://psametra-website.vercel.app/`
- Vercel project: `psametra-website`
- Latest production deployment before this handoff was `READY` and built from commit `698002c3faceb877faafd894a671271949bf1940`
- Vercel project framework: Next.js
- Vercel Node version observed: 24.x
- No website implementation from the premium-upgrade plan had been made before this handoff.
- This `HANDOFF.md` is the only file being added by the current ChatGPT session at the user’s explicit request. No website code, deployment, or Vercel setting is being changed in this handoff step.

### Confirmed product decisions

- Default theme follows the visitor’s **system theme**.
- Keep the existing manual theme switch.
- Desktop scrolling should use a **gently eased glide**.
- Touch/mobile scrolling stays native.
- Contact uses a real email link/draft with **no backend**.
- Contact address: `rmspvtltd.software@gmail.com`
- Pushes should be made using Saad’s personal GitHub identity `msaad9632` to the existing RMS repository.
- Repository ownership remains RMS.
- Keep the existing routes, core concepts, logo assets, and honest status of existing project concepts.
- Do not invent client outcomes, executive titles, launch claims, or other unsupported business claims.

---

## 2. Current audit and scores

**Overall premium feel: 6.5/10. Target: 9/10.**

The site has a fast, clean foundation. Biggest weaknesses are repetitive composition, modest typography, small project presentations, generic About content, weak contact experience, and slow/underdeveloped navigation/scroll choreography.

| Area | Current /10 | Main observation |
|---|---:|---|
| Homepage hero | 6.5 | Clear, but isolated logo feels more like a placeholder than a signature composition |
| Typography | 6.5 | Desktop hero around 66px; scale contrast is limited |
| Spacing and alignment | 7 | Consistent grid but insufficient variation between sections |
| Brand identity | 7 | Eclipse geometry is recognizable and worth retaining |
| Color restraint | 7 | Blue headline lines and large blue marks weaken its rarity |
| Section pacing | 5.5 | Dark mode looks similar throughout; light mode alternates predictably |
| Services | 6 | Readable but visually repetitive |
| Work presentation | 6 | Small diagrams and boxed previews lack impact |
| About | 5 | Generic company story; neither founder appears |
| Contact experience | 4 | Placeholder email; no usable enquiry destination |
| Header/navigation | 7 | Restrained, with an active-state bug |
| Footer | 5 | Functional, without a memorable closing composition |
| Mobile presentation | 6.5 | Generally readable; intermittent horizontal overflow |
| Hover interactions | 7 | Sensible distances, but some motion changes layout |
| Page transitions | 6 | Distinctive idea; approximately one second feels slow |
| Scroll choreography | 4 | Ambient orbits exist; composed section entrances do not |
| Accessibility | 8 | Good foundation; manual checks found issues beyond homepage automation |
| Mobile initial-load performance | 9.7 | Lighthouse 97/100 |
| Desktop initial-load performance | 10 | Lighthouse 100/100 |

### Performance baseline from previous audit

Fresh PageSpeed/Lighthouse results from the previous audit:

- Mobile: first content about 0.9s, largest content about 2.3s, blocking time about 20ms, layout shift 0.
- Desktop: largest content about 0.3s, blocking time about 10ms, layout shift 0.
- Homepage automated accessibility, best practices, and SEO: 100/100.

These were single-run lab results. Real-user performance data and a measured animation frame-rate trace were not available.

---

## 3. Known issues to address

1. **Navigation delay:** about 440ms elapsed before routing starts; complete transition roughly 980ms. Destination loading should begin earlier and compatible stages should overlap.
2. **Active navigation bug:** direct visits such as `/services/` lose active highlighting because pathname comparisons handle trailing slashes inconsistently.
3. **Mobile overflow:** the rotating orbital graphic can intermittently extend the page sideways. Decorative animation should be locally contained and a complete rotation verified.
4. **History behavior:** eclipse transition is applied to same-page Back navigation. Browser Back/Forward should remain native, and interrupted transitions should cancel cleanly.
5. **Contact:** replace `hello@psametra.example` with `rmspvtltd.software@gmail.com`. Reject whitespace-only names/descriptions before preparing an email draft.
6. **Contrast/polish:** dark-theme blue buttons were around 3.96:1 contrast with small white text. Fix control colors, remove padding-based hover motion, and eliminate extra dimming after page reveal.

### Verification already completed before handoff

- All six existing tests passed.
- Current Vercel production build succeeded.
- TypeScript checks succeeded.
- No application console errors appeared during the reviewed flows.
- Local lint/build was not freshly verified because dependencies were absent in that audit environment.

---

## 4. Implementation plan

Implement in reviewable stages:

1. shared visual system + homepage
2. navigation + motion
3. internal pages + About + Contact
4. complete verification/performance/accessibility pass

Do not expand this into a different product or architecture unless Saad explicitly asks.

### Stage 1 — visual system and homepage

- Preserve existing routes, navigation, logo assets, project concepts, and core messaging.
- Update About and Contact details exactly as approved.
- Keep **system theme** as the default while retaining the manual theme switch.
- Visual palette direction:
  - near-black `#050505`
  - off-white `#F7F7F5`
  - restrained grays
  - Neptune blue `#306CFE` as a small accent rather than an everywhere-color
  - use accessible variants where text or controls require it
- Increase hero typography toward:
  - **96–128px desktop**
  - **64–88px tablet**
  - **42–56px mobile**
  - responsive sizing and intentional line wrapping
- Body copy should generally be 16–18px.
- Meaningful labels should generally be at least 11px.
- Create an **asymmetric hero** using oversized typography and a large cropped abstract eclipse.
- Use CSS/SVG depth, a faint rim, and extremely slow ambient movement.
- Keep the headline immediately readable.
- Aim for a deliberate page sequence rather than repetitive equal sections:
  - theme-aware hero
  - dark statement
  - dark capabilities
  - dark work
  - off-white approach section
  - dark closing invitation/footer
- Replace the homepage’s three equal project cards with one broad lead project and two secondary previews.
- Keep all existing concept labels and destinations.
- Redesign the footer as a spacious closing composition with:
  - large **PSAMETRA** wordmark
  - cropped eclipse geometry
  - compact navigation
  - real RMS contact address

### Stage 2 — smooth motion and navigation

#### Desktop glide

- Use **Lenis only** for the selected desktop glide.
- Enable it for fine-pointer desktop interaction.
- Starting tuning point from the audit: `lerp: 0.12` with normal wheel distance.
- Keep touch scrolling native.
- Disable scroll smoothing when `prefers-reduced-motion` is enabled.
- Use one scroll owner and one animation-frame loop.
- Coordinate scrolling with the existing transition provider and mobile dialog.
- Cancel inertia before navigation and restore scrolling after completion/cancellation.
- Preserve:
  - anchors
  - sticky navigation
  - keyboard scrolling
  - browser history
  - native scrolling inside form controls
- Do not stack CSS smooth scrolling on top of Lenis.

#### Section entrances

- Reveal selected content groups once using roughly:
  - 16px upward movement
  - opacity fade
  - about 450ms duration
  - small grouped delays
- Content must stay visible if JavaScript fails.
- Reduced-motion users should get content without translation/rotation-heavy animation.

#### Ambient motion

- Retain slow orbital movement.
- Pause ambient animation outside the viewport where appropriate.
- Clip decorative overflow inside the artwork so it cannot create horizontal page scroll.

#### Page transition target

Shorten the eclipse transition to about **620ms**:

- ~80ms cover
- ~220ms rotation concurrent with destination loading
- ~320ms split reveal

Begin destination loading earlier. Wait for the correct destination before revealing. Integrate actual content arrival with the reveal instead of delaying routing unnecessarily.

Reduced-motion version should use brief fades without rotation, translation, or eased scrolling.

Hover interactions should generally remain around **180–220ms** with roughly 4–8px of movement.

### Animation framework decision

Previous audit conclusion:

- Lenis fits the requested desktop glide.
- Motion and React Three Fiber were reviewed as references.
- This version does **not** need an additional animation framework or an interactive 3D scene.
- The user mentioned high-end 3D inspiration (for example, planets orbiting a sun) only as inspiration for premium feel, **not as an instruction to build that specific effect**.

---

## 5. Internal pages

### Services

- Retain all four services and their current descriptions.
- Replace repetitive card-like presentation with more editorial/open rows.
- Use restrained monochrome diagrams such as:
  - software architecture
  - information flow
  - responsive frames
  - resolving layout geometry

### Work

- Enlarge project previews into roughly 16:10 editorial compositions.
- Increase project-title scale.
- Reduce heavy enclosing borders/boxes.
- Preserve the current projects and their honest concept/prototype status.
- Do not imply unlaunched work is a shipped client success.

### About

Position Psametra as the software company Saad and Rafay are building, focused on software products, business systems, and websites.

Present two equal founder profiles with portfolio links:

- **Muhammad Saad** — software engineering, AI/ML, and backend systems
  - Portfolio: `https://muhammadsaad-portfolio.vercel.app/`
- **Abdur Rafay Khan** — full-stack development, interfaces, and product delivery
  - Portfolio: `https://abdur-rafay-khan-portfolio.vercel.app/`

Keep the About presentation typographic/editorial.

Do **not** invent:

- executive titles not approved by the user
- client outcomes
- portraits
- claims that Raaziq or another concept has launched
- unsupported revenue/customer metrics

### Contact

- Use a large invitation with fewer competing text blocks.
- Use a simple line-based form.
- Configure `rmspvtltd.software@gmail.com`.
- Provide a clickable email address.
- Provide an **Open email draft** action.
- No backend/database is required.
- Retain brief download as a fallback.
- Never claim an enquiry was sent if the site only opens a mail draft.
- Reject whitespace-only values before preparing the draft.

### Interface/architecture constraints

- Retain static export and existing URLs.
- Extend shared content data with founder profiles where appropriate.
- Reuse existing contact-email configuration where appropriate.
- No backend.
- No database.
- No checkout.
- No new public API.

---

## 6. Testing and delivery plan

Before implementation, inspect the actual installed Next.js version/docs and current repo configuration rather than assuming old framework behavior.

Establish fresh results for:

- dependency install
- lint
- typecheck
- existing tests
- production build

### Responsive matrix

Test all pages at approximately:

- 320px
- 375px
- 390px
- 430px
- 768px
- 1024px
- 1280px
- 1440px
- 1920px

Test both themes and complete orbital rotations.

### Interaction/history coverage

Verify:

- direct refresh on every route
- active-link highlighting
- cross-page anchors
- same-page Back/Forward
- browser Back/Forward behavior
- rapid navigation
- interrupted transition cleanup
- slow destination loading
- mobile menu closure
- focus restoration
- reduced motion
- keyboard navigation/scrolling

### Contact/accessibility coverage

Verify:

- keyboard access
- visible focus
- readable contrast
- whitespace validation
- email-draft URL encoding
- brief download without pretending an enquiry was sent

### Motion/performance coverage

- Record scrolling and transition traces on desktop.
- Test an emulated mid-range phone.
- Target stable 60fps without recurring animation-induced long tasks.
- Repeat Lighthouse with comparable settings.
- Targets:
  - mobile performance **>=95**
  - desktop performance **>=99**
  - LCP **<=2.5s**
  - CLS **<=0.05**
  - preserve the current speed wherever possible
- Real-user INP <=200ms remains a field target when sufficient traffic data exists.

---

## 7. Push/deployment workflow

**Do not silently push or deploy. Ask Saad first, except for the mandatory end-of-session handoff update once the user has already authorized ongoing implementation work.**

Recommended sequence after each reviewable stage:

1. implement only the approved stage
2. run relevant tests/checks
3. show Saad a concise diff/change summary and test results
4. ask whether to push the implementation changes
5. if approved, push using `msaad9632` to the existing RMS repository
6. verify the resulting Vercel preview/deployment state
7. show Saad the preview/result
8. ask before any production promotion or other production-impacting action that is not already automatically tied to the approved push

### End-of-session exception for continuity

Once Saad has approved a working session/implementation scope, the AI is explicitly instructed to **update, commit, and push `HANDOFF.md` before it stops or before its usage/context limit ends**, even if no further product-code push is approved. This exception is only for the handoff file and exists so the next AI is never left without current state.

Do not create another repository under Saad’s personal account.

---

## 8. Priority order for the next AI

When Saad authorizes implementation, continue from the actual repository state rather than rebuilding blindly.

Suggested first actions:

1. Read this `HANDOFF.md` completely.
2. Confirm current branch and HEAD because this file itself creates a new commit after the audited base commit.
3. Inspect current source structure and installed dependencies.
4. Compare actual source with the audit findings.
5. Present the exact files/components proposed for **Stage 1** before editing if Saad has not already approved implementation.
6. If Saad approves Stage 1, implement visual system/homepage only.
7. Verify locally/build/test.
8. Report results and ask before pushing implementation changes.
9. Continue stage-by-stage through motion/navigation, internal pages, then full verification.
10. **Before ending the session or reaching the model limit, update and push this HANDOFF.md with everything completed and remaining.**

---

## 9. Context from previous session

The previous audit reviewed:

- the live website
- all five routes
- Saad’s and Rafay’s public portfolios
- desktop/mobile layouts
- source code
- Vercel build records

The visual goal is **premium, restrained, smooth, and memorable**, not animation for animation’s sake. Loading time should remain minimal and scrolling/transition animation should feel smooth.

The user explicitly requested that major areas be scored out of 10 and that premium feel should improve from the current roughly 6.5/10 toward 9/10 without sacrificing performance.

The company context is software-focused: Saad and Rafay intend to sell software, business systems such as logistics-style software, and websites.

---

## 10. Current handoff status

At the moment this file is created:

- Premium-upgrade website implementation: **not started**
- Handoff documentation: **created in this commit**
- Website code changed by current ChatGPT session: **none**
- Vercel changed by current ChatGPT session: **none**
- Production deployment intentionally changed by current ChatGPT session: **none**
- Next step requires Saad’s explicit approval.
