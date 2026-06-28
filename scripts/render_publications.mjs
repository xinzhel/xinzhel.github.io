import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLICATIONS_PATH = path.join(ROOT_DIR, "data", "publications.json");
const START_MARKER = "<!-- publications:start -->";
const END_MARKER = "<!-- publications:end -->";

const pages = [
  { file: "index.html", lang: "en" },
  { file: "index.zh.html", lang: "zh" },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderAuthors(authors) {
  return authors
    .map((author) => {
      const name = escapeHtml(author);
      return author === "Xinzhe Li" ? `<strong>${name}</strong>` : name;
    })
    .join(", ");
}

function renderLinks(links) {
  return links
    .map((link) => `<a href="${escapeHtml(link.url)}">${escapeHtml(link.label)}</a>`)
    .join(" · ");
}

function renderPublicationList(publications, lang) {
  const lines = ['      <ul class="pub-list">'];

  for (const publication of publications) {
    const badgeClass = publication.badge_class ? ` ${publication.badge_class}` : "";

    lines.push(
      "        <li>",
      `          <span class="pub-title">${escapeHtml(publication.title)}</span>`,
      `          <span class="pub-authors">${renderAuthors(publication.authors)}</span>`,
      `          <span class="pub-venue${badgeClass}">${escapeHtml(publication.venue[lang])}</span>`,
      `          <span class="pub-links">${renderLinks(publication.links)}</span>`,
      "        </li>",
    );
  }

  lines.push("      </ul>");
  return lines.join("\n");
}

function replaceGeneratedBlock(html, renderedList, file) {
  const pattern = new RegExp(
    `      ${START_MARKER}[\\s\\S]*?      ${END_MARKER}`,
  );

  if (!pattern.test(html)) {
    throw new Error(`${file} is missing publication generation markers`);
  }

  return html.replace(
    pattern,
    `      ${START_MARKER}\n${renderedList}\n      ${END_MARKER}`,
  );
}

const publications = JSON.parse(await readFile(PUBLICATIONS_PATH, "utf8"));

for (const page of pages) {
  const pagePath = path.join(ROOT_DIR, page.file);
  const html = await readFile(pagePath, "utf8");
  const nextHtml = replaceGeneratedBlock(
    html,
    renderPublicationList(publications, page.lang),
    page.file,
  );

  await writeFile(pagePath, nextHtml);
}
