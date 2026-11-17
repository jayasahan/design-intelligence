#!/usr/bin/env python3
"""Safely install Design Intelligence into an existing project."""
import argparse
import hashlib
import shutil
from datetime import datetime, timezone
from pathlib import Path

SOURCE = Path(__file__).resolve().parents[1]
PARTS = (Path('.agents/skills'), Path('.design-intelligence'))

def _files(part):
    return [path for path in sorted((SOURCE / part).rglob('*')) if path.is_file()]


def _same(left, right):
    if left.stat().st_size != right.stat().st_size:
        return False
    digest = lambda path: hashlib.sha256(path.read_bytes()).digest()
    return digest(left) == digest(right)


def _plan(target):
    plan = []
    for part in PARTS:
        for source in _files(part):
            relative = source.relative_to(SOURCE)
            destination = target / relative
            if not destination.exists():
                action = 'create'
            elif destination.is_file() and _same(source, destination):
                action = 'skip'
            elif destination.is_file():
                action = 'replace'
            else:
                action = 'conflict'
            plan.append((action, source, destination, relative))
    return plan


def install(target: Path, force: bool = False, dry_run: bool = False):
    target = target.expanduser().resolve()
    if not target.is_dir():
        raise ValueError(f'Target directory does not exist: {target}')
    if target == SOURCE.resolve():
        raise ValueError('Source and target are the same repository; no installation needed')
    plan = _plan(target)
    hard_conflicts = [item for item in plan if item[0] == 'conflict']
    replacements = [item for item in plan if item[0] == 'replace']
    if hard_conflicts or (replacements and not force):
        conflicts = hard_conflicts + replacements
        details = '; '.join(f'{item[3]} ({item[0]})' for item in conflicts)
        raise FileExistsError('Conflicting files already exist; nothing was changed: '
                              f'{details}. Re-run with --force to replace them with backups.')
    backup_root = None
    if force and any(item[0] == 'replace' for item in plan) and not dry_run:
        stamp = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')
        backup_root = target / '.design-intelligence-backups' / stamp
    for action, source_path, destination, relative in plan:
        if action == 'skip':
            print(f'Skip identical {relative}')
            continue
        if action == 'replace' and backup_root is not None:
            backup = backup_root / relative
            backup.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(destination, backup)
            print(f'Back up {relative} -> {backup.relative_to(target)}')
        verb = 'Would copy' if dry_run else 'Copying'
        if action == 'replace':
            verb = 'Would replace' if dry_run else 'Replacing'
        print(f'{verb} {relative}')
        if not dry_run:
            destination.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(source_path, destination)
    if backup_root is not None:
        print(f'Backups stored in {backup_root}')
    print('Dry run complete.' if dry_run else 'Skills and shared resources installed. Open target repo in Codex and start a new chat.')

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--target',required=True,help='Existing target project directory')
    p.add_argument('--force',action='store_true',help='Replace conflicts and back up replaced files')
    p.add_argument('--dry-run',action='store_true',help='Print operations without changing files')
    args=p.parse_args()
    try: install(Path(args.target),args.force,args.dry_run)
    except (OSError,ValueError) as e: p.exit(1,f'Error: {e}\n')
if __name__=='__main__': main()
