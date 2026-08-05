#!/usr/bin/env node
/**
 * Checks the grammar two ways:
 *
 *  1. Fixed cases, asserting that specific constructs produce specific tokens.
 *  2. Every Liquidsoap code block in the synced documentation, asserting the grammar
 *     never collapses (a common failure is one greedy pattern swallowing whole files) and
 *     reporting what share of the corpus it classifies.
 *
 * Run: node vendor/prism-liquidsoap/test.js
 */

const fs = require('node:fs');
const path = require('node:path');
const Prism = require('prismjs');

require('./liquidsoap.js')(Prism);

let failures = 0;
const check = (name, ok, detail) => {
  if (!ok) {
    failures++;
    console.error(`  FAIL  ${name}${detail ? `\n        ${detail}` : ''}`);
  }
};

/** Text covered by a token, including any nested tokens. */
function textOf(node) {
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(textOf).join('');
  return textOf(node.content);
}

/**
 * Flatten Prism's token tree into [type, text] pairs, recording parents as well as
 * leaves: `string` and `doc-comment` carry an `inside`, so their content is an array and
 * a leaves-only walk never sees them.
 */
function tokens(code) {
  const out = [];
  const walk = (nodes) => {
    for (const n of nodes) {
      if (typeof n === 'string') continue;
      out.push([n.type, textOf(n)]);
      if (Array.isArray(n.content)) walk(n.content);
      else if (n.content && typeof n.content === 'object') walk([n.content]);
    }
  };
  walk(Prism.tokenize(code, Prism.languages.liquidsoap));
  return out;
}

const has = (code, type, text) =>
  tokens(code).some(([t, s]) => t === type && (text === undefined || s === text));

console.log('fixed cases');

check('comment', has('# hello', 'comment', '# hello'));
check('shebang', has('#!/usr/bin/liquidsoap', 'shebang'));
check('doc tag', has('# @param x the thing', 'doc-comment'));
check('string', has('s = "hi"', 'string', '"hi"'));
check('single-quoted string', has("s = 'hi'", 'string', "'hi'"));
check('interpolation', has('"a #{b} c"', 'interpolation'));
// Nested double quotes inside interpolation are a parse error in Liquidsoap; the
// idiom is single quotes, so that is what the grammar has to handle.
check('interpolation recurses', has(`"#{playlist('x')}"`, 'function-call', 'playlist'));
check('interpolation with method', has(`"#{m['title']}"`, 'string', "'title'"));
check('encoder', has('%mp3', 'encoder', '%mp3'));
check('nested encoder', has('%ffmpeg(%video(codec="x"))', 'encoder', '%video'));
check('keyword def', has('def f() = 1 end', 'keyword', 'def'));
check('function definition name', has('def foo() = 1 end', 'function-definition', 'foo'));
check('function call', has('playlist("~/music")', 'function-call', 'playlist'));
check('dotted function call', has('output.icecast(x)', 'function-call', 'output.icecast'));
check('named argument', has('f(start=true)', 'named-argument', 'start'));
check('label', has('f(~foo)', 'label', '~foo'));
check('boolean', has('x = true', 'boolean', 'true'));
check('null', has('x = null', 'null', 'null'));
check('number', has('x = 42', 'number', '42'));
check('float', has('x = 1.5', 'number', '1.5'));
check('hex', has('x = 0xff', 'number', '0xff'));
check('time predicate', has('if 10h then x end', 'time', '10h'));
check('ref assign', has('r := 1', 'operator', ':='));
check('coalesce', has('a ?? b', 'operator', '??'));
check('spread', has('[...xs]', 'operator', '...'));
check('arrow', has('fun (x) -> x', 'operator', '->'));
// The composition syntax the landing page uses.
check('method record', has('rotate([music.{weight = 3}])', 'function-call', 'rotate'));
// A binding is not a named argument: `radio = ...` should stay plain.
check(
  'binding is not a named argument',
  !has('radio = playlist("x")', 'named-argument'),
  'top-level bindings must not be styled as call arguments'
);

console.log(failures ? `${failures} fixed case(s) failed` : '  all fixed cases pass');

// --- corpus ---------------------------------------------------------------------------

const docsRoot = path.resolve(__dirname, '../../versioned_docs');
const blocks = [];
if (fs.existsSync(docsRoot)) {
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.mdx?$/.test(e.name)) {
        const text = fs.readFileSync(p, 'utf8');
        for (const m of text.matchAll(/```liquidsoap[^\n]*\n([\s\S]*?)```/g)) blocks.push(m[1]);
      }
    }
  };
  walk(docsRoot);
}

if (blocks.length) {
  let chars = 0;
  let classified = 0;
  let widest = { len: 0 };
  for (const code of blocks) {
    chars += code.length;
    for (const [type, text] of tokens(code)) {
      classified += text.length;
      // A single token covering most of a block means a pattern ran away.
      if (text.length > widest.len) widest = { len: text.length, type };
    }
  }
  const pct = ((classified / chars) * 100).toFixed(1);
  console.log(`\ncorpus: ${blocks.length} blocks, ${chars} chars, ${pct}% classified`);
  console.log(`largest single token: ${widest.len} chars (${widest.type})`);
  check('no runaway token', widest.len < 2000, `a ${widest.type} token swallowed ${widest.len} chars`);
  check('most of the corpus is classified', classified / chars > 0.5, `only ${pct}%`);
} else {
  console.log('\ncorpus: no docs found, skipping');
}

process.exit(failures ? 1 : 0);
