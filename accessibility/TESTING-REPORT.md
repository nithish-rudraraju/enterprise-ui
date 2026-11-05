# Accessibility testing report

**Status:** implementation evidence is partial. This report records only checks actually executed. It does not certify WCAG 2.1 AA conformance.

## Automated checks performed

- `npm run build` — passed. This also runs Angular's production TypeScript/template compilation with strict template checking.
- `npm run test:accessibility` — passed in Chrome Headless 156.0.0.0; 5 Jasmine checks passed.
- axe-core 4.14 WCAG 2.1 A/AA rules — zero violations in the initial dashboard and create-request dialog fixtures. This scan does not cover every view, responsive breakpoint, or interaction state.
- Unit workflow tests — request counts and filters, status persistence, and request creation persistence passed.

## Manual checks performed

- Source-level review of semantic landmarks, form labels, table semantics, focus styling, status text, dialog Escape handling, focus trapping/restoration logic, and responsive rules during implementation.
- No full interactive manual keyboard, screen reader, zoom, or mobile check has been completed.

## Checks not yet performed

- Full keyboard-only walkthrough, including dialog containment/restoration, Escape, mobile navigation, and filtered empty results.
- Screen reader checks with NVDA, JAWS, VoiceOver, or TalkBack.
- Contrast measurement across default, hover, focus, and disabled states.
- Browser zoom 200%, reflow at 320 CSS px / 400% zoom, text spacing overrides, and mobile device checks.
- Unit tests for request CRUD, sorting/filtering/pagination, and persistence.

## Known accessibility limitations

- Dialog initial focus is moved to the first field, and Escape closes it, but focus containment/restoration is not fully implemented or verified.
- Form validation currently reports missing required values in a form-level alert; field-level error association and email-specific inline messaging are incomplete.
- Table sorting buttons work, but sort direction is not exposed through `aria-sort` on column headers.
- The axe-core scan covers only dashboard and create dialog fixtures. Do not describe this demo as WCAG certified or fully conformant.
