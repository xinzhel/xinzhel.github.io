# Design — Academic Homepage (`xinzhel.github.io`)

## Overview

We build a static, single-page academic homepage hosted on GitHub Pages. We choose a
**zero-build static site** (hand-authored HTML + one CSS file + minimal JS) over a
Jekyll template (academicpages / al-folio) because:

- Content volume is small (one bio, ~10 publications, short experience list).
- No Ruby/Jekyll toolchain to install or maintain; we push files and they go live.
- Static HTML keeps publications visible to general web crawlers (Google/Bing), which
  read raw HTML and do not reliably run JavaScript.

The Jekyll route is recorded as a deferred alternative (see *Alternatives*).

## Architecture

GitHub Pages serves the repo `xinzhel.github.io` from a GitHub Actions workflow that
publishes the repo files as-is. No application build.

```
xinzhel.github.io/                 <- separate GitHub repo (user site)
├── index.html                     <- single source of truth for all sections
│                                     (hero, research, news, pubs, teaching, service, contact)
├── assets/
│   ├── css/style.css              <- layout, responsive, light/dark
│   ├── js/theme.js                <- optional: theme toggle, footer year (progressive enhancement)
│   └── img/avatar.png             <- headshot
├── .github/workflows/deploy.yml   <- GitHub Actions: publish static files to Pages
├── .nojekyll                      <- tells GitHub Pages to skip Jekyll, serve files as-is
├── .gitignore                     <- ignores .DS_Store
├── CNAME                          <- only if a custom domain is added later (out of scope)
└── README.md                      <- how to edit & deploy
```

`index.html` is the single source of truth for publication details — they are written
directly as static HTML (no separate data file, no JS rendering) so crawlers read them
directly. `theme.js` is progressive enhancement only — the page is fully usable with JS
disabled.

Note: an earlier draft kept a `data/publications.json` inventory, but it duplicated the
hardcoded HTML with no runtime use and created a manual sync burden, so it was removed.

```
Browser ──GET──▶ GitHub Pages ──serves──▶ index.html + assets/  (no server logic)
```

## Build & Deploy Workflow

The repo `xinzhel/xinzhel.github.io` already existed but held an unused 2020–2022 Jekyll
blog scaffold (default branch `master`, private). Its full content is backed up at
`resume/xinzhel.github.io-master.zip`, so we reset it to a clean state rather than
preserving the old history.

1. Clone the existing repo locally.
2. Replace all Jekyll files with the new static site (`index.html`, `assets/`,
   `README.md`). Add an empty **`.nojekyll`** file so Pages serves files as-is.
3. Reset to a clean history (fresh orphan branch `main`) and force-push (old content is
   backed up in the zip).
4. Make the repo **public** (required for GitHub Pages on a free plan).
5. Deploy via **GitHub Actions** (`.github/workflows/deploy.yml`, `build_type: workflow`)
   rather than the legacy branch builder, which failed with opaque, log-less errors.
   Each push to `main` runs the workflow and publishes within ~1 minute.

Local preview: `python3 -m http.server` from the site root (no build needed).

## Components and Interfaces

### index.html sections
- `<header>` / hero: avatar, name, role, and one-paragraph bio (profile links live in the footer/contact, not here).
- `#research`: 3–4 themed bullets (tree search, Chain-in-Tree, cross-trajectory memory,
  inference↔training loop).
- `#news`: short `<ul>` of aggregated highlights (recency window ~2 years, newest first;
  soft cap ~8 lines), e.g., "Sep 2026 — Two papers accepted at ACL 2026". Rolled-up
  signal, not one line per paper; omit the section if nothing falls in the window.
- `#publications`: ordered list; each `<li>` carries title, author line (with "Xinzhe Li"
  bolded), venue badge, and paper/arxiv/code links. Written as static HTML so crawlers
  read it directly. We do NOT add `citation_*` meta tags here: Google Scholar indexes from
  publishers/arXiv, not personal pages, and those tags only pay off when each paper has
  its own URL — out of scope for a single page. (Deferred; revisit if we split papers
  into per-paper pages.)
- `#teaching`: courses taught (year range, code/title, institution), e.g.,
  "2023–2025 — SIT720 Machine Learning, Deakin University". Stable list.
- `#service`: reviewer roles.
- `#contact`: email + links (no phone, no referees).

### assets/css/style.css
- CSS custom properties for color tokens; `prefers-color-scheme` for dark mode.
- Responsive via a single max-width container + fl/grid; one breakpoint (~720px).

### assets/js/theme.js (optional)
- Flips a `data-theme` attribute via a toggle button, persists choice to `localStorage`;
  also sets the footer year. Progressive enhancement only — no effect on content.

## Data Models

