// Spike 3: does a pandoc auto_identifiers reimplementation reproduce the live anchors?
// Compares pandocId(heading text) against the id= pandoc actually emitted, for every
// heading on the live reference page.
import fs from 'node:fs';

const slug = (s) =>
  s
    .replace(/`/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9_.\-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^[^a-z]+/, '');

// Pandoc dedups document-wide: an empty slug becomes "section", and any slug already
// taken gets "-N" appended with N counting from 1. Stateful, so one instance per document.
function makeIdentifier() {
  const seen = new Map();
  return (text) => {
    const base = slug(text) || 'section';
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    return n === 0 ? base : `${base}-${n}`;
  };
}

const html = fs.readFileSync(new URL('./live-reference.html', import.meta.url), 'utf8');

// <h3 id="foo"><a href="#foo" class="anchor"><code>foo</code></a></h3>
const headings = [...html.matchAll(/<h([1-6]) id="([^"]*)"[^>]*>([\s\S]*?)<\/h\1>/g)].map(
  ([, level, id, inner]) => ({
    level: +level,
    id,
    text: inner
      .replace(/<[^>]+>/g, '')
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#39;/g, "'")
      .trim(),
  })
);

const pandocId = makeIdentifier();
let ok = 0;
const bad = [];
for (const h of headings) {
  const ours = pandocId(h.text);
  if (ours === h.id) ok++;
  else bad.push({ ...h, ours });
}

console.log(`headings: ${headings.length}  match: ${ok}  mismatch: ${bad.length}`);
const byLevel = {};
for (const h of headings) byLevel[h.level] = (byLevel[h.level] ?? 0) + 1;
console.log('by level:', byLevel);
console.log(`dotted ids: ${headings.filter((h) => h.id.includes('.')).length}`);

if (bad.length) {
  console.log('\n--- mismatches (first 25) ---');
  for (const h of bad.slice(0, 25)) {
    console.log(`  h${h.level} text=${JSON.stringify(h.text)}`);
    console.log(`      pandoc=${JSON.stringify(h.id)} ours=${JSON.stringify(h.ours)}`);
  }
}

// The in-file category TOC is a free self-test for the ## headings.
const toc = [...html.matchAll(/<li><a href="#([^"]+)"[^>]*>([^<]+)<\/a><\/li>/g)];
let tocOk = 0;
const tocBad = [];
for (const [, anchor, label] of toc) {
  if (slug(label) === anchor) tocOk++;
  else tocBad.push({ label, anchor, ours: slug(label) });
}
console.log(`\nTOC entries: ${toc.length}  match: ${tocOk}  mismatch: ${tocBad.length}`);
for (const t of tocBad.slice(0, 10)) console.log('  ', t);
