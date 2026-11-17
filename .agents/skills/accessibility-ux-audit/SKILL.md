---
name: accessibility-ux-audit
description: Audit UI usability and accessibility against WCAG 2.2 AA and core interaction heuristics. Use for review, pre-release checks, or after UI changes.
---

# Accessibility and UX audit

1. Read `.design-intelligence/references/accessibility-and-qa.md`; define the affected user journeys and WCAG 2.2 AA target.
2. Test keyboard-only access, visible focus, tab order, skip links, dialogs, forms, labels, errors, and screen-reader semantics. Test with real assistive technology when practical.
3. Check text and UI contrast, 200%+ zoom/reflow, touch targets, meaningful headings, language, error recovery, loading, responsiveness, reduced motion, and non-color-only cues.
4. Use axe-core/Playwright when available, but mark manual checks separately; passing automated scans does not certify compliance.
5. Report each issue with severity, user impact, reproduction steps, suggested fix, and verification method.
6. Fix only in-scope issues or offer a prioritized repair plan if asked for an audit only.

## Output

A severity-sorted audit of pass/fail/not-tested items, evidence, and actionable fixes.

## Avoid

Declaring WCAG conformance without substantive testing, relying solely on Lighthouse, or sacrificing keyboard/focus behavior for visual polish.
