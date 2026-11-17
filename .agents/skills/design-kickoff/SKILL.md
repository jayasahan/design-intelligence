---
name: design-kickoff
description: Create an actionable UX design brief and project design profile. Use at the start of a new UI project, redesign, or major new user journey; do not use for a simple component fix.
---

# Design kickoff

## Inputs

Existing repository, user goal, target users, platform(s), constraints, and any existing brand/design direction.

## Procedure

1. Inspect the current project: stack, dependencies, routing, UI patterns, user journeys and existing docs. Avoid creating a new framework when one already exists.
2. Identify user type, primary tasks, success criteria, information hierarchy, content needs, device contexts and accessibility requirements. Make assumptions visible.
3. If a key product detail is missing, ask for it when needed; otherwise proceed with labeled assumptions and alternatives.
4. Suggest two or three design directions with experience-level tradeoffs, not just a mood board. Confirm the intended direction before costly implementation when possible.
5. Create `docs/design-brief.md` using `.design-intelligence/templates/design-brief.md` and draft `design-profile.yaml` using the schema and appropriate example in `.design-intelligence/profiles/`.
6. Note unknowns and risks; request a decision before replacing an existing design system or installing major dependencies.

## Output

A short user-journey description, design goals, component/system constraints, preferred direction, acceptance criteria, and files to create/change.

## Boundaries

Do not install packages or generate a full application solely from this skill. Hand over to `design-system-selector` and `visual-design-architect` when needed.
