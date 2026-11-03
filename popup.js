// The popup: make a Mini-App from a sentence, open one of your own or one from the market, or find a free tool.
// What it shows of the person comes from datamimi.com with the site's own cookies; nothing else is read or sent.

import { pickLang, siteUrl, WORDS } from "./strings.js";
import { TOOLS } from "./tools.js";

const SITE = "https://datamimi.com";
const lang = pickLang(chrome.i18n.getUILanguage());
const words = WORDS[lang];
const tools = TOOLS[lang] ?? TOOLS.en;
const home = lang === "en" ? "/" : `/${lang}`;

const $ = (id) => document.getElementById(id);
document.documentElement.lang = lang;
$("all").href = siteUrl(home);
$("all").textContent = words.all;
$("free").textContent = words.free;
$("makeTitle").textContent = words.makeTitle;
$("job").placeholder = words.makeHint;
$("go").textContent = words.makeGo;

const TABS = ["tools", "mine", "market"];
const KINDS = ["popular", "pdf", "excel", "ai", "calc"];
let tab = remembered("tab", TABS) ?? "tools";
let kind = "popular";
/** What datamimi.com says of the person: null while asking, { offline: true } when it could not be reached. */
let me = null;
let market = null;

function remembered(key, allowed) {
  try {
    const value = localStorage.getItem(key);
    return allowed.includes(value) ? value : null;
  } catch {
    return null;
  }
}

const fold = (text) =>
  String(text ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d");

const fill = (sentence, values) => sentence.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ""));

function open(path) {
  chrome.tabs.create({ url: siteUrl(path) });
  window.close();
}

/** One line of the list: a coloured mark, a title, a line under it. */
function row({ href, mark, tone, title, line }) {
  const item = document.createElement("li");
  const link = document.createElement("a");
  link.href = href;
  link.target = "_blank";
  link.rel = "noreferrer";
  const dot = document.createElement("span");
  dot.className = "dot";
  dot.style.background = `var(--tone-${tone})`;
  dot.textContent = mark;
  const text = document.createElement("span");
  const head = document.createElement("div");
  head.className = "title";
  head.textContent = title;
  const under = document.createElement("div");
  under.className = "blurb";
  under.textContent = line;
  text.append(head, under);
  link.append(dot, text);
  item.append(link);
  return item;
}

function say(message, action) {
  const none = $("none");
  none.replaceChildren(document.createTextNode(message));
  if (action) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "inline";
    button.textContent = action.label;
    button.addEventListener("click", action.run);
    none.append(button);
  }
  none.hidden = false;
}

function toolRows(terms) {
  const shown = terms.length
    ? tools.filter((tool) => terms.every((term) => fold(`${tool.title} ${tool.blurb} ${tool.keywords}`).includes(term))).slice(0, 30)
    : tools.filter((tool) => (kind === "popular" ? tool.popular : tool.kind === kind));
  if (shown.length === 0) say(words.none);
  return shown.map((tool) => row({ href: siteUrl(tool.href), mark: (words.kinds[tool.kind] || "").slice(0, 3), tone: tool.tone || "blue", title: tool.title, line: tool.blurb }));
}

function mineRows(terms) {
  if (me === null) return say(words.loading), [];
  if (me.offline) return say(words.offline), [];
  if (!me.signedIn) return say(words.mineSignedOut, { label: words.signIn, run: () => open("/sign-in") }), [];
  if (me.apps.length === 0) return say(words.mineEmpty), [];
  const shown = me.apps.filter((app) => terms.every((term) => fold(app.title).includes(term)));
  if (shown.length === 0) say(words.noApp);
  return shown.map((app) =>
    row({
      href: siteUrl(`/mini-apps?mini=${encodeURIComponent(app.id)}`),
      mark: "APP",
      tone: app.calculator ? "amber" : "violet",
      title: app.title,
      line: [app.calculator ? words.calc : app.runs > 1 ? fill(words.runs, { n: app.runs }) : app.runs === 1 ? words.runOnce : words.never, app.usesAi ? words.usesAi : ""].filter(Boolean).join(" · "),
    }),
  );
}

function marketRows(terms) {
  if (market === null) return say(words.loading), [];
  if (market.offline) return say(words.offline), [];
  const label = Object.fromEntries((market.categories ?? []).map((category) => [category.id, category.label]));
  const shown = market.apps.filter((app) => terms.every((term) => fold(app.search || `${app.title} ${app.description}`).includes(term)));
  if (shown.length === 0) say(words.noApp);
  return shown.map((app) =>
    row({
      href: siteUrl(app.href || `/apps/${app.slug}`),
      mark: app.calculator ? "123" : "APP",
      tone: app.calculator ? "amber" : app.usesAi ? "violet" : "teal",
      title: app.title,
      line: [label[app.category] ?? app.category, app.usesAi ? words.usesAi : words.appFree].filter(Boolean).join(" · "),
    }),
  );
}

function render() {
  const terms = fold($("q").value.trim()).split(/\s+/).filter(Boolean);
  $("none").hidden = true;
  $("q").placeholder = tab === "mine" ? words.searchMine : tab === "market" ? words.searchMarket : words.search;
  $("kinds").hidden = tab !== "tools" || terms.length > 0;
  const rows = tab === "mine" ? mineRows(terms) : tab === "market" ? marketRows(terms) : toolRows(terms);
  $("list").replaceChildren(...rows);
  for (const button of $("tabs").children) button.setAttribute("aria-selected", String(button.dataset.tab === tab));
}

function account() {
  const place = $("account");
  if (!me || me.offline) return place.replaceChildren();
  const link = document.createElement("a");
  link.target = "_blank";
  link.rel = "noreferrer";
  if (!me.signedIn) {
    link.href = siteUrl("/sign-in");
    link.className = "chip strong";
    link.textContent = words.signIn;
    return place.replaceChildren(link);
  }
  link.href = siteUrl("/");
  link.className = "chip";
  link.title = words.openApp;
  link.textContent = [me.plan?.name, me.credits === null || me.credits === undefined ? "" : fill(words.credits, { n: Number(me.credits).toLocaleString(lang) })].filter(Boolean).join(" · ") || words.openApp;
  place.replaceChildren(link);
}

$("tabs").replaceChildren(
  ...TABS.map((key) => {
    const button = document.createElement("button");
    button.type = "button";
    button.role = "tab";
    button.dataset.tab = key;
    button.textContent = key === "mine" ? words.tabMine : key === "market" ? words.tabMarket : words.tabTools;
    button.addEventListener("click", () => {
      tab = key;
      try {
        localStorage.setItem("tab", key);
      } catch {
        /* remembered for this opening only */
      }
      render();
    });
    return button;
  }),
);
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
$("make").addEventListener("submit", (event) => {
  event.preventDefault();
  const job = $("job").value.trim();
  open(job ? `/make?describe=${encodeURIComponent(job)}` : "/make");
});
// Enter makes it; Shift+Enter is a new line.
$("job").addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    $("make").requestSubmit();
  }
});

render();
$("q").focus();

fetch(`${SITE}/api/extension/me`, { credentials: "include", cache: "no-store" })
  .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
  .then((answer) => {
    me = answer;
  })
  .catch(() => {
    me = { offline: true };
  })
  .finally(() => {
    account();
    render();
  });
fetch(`${SITE}/api/market?lang=${lang}`)
  .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
  .then((answer) => {
    market = { apps: answer.apps ?? [], categories: answer.categories ?? [] };
  })
  .catch(() => {
    market = { offline: true };
  })
  .finally(render);
