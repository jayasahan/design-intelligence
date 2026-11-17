---
name: visual-qa
description: Verify implemented UI visually and functionally in a browser. Use for screenshot comparison, responsive inspection, regression testing and final design acceptance.
---

# Visual QA

1. Start the target app using its documented command and inspect the implementation against the approved brief/profile. If a browser is unavailable, state this limitation plainly.
2. Test key screens at small-phone, tablet, and desktop widths. Check overflow, clipping, typography, focus/hover states, loading, empty, error and keyboard-only flows.
3. Read `.design-intelligence/references/accessibility-and-qa.md`. When Playwright is available, create stable screenshots with consistent fonts, viewport, fixtures and browser environment. Use `toHaveScreenshot` for regression checks.
4. Test essential user actions, links, forms and navigation. Evaluate motion both with standard settings and reduced motion.
5. Capture evidence of defects and iterate; record remaining differences rather than asserting the UI looks correct without observation.
6. Summarize tested browsers/viewports, commands, screenshot paths, pass/fail and unresolved issues.

## Output

A reproducible visual QA report and changes backed by browser observations.

## Avoid

Comparing snapshots made on inconsistent platforms, treating screenshots as accessibility audits, or reporting fictional browser checks.
