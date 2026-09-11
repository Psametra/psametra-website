# Verification record

## Automated

- ESLint: passes.
- Strict TypeScript and Next route generation: pass.
- Production static export: passes; all five pages and a custom 404 are generated.
- Navigation tests cover external links, same-page anchors, query changes, and equivalent trailing slashes.
- Transition tests deliberately hold the route-commit promise, confirm reveal remains blocked, exercise reduced motion, and reject failed navigation without exposing stale content.
- Theme tests cover system light/dark, explicit preferences, invalid stored values, and denied storage before paint.
- Brief formatting preserves Unicode, multiline details, and optional company fields.

## Browser review

- Desktop homepage and Services: checked at 1440px in light and dark modes.
- Mobile homepage, Work, menu, and Contact: checked at 390px.
- About and header: checked at 320px, with no horizontal page overflow.
- The mobile menu exposes all four links, closes when following a route, and restores the normal page after transition.
- Native Back and Forward navigate correctly between Home and Work.
- Empty contact fields fail native validation; a completed sample brief reaches the download-ready status without sending data.
- Theme controls and reload persistence reviewed.
- Final browser console checked for application errors.

## Fixes made during review

- Scoped desktop navigation selectors to the header’s direct navigation child. The broad selector had also hidden navigation inside the mobile dialog.
- Closed the native dialog before beginning route motion so its top layer cannot obscure the eclipse.
- Added a stable scrollbar gutter to prevent page-width shifts while transitions lock scrolling.
- Matched route barriers to normalized destination paths and let native history interrupt abandoned transitions.
- Split prepaint theme configuration from its client component to avoid Fast Refresh boundary warnings.
- Prevented the narrow-screen header CTA from wrapping.

## Limits and launch configuration

The contact mailbox is an explicit placeholder until a verified address is configured. Direct server-side form delivery is not implemented. Concept studies are not real client case studies. Lighthouse scores and a physical mid-range mobile device were not measured. Reduced-motion ordering is covered in automated tests; OS-level motion settings were not changed during browser review.