No separate data file. Each publication is authored directly as a static `<li>` in
`index.html`'s `#publications` list, carrying: title, author line (with `<strong>` around
"Xinzhe Li"), venue badge, and links (`paper` / `arxiv` / `code`). Under-review and
preprint items use a distinct badge style. `index.html` is the single source of truth;
statuses and links are updated in place as papers progress.

### Content inventory (mapped from sources)
- **Identity/bio**: resume header + cover-letter opening; includes current RMIT role and
  PhD (Deakin), since there is no separate Experience/Education section.
- **Research program**: cover-letter paragraphs (surveys → LiTS → Chain-in-Tree →
  memory → inference/training loop).
- **Publications**: resume "Academic Publications" (10 entries, all first-author).
- **Service**: resume "Academic Service" section.
- **Teaching**: course list (codes/titles from the user, more specific than the resume):
  SIT720 Machine Learning (2023–2025), SIT744 Deep Learning (2024), Deakin University.
- **Excluded**: employment history & education list (resume-like; essentials folded into
  bio), phone number, referees (privacy).

## Example Usage

Adding a newly accepted paper:
1. Add a `<li>` to the `#publications` list in `index.html` (title, author line with
   `<strong>Xinzhe Li</strong>`, venue badge, and `paper`/`arxiv`/`code` links).
2. Optionally add/refresh one aggregated `#news` highlight (e.g., "Sep 2026 — Two papers
   accepted at ACL 2026"); drop highlights that fall outside the ~2-year window.
3. Commit and push to `main`; the GitHub Actions workflow deploys within ~1 minute.
4. Commit and push; live in ~1 minute.

## Alternatives (deferred)

- **academicpages (Jekyll)**: richer structure (talks, teaching, portfolio, Markdown
  publications) but needs Ruby/Jekyll and a build step. Reconsider if the site grows
  beyond a single page.
- **Per-paper pages + `citation_*` meta tags**: one URL per paper would let Scholar parse
  each paper's metadata cleanly. Deferred — only worth it if we want Scholar to treat the
  homepage as a citation source, which is rarely how Scholar discovers papers.
- **JS-rendered publications from JSON**: removes HTML/JSON duplication but crawlers
  (which do not run JS) would see an empty list. Rejected.

## Q&A

### Q1: What does "`js/theme.js` — theme toggle, smooth-scroll (progressive enhancement)" mean?

It describes a small, optional JavaScript file with two minor UI niceties, plus the
principle governing how it behaves.

- **Theme toggle** — a ☀️/🌙 button that lets a visitor manually switch light/dark mode.
  The site already auto-detects the system preference via CSS (`prefers-color-scheme`), so
  this toggle is just an override. The JS flips a `data-theme` attribute and persists the
  choice to `localStorage` so it's remembered next visit.
- **Smooth-scroll** — clicking an in-page nav link (e.g., "Publications" → `#publications`)
  glides to the section instead of jumping. Cosmetic only. Modern CSS can do this alone
  via `scroll-behavior: smooth`, so the JS isn't strictly required for it.
- **Progressive enhancement** — the key principle: the page must be fully functional and
  readable with **no JavaScript**. JS only adds polish on top. With JS disabled (or for a
  crawler that doesn't run JS), all content, publications, links, and sections still
  display and work, and the page still respects the system light/dark preference (that's
  CSS). The visitor only loses the manual toggle and the scroll animation — nothing
  essential. We deliberately keep all *content* in static HTML/CSS and confine JS to
  non-essential extras.

Practical takeaway: `theme.js` is genuinely optional. The homepage could ship with zero
JavaScript (CSS-only dark mode, CSS-only smooth scroll) and lose almost nothing.

### Q2: What does "`css/style.css` — layout, responsive, light/dark" define?

`style.css` is the single stylesheet controlling how the homepage *looks*. The HTML holds
content and structure; this file holds all visual rules. The three tags name its jobs:

- **Layout** — positioning and spacing: the centered content column and its max width,
  margins/padding, vertical rhythm between sections, fonts and sizes, heading styles, link
  colors, the look of the publication list and venue badges. It turns plain HTML into a
  designed page.
- **Responsive** — rules that adapt the layout to screen size (phone/tablet/desktop) via a
  media query at one breakpoint (~720px): above it, elements may sit side by side with
  comfortable margins; below it, content collapses into a single full-width column with
  larger touch targets and no horizontal scrolling. Works together with the HTML
  `<meta name="viewport">` tag.
- **Light/dark** — defines two color schemes via CSS custom properties (e.g., `--bg`,
  `--text`) set for light mode and overridden for dark, switched with
  `@media (prefers-color-scheme: dark)` so the page matches the visitor's system setting.
  If `theme.js` is present, its manual toggle flips a `data-theme` attribute that the same
  variables respond to.

In one sentence: `style.css` defines visual design (layout/typography), adaptation to
screen size (responsive), and color theming (light/dark) — with no effect on the content
itself, which lives in the HTML.
