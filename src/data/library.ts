import type { ImageMetadata } from 'astro';
// Film/book covers as local files: drop them in src/content/library/covers/
// then uncomment the matching import and reference it as `cover` below.
// import obsessionCover from '../content/library/covers/obsession.jpg';

/**
 * Library — books, films, and music worth recommending or remembering.
 *
 * To add an entry:
 *   - Pick a `type`: 'book' | 'film' | 'music'
 *   - Title is required; everything else is optional
 *   - `status: 'now'` shows a "now" badge (currently reading / watching / listening)
 *   - `note` is a one-line take
 *   - `cover` adds a thumbnail and makes the title clickable (→ detail page)
 *   - `quotes` are quotes you've highlighted; shown on the detail page
 *
 * Newer entries should go first within each section (sorted automatically).
 */

export type LibraryType = 'book' | 'film' | 'music';
export type LibraryStatus = 'now' | 'done' | 'abandoned';

export interface Quote {
  /** The quote text. */
  text: string;
  /** Optional citation context — page number, chapter, timestamp, track. */
  cite?: string;
}

export interface LibraryItem {
  type: LibraryType;
  title: string;
  /** Author / director / artist */
  by?: string;
  year?: number;
  status?: LibraryStatus;
  /** 1–5, optional */
  rating?: 1 | 2 | 3 | 4 | 5;
  link?: string;
  /** One-line take. */
  note?: string;
  /** When you added or finished it — used for ordering. YYYY-MM-DD. */
  date?: string;
  tags?: string[];
  /**
   * Cover image. Either:
   *   - a URL string (e.g., publisher page, OpenLibrary cover)
   *   - an imported ImageMetadata (drop the file in src/content/library/covers/)
   *
   * When present, the title becomes a link to /library/<type>/<slug>.
   */
  cover?: string | ImageMetadata;
  coverAlt?: string;
  /** Quotes you've liked from this item. Shown on the detail page. */
  quotes?: Quote[];
}

export const library: LibraryItem[] = [
  // ── Books ──────────────────────────────────────────────────────────────
  {
    type: 'book',
    title: 'The Man from the Future: The Visionary Life of John von Neumann',
    by: 'Ananyo Bhattacharya',
    year: 2021,
    status: 'now',
    link: 'https://www.penguin.co.uk/books/313993/the-man-from-the-future-by-bhattacharya-ananyo/9780241398876',
    date: '2026-05-15',
    tags: ['biography', 'history-of-science'],
    // Open Library cover by ISBN — stable, replace if you want the publisher cover.
    cover: 'https://covers.openlibrary.org/b/isbn/9780241398876-L.jpg',
    coverAlt: 'Cover of "The Man from the Future" by Ananyo Bhattacharya',
    // note: 'À écrire une fois fini — une ligne suffit.',
    quotes: [
      // Add quotes you've liked here. Example shape:
      // {
      //   text: "Of all the technological revolutions of the modern world, …",
      //   cite: "p. 12",
      // },
    ],
  },

  // ── Films ──────────────────────────────────────────────────────────────
  {
    type: 'film',
    title: 'Obsession',
    by: 'Curry Barker',
    // year: 2025, // ← confirme l'année de sortie
    status: 'done',
    date: '2026-05-27',
    tags: ['horror'],
    // To show the poster: save it as src/content/library/covers/obsession.jpg,
    // then uncomment the import at the top of this file AND the line below.
    // cover: obsessionCover,
    coverAlt: 'Poster for Obsession, directed by Curry Barker',
    note: 'The scariest film I’ve sat through — and I’ve seen a lot of horror. Romantic love taken past its failure point: the dark twin of the thing I study across five centuries of novels.',
    quotes: [
      { text: 'Votre relation est toxique ? La leur est mortelle.', cite: 'tagline' },
    ],
  },
];

// ── Helpers ────────────────────────────────────────────────────────────

/** Turn a title into a URL-friendly slug. */
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Items with extra content (cover or quotes) get a detail page. */
export function hasDetail(item: LibraryItem): boolean {
  return Boolean(item.cover) || (item.quotes !== undefined && item.quotes.length > 0);
}

/** Slugify only the main title (before a colon) so subtitles don't bloat URLs. */
function urlSlug(title: string): string {
  return slugify(title.split(':')[0].trim());
}

/** Stable URL path for a library item's detail page. */
export function detailPath(item: LibraryItem): string {
  return `/library/${item.type}/${urlSlug(item.title)}`;
}

export { urlSlug };
