# ResumeForge — Next.js site

A real, deployable Next.js (App Router) version of the resume builder, with one
URL per page, per-page titles/meta descriptions, a generated sitemap, robots.txt,
and Schema.org structured data.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Accessibility & paper size

- **Keyboard & screen readers**: visible focus rings on all interactive
  elements, a skip-to-content link, `aria-expanded`/`aria-controls` on the
  accordion sections in the builder, and an `aria-label` on the resume
  strength/ATS match ring (which is otherwise a purely visual SVG).
- **Color contrast**: checked against WCAG AA. One real failure was found and
  fixed — the gold heading color used on the light resume-paper background
  only hit 3.1:1 (below the 4.5:1 required for normal-size text); it's now
  `--gold-deep-print` (`#8F6421`) on paper backgrounds specifically, which
  hits 4.9:1. The original `--gold-deep` is unchanged for use against dark
  backgrounds, where it already passed.
- **Not done yet**: a full manual screen-reader pass (VoiceOver/NVDA) and a
  proper automated audit (axe or Lighthouse) haven't been run — worth doing
  before a real launch, especially on the accordion and the PDF export flow.
- **Paper size**: PDF export supports both US Letter and A4, with a toggle in
  the Builder and Cover Letter Builder. It defaults based on the browser's
  locale (`navigator.language`) — US/Canada get Letter, everyone else gets
  A4 — and remembers the last explicit choice in `localStorage`.

## Templates

16 templates total, listed in `lib/data.js` (`TEMPLATES`) and implemented in
`components/PaperTemplates.jsx`. Two are marked `ats: false` (Sidebar and
Skill Bars) since their layout — a real two-column sidebar, and decorative
proficiency bars — is visual-first and may not parse cleanly through
applicant tracking software; the rest are single-column and ATS-safe.

## What's in here

- `app/` — one route per page (`/`, `/builder`, `/my-resumes`, `/templates`,
  `/cover-letter`, `/examples`, `/ats-checker`, `/blog`, `/blog/[slug]`,
  `/about`, `/contact`, `/privacy`), each with its own `metadata` export
  (unique title + description).
- `app/sitemap.js` and `app/robots.js` — Next's built-in metadata-route
  conventions. These generate real `/sitemap.xml` and `/robots.txt` at build time.
- `components/JsonLd.jsx` — renders Schema.org structured data. Used on the
  home page (Organization/WebSite), templates page (ItemList), ATS checker
  (SoftwareApplication), blog + blog posts (Blog/BlogPosting), about
  (AboutPage), and contact (ContactPage).
- `lib/data.js` — all shared data (sample resumes, templates list, 9 blog
  posts, the ATS keyword-match logic) in one place, importable from both
  server and client components.
- `lib/storage.js` — save/load/delete for resumes, backed by the browser's
  `localStorage`. No account, no server — a saved resume lives on that one
  browser/device only. See `components/SavedResumesClient.jsx` (the
  `/my-resumes` page) and the Save button in `components/BuilderClient.jsx`.
- `lib/pdf.js` — the PDF export pipeline. Worth reading if you touch export
  quality: it waits for web fonts to finish loading before snapshotting (so
  exported text doesn't shift from a fallback-font mismatch), trims trailing
  whitespace from the capture (so a one-page resume doesn't spawn an
  almost-blank second page), renders at a higher resolution for crisp print
  text, and adds real page margins instead of edge-to-edge bleed.
- `components/*Client.jsx` — the interactive pieces (Builder, Cover Letter,
  ATS Checker, Examples, Contact form, Saved Resumes) are Client Components.
  Everything else (Home, Templates gallery, About, Privacy, Blog list/detail)
  is a Server Component, which is better for both performance and crawlability.

Note that `/my-resumes` is marked `noindex` in its metadata — its content is
per-browser (via localStorage) and empty until JS hydrates, so there's
nothing useful for a search engine to index there.

## Before you deploy this for real

1. **Do a real trademark check on "ResumeForge."** I picked it because you
   asked for it and it's a reasonable, fairly generic-sounding name — but I
   can't do actual legal clearance. Before you commit to it, search the
   [USPTO trademark database](https://tmsearch.uspto.gov) (and your own
   country's equivalent if you're not US-based) plus a plain web search, to
   make sure nothing conflicting is already registered in software/careers.

2. **Set your real domain.** Open `lib/data.js` and change:
   ```js
   export const SITE_URL = "https://your-domain.example.com";
   ```
   This value feeds the sitemap, robots.txt, canonical URLs, and JSON-LD — it
   has to be your actual production domain for any of that to be correct.

3. **Wire up the Contact form.** It currently just shows a "message ready"
   confirmation and doesn't send anything (see `components/ContactFormClient.jsx`).
   Point it at a form service (e.g. Formspree) or your own API route.

4. **Have the Privacy Policy and Terms of Service reviewed.**
   `app/privacy/page.jsx` and `app/terms/page.jsx` are plain, honest starting
   templates, not legal advice — especially important once you're operating
   across multiple countries' legal systems, which have different
   requirements (the EU and California in particular).

5. **Check `npm audit`.** This project pins `next@14.2.35`, the latest patched
   release in the 14.x line. `npm audit` will likely still flag a couple of
   advisories that affect newer major versions too — from a quick read, they
   mostly involve features this project doesn't use (the built-in Image
   Optimizer, custom Middleware, i18n rewrites). Worth a proper look before you
   go live, and worth planning a Next.js 15/16 upgrade at some point — that's a
   bigger jump (some APIs, like route `params`, become async) so budget real
   testing time for it rather than upgrading blind.

6. **Run a real accessibility audit** (axe DevTools or Lighthouse) and a
   manual pass with a screen reader. This round fixed the issues I could
   verify concretely — contrast ratios and missing ARIA/keyboard support —
   but a proper audit tool will catch things a code read won't.

## Deploying

The easiest path is [Vercel](https://vercel.com) (made by the Next.js team):
push this to a GitHub repo and import it — no config needed. Any host that
runs Node and Next.js works too (Netlify, Railway, your own server, etc.).

## After deploying, for actual SEO

Code alone doesn't make Google rank a page — it just removes the technical
blockers. After deploying:
- Submit the site in [Google Search Console](https://search.google.com/search-console)
  and submit `/sitemap.xml` there.
- Give it time and, ideally, real inbound links and content — that's what
  actually drives ranking.
