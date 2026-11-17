# Agent instructions — Design Intelligence

This repository distributes cross-agent UI/UX skills, design knowledge, and profiles. It is not itself a frontend application.

- Before editing, inspect only files relevant to the request. Prefer small, maintainable changes over expanding all skills.
- Keep Agent Skills under `.agents/skills/<skill-name>/SKILL.md` using spec-compliant `name` and specific `description` frontmatter.
- Keep actionable workflows in skills; keep comparisons, official sources, and large reference material in `.design-intelligence/references/`.
- Treat profiles as configurable examples, never as a mandate to install specific libraries. Do not overwrite consumers' existing code or instructions.
- When changing profiles or token documents, run `python scripts/validate.py` and `python -m unittest discover -s tests -v` (install `requirements-dev.txt` first).
- For research claims, prefer official upstream documentation; record URLs and checked date. Distinguish fact, judgment, version-dependent notes, and unverified claims.
- Do not claim accessibility compliance from automated scans alone. Respect WCAG 2.2 AA, keyboard navigation, focus, responsive behavior, and reduced-motion preferences.
- Never copy proprietary design-system implementations, unlicensed imagery, or third-party source code into this repository.
- Do not introduce a custom MCP server unless a concrete external-tool need cannot be served by existing integrations.
