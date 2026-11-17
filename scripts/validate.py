#!/usr/bin/env python3
"""Validate the portable skill pack: Agent Skills manifests, YAML profiles, DTCG-style tokens."""
import argparse
import json
import re
from pathlib import Path

try:
    import yaml
    from jsonschema import Draft202012Validator
except ImportError as exc:
    raise SystemExit('Missing dependencies; run: python -m pip install -r requirements-dev.txt') from exc

REPO = Path(__file__).resolve().parents[1]
SKILL_RE = re.compile(r'^[a-z0-9]+(?:-[a-z0-9]+)*$')

def validate_skills(root):
    folder = root / '.agents/skills'
    skills = list(sorted(folder.glob('*/SKILL.md')))
    if not skills: raise ValueError('No SKILL.md files found')
    for path in skills:
        content = path.read_text(encoding='utf-8')
        if not content.startswith('---\n'): raise ValueError(f'No YAML frontmatter: {path}')
        parts = content.split('---\n',2)
        if len(parts)<3: raise ValueError(f'Unterminated YAML frontmatter: {path}')
        data=yaml.safe_load(parts[1])
        if not isinstance(data, dict): raise ValueError(f'Invalid frontmatter: {path}')
        name=data.get('name'); desc=data.get('description')
        if not isinstance(name,str) or not SKILL_RE.fullmatch(name) or len(name)>64 or name!=path.parent.name: raise ValueError(f'Invalid skill name: {path}')
        if not isinstance(desc,str) or not 1<=len(desc)<=1024: raise ValueError(f'Invalid description: {path}')
        if not parts[2].strip(): raise ValueError(f'Empty skill body: {path}')
    return len(skills)

def validate_profiles(root):
    schema=json.loads((root/'.design-intelligence/schemas/design-profile.schema.json').read_text(encoding='utf-8'))
    Draft202012Validator.check_schema(schema)
    validator=Draft202012Validator(schema)
    paths=sorted((root/'.design-intelligence/profiles').glob('*.yaml'))
    if not paths: raise ValueError('No YAML profiles found')
    for path in paths:
        data=yaml.safe_load(path.read_text(encoding='utf-8'))
        errors=sorted(validator.iter_errors(data),key=lambda e:list(map(str,e.path)))
        if errors: raise ValueError(f'Invalid profile {path}: {errors[0].message} at {list(errors[0].path)}')
        token_path=root/data['design']['tokens_file']
        if not token_path.is_file():raise ValueError(f'Profile references missing token document: {token_path}')
    template=yaml.safe_load((root/'.design-intelligence/templates/project-design-profile.yaml').read_text(encoding='utf-8'))
    if list(validator.iter_errors(template)):raise ValueError('Invalid template profile')
    return len(paths)

def _luminance(hex_color):
    rgb=[int(hex_color[i:i+2],16)/255 for i in (1,3,5)]
    linear=[v/12.92 if v<=0.04045 else ((v+0.055)/1.055)**2.4 for v in rgb]
    return sum(v*w for v,w in zip(linear,(0.2126,0.7152,0.0722)))

def contrast_ratio(first, second):
    a,b=sorted((_luminance(first),_luminance(second)))
    return (b+0.05)/(a+0.05)

def validate_tokens(root):
    tokens=sorted((root/'.design-intelligence/tokens').glob('*.tokens.json'))
    if not tokens: raise ValueError('No token files found')
    for path in tokens:
        data=json.loads(path.read_text(encoding='utf-8'))
        for k in ('background','surface','text','muted','accent','focus'):
            token=data['color'][k]
            if token['$type']!='color':raise ValueError(f'Invalid color type: {path} {k}')
            c=token['$value']
            h=c.get('hex','')
            if c.get('colorSpace')!='srgb' or not re.fullmatch(r'#[0-9A-Fa-f]{6}',h):raise ValueError(f'Invalid color object: {path} {k}')
            expected=[int(h[i:i+2],16)/255 for i in (1,3,5)]
            if len(c.get('components',[]))!=3 or any(abs(a-b)>1e-5 for a,b in zip(c['components'],expected)):
                raise ValueError(f'Color components do not match hex: {path} {k}')
        for surface in ('background','surface'):
            for foreground in ('text','muted'):
                fg=data['color'][foreground]['$value']['hex']
                bg=data['color'][surface]['$value']['hex']
                if contrast_ratio(fg,bg)<4.5:
                    raise ValueError(f'Sample token contrast below 4.5:1: {path} {foreground}/{surface}')
        for group in ('space','radius'):
            for token in data[group].values():
                if token.get('$type')!='dimension' or not set(token['$value'])=={'value','unit'} or token['$value']['unit'] not in ('px','rem'):
                    raise ValueError(f'Invalid dimension token: {path}')
        if any(t.get('$type')!='fontFamily' for t in data['typography'].values()):raise ValueError(f'Invalid typography token: {path}')
    return len(tokens)

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--root',type=Path,default=REPO,help='Root of source or installed package')
    args=p.parse_args(); root=args.root.expanduser().resolve()
    try:
        skills=validate_skills(root); profiles=validate_profiles(root); tokens=validate_tokens(root)
    except (OSError,ValueError,KeyError,TypeError,IndexError) as e:
        p.exit(1,f'Validation FAILED: {e}\n')
    print(f'PASS: {skills} skills, {profiles} profiles, {tokens} token files')
    print('Note: structural checks only; not full DTCG certification or WCAG assessment.')
if __name__=='__main__': main()
