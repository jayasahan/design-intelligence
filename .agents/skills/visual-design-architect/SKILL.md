---
name: visual-design-architect
description: Turn an agreed design direction into tokens, layouts, component rules and states. Use for style systems, theming, Liquid Glass, neobrutalism or other visual-language architecture.
---

# Visual design architect

1. Read the agreed brief/profile; identify the intended hierarchy and visual vocabulary, not just decorative motifs.
2. Read `.design-intelligence/references/design-languages.md` and relevant example profile. Use official platform guidance for native-style design.
3. Define semantic color roles, text hierarchy, spacing scale, radii, borders, surfaces, elevation, responsive grid and content density. Ensure light/dark modes if the product needs them.
4. Define controls in all states: default, hover, pressed, focus-visible, disabled, loading, error, selected, and empty. Define glass/3D effects as progressive enhancement, never the only cue.
5. Author or adapt typed design tokens in JSON using DTCG 2025.10 structure; keep implementation-specific mappings separate. Use `.design-intelligence/tokens/` as examples, not certified palettes.
6. Document component contracts and examples in `docs/design-system.md` for the target project; hand off to `ui-implementation`.
7. Verify sample foreground/background combinations and keyboard focus. The validator is structural, not a substitute for contrast and readability testing on actual surfaces.

## Output

Token definitions, typography, layout rules, responsive and state specifications, and a component inventory.

## Avoid

Applying Apple-inspired Liquid Glass to every content panel; overusing neon/glow; claiming platform-native fidelity for CSS replicas.
