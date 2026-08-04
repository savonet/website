// Reimplementation of savonet's `pandoc-include` filter (ocaml-pandoc/examples/include.ml),
// which the old pandoc pipeline used to pull .liq snippets into fenced blocks:
//
//   ```{.liquidsoap include="beets-source.liq" from="BEGIN" to="END"}
//   ```
//
// Resolved here rather than in a remark plugin so that the committed markdown is
// build-ready and inspectable, and so Docusaurus's metastring parser never sees the
// `{.liquidsoap ...}` info string.

import fs from 'node:fs';
import path from 'node:path';

// The opening and closing fences normally have a blank line between them, so the body is
// matched lazily and discarded rather than required to be empty.
const FENCE = /^```\{\.([\w-]+)([^}]*)\}[ \t]*\r?\n[\s\S]*?^```[ \t]*$/gm;
const ATTR = /(\w+)="([^"]*)"|(\w+)=(-?\d+)/g;

/**
 * `from="STR"` resolves to the index of the FIRST line containing STR, plus 1.
 * `to="STR"` resolves to the first such index, minus 1. Numeric bounds are 0-based
 * and count from the end when negative. Both bounds are inclusive.
 */
function resolveBound(value, lines, delta, fallback, ctx, file) {
  if (value === undefined) return fallback;
  if (/^-?\d+$/.test(value)) {
    const n = Number(value);
    return n < 0 ? lines.length + n : n;
  }
  const i = lines.findIndex((l) => l.includes(value));
  if (i < 0) throw new Error(`${ctx}: marker "${value}" not found in ${file}`);
  return i + delta;
}

export function resolveIncludes(md, liqDir, ctx, warn) {
  return md.replace(FENCE, (whole, lang, attrs) => {
    const kv = {};
    for (const m of attrs.matchAll(ATTR)) {
      if (m[1] !== undefined) kv[m[1]] = m[2];
      else kv[m[3]] = m[4];
    }
    // `content=` is a typo present in the upstream docs; it currently renders an empty
    // block. Treat it as `include=` rather than propagating the silent breakage.
    const name = kv.include ?? kv.content;
    if (!name) {
      warn(`${ctx}: fenced block with no include attribute: {.${lang}${attrs}}`);
      return whole;
    }
    const file = path.join(liqDir, name);
    if (!fs.existsSync(file)) {
      warn(`${ctx}: missing snippet ${name}`);
      return whole;
    }
    const lines = fs.readFileSync(file, 'utf8').split('\n');
    if (lines.at(-1) === '') lines.pop();
    const from = resolveBound(kv.from, lines, 1, 0, ctx, name);
    const to = resolveBound(kv.to, lines, -1, lines.length - 1, ctx, name);
    const body = lines.slice(from, to + 1).join('\n');
    return '```' + lang + ` title="${name}"\n` + body + '\n```';
  });
}
