---
name: ui-implementation
description: Implement UI components and responsive screens from an approved brief and design profile. Use during frontend component or page development, not for research-only requests.
---

# UI implementation

1. Read the target application's brief/profile and inspect its existing components, tests, router and styling system. Do not assume React.
2. Use semantic HTML/native controls where possible; prefer tested accessible primitives for dialogs, menus, keyboard navigation, and overlays.
3. Build from tokens and reusable components rather than one-off hardcoded colors or styling. Account for responsive navigation and touch input.
4. Implement functional states: loading, error, empty, success, disabled, focus, and validation. Never ship placeholder buttons that appear interactive but do nothing.
5. Use animation only when justified by the interaction; consult `motion-design` for nontrivial sequences.
6. Run the project's existing formatter/typecheck/test/build commands. Verify at mobile and desktop viewports in a browser when available.
7. Explain the actual files and packages changed, commands run, and any unverified behavior.

## Output

Working UI code in the target application and test results, with no surprise framework changes.

## Boundaries

Do not copy UI snippets or illustrations from unverified third-party sources without checking their licenses. Do not introduce React/GSAP/Three.js simply because they are listed in references.
