// The right-click menu: on a link to a PDF or a spreadsheet, the DataMimi tools for it; anywhere else, the tool finder.
// Nothing is read from the page and nothing is sent anywhere: a choice opens datamimi.com in a new tab.

import { chosenLang, siteUrl, WORDS } from "./strings.js";
import { TOOLS } from "./tools.js";

const PDF_LINKS = ["*://*/*.pdf", "*://*/*.PDF", "*://*/*.pdf?*"];
const SHEET_LINKS = ["*://*/*.xlsx", "*://*/*.xls", "*://*/*.csv", "*://*/*.xlsx?*", "*://*/*.csv?*"];

/** English address of a tool → its address in this language (the same tool, localized slug). */
function hrefFor(lang, id) {
  const tool = (TOOLS[lang] ?? TOOLS.en).find((entry) => entry.id === id);
  return tool ? tool.href : id;
}

const PDF = { compress: "/compress-pdf", word: "/pdf-to-word", merge: "/merge-pdf", split: "/split-pdf" };
const SHEET = { merge: "/tools/merge-excel-files", clean: "/tools/clean-messy-spreadsheet", pivot: "/tools/pivot-table-online", ai: "/ai" };

async function build() {
  const lang = await chosenLang();
  const words = WORDS[lang];
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({ id: "pdf", title: words.menu, contexts: ["link"], targetUrlPatterns: PDF_LINKS });
    for (const key of Object.keys(PDF)) {
      chrome.contextMenus.create({ id: `pdf:${key}`, parentId: "pdf", title: words.menuPdf[key], contexts: ["link"], targetUrlPatterns: PDF_LINKS });
    }
    chrome.contextMenus.create({ id: "sheet", title: words.menu, contexts: ["link"], targetUrlPatterns: SHEET_LINKS });
    for (const key of Object.keys(SHEET)) {
      chrome.contextMenus.create({ id: `sheet:${key}`, parentId: "sheet", title: words.menuSheet[key], contexts: ["link"], targetUrlPatterns: SHEET_LINKS });
    }
    chrome.contextMenus.create({ id: "page", title: words.menuPage, contexts: ["page", "selection"] });
  });
}

chrome.runtime.onInstalled.addListener(build);
chrome.runtime.onStartup.addListener(build);
// The language changed in the popup: the menu follows.
chrome.storage.onChanged.addListener((changes) => {
  if (changes.lang) void build();
});

chrome.contextMenus.onClicked.addListener(async (info) => {
  const lang = await chosenLang();
  const [group, key] = String(info.menuItemId).split(":");
  let path = lang === "en" ? "/" : `/${lang}`;
  if (group === "pdf" && PDF[key]) path = hrefFor(lang, PDF[key]);
  if (group === "sheet" && SHEET[key]) path = SHEET[key] === "/ai" ? "/ai" : hrefFor(lang, SHEET[key]);
  chrome.tabs.create({ url: siteUrl(path) });
});
