/**
 * Editorial metadata for photos.
 *
 * Photos are auto-discovered from `src/content/photos/` (any `.jpg`/`.jpeg`).
 * Their date is read from EXIF (`DateTimeOriginal`) at build time.
 *
 * To add a caption / alt / location, add an entry below keyed by the filename.
 * Entries without metadata still show up — they just have no caption and a
 * generic alt.
 *
 * Optional `date` field here overrides EXIF (use it for scanned photos or
 * pictures whose EXIF lies).
 */

export interface PhotoMeta {
  alt?: string;
  caption?: string;
  location?: string;
  /** YYYY-MM-DD. Overrides EXIF DateTimeOriginal if present. */
  date?: string;
  /**
   * Exhibition id (must match an `id` in `data/exhibitions.ts`). Photos sharing
   * an id render together under that exhibition's heading on /photos.
   * Leave unset for loose photos — they appear in the main gallery at the top.
   */
  exhibition?: string;
}

export const photoMeta: Record<string, PhotoMeta> = {
  'ferry-deck-dusk.jpg': {
    alt: 'View through a ferry doorway onto the deck at dusk; a gull is silhouetted against pink-streaked clouds, the wet deck reflects the sky.',
    caption: 'From the threshold.',
    // location: 'North Sea',
  },
  'bedroom-window.jpg': {
    alt: 'A dim bedroom with a bare mattress and a single pillow; an open window frames a sunlit terracotta wall beyond.',
    caption: 'A room with a wall.',
    // location: 'Marrakech',
    exhibition: 'thresholds',
  },
  'curtains-evening.jpg': {
    alt: 'Sheer light curtains backlit by late-afternoon sun, with dark garden foliage visible beyond.',
    caption: 'Garden light, through linen.',
    // location: 'Aarhus',
    exhibition: 'thresholds',
  },
};
