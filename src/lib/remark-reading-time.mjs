import { toString } from 'mdast-util-to-string';
import getReadingTime from 'reading-time';

/**
 * Adds `minutesRead` to each Markdown/MDX entry's `remarkPluginFrontmatter`.
 * Access at render time via: const { remarkPluginFrontmatter } = await render(entry);
 */
export function remarkReadingTime() {
  return function (tree, { data }) {
    const text = toString(tree);
    const { text: minutesRead } = getReadingTime(text);
    data.astro.frontmatter.minutesRead = minutesRead;
  };
}
