# Changelog

## 1.2.2 — Release hardening

- Upgrade Vite 4 to Vite 8.3.8 and React plugin 6.3, classify build tooling as development dependencies, and document Node 24 support.
- Add reproducible bundle attribution, measure reduced JS/gzip output, and retain the visible large-chunk warning.
- Run browser regression tests against the production build; strengthen Ubuntu workflow permissions, timeout, full dependency audit and artifact coverage.
- Document the remaining unpatched picomatch tooling advisory and pending GitHub execution in the v1.2.2 release report.

## 1.2.1 — Playground stabilization

- Derive progress counts, rounded labels, bars and donut from the same synthetic cohort; cover empty and rounding cases with unit tests.
- Export filtered student records as CSV and label the fixed demo date.
- Correct sidebar width accounting and mobile grid containment; compact small-screen cards and strengthen focus and text contrast.
- Fix the Playwright server port and Chromium mobile configuration; add interaction, state, download, responsive and axe coverage.
- Add independent Ubuntu frontend CI with lockfile installation and browser artifacts, preserving Python CI.

## 1.2.0 — Local UI playground and evaluation

- Added an isolated React + TypeScript + Vite student-management playground under `examples/student-dashboard/`.
- Added MUI Core, MUI X Data Grid Community, deterministic synthetic fixtures, responsive states, and student detail interaction.
- Added Playwright, Chromium, axe-core, responsive checks, keyboard checks, and screenshot test configuration.
- Added the v1.2.0 design brief, design-system notes, evaluation rubric, and evidence report.
- Acceptance is environment-dependent: TypeScript passes in the checked environment; Vite/browser verification was blocked by Windows Application Control blocking Rollup's native module, and Python verification was blocked by the absence of a Python 3 runtime.

## 1.1.0 — Reliability and developer experience

- Made installation merge-safe and dry-run friendly.
- Added conflict preflight, identical-file skipping, and opt-in timestamped backups.
- Added `scripts/doctor.py` with CI-friendly PASS/FAIL exit codes.
- Expanded temporary-directory tests for installation, validation, preservation, and diagnostics.
- Corrected documentation for the repository's `master` branch and added update, testing, and skill-discovery guidance.
- Acceptance criteria: all required validation and tests pass under Python 3.10+; fresh, repeat, conflicting, and unrelated-content installations are safe; doctor reports healthy and unhealthy targets; no target-owned instructions or unrelated content is overwritten by default.
