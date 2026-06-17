# Requirements — Academic Homepage (`xinzhel.github.io`)

## Overview

We build a personal academic homepage for Xinzhe Li, hosted on GitHub Pages at
`https://xinzhel.github.io`. The site presents our research identity (LLM
reasoning/planning via tree search, cross-trajectory agent memory), publications,
experience, and contact information. Content is sourced from
`resume/resume_latex/resume-xinzhe.tex` and `resume/cover_letters_latex/cover_letter_sea.tex`.

## Goals

- A fast, crawlable, low-maintenance single-page site (no build toolchain required).
- Publications written as static HTML so general web crawlers (Google/Bing) can read
  them. We do NOT rely on this page for Google Scholar indexing — see R4 rationale.
- Easy to update when a paper changes status (e.g., "Under review" → "accepted").
- Mobile-responsive; follows common accessibility practices (semantic HTML, alt text,
  sufficient color contrast). We aim for these good-practice habits, not certified WCAG
  conformance — full conformance needs assistive-tech testing and expert audit, which is
  out of scope for a personal homepage.

## Functional Requirements

### R1 — Hero / About
- Display name, current role (Postdoctoral Research Fellow, RMIT University), and a
  one-paragraph research summary derived from the resume header and cover-letter program.
- Fold the key credentials into the bio (current RMIT affiliation; PhD from Deakin
  University) since there is no separate Experience/Education section.
- Show external links: Google Scholar, GitHub, LinkedIn, email.
- No downloadable resume PDF: the page itself serves as the homepage, and a resume
  download reads as job-seeking. (A proper academic CV PDF could be added later if needed
  — see Out of Scope.)

### R2 — Research Interests
- Summarize the research program: LLM tree search (policy/transition/reward abstraction),
  Chain-in-Tree adaptive branching, cross-trajectory agent memory, and connecting
  inference-time search with training.
- Describe the work at the **concept/algorithm level** (terms a reader would meet in a
  paper or talk, e.g., "adaptive branching below a reward threshold"), NOT with names that
  only exist in our source code (e.g., function names, CLI flags, config keys, class
  names). The homepage is public-facing, so descriptions must be understandable without
  access to the codebase. (Mirrors our paper-writing convention.)

### R3 — News / Highlights
- A short, scannable highlights feed (newest first) giving an at-a-glance signal of
  recent activity, e.g., "Sep 2026 — Two papers accepted at ACL 2026" or "Oct 2025 —
  Started as Postdoctoral Research Fellow at RMIT University".
- **Recency window:** show items from roughly the last ~2 years (the common academic-page
  convention) rather than a fixed count, so a busy year shows more and old items age out
  naturally. Apply a soft cap (~8 lines) only if a window gets unusually long.
- **Aggregated, not granular:** the value is the summary signal (e.g., counts like "two
  papers at ACL 2026"), distinct from the per-paper Publications list. Prefer rolling up
  related events into one line rather than one line per paper.
- **Maintenance:** updated only on notable moments (a batch of acceptances, a new
  position). If nothing falls inside the recency window, it is acceptable to omit the
  section rather than show a single aged item.

### R4 — Publications
- List all first-author publications with title, venue, year, and status (accepted vs.
  under review vs. preprint) exactly as in the resume.
- Each entry links to paper/code where available (placeholders allowed until URLs exist).
- Rendered as **static HTML** (titles/venues live in the markup, not injected by JS).

  **Why static HTML, and why NOT chase Google Scholar here:**
  - Crawlers (Google, Bing, and Scholar's bot) read the raw HTML the server returns and
    do not reliably execute JavaScript. If the list were JS-rendered from a JSON file,
    crawlers would often see an empty page. Static HTML guarantees the content is visible.
  - Google Scholar in practice indexes papers from publisher sites, arXiv, and conference
    proceedings — not personal homepages. It also parses best when each paper has its own
    dedicated URL carrying `citation_*` meta tags. On a single-page site all papers share
    one `<head>`, so we could meaningfully tag only one paper. The effort-to-benefit ratio
    is poor, so Scholar-specific optimization is deferred.

  **Relationship to R3 (News):** Publications is the permanent canonical list ("what has
  been published?"); News is the aggregated recency signal ("what's notable lately?"). A
  paper acceptance may appear in both — once as a rolled-up highlight, permanently as a
  record. This overlap is intended.

### R5 — Teaching
- List courses taught, with year range, course code/title, and institution. Seed entries:
  - 2023–2025 — SIT720 Machine Learning, Deakin University
  - 2024 — SIT744 Deep Learning, Deakin University
- Stable, low-maintenance section (course listings rarely change). Academic in tone, not
  job-seeking. May note role (e.g., tutor/teaching) if useful.

### R6 — Academic Service
- Reviewer roles (NeurIPS 2026, IJCAI 2024/2025, COLING 2025).

### R7 — Contact
- Email and professional links. We do NOT publish the phone number or referee contact
  details from the resume (privacy).

## Non-Functional Requirements

- N1 — Zero build step: deployable by pushing static files to the `xinzhel.github.io` repo.
- N2 — Single external dependency budget: no heavy frameworks; vanilla HTML/CSS, minimal JS.
- N3 — Responsive layout (mobile + desktop); light/dark friendly.
- N4 — Page weight kept small (no large images beyond an optional headshot).

## Out of Scope (deferred)

- **Experience / Education section** — dropped: an employment-history list reads like a
  resume and doesn't showcase achievements. The essentials (current RMIT role, PhD from
  Deakin) live in the hero bio instead.
- **Downloadable resume/CV PDF** — omitted: a resume download is job-seeking in tone, and
  the page itself covers the same content. A longer academic CV PDF could be added later.
- Jekyll / academicpages migration (noted as alternative in design).
- Blog, talks archive, teaching pages — add later if needed.
- Custom domain.
