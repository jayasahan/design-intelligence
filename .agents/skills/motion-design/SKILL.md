---
name: motion-design
description: Plan and implement meaningful UI animation, scroll effects, or interactive 3D. Use when a task explicitly needs transitions, motion, microinteractions, scroll storytelling or 3D.
---

# Motion design

1. State what motion communicates: hierarchy, state change, causality, navigation, or user feedback. Remove gratuitous effects.
2. Read `.design-intelligence/references/animation-decision-matrix.md`. Choose CSS/WAAPI for simple effects; Motion for React-native UI spring/layout/gesture; GSAP for complex scroll/timelines; Three.js/R3F for genuine 3D; Rive/dotLottie for authored assets, subject to licensing and platform support.
3. Detect the actual framework and installed packages; verify up-to-date official APIs and avoid mixing redundant animation engines.
4. Establish duration, easing, delay, interruption, scroll behavior, low-power fallback and resource-loading plan. Make transitions non-blocking.
5. Respect `prefers-reduced-motion` and accessible alternatives (often opacity or none); disable parallax/large-scale transformations when requested by system preferences.
6. Audit smoothness, layout thrash, bundle size, input responsiveness and usability with motion disabled.

## Output

A motion specification, chosen technique with tradeoffs, implementation and fallback behavior.

## Avoid

Auto-playing disruptive animation, scroll-hijacking, motion that hides needed content, and large 3D engines for simple button hover.
