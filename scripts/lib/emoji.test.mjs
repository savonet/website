import assert from 'node:assert/strict';
import { stripEmoji } from './emoji.mjs';

const md = [
  '## ⚠️ Format  Availability',
  'Some  prose with two spaces.',
  '| ✅ Yes |',
  '```liquidsoap',
  'def f() =',
  '  if x then',
  '    "a  b ✨"',
  '  end',
  'end',
  '```',
  '#### ✅ 1. Is latency',
].join('\n');

const out = stripEmoji(md).split('\n');
const cases = [
  [0, '## Format Availability'],
  [1, 'Some  prose with two spaces.'],
  [2, '| Yes |'],
  [5, '  if x then'],
  [6, '    "a  b ✨"'],
  [10, '#### 1. Is latency'],
];
for (const [line, expected] of cases) assert.equal(out[line], expected);
console.log(`stripEmoji: ${cases.length} cases passed`);
