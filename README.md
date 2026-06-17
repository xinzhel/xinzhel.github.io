# xinzhel.github.io

Personal academic homepage for Xinzhe Li — https://xinzhel.github.io

Static, build-free site (HTML + CSS + a small progressive-enhancement JS). Deployed to
GitHub Pages via the workflow in `.github/workflows/deploy.yml`; `.nojekyll` disables
Jekyll so files are served as-is.

## Structure
- `index.html` — single source of truth for all sections (hero, research, news,
  publications, teaching, service, contact)
- `assets/css/style.css` — layout, responsive, light/dark
- `assets/js/theme.js` — optional theme toggle + footer year (page works without JS)

## Edit & deploy
1. Edit `index.html` directly (e.g., update a paper's status/links, add a news item).
2. Preview locally: `python3 -m http.server` then open http://localhost:8000
3. Commit and push to `main`; the GitHub Actions workflow deploys within ~1 minute.
