# Changelog

## 1.1.0 — Reliability and developer experience

- Made installation merge-safe and dry-run friendly.
- Added conflict preflight, identical-file skipping, and opt-in timestamped backups.
- Added `scripts/doctor.py` with CI-friendly PASS/FAIL exit codes.
- Expanded temporary-directory tests for installation, validation, preservation, and diagnostics.
- Corrected documentation for the repository's `master` branch and added update, testing, and skill-discovery guidance.
- Acceptance criteria: all required validation and tests pass under Python 3.10+; fresh, repeat, conflicting, and unrelated-content installations are safe; doctor reports healthy and unhealthy targets; no target-owned instructions or unrelated content is overwritten by default.
