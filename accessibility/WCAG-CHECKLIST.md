# WCAG 2.1 AA implementation checklist

This is an implementation checklist for the portfolio demonstration, not a conformance declaration. Items marked **Implemented** describe the current code and still benefit from evaluation in the rendered app. **Needs verification** means human or assistive technology review is outstanding.

## Perceivable

- [x] **1.1.1 Non-text Content (A):** decorative symbols are hidden from assistive technology; informative status is also conveyed in text. **Needs verification:** review every icon and rendered name.
- [x] **1.3.1 Info and Relationships (A):** landmarks, headings, labels, fieldsets/legends, table captions and scoped column headers use native semantics.
- [x] **1.3.2 Meaningful Sequence (A):** content and controls follow DOM reading order.
- [x] **1.3.3 Sensory Characteristics (A):** instructions use text and labels rather than visual position or color alone.
- [x] **1.4.1 Use of Color (A):** status and priority are written labels, with supplemental visual markers.
- [ ] **1.4.3 Contrast (Minimum) (AA):** axe-core reports no contrast violations in dashboard and create-dialog fixtures; complete measurements for all views and interaction states remain outstanding.
- [ ] **1.4.4 Resize Text (AA):** responsive CSS is present; verify browser zoom to 200% without loss of content/functionality.
- [ ] **1.4.10 Reflow (AA):** narrow responsive layouts are present; verify at 320 CSS px and at 400% zoom.
- [ ] **1.4.11 Non-text Contrast (AA):** verify focus, controls, and meaningful graphical indicators meet contrast requirements.
- [x] **1.4.12 Text Spacing (AA):** no fixed-height text containers are intentionally used; verify with WCAG text spacing overrides.
- [x] **1.4.13 Content on Hover or Focus (AA):** no additional hover/focus popovers are used.

## Operable

- [x] **2.1.1 Keyboard (A):** native buttons, links, inputs, selects, and textareas support keyboard operation; table links and rows support Enter activation.
- [ ] **2.1.2 No Keyboard Trap (A):** no custom trap is intended; verify all overlays and mobile navigation in a keyboard-only pass.
- [x] **2.1.4 Character Key Shortcuts (A):** no single-character shortcuts are implemented.
- [x] **2.4.1 Bypass Blocks (A):** visible-on-focus skip link moves to main content.
- [x] **2.4.2 Page Titled (A):** document title identifies the service portal.
- [x] **2.4.3 Focus Order (A):** DOM order follows visual reading flow; verify after each interactive state change.
- [x] **2.4.4 Link Purpose (In Context) (A):** request links include IDs and detail action context.
- [ ] **2.4.7 Focus Visible (AA):** global high-contrast focus style exists; verify on each control/background.
- [x] **2.5.3 Label in Name (A):** controls use visible labels or matching accessible names.

## Understandable

- [x] **3.1.1 Language of Page (A):** document language is `en`.
- [x] **3.2.3 Consistent Navigation (AA):** workspace navigation remains in a consistent location.
- [x] **3.2.4 Consistent Identification (AA):** repeated actions and status treatments use consistent names.
- [ ] **3.3.1 Error Identification (A):** form submission gives a textual alert; field-specific error identification is incomplete.
- [ ] **3.3.2 Labels or Instructions (A):** visible labels, required markers, and supporting instructions are present; verify all fields and required states.
- [ ] **3.3.3 Error Suggestion (AA):** specific correction suggestions for invalid field values remain to be implemented.
- [ ] **3.3.4 Error Prevention (Legal, Financial, Data) (AA):** destructive delete is confirmed; no broader irreversible data workflow is implemented.

## Robust

- [x] **4.1.2 Name, Role, Value (A):** native controls are used; dynamic state uses native expanded/disabled attributes where applicable.
- [x] **4.1.3 Status Messages (AA):** success and informational feedback uses a polite live status; form-level error uses alert role.

## Dialog and focus review

Native semantics, Escape dismissal, initial focus, keyboard focus containment, and restoration to the invoking control are implemented. Their behavior and screen-reader announcement behavior remain **needs manual verification** before production use.
