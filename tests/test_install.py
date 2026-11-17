import shutil
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PYTHON = sys.executable


def run_script(name, *args):
    return subprocess.run([PYTHON, str(ROOT / 'scripts' / name), *map(str, args)],
                          text=True, capture_output=True)


class ReliabilityTests(unittest.TestCase):
    def make_target(self):
        path = Path(tempfile.mkdtemp()) / 'project'
        path.mkdir()
        self.addCleanup(lambda: shutil.rmtree(path.parent, ignore_errors=True))
        return path

    def install(self, target, *args):
        return run_script('install.py', '--target', target, *args)

    def test_fresh_dry_run_and_install(self):
        target = self.make_target()
        agents = target / 'AGENTS.md'
        agents.write_text('Keep this file', encoding='utf-8')
        before = sorted(str(p.relative_to(target)) for p in target.rglob('*'))
        dry = self.install(target, '--dry-run')
        self.assertEqual(dry.returncode, 0, dry.stderr)
        self.assertEqual(before, sorted(str(p.relative_to(target)) for p in target.rglob('*')))
        first = self.install(target)
        self.assertEqual(first.returncode, 0, first.stderr)
        self.assertEqual(agents.read_text(encoding='utf-8'), 'Keep this file')
        checked = run_script('validate.py', '--root', target)
        self.assertEqual(checked.returncode, 0, checked.stderr)
        self.assertIn('PASS: 7 skills, 3 profiles, 3 token files', checked.stdout)

    def test_unrelated_skill_is_preserved(self):
        target = self.make_target()
        unrelated = target / '.agents/skills/my-private-skill/SKILL.md'
        unrelated.parent.mkdir(parents=True)
        unrelated.write_text('private', encoding='utf-8')
        result = self.install(target)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(unrelated.read_text(encoding='utf-8'), 'private')

    def test_identical_repeat_is_safe(self):
        target = self.make_target()
        self.assertEqual(self.install(target).returncode, 0)
        repeat = self.install(target)
        self.assertEqual(repeat.returncode, 0, repeat.stderr)
        self.assertIn('Skip identical', repeat.stdout)

    def test_conflict_is_preflighted_without_changes(self):
        target = self.make_target()
        conflict = target / '.agents/skills/design-kickoff/SKILL.md'
        conflict.parent.mkdir(parents=True)
        conflict.write_text('user-owned', encoding='utf-8')
        result = self.install(target)
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(conflict.read_text(encoding='utf-8'), 'user-owned')
        self.assertFalse((target / '.design-intelligence').exists())

    def test_force_replaces_with_backup(self):
        target = self.make_target()
        conflict = target / '.agents/skills/design-kickoff/SKILL.md'
        conflict.parent.mkdir(parents=True)
        conflict.write_text('user-owned', encoding='utf-8')
        result = self.install(target, '--force')
        self.assertEqual(result.returncode, 0, result.stderr)
        backups = list((target / '.design-intelligence-backups').rglob('SKILL.md'))
        self.assertEqual(len(backups), 1)
        self.assertEqual(backups[0].read_text(encoding='utf-8'), 'user-owned')

    def test_corrupt_profile_fails_validation_and_doctor(self):
        target = self.make_target()
        shutil.copytree(ROOT / '.agents', target / '.agents')
        shutil.copytree(ROOT / '.design-intelligence', target / '.design-intelligence')
        profile = target / '.design-intelligence/profiles/apple-liquid-glass.yaml'
        profile.write_text(profile.read_text(encoding='utf-8').replace('schema_version: 1', 'schema_version: 999'), encoding='utf-8')
        result = run_script('validate.py', '--root', target)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('Invalid profile', result.stderr)
        doctor = run_script('doctor.py', '--target', target)
        self.assertNotEqual(doctor.returncode, 0)
        self.assertIn('FAIL:', doctor.stdout)

    def test_doctor_healthy_installation(self):
        target = self.make_target()
        self.assertEqual(self.install(target).returncode, 0)
        doctor = run_script('doctor.py', '--target', target)
        self.assertEqual(doctor.returncode, 0, doctor.stdout + doctor.stderr)
        self.assertIn('PASS: Design Intelligence installation is healthy', doctor.stdout)


if __name__ == '__main__':
    unittest.main()
