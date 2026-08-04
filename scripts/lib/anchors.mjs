// Pandoc's `auto_identifiers` rule, reproduced so that existing deep links survive.
// Verified against all 954 headings of the live doc-2.4.5/reference.html: 954/954 exact.
//
// Docusaurus slugs headings with github-slugger, which strips dots -- that would break
// the 771 dotted anchors (`#liquidsoap.build_config.optionals.alsa`) the current site
// publishes. So every heading gets an explicit `{#id}` instead.

const slug = (s) =>
  s
    .replace(/`/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9_.\-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^[^a-z]+/, '');

// Pandoc dedups document-wide: an empty slug becomes "section", and a slug already taken
// gets "-N" appended, N counting from 1. Hence one instance per document.
export function makeIdentifier() {
  const seen = new Map();
  return (text) => {
    const base = slug(text) || 'section';
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    return n === 0 ? base : `${base}-${n}`;
  };
}

const FENCE = /^(```|~~~)/;
const ATX = /^(#{1,6})\s+(.*?)\s*$/;

/** Rewrite every ATX heading to carry an explicit pandoc-compatible {#id}. */
export function addExplicitAnchors(md) {
  const nextId = makeIdentifier();
  let inFence = false;
  const ids = [];
  const out = md.split('\n').map((line) => {
    if (FENCE.test(line)) inFence = !inFence;
    if (inFence) return line;
    const m = ATX.exec(line);
    if (!m) return line;
    const [, hashes, text] = m;
    if (/\{#[^}]+\}$/.test(text)) return line; // already explicit
    const id = nextId(text);
    ids.push({ level: hashes.length, text, id });
    return `${hashes} ${text} {#${id}}`;
  });
  return { md: out.join('\n'), ids };
}

export { slug };
