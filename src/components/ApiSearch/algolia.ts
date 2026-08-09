// Queries the DocSearch index directly rather than through @docsearch/react, so that its
// results can sit in the same dialog as the function reference. The key in the config is
// the search-only one, which is public by design.

export type DocHit = {
  url: string;
  title: string;
  breadcrumb: string;
  snippet: string;
};

type Hierarchy = Record<string, string | null>;

export type AlgoliaConfig = {
  appId: string;
  apiKey: string;
  indexName: string;
  contextualSearch?: boolean;
};

/** Deepest heading is what the reader is looking for; the rest is context. */
function titleAndCrumb(h: Hierarchy): { title: string; breadcrumb: string } {
  const levels = ['lvl6', 'lvl5', 'lvl4', 'lvl3', 'lvl2', 'lvl1', 'lvl0']
    .map((k) => h?.[k])
    .filter((v): v is string => Boolean(v))
    // Headings carry the zero-width space from Docusaurus's anchor link.
    .map((v) => v.replace(/\u200b/g, '').trim());
  const [title, ...rest] = levels;
  return { title: title ?? '', breadcrumb: rest.reverse().join(' › ') };
}

export async function searchDocs(
  config: AlgoliaConfig,
  query: string,
  versionName: string,
  hitsPerPage = 6
): Promise<DocHit[]> {
  if (!query.trim()) return [];
  const body: Record<string, unknown> = { query, hitsPerPage };
  // The tag Docusaurus stamps on every page: the in-development version calls itself
  // `current`, which is exactly what the crawler records for it.
  if (config.contextualSearch !== false) {
    body.facetFilters = [[`docusaurus_tag:docs-default-${versionName}`]];
  }

  const res = await fetch(
    `https://${config.appId}-dsn.algolia.net/1/indexes/${encodeURIComponent(config.indexName)}/query`,
    {
      method: 'POST',
      headers: {
        'X-Algolia-API-Key': config.apiKey,
        'X-Algolia-Application-Id': config.appId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) return [];

  const data = await res.json();
  return (data.hits ?? []).map((hit: any): DocHit => {
    const { title, breadcrumb } = titleAndCrumb(hit.hierarchy ?? {});
    return {
      url: hit.url,
      title,
      breadcrumb,
      snippet: typeof hit.content === 'string' ? hit.content.slice(0, 140) : '',
    };
  });
}
