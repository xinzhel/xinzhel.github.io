# Tasks — Academic Homepage (`xinzhel.github.io`)

## Task Dependency Graph

```
T1 ──→ T2 ──→ T3 ──┬──→ T4 ──┐
                   ├──→ T5 ──┼──→ T6 ──→ T7
                   └─────────┘
```

Legend:
- T1 — Clone repo & scaffold project structure
- T2 — Build publications data from the resume
- T3 — Build `index.html` content sections
- T4 — Style with `style.css` (layout, responsive, light/dark)
- T5 — Optional `theme.js` (progressive enhancement)
- T6 — Local preview & verification
- T7 — Deploy to GitHub Pages

Note: T4 and T5 both depend on T3 (the markup must exist to style/enhance). T6 depends on
T3–T5. T7 is the only step with irreversible/destructive actions (force-push, visibility
change) — keep it last and run with the backup zip in place.

## Open Tweaks
- All prior open items resolved: `theme.js` is kept; clean-history reset confirmed;
  Experience & Education section dropped (essentials folded into the hero bio).

---

- [x] Task 1: Clone repo & scaffold project structure
  - [x] Clone `xinzhel/xinzhel.github.io` into a local working directory (no clone exists yet).
  - [x] Confirm the backup `resume/xinzhel.github.io-master.zip` is present before any reset.
  - [x] Create the target structure: `index.html`, `assets/css/`, `assets/js/`,
        `assets/img/`, `data/`, `.nojekyll`, `README.md`. Do not delete/commit yet.

- [x] Task 2: Build publications data from the resume
  - [x] Create `data/publications.json` with all 10 first-author entries (title, venue,
        year, status ∈ {accepted, under_review, preprint}, empty link placeholders),
        mirroring `resume/resume_latex/resume-xinzhe.tex` verbatim.

- [x] Task 3: Build `index.html` content sections
  - [x] Hero/About: name, current role (RMIT postdoc), PhD (Deakin), one-paragraph research
        summary; links to Google Scholar, GitHub, LinkedIn, email. No resume PDF.
  - [x] Research Interests: 3–4 concept-level bullets (tree search, Chain-in-Tree,
        cross-trajectory memory, inference↔training loop) — no code identifiers.
  - [x] News/Highlights: aggregated, newest-first, ~2-year recency window; seed 1–2 items.
  - [x] Publications: static-HTML list rendered from the resume content (titles/venues in
        markup, not JS-injected); per-entry status + link placeholders.
  - [x] Teaching: SIT720 Machine Learning (2023–2025), SIT744 Deep Learning (2024), Deakin.
  - [x] Academic Service: reviewer roles (NeurIPS 2026, IJCAI 2024/2025, COLING 2025).
  - [x] Contact: email + professional links (no phone, no referees).
  - [x] Semantic HTML throughout (`header`/`main`/`section`/headings), `meta viewport`,
        descriptive `alt` text, in-page nav anchors.

- [x] Task 4: Style with `style.css`
  - [x] Layout & typography: centered max-width container, section spacing, headings,
        links, publication-list and venue-badge styling.
  - [x] Responsive: single ~720px breakpoint; single-column collapse on mobile, no
        horizontal scroll, adequate touch targets.
  - [x] Light/dark: color tokens via CSS custom properties; `prefers-color-scheme` dark
        mode; check contrast (~4.5:1 for body text) against the accent color `#2B4C7E`.

- [x] Task 5: `theme.js` (progressive enhancement)
  - [x] Light/dark toggle persisting to `localStorage` via `data-theme`; optional
        smooth-scroll. Page must remain fully usable with JS disabled.

- [x] Task 6: Local preview & verification
  - [x] Serve locally (`python -m http.server`) and verify all sections render.
  - [x] Check responsive layout at mobile and desktop widths.
  - [x] Verify all external links resolve and JS-disabled rendering still shows content.
  - [x] Spot-check accessibility (headings order, alt text, contrast).

- [x] Task 7: Deploy to GitHub Pages (destructive — run last)
  - [x] Replace all Jekyll scaffold files with the new static site; keep `.nojekyll`.
  - [x] Reset to a clean history (fresh orphan branch); optionally rename `master` → `main`.
  - [x] Force-push (backup zip is the rollback).
  - [x] Make the repo public and set the Pages source to the default branch root.
  - [x] Confirm the site is live at `https://xinzhel.github.io`.
