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
  /** Venue — optional while a show is still being arranged. */
  venue?: string;
  city?: string;
  /** Free-form date / status string, e.g. "May 2025" or "In preparation". */
  date?: string;
  link?: string;
  /** A line of context (group show, theme, etc.). Kept short. */
  note?: string;
}

export const exhibitions: Exhibition[] = [
  {
    id: 'romantic-love',
    title: 'Romantic love',
    // Venue and date to be confirmed — exhibition in preparation.
    date: 'In preparation',
    note: 'A photographic companion to my research with Nicolas Baumard on the rise of romantic love in French fiction.',
  },
];
