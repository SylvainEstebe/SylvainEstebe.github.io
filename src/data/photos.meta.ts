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
  },
  'curtains-evening.jpg': {
    alt: 'Sheer light curtains backlit by late-afternoon sun, with dark garden foliage visible beyond.',
    caption: 'Garden light, through linen.',
    // location: 'Aarhus',
  },

  // ── Romantic love (exhibition) ──────────────────────────────────────────
  'rome-fountain-couple.jpg': {
    alt: 'An older couple sit close together on the rim of a Baroque fountain in a Roman piazza at dusk, lit restaurants glowing behind them.',
    caption: 'Piazza Navona, at dusk.',
    exhibition: 'romantic-love',
  },
  'black-sheep-pair.jpg': {
    alt: 'Two black sheep stand side by side in tall summer grass, both looking straight at the camera.',
    caption: 'A pair.',
    exhibition: 'romantic-love',
  },
  'prague-rain-embrace.jpg': {
    alt: 'A couple embrace under an umbrella in a rainy city square while others pass with colourful umbrellas, a Baroque church behind.',
    caption: 'Prague, in the rain.',
    exhibition: 'romantic-love',
  },
  'beach-couple-walking.jpg': {
    alt: 'A couple walk hand in hand along an empty sandy beach toward a calm sea at golden hour.',
    caption: 'Toward the water.',
    exhibition: 'romantic-love',
  },
  'mountain-lake-two.jpg': {
    alt: 'Two people stand with their backs to the camera on open moorland, looking out over a mountain lake under a grey sky.',
    caption: 'At the lake.',
    exhibition: 'romantic-love',
  },
  'beach-couple-dog.jpg': {
    alt: 'A couple walk a small dog along the waterline of a calm beach at golden hour, a Danish summer house among trees behind them, seen from across the water.',
    caption: 'Evening walk.',
    exhibition: 'romantic-love',
  },
  'dune-cyclists.jpg': {
    alt: 'Two people cycle away down a paved path between dunes toward the sea at sunset — one with a yellow basket, the other a child in a yellow helmet.',
    caption: 'Into the light.',
    exhibition: 'romantic-love',
  },
};
