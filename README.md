# sylvainestebe.github.io

Personal site built with [Astro](https://astro.build). Minimal academic style with blue accent, light/dark toggle, and zero JS frameworks.

## Structure

```
.
├── public/               # static assets (served as-is)
│   ├── favicon.svg
│   ├── profile.jpg
│   └── cv.pdf            # ← add your CV here
├── src/
│   ├── components/       # reusable pieces
│   │   ├── BlogCard.astro
│   │   ├── GithubLink.astro
│   │   ├── Project.astro
│   │   ├── SocialLinks.astro
│   │   ├── TableOfContents.astro
│   │   └── ThemeToggle.astro
│   ├── content/
│   │   └── blog/         # blog posts and notes live here (.md / .mdx)
│   ├── content.config.ts # blog collection schema
│   ├── lib/
│   │   └── remark-reading-time.mjs
│   ├── layouts/
│   │   └── Layout.astro  # base HTML template + theme script
│   ├── pages/
│   │   ├── index.astro   # the home page (edit this for content)
│   │   ├── rss.xml.js    # RSS feed for the blog
│   │   └── blog/
│   │       ├── index.astro      # blog list (posts + notes)
│   │       ├── [...slug].astro  # individual entry
│   │       └── tags/[tag].astro # tag pages
│   └── styles/
│       └── global.css    # all styling (academic blue theme)
├── .github/workflows/
│   └── deploy.yml        # auto-deploys to GitHub Pages on push to main
├── astro.config.mjs
├── package.json
└── README.md
```

## First-time setup (local)

1. Make sure Node.js 20+ is installed: `node --version`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add `cv.pdf` to the `public/` folder
4. Start the dev server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:4321`

## Deploying to GitHub Pages

### One-time GitHub setup

1. Create a repo on GitHub named **exactly** `SylvainEstebe.github.io` (user site convention — case-sensitive)
2. Go to **Settings → Pages** on that repo
3. Under "Build and deployment", set **Source** to **"GitHub Actions"** (not "Deploy from branch")

### First deploy

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin git@github.com:SylvainEstebe/SylvainEstebe.github.io.git
git push -u origin main
```

The GitHub Action in `.github/workflows/deploy.yml` will automatically:
- Install dependencies
- Run `npm run build`
- Deploy the `dist/` folder to GitHub Pages

Wait ~2 minutes. Site will be live at `https://sylvainestebe.github.io`.

### Future updates

Just edit content (usually in `src/pages/index.astro`), then:

```bash
git add .
git commit -m "Update"
git push
```

Action rebuilds and redeploys automatically.

## Editing content

Almost everything lives in `src/pages/index.astro`. To add a new project, use the `<Project>` component:

```astro
<Project
  title="Your project title"
  status="Optional status line in italic"
>
  Description with **markdown-like** text and <a href="...">links</a>.
</Project>
```

To add a new update line, add an `<li>` to the `.updates` list.

## Writing blog posts

Posts and notes live in `src/content/blog/`. Two formats are supported:

- **`.md`** — plain Markdown. Use for short notes and most posts.
- **`.mdx`** — Markdown that can `import` and use Astro components. Use when you want custom embeds or interactive bits inside a post.

### Frontmatter

```yaml
---
title: "Post title"
description: "One-line summary (shown in lists, RSS, and meta tags)."
pubDate: 2026-05-27
updatedDate: 2026-06-10        # optional
type: post                     # "post" (long-form) or "note" (short)
tags: [bayesian, fiction]      # optional, generates /blog/tags/<tag> pages
cover: ./cover.jpg             # optional, relative to this file
coverAlt: "Description of the cover image"
draft: false                   # set true to hide from build
---
```

### Two ways to lay a post out

1. **Single file** (good for notes): `src/content/blog/quick-thought.md` → published at `/blog/quick-thought`.
2. **Folder with co-located assets** (good for posts with images): `src/content/blog/my-post/index.mdx` + `cover.jpg` and other images in the same folder. Published at `/blog/my-post`.

### Features that work out of the box

- **Footnotes**: GFM syntax — `like this[^1]` … `[^1]: the footnote text`.
- **Margin notes (Tufte-style)**: in `.mdx` files only.
  ```mdx
  import SideNote from '../../../components/SideNote.astro';

  Text with an aside.<SideNote>This shows up in the right margin on
  wide screens, and as a click-to-expand note on mobile.</SideNote>
  ```
- **Pull quotes** for emphasis (MDX only):
  ```mdx
  import Quote from '../../../components/Quote.astro';

  <Quote cite="George Box">All models are wrong, but some are useful.</Quote>
  ```
- **Drop cap** automatically on the first letter of each post's opening paragraph.
- **Reading progress bar** at the top of every post, **TOC scroll-spy** (active section highlighted), and **click any heading's `#`** to copy a permalink.
- **Images**: drop next to the post, reference as `![alt](./image.jpg)`. Automatic optimization, WebP, responsive `srcset`.
- **Code blocks**: triple-backtick with a language → syntax highlighting via Shiki (light/dark aware).
- **Table of contents**: auto-generated from headings, shown on long-form posts (≥3 `##` headings).
- **Reading time**: `~5 min read` shown on every post.
- **Tags**: each tag gets its own page at `/blog/tags/<tag>`.
- **RSS**: served at `/rss.xml`, includes both posts and notes.

## Photos

The `/photos` gallery is **auto-discovered**. To add a photo:

1. Drop the image (`.jpg` / `.jpeg` / `.png`) into `src/content/photos/`
2. (Optional) Add a caption / alt / location for it in `src/data/photos.meta.ts`, keyed by filename

That's it. The date is read from EXIF (`DateTimeOriginal`) at build time. Photos sort newest-first automatically. Responsive optimization, lazy loading, and a 1800px lightbox variant are generated by Astro's asset pipeline.

To override an EXIF date (scanned photo, faulty metadata, etc.), set `date: 'YYYY-MM-DD'` on the meta entry.

## Library

Books, films, and music live in `src/data/library.ts` — one typed array, with a `type` field. Sections render automatically on `/library`.

```ts
{
  type: 'book',  // or 'film' | 'music'
  title: 'The Secret of Our Success',
  by: 'Joseph Henrich',
  year: 2015,
  status: 'done',  // 'now' | 'done' | 'abandoned'
  rating: 5,
  link: 'https://...',
  note: 'One-line take.',
  date: '2025-11-12',  // used for ordering
}
```

### Quick start: new post

```bash
mkdir src/content/blog/my-post
# Drop your cover image into that folder, then create:
$EDITOR src/content/blog/my-post/index.mdx
```

Or for a quick note:

```bash
$EDITOR src/content/blog/$(date +%Y-%m-%d)-thought.md
```

## Customizing

- **Colors, fonts, spacing**: `src/styles/global.css` (CSS custom properties at top)
- **SEO title/description**: props passed to `<Layout>` in `index.astro`
- **Social links**: edit `src/components/SocialLinks.astro`
- **Favicon**: replace `public/favicon.svg`

## Local preview of production build

```bash
npm run build
npm run preview
```

Opens at `http://localhost:4321` showing the exact built output.
