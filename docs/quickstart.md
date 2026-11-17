# Design Intelligence quickstart

Design Intelligence is a portable set of Agent Skills, design profiles, token examples, and research references for coding agents. It is not an application and does not install a frontend framework.

## Install in a project

From this repository, preview and then apply the installation:

```powershell
py scripts/install.py --target "C:\path\to\project" --dry-run
py scripts/install.py --target "C:\path\to\project"
```

The installer creates only `.agents/skills/` and `.design-intelligence/` content. It preserves the project's `AGENTS.md`, `.github`, source files, and unrelated skills. Existing identical files are skipped. A differing file causes a preflight failure; use `--force` only after reviewing the conflict. Replaced files are backed up under `.design-intelligence-backups/`.

Open the target project in Codex and start a new session. Try an explicit invocation such as `$design-kickoff` or `$design-system-selector`. The agent should inspect the target project and follow only the relevant skill; profiles are examples, not mandates to install a library.

## Update or diagnose

Run the same installer command to update. Review any conflict report before using `--force`. Then run:

```powershell
py scripts/doctor.py --target "C:\path\to\project"
```

The doctor checks Python 3.10+, PyYAML, jsonschema, required directories, all seven skill manifests, profiles, and token references. Exit code `0` means healthy; exit code `1` means a problem was found.

## Validate the source repository

```powershell
py -m pip install -r requirements-dev.txt
py scripts/validate.py
py -m unittest discover -s tests -v
py scripts/doctor.py
```

If `py` selects Python 2 or no Python 3 runtime, use an explicit Python 3.10+ executable instead. Tests use local temporary directories and do not modify real projects or require network access.
