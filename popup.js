// The popup: find a DataMimi tool by typing, or pick one of the popular ones, and open it in a new tab.

import { pickLang, siteUrl, WORDS } from "./strings.js";
import { TOOLS } from "./tools.js";

const lang = pickLang(chrome.i18n.getUILanguage());
const words = WORDS[lang];
const tools = TOOLS[lang] ?? TOOLS.en;
const home = lang === "en" ? "/" : `/${lang}`;

const $ = (id) => document.getElementById(id);
$("q").placeholder = words.search;
$("home").href = siteUrl(home);
$("all").href = siteUrl(home);
$("all").textContent = words.all;
$("free").textContent = words.free;
document.documentElement.lang = lang;

const KINDS = ["popular", "pdf", "excel", "ai", "calc"];
let kind = "popular";

const fold = (text) =>
  String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d");

function render() {
  const query = fold($("q").value.trim());
  const terms = query.split(/\s+/).filter(Boolean);
  const shown = terms.length
    ? tools.filter((tool) => terms.every((term) => fold(`${tool.title} ${tool.blurb} ${tool.keywords}`).includes(term))).slice(0, 30)
    : tools.filter((tool) => (kind === "popular" ? tool.popular : tool.kind === kind));

  const list = $("list");
  list.replaceChildren(
    ...shown.map((tool) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = siteUrl(tool.href);
      link.target = "_blank";
      link.rel = "noreferrer";
      const dot = document.createElement("span");
      dot.className = "dot";
      dot.style.background = `var(--tone-${tool.tone || "blue"})`;
      dot.textContent = (words.kinds[tool.kind] || "").slice(0, 3);
      const text = document.createElement("span");
      const title = document.createElement("div");
      title.className = "title";
      title.textContent = tool.title;
      const blurb = document.createElement("div");
      blurb.className = "blurb";
      blurb.textContent = tool.blurb;
      text.append(title, blurb);
      link.append(dot, text);
      item.append(link);
      return item;
    }),
  );
  $("none").hidden = shown.length > 0;
  $("none").textContent = words.none;
  $("kinds").hidden = terms.length > 0;
}

$("kinds").replaceChildren(
  ...KINDS.map((key) => {
    const button = document.createElement("button");
    button.type = "button";
    button.role = "tab";
    button.textContent = key === "popular" ? words.popular : words.kinds[key];
    button.setAttribute("aria-selected", String(key === kind));
    button.addEventListener("click", () => {
      kind = key;
      for (const other of $("kinds").children) other.setAttribute("aria-selected", String(other === button));
      render();
    });
    return button;
  }),
);
$("q").addEventListener("input", render);
// Enter opens the first match.
$("q").addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  const first = $("list").querySelector("a");
  if (first) chrome.tabs.create({ url: first.href });
});
render();
