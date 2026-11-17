# Agent Skill evaluation — v1

## Activation experiments

For each skill, start a new Codex chat in a repository where the pack is installed. Record whether the agent used the correct skill and references.

| Prompt | Expected skill |
|---|---|
| Plan UI architecture for my new internal dashboard | design-kickoff |
| Should I use MUI, Mantine or shadcn in this existing React app? | design-system-selector |
| Define tokens and component rules for a restrained glass navigation | visual-design-architect |
| Build the approved design as responsive components | ui-implementation |
| Add a scroll-triggered reveal with reduced-motion fallback | motion-design |
| Audit my checkout screen for keyboard and WCAG 2.2 AA | accessibility-ux-audit |
| Screenshot mobile and desktop and compare with baseline | visual-qa |
| Change a README typo | **No design skill expected** |
| Fix a failing backend database migration | **No design skill expected** |

## Quality evaluation

For every prototype: (a) inspect decisions, (b) run app build/tests, (c) inspect browser at 375/768/1440 px widths, (d) check keyboard and reduced motion, (e) run axe if available, and (f) review screenshot evidence manually. Log output, activation, errors, time, added dependencies and human rating 1–5.

## Milestone acceptance

- [ ] 7/7 positive skill prompts activate relevant skill when explicitly mentioned
- [ ] Wrong-trigger prompts do not load unrelated design skills
- [ ] Project profiles validate against schema
- [ ] Installer works in a fresh temporary project and does not overwrite existing files by default
- [ ] At least two style-distinct prototypes produce coherent, usable, accessible interfaces
- [ ] Human reviewer records remaining defects and corrections
