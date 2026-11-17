#!/usr/bin/env python3
"""Install portable design-intelligence skills and resources in another repo.

Refuses overwrites by default; copies no source repository AGENTS.md, tests or CI.
"""
import argparse
import shutil
from pathlib import Path

SOURCE = Path(__file__).resolve().parents[1]
PARTS = (Path('.agents/skills'), Path('.design-intelligence'))

def install(target: Path, force: bool = False, dry_run: bool = False):
    target = target.expanduser().resolve()
    if not target.is_dir():
        raise ValueError(f'Target directory does not exist: {target}')
    if target == SOURCE.resolve():
        raise ValueError('Source and target are the same repository; no installation needed')
    collisions = [str(part) for part in PARTS if (target / part).exists()]
    if collisions and not force:
        raise FileExistsError(f'Refusing to overwrite existing paths: {", ".join(collisions)}. Back up changes and use --force only if appropriate.')
    for part in PARTS:
        print(f'{"Would copy" if dry_run else "Copying"} {SOURCE / part} -> {target / part}')
        if not dry_run:
            destination = target / part
            # copytree cannot merge intentionally; --force allows controlled replacement
            if destination.exists():
                shutil.rmtree(destination)
            destination.parent.mkdir(parents=True,exist_ok=True)
            shutil.copytree(SOURCE / part, destination)
    print('Dry run complete.' if dry_run else 'Skills and shared resources installed. Open target repo in Codex and start a new chat.')

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--target',required=True,help='Existing target project directory')
    p.add_argument('--force',action='store_true',help='Replace existing skill and shared-resource directories; back up first')
    p.add_argument('--dry-run',action='store_true',help='Print operations without changing files')
    args=p.parse_args()
    try: install(Path(args.target),args.force,args.dry_run)
    except (OSError,ValueError) as e: p.exit(1,f'Error: {e}\n')
if __name__=='__main__': main()
