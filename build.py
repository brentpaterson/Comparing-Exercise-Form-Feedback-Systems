"""Assemble the plain tutorial from the HTML sections in content/."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PAGES = [
    ('index', 'Introduction', 'Comparing Exercise Form Feedback Systems'),
    ('geometry', 'Camera assumptions', 'Comparing camera assumptions'),
    ('rules', 'Simple methods', 'Comparing rules and learned angle features'),
    ('temporal', 'Movement analysis', 'Comparing temporal and reference methods'),
    ('language', 'Feedback', 'Comparing feedback reliability'),
    ('comparison', 'Results', 'Successes, failures, and strength of evidence'),
    ('project2', 'Conclusions', 'Lessons for Project 2'),
    ('references', 'Sources', 'Annotated bibliography'),
]

for index, (slug, label, title) in enumerate(PAGES):
    body = (ROOT/'content'/f'{slug}.html').read_text(encoding='utf-8')
    links = []
    for target, name, _ in PAGES:
        current = ' aria-current="page"' if target == slug else ''
        links.append(f'<a href="{target}.html"{current}>{name}</a>')
    navigation = ' | '.join(links)
    turns = []
    if index:
        previous = PAGES[index-1]
        turns.append(f'<a href="{previous[0]}.html">Previous: {previous[1]}</a>')
    if index < len(PAGES)-1:
        following = PAGES[index+1]
        turns.append(f'<a href="{following[0]}.html">Next: {following[1]}</a>')
    else:
        turns.append('<a href="index.html">Return to introduction</a>')
    script = '<script src="slideshow.js" defer></script>' if slug == 'comparison' else ''
    document = f'''<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>{title} — CS 663 Project 1</title><link rel="stylesheet" href="style.css">{script}</head>
<body>
<header><p>CS 663 — Project 1 · Brent Paterson</p><nav aria-label="Tutorial pages">{navigation}</nav></header>
<main id="main"><h1>{title}</h1>
{body}</main>
<footer><p>{' | '.join(turns)}</p><p>Comparative Analysis of Published Real-Time Exercise Form Feedback Systems</p></footer>
</body></html>'''
    (ROOT/f'{slug}.html').write_text(document, encoding='utf-8')

(ROOT/'.nojekyll').write_text('',encoding='utf-8')
print('Generated eight comparison-focused pages. No audio or quiz.')
