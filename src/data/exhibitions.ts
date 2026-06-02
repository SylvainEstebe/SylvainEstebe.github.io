/**
 * Exhibitions — where photographs have been shown.
 *
 * Add an entry per show. Newest first.
 *
 * The `id` is what links photos to an exhibition: set the same string on a
 * photo's `exhibition` field in `photos.meta.ts`, and that photo renders under
 * this exhibition's heading on /photos. Exhibitions with at least one photo
 * show as a titled gallery group; the rest just sit in the record.
 */

export interface Exhibition {
  /** Stable id used to tag photos (e.g. 'linen-light-2026'). */
  id: string;
  title: string;
  venue: string;
  city?: string;
  /** Free-form date string, e.g. "May 2025" or "Mar–Apr 2024". */
  date: string;
  link?: string;
  /** A line of context (group show, theme, etc.). Kept short. */
  note?: string;
}

export const exhibitions: Exhibition[] = [
  {
    id: 'thresholds',
    title: 'Thresholds',
    venue: 'neuroMONSTER 2026',
    city: 'Rome',
    date: 'June 2026',
    // link: 'https://...', // neuroMONSTER site, if you want to link it
    note: 'My first exhibition — a small series on windows, doorways, and the views they frame.',
  },
];
