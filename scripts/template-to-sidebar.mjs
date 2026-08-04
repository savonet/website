#!/usr/bin/env node
// One-time migration: turn the old per-version pandoc templates into Docusaurus sidebars.
//
//   node scripts/template-to-sidebar.mjs <path-to-liquidsoap-full/website>
//
// The twelve template-<version>.html files differ only in their sidebar <li> entries, so
// this extracts that nav and freezes it under sidebars/ as the curated source: page
// order and labels, hand-editable. sync-docs.mjs then filters it against the pages a
// given version actually has and writes what Docusaurus reads. Tags released from here on
// should instead carry their own doc/content/sidebar.json upstream, at which point this
// script has no further use.

import fs from 'node:fs';
import path from 'node:path';

const src = process.argv[2];
if (!src) throw new Error('usage: template-to-sidebar.mjs <liquidsoap-full/website>');

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const OUT = path.join(ROOT, 'sidebars');
fs.mkdirSync(OUT, { recursive: true });

// The reference pages are split into per-category subdirectories, so the old flat entry
// points at the generated index instead.
const SPLIT = { reference: 'reference/index', 'reference-extras': 'reference-extras/index', 'reference-deprecated': 'reference-deprecated/index' };

for (const file of fs.readdirSync(src).filter((f) => /^template-.+\.html$/.test(f))) {
  const version = file.replace(/^template-|\.html$/g, '');
  const html = fs.readFileSync(path.join(src, file), 'utf8');

  // <a class="bd-toc-link" href="#">Category</a> followed by <ul> of
  // <li><a href="/doc-$version$/page.html">Label</a>
  //
  // bd-toc-link is not always a bare category header: "Install" carries a real href and
  // is a page in its own right. Missing that dropped install.html from the nav entirely.
  const items = [];
  const re =
    /<a class="bd-toc-link"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>([\s\S]*?)(?=<a class="bd-toc-link"|<\/nav>|$)/g;
  for (const [, href, rawLabel, body] of html.matchAll(re)) {
    const label = rawLabel.replace(/<[^>]+>/g, '').trim();
    const pages = [...body.matchAll(/href="\/doc-\$version\$\/([\w.-]+)\.html"[^>]*>([\s\S]*?)<\/a>/g)].map(
      ([, id, text]) => ({ type: 'doc', id: SPLIT[id] ?? id, label: text.replace(/<[^>]+>/g, '').trim() })
    );
    const own = /^\/doc-\$version\$\/([\w.-]+)\.html$/.exec(href);
    if (!pages.length) {
      // A linked header with no children is just a page.
      if (own) items.push({ type: 'doc', id: SPLIT[own[1]] ?? own[1], label });
      continue;
    }
    const category = { type: 'category', label, collapsed: true, items: pages };
    if (own) category.link = { type: 'doc', id: SPLIT[own[1]] ?? own[1] };
    items.push(category);
  }

  // "Basic Concepts" holds formats and features (multitrack, ffmpeg, JSON/XML/YAML) while
  // "Core Concepts" holds what a reader actually needs first (sources, clocks, requests),
  // so the template order reads backwards. Categories not listed keep their position.
  const ORDER = ['Install', 'Starters', 'Core Concepts', 'Core', 'Basic Concepts', 'Reference'];
  const rank = (c) => (ORDER.includes(c.label) ? ORDER.indexOf(c.label) : ORDER.length);
  const sidebar = items
    .filter((c) => c.type !== 'category' || c.items.length)
    .map((c, i) => ({ c, i }))
    .sort((a, b) => rank(a.c) - rank(b.c) || a.i - b.i)
    .map(({ c }) => c);
  fs.writeFileSync(path.join(OUT, `version-${version}.json`), JSON.stringify({ docs: sidebar }, null, 2) + '\n');

  const n = sidebar.reduce((a, c) => a + c.items.length, 0);
  console.log(`${version}: ${sidebar.length} categories, ${n} entries`);
}
