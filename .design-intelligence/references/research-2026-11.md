# Research notes — 2026-11-17

## Scope / research method

Source priority: official specification/vendor documentation, not popularity lists or screenshots of promotional sites. These notes describe *why* options belong in the catalog and *when not to use them*. Versions and capabilities must be rechecked at implementation time. This is a researched starter, not an exhaustive industry benchmark or independent security/benchmark study.

| Topic | Finding for v1 | Primary documentation |
|---|---|---|
| Open Agent Skills | `SKILL.md` must have valid `name`/`description`, with one purpose per skill; use progressive disclosure | https://agentskills.io/specification |
| OpenAI Codex | Scans repo `.agents/skills` and user `~/.agents/skills`; `$skill-name` explicit invocation | https://learn.chatgpt.com/docs/build-skills |
| Codex `AGENTS.md` | Repo instructions are useful but should stay small | https://developers.openai.com/cookbook/examples/codex/iterating-development-workflows-with-codex |
| VS Code / Copilot | Portable skill format, but skill location depends on harness | https://code.visualstudio.com/docs/agent-customization/agent-skills |
| Antigravity | Supports `.agents/skills` workspace-local folder | https://antigravity.google/docs/skills |
| DTCG tokens | 2025.10 is a stable Community Group report, **not a W3C Recommendation**; color values are objects with color space/components | https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/ |
| Liquid Glass | Apple advises applying the glass layer to navigation/controls rather than the general content layer | https://developer.apple.com/design/human-interface-guidelines/materials |
| shadcn/ui | Source-code distribution and open components, **not** a prebuilt npm runtime UI library | https://ui.shadcn.com/docs |
| Motion | Strong React choice for gesture, spring, layout and UI transitions; reduced-motion hooks supported | https://motion.dev/docs/react |
| GSAP | ScrollTrigger supports complex scroll-bound effects; avoid for simple styles | https://gsap.com/docs/v3/Plugins/ScrollTrigger/ |
| Playwright | Screenshot regression supported; snapshots vary by machine/browser/OS; baseline environments must match | https://playwright.dev/docs/test-snapshots |
| Playwright accessibility | Works with axe-core; automated scans cannot detect all accessibility issues | https://playwright.dev/docs/accessibility-testing |
| WCAG 2.2 | Target AA, with manual keyboard/focus/reflow/contrast checks | https://www.w3.org/TR/WCAG22/ |
| Figma MCP | Read design context and optionally write Figma content with appropriate client permissions | https://developers.figma.com/docs/figma-mcp-server/ |
| Context7 | Fetch version-specific external-library documentation with MCP or CLI + skill | https://github.com/upstash/context7 |
| Playwright MCP | Browser automation via accessibility snapshots, separate from Playwright Test visual baselines | https://github.com/microsoft/playwright-mcp |

## Decision-level synthesis

- *Choose by platform and requirements*, not by a visual trend. A React-only primitive is inappropriate for a Flutter app.
- *Favor accessible interaction behavior*: headless foundations help when exact visual branding is needed, while complete UI systems help for enterprise speed and consistency.
- *Animation has a cost*: CSS/WAAPI first for trivial interactions; add advanced runtimes only for specific use cases.
- *Separate tokens from styling implementations*: profiles express intent; output adapters for CSS/SwiftUI/Flutter are future work.
- *A screenshot is evidence, not design quality*: use workflow tests plus qualitative review.

## Open questions / deferred v1 scope

- Empirical comparison of library bundle size, maintenance and long-term support using a standardized test app.
- Human evaluation of component usability and brand fit for each profile.
- Consistent official theme packages for Material 3 across distinct frameworks.
- Automated DTCG specification conformance via a specialist parser (this package uses representative structural checks only).
- Figma, Context7, Playwright MCP integration and optional plugin packaging after skill activation tests.

## Maintenance rule

When updating a library reference, log the checked date and official URL and note breaking changes or version constraints. Do not freeze API installation commands in Agent Skills.
