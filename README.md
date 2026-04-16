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
│   │   ├── Project.astro
│   │   ├── SocialLinks.astro
│   │   └── ThemeToggle.astro
│   ├── layouts/
│   │   └── Layout.astro  # base HTML template + theme script
│   ├── pages/
│   │   └── index.astro   # the home page (edit this for content)
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
