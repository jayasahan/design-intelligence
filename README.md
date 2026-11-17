# Design Intelligence v1.2.0

Portable **Agent Skills + research reference library + design profiles** for frontend coding agents.

**This is a skill repository, not a runnable web application.** It gives Codex reusable workflows for making UI/UX decisions, implementing interfaces, and verifying results. No third-party UI/animation packages are automatically installed.

## What ships in v1.1.0

- Seven focused Agent Skills in `.agents/skills/`
- Three example, nonbinding style profiles in `.design-intelligence/profiles/`
- Three example DTCG 2025.10-style design-token JSON files in `.design-intelligence/tokens/`
- JSON Schema for the project profile
- Research references, implementation decision matrices, UX and motion rules
- A cross-project installer and offline structural validator
- A safe installer, diagnostics CLI, and reproducible evaluation plan
- Unit tests and GitHub Actions validation
- A local React student-management playground with browser, responsive, screenshot, and axe-based evaluation coverage

## Quick start: the repository itself (Windows / VS Code + Codex)

1. Install Git and Python 3.10+ if needed; ensure Codex VS Code extension is installed and signed in.
2. In VS Code, open **Terminal > New Terminal** (PowerShell):

   ```powershell
   cd $HOME\Desktop
   git clone https://github.com/jayasahan/design-intelligence.git
   cd design-intelligence
   code .
   ```

3. Run validation:

   ```powershell
   py -m pip install -r requirements-dev.txt
   py scripts/validate.py
   py -m unittest discover -s tests -v
   ```

4. Open the **OpenAI Codex** extension in VS Code. Start a new chat, use `/skills` or type `$design-kickoff`, and ask: `Use $design-kickoff to plan a small React dashboard. Save the brief, but do not install dependencies.` Codex scans `.agents/skills/` in your opened repo.
5. Commit and publish, if this is your own fork:

   ```powershell
   git add .
   git commit -m "Bootstrap Design Intelligence v1"
   git push -u origin master
   ```

   If `git` or `py` is not recognized, install the missing program. If authentication fails, sign in to GitHub from VS Code or Git Credential Manager.

## Use the skills in another project

Run this from the **design-intelligence** repository root (the one holding `scripts/install.py`), or follow the [quickstart](docs/quickstart.md):

```powershell
py scripts/install.py --target "C:\path\to\your-project" --dry-run
py scripts/install.py --target "C:\path\to\your-project"
```

The installer merges only the seven skill folders and shared `.design-intelligence/` resources. It preserves `AGENTS.md`, `.github`, source code, and unrelated skills. Identical files are skipped. Conflicts are reported before any change; use `--force` only when replacement is intended—replaced files are copied to a timestamped `.design-intelligence-backups/` directory. A dry run never changes the target. To update, run the same command again and review conflicts before choosing `--force`.

Run diagnostics against the source tree or an installed project:

```powershell
py scripts/doctor.py
py scripts/doctor.py --target "C:\path\to\your-project"
```

The doctor checks Python 3.10+, required packages, seven skill manifests, profiles, and token references. It exits nonzero when a problem is found.

### Codex discovery / multiple agents

- **Codex native extension:** repo-local `.agents/skills/`; user-wide `$HOME/.agents/skills/`.
- **Antigravity:** workspace `.agents/skills/`.
- **GitHub Copilot:** location support varies by harness and version. VS Code docs identify `.github/skills/` as the primary Copilot project location; copy/sync the skills there if needed. Do not maintain two independently edited copies.
- **AGENTS.md:** instructions scoped to this repository. Copy or adapt them separately if needed; not installed automatically into other projects.

## Layout

```text
.agents/skills/             7 focused SKILL.md workflows
.design-intelligence/
  profiles/                 style and implementation preferences (YAML)
  schemas/                  JSON Schema for profiles
  tokens/                   sample typed DTCG-format token documents
  references/               research, comparisons, QA and accessibility
  templates/                design brief and project profile starter
scripts/install.py          merge capabilities into another repository
scripts/validate.py         structural and schema checks
scripts/doctor.py           installation diagnostics
tests/                      installer and diagnostics tests
.github/workflows/          validate on push and pull request
```

## Constraints

A style name **does not choose** a framework or library automatically. The agent must inspect the actual target project, explain tradeoffs, respect its architecture, and propose changes before adding dependencies. Native Apple Liquid Glass is not a web component library; web lookalikes are approximations. Accessibility needs both automated and manual checking.

## Research and limitations

See [research notes](.design-intelligence/references/research-2026-11.md) for official links, scope, and outstanding validation. Profiles and token values are illustrative starting points, **not** pre-audited production brand palettes. This repository has structural tests; it has **not** been subjected to a real human UX study or verified in all three coding agents.

## Agent Skills, project instructions, and MCP

Agent Skills are discoverable, reusable workflows in `.agents/skills/<name>/SKILL.md`; an agent selects a relevant skill from its metadata and reads its instructions. `AGENTS.md` contains project-specific instructions and remains owned by the target project. MCP is a protocol for connecting an agent to external tools or data; installing these skills does not install or require an MCP server. See [the v1.1.0 evaluation plan](docs/evaluations/v1.1.0-test-plan.md) for discovery tests and evidence recording.

## Tests

Install development dependencies, then run `py scripts/validate.py`, `py -m unittest discover -s tests -v`, and `py scripts/doctor.py`. If `py` does not resolve to Python 3.10+, use an explicit Python 3 executable. Tests use temporary directories and do not access the network.

### Student dashboard playground

The isolated example in [`examples/student-dashboard/`](examples/student-dashboard/) is a React + TypeScript + Vite application using MUI Core and MUI X Data Grid Community. It has its own package manifest and lockfile, and does not turn the repository root into a frontend application.

```powershell
cd examples/student-dashboard
npm install
npx playwright install chromium
npm run dev
```

For verification, run `npm run typecheck`, `npm run build`, and `npm test`. The v1.2.0 implementation and evidence log live in [`docs/evaluations/v1.2.0-playground-report.md`](docs/evaluations/v1.2.0-playground-report.md).

## License

MIT — see [LICENSE](LICENSE). External libraries, assets, code samples, and design systems retain their own licenses. This repository does not redistribute their code or logos.
