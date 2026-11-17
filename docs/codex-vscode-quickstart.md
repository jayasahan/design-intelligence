# Codex VS Code quickstart (Windows)

1. Open your `design-intelligence` repo in VS Code (File > Open Folder). **Open the repository itself**, not its parent directory.
2. Install Python 3.10+ if needed. From Terminal > New Terminal:

   ```powershell
   py -m pip install -r requirements-dev.txt
   py scripts/validate.py
   py -m unittest discover -s tests -v
   ```

3. Open the OpenAI Codex extension and sign in. Start a fresh chat.
4. Use `/skills` to inspect the available skills or type `$design-kickoff`. If you don't see a newly created skill, reload VS Code/start a new Codex session.
5. Try:

   ```text
   Use $design-kickoff to prepare a design brief for a small student
   management dashboard. Use an existing React + Vite app as the target;
   propose only, do not install dependencies. Write docs/design-brief.md
   and a validated design-profile.yaml only if we are inside that target project.
   ```

6. To reuse in a different repo, from this source repo run:

   ```powershell
   py scripts/install.py --target "C:\Projects\my-existing-app" --dry-run
   py scripts/install.py --target "C:\Projects\my-existing-app"
   ```

7. Open **that target repo** in VS Code, start a fresh Codex chat, ask for a design brief, and verify it reads `SKILL.md` rather than merely referring to the skill name.

**Tip:** `.agents` and `.design-intelligence` are real folders. If you don't see them in the file explorer, ensure hidden directories are included and your ZIP extraction didn't drop them.
