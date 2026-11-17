import subprocess
import shutil
import sys
import tempfile
import unittest
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]

class InstallSmokeTest(unittest.TestCase):
    def test_install_and_validate_target(self):
        with tempfile.TemporaryDirectory() as td:
            target=Path(td)/'example-project'; target.mkdir()
            (target/'AGENTS.md').write_text('Keep this file')
            cmd=[sys.executable,str(ROOT/'scripts/install.py'),'--target',str(target)]
            dry=subprocess.run(cmd+['--dry-run'],text=True,capture_output=True)
            self.assertEqual(dry.returncode,0,dry.stderr)
            self.assertFalse((target/'.agents').exists())
            first=subprocess.run(cmd,text=True,capture_output=True)
            self.assertEqual(first.returncode,0,first.stderr)
            self.assertEqual((target/'AGENTS.md').read_text(),'Keep this file')
            checked=subprocess.run([sys.executable,str(ROOT/'scripts/validate.py'),'--root',str(target)],text=True,capture_output=True)
            self.assertEqual(checked.returncode,0,checked.stderr)
            self.assertIn('PASS: 7 skills, 3 profiles, 3 token files',checked.stdout)
            repeat=subprocess.run(cmd,text=True,capture_output=True)
            self.assertNotEqual(repeat.returncode,0)
            self.assertIn('Refusing to overwrite',repeat.stderr)
            self.assertEqual((target/'AGENTS.md').read_text(),'Keep this file')

    def test_corrupt_profile_fails_validation(self):
        with tempfile.TemporaryDirectory() as td:
            target=Path(td)/'repo'; target.mkdir()
            shutil.copytree(ROOT/'.agents',target/'.agents')
            shutil.copytree(ROOT/'.design-intelligence',target/'.design-intelligence')
            profile=target/'.design-intelligence/profiles/apple-liquid-glass.yaml'
            profile.write_text(profile.read_text().replace('schema_version: 1','schema_version: 999'),encoding='utf-8')
            result=subprocess.run([sys.executable,str(ROOT/'scripts/validate.py'),'--root',str(target)],text=True,capture_output=True)
            self.assertNotEqual(result.returncode,0)
            self.assertIn('Invalid profile',result.stderr)

if __name__=='__main__': unittest.main()
