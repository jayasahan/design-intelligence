# Architecture — v1

```text
Codex / compatible agent
    | discover SKILL.md descriptions
    v
Focused workflow skills (.agents/skills)
    | read only relevant references
    v
Design references + profiles + typed tokens (.design-intelligence)
    | implement *in the target project*, not here
    v
Accessible UI + browser QA + evidence
```

Repository skills and resources are versioned together. `scripts/install.py` installs both into a target repo. The target's original `AGENTS.md` remains untouched. This helps cross-project portability and avoids broken relative paths.

Profiles express intent rather than executable configuration. Design tokens model semantic roles with the DTCG 2025.10 JSON shape, but application-specific CSS/React Native/Flutter generators and complete DTCG certification are out of scope in v1.

Do not rely on the agent automatically activating every skill. Measure selection quality using `docs/evaluation-plan.md`. Native Codex and VS Code Copilot have different project skill lookup defaults; see README.
