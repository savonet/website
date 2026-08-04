import React, { useEffect, useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

// Index of one API reference (core, extras or deprecated) for a single version. The data
// is fetched rather than imported so that ~900 function entries stay out of the JS
// bundle: only visitors who open a reference page pay for it.

type Fn = {
  name: string;
  anchor: string;
  page: string;
  category: string;
  description: string;
};

type Category = { slug: string; label: string; count: number };

type Index = {
  base: string;
  categories: Category[];
  functions: Fn[];
  anchors: Record<string, string>;
};

function highlight(text: string, query: string) {
  if (!query) return text;
  const at = text.toLowerCase().indexOf(query.toLowerCase());
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <mark className={styles.mark}>{text.slice(at, at + query.length)}</mark>
      {text.slice(at + query.length)}
    </>
  );
}

/** Rank exact and prefix matches above substring matches, then shorter names first. */
function score(fn: Fn, q: string): number {
  const name = fn.name.toLowerCase();
  if (name === q) return 0;
  if (name.startsWith(q)) return 1;
  if (name.includes(q)) return 2;
  if (fn.description.toLowerCase().includes(q)) return 3;
  return Infinity;
}

export default function ApiIndex({ src }: { src: string }): React.ReactElement {
  const [index, setIndex] = useState<Index | null>(null);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let live = true;
    fetch(src)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data) => live && setIndex(data))
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, [src]);

  // This page is served at the URL the old single-page reference used, so inbound links
  // like /doc-2.4.5/reference.html#output.icecast still arrive here. Forward them to the
  // category page that now owns the anchor.
  useEffect(() => {
    if (!index) return;
    const anchor = decodeURIComponent(window.location.hash.slice(1));
    if (!anchor) return;
    const page = index.anchors[anchor];
    if (page) window.location.replace(`${index.base}/${page}#${anchor}`);
  }, [index]);

  const results = useMemo(() => {
    if (!index) return [];
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index.functions
      .map((fn) => ({ fn, s: score(fn, q) }))
      .filter(({ s }) => s !== Infinity)
      .sort((a, b) => a.s - b.s || a.fn.name.length - b.fn.name.length || a.fn.name.localeCompare(b.fn.name))
      .slice(0, 200);
  }, [index, query]);

  if (failed) return <p>Could not load the function index.</p>;

  const total = index?.functions.length ?? 0;

  return (
    <div className={styles.wrapper}>
      <input
        type="search"
        className={styles.search}
        // Not autofocused: this sits below the page intro, and stealing focus would
        // scroll the reader past it.
        placeholder={total ? `Search ${total} functions…` : 'Loading…'}
        aria-label="Search functions"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={!index}
      />

      {query.trim() ? (
        <>
          <p className={styles.count}>
            {results.length === 0
              ? 'No match.'
              : `${results.length}${results.length === 200 ? '+' : ''} match${results.length === 1 ? '' : 'es'}`}
          </p>
          <ul className={styles.results}>
            {results.map(({ fn }) => (
              <li key={`${fn.page}#${fn.anchor}`}>
                <Link to={`${index!.base}/${fn.page}#${fn.anchor}`} className={styles.result}>
                  <code className={styles.name}>{highlight(fn.name, query.trim())}</code>
                  <span className={styles.category}>{fn.category}</span>
                </Link>
                {fn.description && <p className={styles.description}>{fn.description}</p>}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <ul className={styles.grid}>
          {(index?.categories ?? []).map((c) => (
            <li key={c.slug}>
              <Link to={`${index!.base}/${c.slug}`} className={styles.card}>
                <span className={styles.cardLabel}>{c.label}</span>
                <span className={styles.cardCount}>
                  {c.count} function{c.count === 1 ? '' : 's'}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
