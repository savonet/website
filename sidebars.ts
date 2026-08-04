import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
import fs from 'node:fs';

// Written by `sync-docs.mjs --version dev`, which filters the curated sidebar against the
// pages that version actually has. Absent until the first dev sync, so it is read at
// runtime rather than imported.
const file = './sidebars.dev.json';
const sidebars: SidebarsConfig = fs.existsSync(file)
  ? JSON.parse(fs.readFileSync(file, 'utf8'))
  : { docs: [] };

export default sidebars;
