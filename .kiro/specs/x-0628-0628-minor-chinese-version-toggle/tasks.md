# Tasks — Chinese Version and Language Toggle

## Task Dependency Graph

```
T1 ──→ T2 ──→ T3 ──→ T4
```

Legend:
- T1 — Update English publication status wording
- T2 — Add Chinese static page
- T3 — Add language toggle links
- T4 — Verify local rendering

---

- [x] Task 1: Update English publication status wording
  - [x] In `index.html`, change the first publication badge from `Under review, EMNLP 2026` to `Under review`.
  - [x] Keep the paper title, authors, arXiv link, code link, and `badge-review` styling unchanged.

- [x] Task 2: Add Chinese static page
  - [x] Create `index.zh.html` as a Chinese-language counterpart to `index.html`.
  - [x] Preserve the same section structure: hero, research, news, publications, teaching, service, contact.
  - [x] Translate visible content into polished academic Chinese while keeping names, paper titles, venues, course codes, and external links accurate.
  - [x] Set `<html lang="zh-CN">`, Chinese title/description metadata, and keep the same CSS/JS asset paths.
  - [x] Keep publications as static HTML, not JavaScript-rendered content.

- [x] Task 3: Add language toggle links
  - [x] Add a compact language toggle in the navigation of `index.html`: English selected, link to `index.zh.html`.
  - [x] Add the matching toggle in `index.zh.html`: Chinese selected, link to `index.html`.
  - [x] Keep the existing light/dark theme toggle behavior unchanged.
  - [x] Style the language toggle in `assets/css/style.css` so it is readable on desktop and mobile without crowding the nav.

- [x] Task 4: Verify local rendering
  - [x] Preview both pages locally with `python3 -m http.server`.
  - [x] Verify the English and Chinese pages load, the language links switch pages correctly, and theme toggle still works on both pages.
  - [x] Check mobile width to ensure nav links, language toggle, and theme toggle do not overlap.
  - [x] Confirm the first English publication now says only `Under review`.
