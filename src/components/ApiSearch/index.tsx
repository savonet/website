import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useActiveDocContext, useLatestVersion } from '@docusaurus/plugin-content-docs/client';
import { hrefFor, highlight, loadIndex, rank, type Hit } from './search';
import styles from './styles.module.css';

// Searches the API reference from the navbar, spanning the core and extra references of
// whichever version the reader is on. The indexes are fetched when the dialog first
// opens, not on page load: together they are ~60KB gzipped and most visits never need
// them. Deprecated functions are left out on purpose -- they would crowd the results.
const REFERENCES: { file: string; source: string }[] = [
  { file: 'reference', source: 'Core' },
  { file: 'reference-extras', source: 'Extra' },
];

export default function ApiSearch(): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState<Hit[] | null>(null);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();

  // On a doc page use the version being read; elsewhere fall back to the latest release.
  const active = useActiveDocContext(undefined);
  const latest = useLatestVersion(undefined);
  const version = active?.activeVersion ?? latest;
  const versionPath = useBaseUrl(version.path);

  const load = useCallback(async () => {
    const loaded = await Promise.all(
      REFERENCES.map(async ({ file, source }) => {
        const index = await loadIndex(`${versionPath}/${file}-index.json`);
        // A version that does not publish a given reference simply contributes nothing.
        // The index's own `base` is ignored: it is site-absolute and predates subpath
        // deploys, whereas versionPath already has baseUrl applied.
        return index
          ? index.functions.map((fn) => ({ ...fn, base: `${versionPath}/${file}`, source }))
          : [];
      })
    );
    setHits(loaded.flat());
  }, [versionPath]);

  useEffect(() => {
    if (open && hits === null) void load();
  }, [open, hits, load]);

  // Reload when the reader moves to another version.
  useEffect(() => {
    setHits(null);
  }, [versionPath]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // `/` opens search, the way most docs sites behave. Cmd+K is deliberately left free
  // for Algolia, which would otherwise clash once site-wide search lands.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
      if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const results = useMemo(() => rank(hits ?? [], query, 40), [hits, query]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const go = (hit: Hit) => {
    setOpen(false);
    setQuery('');
    history.push(hrefFor(hit));
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selected]) {
      e.preventDefault();
      go(results[selected]);
    }
  };

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen(true)}
        aria-label="Search the API reference"
      >
        <span className={styles.triggerIcon} aria-hidden="true">
          ⌕
        </span>
        <span className={styles.triggerLabel}>Search API</span>
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
          <div className={styles.dialog} role="dialog" aria-modal="true" aria-label="API search">
            <input
              ref={inputRef}
              type="search"
              className={styles.input}
              placeholder={
                hits === null
                  ? 'Loading…'
                  : `Search ${hits.length} functions in ${version.label ?? version.name}…`
              }
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onInputKey}
              aria-label="Search the API reference"
            />

            {query.trim() && (
              <ul className={styles.results}>
                {results.length === 0 && <li className={styles.empty}>No match.</li>}
                {results.map((hit, i) => (
                  <li key={`${hit.source}:${hit.page}#${hit.anchor}`}>
                    <a
                      href={hrefFor(hit)}
                      className={i === selected ? `${styles.hit} ${styles.active}` : styles.hit}
                      onMouseEnter={() => setSelected(i)}
                      onClick={(e) => {
                        e.preventDefault();
                        go(hit);
                      }}
                    >
                      <span className={styles.hitTop}>
                        <code className={styles.name}>
                          {highlight(hit.name, query, styles.mark)}
                        </code>
                        <span className={styles.meta}>
                          {hit.source} · {hit.category}
                        </span>
                      </span>
                      {hit.description && <span className={styles.desc}>{hit.description}</span>}
                    </a>
                  </li>
                ))}
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
