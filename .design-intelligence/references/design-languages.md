# Visual-language reference

A **design language/system** has interaction, layout, content and accessibility guidance. A **style** (e.g. glassmorphism) is primarily a visual vocabulary and is not UX guidance by itself.

| Direction | Useful patterns | Risks / guardrails | Reference |
|---|---|---|---|
| Apple-inspired Liquid Glass | floating control layer, clear content surfaces, depth/legibility | do not glassify body content or mistake a CSS imitation for native OS implementation | https://developer.apple.com/design/human-interface-guidelines/materials |
| Material Design | deliberate hierarchy, color roles, components, motion guidance | do not assume all web MUI packages are automatically Material 3 | https://m3.material.io/ |
| Fluent | quiet productivity UI, layered surfaces, adaptive interaction | do not mix Microsoft desktop behavior indiscriminately into mobile | https://fluent2.microsoft.design/ |
| Neobrutalism | bold contrast, thick borders, hard offset shadows, expressive typography | avoid small low-contrast text and excessive density | design interpretation, not formal standard |
| Cyberpunk / neon | dark foundations, controlled bright accents, geometric details | glow must never be the only way to read text/focus | design interpretation, not formal standard |
| Editorial / Swiss minimalism | typography, clear grids, whitespace and content priority | minimal controls still need clear affordances | design interpretation, not formal standard |
| Neumorphism | subtle raised and inset surfaces | low contrast and poor affordances; use sparingly | design interpretation, not formal standard |
| Bento-grid layouts | information-card hierarchy and modular rhythm | avoid arbitrary card sizes that hide hierarchy | layout pattern, not a full design system |

For each direction, deliver semantic tokens, typography system, spacing scale, component states, responsive rules and accessibility review. Validate the *design*, not just the effect.
