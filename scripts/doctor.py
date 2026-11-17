#!/usr/bin/env python3
"""Diagnose a Design Intelligence source tree or installed target."""
import argparse
import importlib.util
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
REQUIRED_PACKAGES = ('yaml', 'jsonschema')


def run(root):
    problems = []
    print(f'Design Intelligence doctor: {root}')
    print(f'Python: {sys.version.split()[0]}')
    if sys.version_info < (3, 10):
        problems.append('Python 3.10 or newer is required')
    for package in REQUIRED_PACKAGES:
        ok = importlib.util.find_spec(package) is not None
        print(f'{"PASS" if ok else "FAIL"}: Python package {package}')
        if not ok:
            problems.append(f'Missing Python package: {package}')
    for required in (root / '.agents/skills', root / '.design-intelligence/profiles', root / '.design-intelligence/tokens'):
        ok = required.is_dir()
        print(f'{"PASS" if ok else "FAIL"}: directory {required.relative_to(root)}')
        if not ok:
            problems.append(f'Missing directory: {required}')
    if not problems:
        try:
            sys.path.insert(0, str(REPO / 'scripts'))
            from validate import validate_profiles, validate_skills, validate_tokens
            skills = validate_skills(root)
            profiles = validate_profiles(root)
            tokens = validate_tokens(root)
            print(f'PASS: {skills} skill metadata entries')
            print(f'PASS: {profiles} profiles and {tokens} token documents')
            if skills != 7:
                problems.append(f'Expected 7 skills, found {skills}')
        except (OSError, ValueError, KeyError, TypeError, IndexError, ImportError) as exc:
            problems.append(str(exc))
            print(f'FAIL: validation: {exc}')
    if problems:
        print(f'FAIL: {len(problems)} problem(s) detected')
        for problem in problems:
            print(f'  - {problem}')
        return 1
    print('PASS: Design Intelligence installation is healthy')
    return 0


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--target', type=Path, default=REPO, help='Project or source tree to diagnose')
    args = parser.parse_args()
    try:
        raise SystemExit(run(args.target.expanduser().resolve()))
    except OSError as exc:
        parser.exit(1, f'FAIL: {exc}\n')


if __name__ == '__main__':
    main()
