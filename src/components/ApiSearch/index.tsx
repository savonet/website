import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useActiveDocContext, useLatestVersion } from '@docusaurus/plugin-content-docs/client';
import { hrefFor, highlight, loadIndex, rank, type Hit } from './search';
import { searchDocs, type AlgoliaConfig, type DocHit } from './algolia';
import styles from './styles.module.css';

// One search box for the whole site. Two sources, because they are good at different
// things: Algolia for prose, and the reference index the build produces for functions,
// which ranks exact and prefix name matches above everything and never lags a crawl.
//
// Deprecated functions are left out on purpose -- they would crowd the results.
const REFERENCES: { file: string; source: string }[] = [
  { file: 'reference', source: 'Core' },
  { file: 'reference-extras', source: 'Extra' },
];

type Row =
  | { kind: 'doc'; hit: DocHit }
  | { kind: 'fn'; hit: Hit };

export default function ApiSearch(): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [functions, setFunctions] = useState<Hit[] | null>(null);
  const [docs, setDocs] = useState<DocHit[]>([]);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();

  const { siteConfig } = useDocusaurusContext();
  const algolia = (siteConfig.themeConfig as any)?.algolia as AlgoliaConfig | undefined;

  // On a doc page use the version being read; elsewhere fall back to the latest release.
  const active = useActiveDocContext(undefined);
  const latest = useLatestVersion(undefined);
  const version = active?.activeVersion ?? latest;
  const versionPath = useBaseUrl(version.path);

  const load = useCallback(async () => {
    const loaded = await Promise.all(
      REFERENCES.map(async ({ file, source }) => {
        const index = await loadIndex(`${versionPath}/${file}-index.json`);
        // A version that does not publish a given reference contributes nothing.
        return index
          ? index.functions.map((fn) => ({ ...fn, base: `${versionPath}/${file}`, source }))
          : [];
      })
    );
    setFunctions(loaded.flat());
  }, [versionPath]);

  useEffect(() => {
    if (open && functions === null) void load();
  }, [open, functions, load]);

  // Reload when the reader moves to another version.
  useEffect(() => {
    setFunctions(null);
  }, [versionPath]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // `/` and the Cmd+K that readers expect from a docs site both open it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // The function index is in memory, so it filters as you type; Algolia is a request per
  // keystroke without this.
  useEffect(() => {
    if (!algolia || !query.trim()) {
      setDocs([]);
      return;
    }
    let live = true;
    const timer = setTimeout(() => {
      searchDocs(algolia, query, version.name)
        .then((hits) => live && setDocs(hits))
        .catch(() => live && setDocs([]));
    }, 150);
    return () => {
      live = false;
      clearTimeout(timer);
    };
  }, [algolia, query, version.name]);

  const fnHits = useMemo(() => rank(functions ?? [], query, 8), [functions, query]);

  // Prose first, then functions. A fixed order on purpose: the function index is fetched
  // when the dialog opens, so anything conditional on it reorders the list under the
  // reader depending on whether that fetch has landed.
  const rows: Row[] = useMemo(() => {
    const prose: Row[] = docs.map((hit) => ({ kind: 'doc', hit }));
    const fns: Row[] = fnHits.map((hit) => ({ kind: 'fn', hit }));
    return [...prose, ...fns];
  }, [fnHits, docs]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const go = (row: Row) => {
    setOpen(false);
    setQuery('');
    const href = row.kind === 'fn' ? hrefFor(row.hit) : row.hit.url;
    // Algolia stores absolute URLs; the router wants a path.
    history.push(href.replace(/^https?:\/\/[^/]+/, ''));
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((i) => Math.min(i + 1, rows.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && rows[selected]) {
      e.preventDefault();
      go(rows[selected]);
    }
  };

  // Group headings, rendered where the group actually starts.
  const headingFor = (i: number): string | null => {
    const kind = rows[i].kind;
    if (i > 0 && rows[i - 1].kind === kind) return null;
    return kind === 'fn' ? 'Functions' : 'Documentation';
  };

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen(true)}
        aria-label="Search the documentation"
      >
        <span className={styles.triggerIcon} aria-hidden="true">
          ⌕
        </span>
        <span className={styles.triggerLabel}>Search</span>
        <kbd className={styles.kbd}>/</kbd>
      </button>

      {open && (
        <div
          className={styles.backdrop}
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className={styles.dialog} role="dialog" aria-modal="true" aria-label="Search">
            <input
              ref={inputRef}
              type="search"
              className={styles.input}
              placeholder={`Search the documentation and ${functions?.length ?? 0} functions…`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onInputKey}
              aria-label="Search the documentation"
            />

            {query.trim() && (
              <ul className={styles.results}>
                {rows.length === 0 && <li className={styles.empty}>No match.</li>}
                {rows.map((row, i) => {
                  const heading = headingFor(i);
                  const href =
                    row.kind === 'fn'
                      ? hrefFor(row.hit)
                      : row.hit.url.replace(/^https?:\/\/[^/]+/, '');
                  return (
                    <React.Fragment key={`${row.kind}:${href}`}>
                      {heading && <li className={styles.groupLabel}>{heading}</li>}
                      <li>
                        <a
                          href={href}
                          className={i === selected ? `${styles.hit} ${styles.active}` : styles.hit}
                          onMouseEnter={() => setSelected(i)}
                          onClick={(e) => {
                            e.preventDefault();
                            go(row);
                          }}
                        >
                          <span className={styles.hitTop}>
                            {row.kind === 'fn' ? (
                              <>
                                <code className={styles.name}>
                                  {highlight(row.hit.name, query, styles.mark)}
                                </code>
                                <span className={styles.meta}>
                                  {row.hit.source} · {row.hit.category}
                                </span>
                              </>
                            ) : (
                              <>
                                <span className={styles.docTitle}>
                                  {highlight(row.hit.title, query, styles.mark)}
                                </span>
                                <span className={styles.meta}>{row.hit.breadcrumb}</span>
                              </>
                            )}
                          </span>
                          {row.kind === 'fn'
                            ? row.hit.description && (
                                <span className={styles.desc}>{row.hit.description}</span>
                              )
                            : row.hit.snippet && (
                                <span className={styles.desc}>{row.hit.snippet}</span>
                              )}
                        </a>
                      </li>
                    </React.Fragment>
                  );
                })}
              </ul>
            )}

            <div className={styles.footer}>
              <span>
                <kbd className={styles.kbd}>↑</kbd> <kbd className={styles.kbd}>↓</kbd> to
                navigate, <kbd className={styles.kbd}>↵</kbd> to open,{' '}
                <kbd className={styles.kbd}>esc</kbd> to close
              </span>
              <span>{version.label ?? version.name}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
