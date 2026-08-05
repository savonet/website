import React from 'react';

// Shared by the reference index pages and the navbar search, so both rank identically.

export type Fn = {
  name: string;
  anchor: string;
  page: string;
  category: string;
  description: string;
};

export type Category = { slug: string; label: string; count: number };

export type Index = {
  base: string;
  categories: Category[];
  functions: Fn[];
  anchors: Record<string, string>;
};

/** A function plus which reference it came from, for searches spanning several. */
export type Hit = Fn & { base: string; source?: string };

/** Exact beats prefix beats substring beats a description-only match. */
export function score(fn: Fn, query: string): number {
  const name = fn.name.toLowerCase();
  if (name === query) return 0;
  if (name.startsWith(query)) return 1;
  if (name.includes(query)) return 2;
  if (fn.description.toLowerCase().includes(query)) return 3;
  return Infinity;
}

export function rank(hits: Hit[], query: string, limit = 200): Hit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return hits
    .map((fn) => ({ fn, s: score(fn, q) }))
    .filter(({ s }) => s !== Infinity)
    .sort(
      (a, b) =>
        a.s - b.s || a.fn.name.length - b.fn.name.length || a.fn.name.localeCompare(b.fn.name)
    )
    .slice(0, limit)
    .map(({ fn }) => fn);
}

export function highlight(text: string, query: string, className: string): React.ReactNode {
  const q = query.trim();
  if (!q) return text;
  const at = text.toLowerCase().indexOf(q.toLowerCase());
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <mark className={className}>{text.slice(at, at + q.length)}</mark>
      {text.slice(at + q.length)}
    </>
  );
}

export function hrefFor(fn: Hit): string {
  return `${fn.base}/${fn.page}#${fn.anchor}`;
}

/** Fetch an index, or null if this version does not publish that reference. */
export async function loadIndex(url: string): Promise<Index | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return (await res.json()) as Index;
  } catch {
    return null;
  }
}
