# Accessibility and visual QA — WCAG 2.2 AA target

Official criteria: https://www.w3.org/TR/WCAG22/

## Manual review checklist

- **Content:** headings, reading order, readable copy, meaningful link text, zoom/reflow, responsive long strings.
- **Keyboard:** visible focus, logical order, dialogs with focus trapping and restoration, menus and form controls operable without a mouse.
- **Forms:** labels, instructions, actionable error text, validation feedback, no reliance on color alone.
- **Touch:** adequate target size/spacing, usable gestures and device orientations.
- **Color:** test contrast on actual rendered backgrounds, including dynamic imagery and translucent glass, plus high-contrast modes where supported.
- **Motion:** reduced-motion fallback; no blocking or essential information only in animation; pause/stop controls where appropriate.
- **System state:** loading, empty, error, timeout, offline and completed actions, all announced appropriately when necessary.
- **Assistive tech:** meaningful alt text, screen-reader semantics, announcements and keyboard navigation.

## Automated tools

- Playwright tests for journeys and viewport coverage: https://playwright.dev/docs/intro
- Playwright visual snapshots `expect(page).toHaveScreenshot()` use a stable OS/browser environment: https://playwright.dev/docs/test-snapshots
- axe-core through `@axe-core/playwright`: https://playwright.dev/docs/accessibility-testing
- Lighthouse for performance-related issues: https://developer.chrome.com/docs/lighthouse/overview

**Automation is partial**: a passing axe or Lighthouse run is *not* WCAG certification. Capture manual test evidence, browser versions, failures, and what was not tested.

## Expected reporting

| Issue | Evidence | Severity | Fix | Verified? |
|---|---|---|---|---|
| Example: focus ring invisible on glass | tab to floating menu at 375 px width | High | accessible focus treatment | Not tested |
