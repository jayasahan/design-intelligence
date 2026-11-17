---
name: design-system-selector
description: Evaluate and select UI component libraries, headless primitives and styling approaches. Use when choosing a design system, migrating components, or reviewing frontend dependency fit.
---

# Design system selector

1. Determine framework and target runtimes **before** listing candidates. Detect existing component APIs and styles; prefer compatible reuse over framework migration.
2. Read `.design-intelligence/references/component-systems.md` and check official documentation for current compatibility and API changes when available.
3. Compare only viable candidates across: accessibility behavior, customizability, developer experience, bundle cost, responsiveness, maintenance, license, native/web compatibility, component coverage, and lock-in.
4. Distinguish a fully styled library (MUI/Mantine/etc.), source-code distribution (shadcn/ui), headless behavior primitives (Radix/React Aria/Base UI), and styling utilities (Tailwind/CSS).
5. Propose one primary component strategy plus at most two alternatives and explicit reasons not to choose the others.
6. Record decisions and versions in the project `design-profile.yaml`; do not install anything until the user accepts the proposed architectural change or the request clearly authorizes it.

## Output

Small decision table, recommendation, tradeoffs, dependencies to add/remove, and impact on existing code.

## Avoid

Selecting React-only packages for Vue/Flutter/native targets; adding multiple overlapping primitives without need; assuming every visual style requires a particular library.
