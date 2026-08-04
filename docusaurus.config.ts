import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import fs from 'node:fs';

const versions: string[] = JSON.parse(fs.readFileSync('./versions.json', 'utf8'));
const lastVersion = versions[0];

// `docs/` holds the in-development version and is gitignored, so it is empty on a fresh
// clone. Including an empty version breaks the build, hence the check: run
// `npm run sync:dev` to populate it.
const hasDev = fs.existsSync('./docs') && fs.readdirSync('./docs').some((f) => f.endsWith('.md'));

// Set BASE_URL=/website/ to publish under a subpath, e.g. for a preview deploy.
const baseUrl = process.env.BASE_URL ?? '/';

// Local dev and PR builds only need a couple of versions; a full build is ~13.
const only = process.env.ONLY_VERSIONS?.split(',').map((v) => (v === 'dev' ? 'current' : v));

// Each version keeps the URL prefix the current site publishes, so /doc-2.4.5/clocks and
// /doc-dev/reference resolve unchanged. Giving lastVersion an explicit path too is
// deliberate: letting it collapse to a bare /clocks would mint a URL that never existed
// and create a duplicate-content pair.
const versionConfig = Object.fromEntries([
  ...(hasDev ? [['current', { label: 'dev', path: 'doc-dev', banner: 'unreleased' as const }]] : []),
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
  baseUrl,
  organizationName: 'savonet',
  projectName: 'website',

  // Emits /doc-2.4.5/clocks.html rather than /doc-2.4.5/clocks/index.html.
  trailingSlash: false,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  future: {
    // Rspack + SWC + lightningcss. The doc set is ~1900 pages across 13 versions, which
    // is marginal under the default webpack/Babel pipeline.
    faster: true,
    // Greenfield site, so the v4 behaviours cost nothing to adopt now.
    v4: true,
  },

  markdown: {
    // .md is parsed as CommonMark, .mdx as MDX. Mandatory: the generated reference files
    // contain 550+ bare {...} and 25 bare <tag> constructs from type signatures
    // (`{wait : (?timeout : float?, ...)}`, `<fun>`, `<url>`), each a hard MDX v3 error.
    format: 'detect',
  },

  i18n: { defaultLocale: 'en', locales: ['en'] },

  plugins: [
    // The front page is hand-written HTML, and `routeBasePath: '/'` makes the docs plugin
    // register '/' as its container route. Keeping the page in static/ therefore has two
    // emitters racing for index.html, which fails the dev build outright. So it lives in
    // frontpage/ instead, outside anything Docusaurus copies, and is written over the
    // generated index.html afterwards.
    //
    // The same hook substitutes @version@ here and in the legacy doc.html redirector,
    // which is copied verbatim from static/ and so cannot read lastVersion itself.
    function frontPage() {
      const SOURCE = './frontpage/index.html';
      const render = async () => {
        const { readFile } = await import('node:fs/promises');
        const html = await readFile(SOURCE, 'utf8');
        // The page is hand-written with site-absolute paths, so under a subpath deploy
        // (BASE_URL=/website/) every one of them needs the prefix that Docusaurus applies
        // automatically to its own routes.
        const based = baseUrl === '/' ? html : html.replace(/(href|src)="\//g, `$1="${baseUrl}`);
        return based.replaceAll('@version@', lastVersion);
      };
      return {
        name: 'front-page',
        getPathsToWatch() {
          return [SOURCE];
        },
        configureWebpack() {
          // `devServer` is a valid key for the underlying bundler but is not part of
          // Docusaurus' ConfigureWebpackResult type, hence the cast.
          return {
            devServer: {
              setupMiddlewares(middlewares: any[], devServer: any) {
                devServer.app.get('/', async (_req: any, res: any) => {
                  res.set('Content-Type', 'text/html').send(await render());
                });
                return middlewares;
              },
            },
          } as any;
        },
        async postBuild({ outDir }) {
          const { readFile, writeFile, access } = await import('node:fs/promises');
          const frontPage = await render();
          await writeFile(`${outDir}/index.html`, frontPage);
          const legacy = `${outDir}/doc.html`;
          const html = await readFile(legacy, 'utf8');
          await writeFile(legacy, html.replaceAll('@version@', lastVersion));

          // The front page is outside Docusaurus' routing, so onBrokenLinks does not see
          // it. Its doc links had drifted to /doc-dev/ and to pages that moved; check
          // every internal target resolves rather than finding out in review.
          const exists = async (p: string) =>
            access(p)
              .then(() => true)
              .catch(() => false);
          const broken: string[] = [];
          for (const [, href] of frontPage.matchAll(/href="(\/[^"#?]*)"/g)) {
            // Paths are site-absolute and carry baseUrl; on disk they are relative to
            // outDir, which has no such prefix.
            const rel = href.slice(baseUrl.length).replace(/\/$/, '');
            if (!rel) continue;
            const base = `${outDir}/${rel}`;
            if (await exists(base)) continue;
            if (await exists(`${base}.html`)) continue;
            if (await exists(`${base}/index.html`)) continue;
            broken.push(href);
          }

          // Site-wide assets named in the config are just strings, so a stale path fails
          // silently: the favicon quietly stayed on the Docusaurus default and og:image
          // pointed at a file that was never emitted, breaking the share card on every
          // doc page.
          for (const asset of [config.favicon, (config.themeConfig as any)?.image]) {
            if (asset && !(await exists(`${outDir}/${asset}`))) broken.push(`/${asset}`);
          }

          if (broken.length) {
            throw new Error(`missing targets referenced by the site:\n  ${broken.join('\n  ')}`);
          }

          // plugin-sitemap only knows about Docusaurus routes, so the hand-written front
          // page -- the most important URL on the site -- would be left out.
          const sitemap = `${outDir}/sitemap.xml`;
          if (await exists(sitemap)) {
            const xml = await readFile(sitemap, 'utf8');
            const home = `<url><loc>${config.url}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`;
            if (!xml.includes(`<loc>${config.url}/</loc>`)) {
              await writeFile(sitemap, xml.replace('<url>', `${home}<url>`));
            }
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
      // The front page is plain HTML outside Docusaurus' router, so a client-side
      // transition to '/' finds no route and renders a blank page. A plain `href` is not
      // enough -- an internal URL still goes through react-router, and the emitted markup
      // is identical either way. `pathname://` is the documented way to force a real
      // navigation.
      logo: {
        alt: 'Liquidsoap',
        src: 'assets/img/logo.svg',
        srcDark: 'assets/img/logo-inverted.svg',
        href: `pathname://${baseUrl}`,
        target: '_self',
      },
      items: [
        { type: 'docSidebar', sidebarId: 'docs', position: 'left', label: 'Documentation' },
        { to: '/try/', label: 'Try it', position: 'left' },
        { type: 'docsVersionDropdown', position: 'right' },
        { href: 'https://github.com/savonet/liquidsoap', label: 'GitHub', position: 'right' },
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
