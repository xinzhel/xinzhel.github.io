# xinzhel.github.io

Personal academic homepage for Xinzhe Li — https://xinzhel.github.io

Static, build-free site (HTML + CSS + a small progressive-enhancement JS). Hosted on
GitHub Pages; `.nojekyll` disables Jekyll so files are served as-is.

## Structure
- `index.html` — all sections (hero, research, news, publications, teaching, service, contact)
- `assets/css/style.css` — layout, responsive, light/dark
- `assets/js/theme.js` — optional theme toggle + footer year (page works without JS)
- `data/publications.json` — publication inventory kept in sync with the list in `index.html`

## Edit & deploy
1. Update `index.html` (and the matching entry in `data/publications.json`).
2. Preview locally: `python3 -m http.server` then open http://localhost:8000
3. Commit and push to the default branch; GitHub Pages publishes within ~1 minute.
