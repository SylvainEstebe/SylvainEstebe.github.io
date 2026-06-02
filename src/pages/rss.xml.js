import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  // RSS only emits published entries — drafts never go in the feed.
  const entries = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );

  return rss({
    title: 'Sylvain Estebe — Blog',
    description:
      'Essays and notes on computational cognitive science, cultural evolution, and adjacent topics.',
    site: context.site,
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description ?? '',
      pubDate: entry.data.pubDate,
      link: `/blog/${entry.id.replace(/\/index$/, '')}/`,
      categories: entry.data.tags,
    })),
    customData: '<language>en</language>',
  });
}
