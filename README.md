# Design Intelligence v1

Portable **Agent Skills + research reference library + design profiles** for frontend coding agents.

**This is a skill repository, not a runnable web application.** It gives Codex reusable workflows for making UI/UX decisions, implementing interfaces, and verifying results. No third-party UI/animation packages are automatically installed.

## What ships in v1

- Seven focused Agent Skills in `.agents/skills/`
- Three example, nonbinding style profiles in `.design-intelligence/profiles/`
- Three example DTCG 2025.10-style design-token JSON files in `.design-intelligence/tokens/`
- JSON Schema for the project profile
- Research references, implementation decision matrices, UX and motion rules
- A cross-project installer and offline structural validator
- Unit tests and GitHub Actions validation

## Quick start: the repository itself (Windows / VS Code + Codex)

1. Install Git and Python 3.10+ if needed; ensure Codex VS Code extension is installed and signed in.
2. In VS Code, open **Terminal > New Terminal** (PowerShell):

   ```powershell
   cd $HOME\Desktop
   git clone https://github.com/jayasahan/design-intelligence.git
   cd design-intelligence
   code .
   ```

   Git may warn that the repository is empty. That is expected until the first push.
3. Download the starter ZIP, extract it, and copy **all contents inside** `design-intelligence-v1/` into your cloned `design-intelligence/` directory. Include hidden `.agents`, `.github`, and `.design-intelligence` folders; do not nest the starter folder inside the repo.
4. Run validation:

   ```powershell
   py -m pip install -r requirements-dev.txt
   py scripts/validate.py
   py -m unittest discover -s tests -v
   ```

5. Open the **OpenAI Codex** extension in VS Code. Start a new chat, use `/skills` or type `$design-kickoff`, and ask: `Use $design-kickoff to plan a small React dashboard. Save the brief, but do not install dependencies.` Codex scans `.agents/skills/` in your opened repo.
6. Commit and publish:

   ```powershell
   git add .
   git commit -m "Bootstrap Design Intelligence v1"
   git push -u origin main
   ```

   If `git` or `py` is not recognized, install the missing program. If authentication fails, sign in to GitHub from VS Code or Git Credential Manager.

## Use the skills in another project

Run this from the **design-intelligence** repository root (the one holding `scripts/install.py`):

```powershell
py scripts/install.py --target "C:\path\to\your-project" --dry-run
py scripts/install.py --target "C:\path\to\your-project"
```

The installer copies the skill folders and their shared `.design-intelligence/` resources. It **does not** replace your project's `AGENTS.md` or install UI packages. It refuses to overwrite existing content unless you explicitly pass `--force` (back up any changes first). Start a new Codex session in the target project, then try `$design-kickoff`.

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
scripts/install.py          copy capabilities into another repository
scripts/validate.py         structural and schema checks
tests/                      installer smoke test
.github/workflows/          validate on push and pull request
```

## Constraints

A style name **does not choose** a framework or library automatically. The agent must inspect the actual target project, explain tradeoffs, respect its architecture, and propose changes before adding dependencies. Native Apple Liquid Glass is not a web component library; web lookalikes are approximations. Accessibility needs both automated and manual checking.

## Research and limitations

See [research notes](.design-intelligence/references/research-2026-11.md) for official links, scope, and outstanding validation. Profiles and token values are illustrative starting points, **not** pre-audited production brand palettes. This starter has structural tests; it has **not** been subjected to a real human UX study or verified in all three coding agents.

## License

MIT — see [LICENSE](LICENSE). External libraries, assets, code samples, and design systems retain their own licenses. This repository does not redistribute their code or logos.
