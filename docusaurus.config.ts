import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import fs from 'node:fs';

const versions: string[] = JSON.parse(fs.readFileSync('./versions.json', 'utf8'));
const lastVersion = versions[0];

// `docs/` holds the in-development version and is gitignored, so it is empty on a fresh
// clone. Including an empty version breaks the build, hence the check: run
// `npm run sync:dev` to populate it.
const hasDev = fs.existsSync('./docs') && fs.readdirSync('./docs').some((f) => f.endsWith('.md'));

// Written by sync-docs from liquidsoap's own dune-project version, so the in-development
// label follows the series on its own: 2.5.x today, 2.6.x the day main bumps. Absent when
// the bundle predates this, in which case the neutral "dev" is used.
const devLabel: string = fs.existsSync('./dev-version.json')
  ? JSON.parse(fs.readFileSync('./dev-version.json', 'utf8')).label
  : 'dev';

// Local dev and PR builds only need a couple of versions; a full build is ~13.
const only = process.env.ONLY_VERSIONS?.split(',').map((v) => (v === 'dev' ? 'current' : v));

// Each version keeps the URL prefix the current site publishes, so /doc-2.4.5/clocks and
// /doc-dev/reference resolve unchanged. Giving lastVersion an explicit path too is
// deliberate: letting it collapse to a bare /clocks would mint a URL that never existed
// and create a duplicate-content pair.
const versionConfig = Object.fromEntries([
  // Tracks liquidsoap main. The path stays doc-dev so existing /doc-dev/ links keep
  // working; the label is derived, not hardcoded.
  ...(hasDev
    ? [['current', { label: devLabel, path: 'doc-dev', banner: 'unreleased' as const }]]
    : []),
  ...versions.map((v, i) => [
    v,
    {
      label: v,
      path: `doc-${v}`,
      banner: (i === 0 ? 'none' : 'unmaintained') as 'none' | 'unmaintained',
      // Thirteen near-identical copies of every page compete with each other in search.
      noIndex: i >= 3,
    },
  ]),
]);

const config: Config = {
  title: 'Liquidsoap',
  tagline: 'Swiss-army knife for multimedia streaming',
  // Images all live under /assets/img, matching the front page and the historical site.
  favicon: 'assets/img/favicon.ico',
  url: 'https://www.liquidsoap.info',
  baseUrl: '/',
  organizationName: 'savonet',
  projectName: 'website',

  // Emits /doc-2.4.5/clocks.html rather than /doc-2.4.5/clocks/index.html.
  trailingSlash: false,
  onBrokenLinks: 'warn',

  future: {
    // Rspack + SWC + lightningcss. The doc set is ~1900 pages across 13 versions, which
    // is marginal under the default webpack/Babel pipeline.
    faster: true,
    // Greenfield site, so the v4 behaviours cost nothing to adopt now.
    v4: true,
  },

  markdown: {
    hooks: {
      // `dev` follows a moving branch, so upstream can introduce a bad link or a missing
      // image at any time. Neither should be able to take the whole deploy down.
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'warn',
    },
    // .md is parsed as CommonMark, .mdx as MDX. Mandatory: the generated reference files
    // contain 550+ bare {...} and 25 bare <tag> constructs from type signatures
    // (`{wait : (?timeout : float?, ...)}`, `<fun>`, `<url>`), each a hard MDX v3 error.
    format: 'detect',
  },

  i18n: { defaultLocale: 'en', locales: ['en'] },

  plugins: [
    // doc.html is the legacy entry point (/doc.html?path=X) kept for inbound links. It is
    // copied verbatim from static/, so it cannot read lastVersion for itself.
    function legacyRedirect() {
      return {
        name: 'legacy-redirect',
        async postBuild({ outDir }) {
          const { readFile, writeFile, access } = await import('node:fs/promises');
          const target = `${outDir}/doc.html`;
          const html = await readFile(target, 'utf8');
          await writeFile(target, html.replaceAll('@version@', lastVersion));

          // Asset paths in the config are plain strings, so a stale one fails silently:
          // the favicon once stayed on the Docusaurus default and og:image pointed at a
          // file that was never emitted.
          const missing: string[] = [];
          for (const asset of [config.favicon, (config.themeConfig as any)?.image]) {
            if (!asset) continue;
            await access(`${outDir}/${asset}`).catch(() => missing.push(asset));
          }
          if (missing.length) {
            throw new Error(`assets referenced by the config were not emitted: ${missing.join(', ')}`);
          }
        },
      };
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          includeCurrentVersion: hasDev,
          lastVersion,
          versions: versionConfig,
          ...(only ? { onlyIncludeVersions: only } : {}),
        },
        blog: false,
        theme: { customCss: './src/css/custom.css' },
        sitemap: { filename: 'sitemap.xml' },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'assets/img/og-liquidsoap.png',
    navbar: {
      title: 'Liquidsoap',
      logo: {
        alt: 'Liquidsoap',
        src: 'assets/img/logo.svg',
        srcDark: 'assets/img/logo-inverted.svg',
      },
      items: [
        { type: 'docSidebar', sidebarId: 'docs', position: 'left', label: 'Documentation' },
        // /try is a page of this site, loading two artifacts that savonet/liquidsoap's doc
        // workflow copies into build/try. The interpreter hangs itself off window.onload
        // and keeps global state, so `pathname://` forces a full page load rather than a
        // client-side transition, and every visit starts from a clean one.
        { href: 'pathname:///try', label: 'Playground', target: '_self', position: 'left' },
        // Searches the core and extra API of the version being read. Not a substitute
        // for site-wide search; it only covers the function reference.
        { type: 'custom-apiSearch', position: 'right' },
        { type: 'docsVersionDropdown', position: 'right' },
        { href: 'https://github.com/savonet/liquidsoap', label: 'GitHub', position: 'right' },
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
