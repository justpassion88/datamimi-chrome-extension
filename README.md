# DataMimi for Chrome

**60+ free PDF and Excel tools, one click from your toolbar.** The official Chrome extension for [DataMimi](https://datamimi.com/?utm_source=github&utm_medium=readme).

![The DataMimi popup](screenshots/popup.png)

Click the icon and type what you need ("compress", "merge excel", "pdf to word"), or pick one of the popular tools. You can also right-click a link to a PDF or a spreadsheet and choose **Open with DataMimi**. The tool opens on datamimi.com in a new tab. It is free, needs no account, and deletes files within two hours.

## What you can do

**PDF:** [merge](https://datamimi.com/merge-pdf), [split](https://datamimi.com/split-pdf), [compress](https://datamimi.com/compress-pdf), [rotate](https://datamimi.com/rotate-pdf), [add page numbers](https://datamimi.com/add-page-numbers-to-pdf), [watermark](https://datamimi.com/watermark-pdf), [protect](https://datamimi.com/protect-pdf-with-password) or [unlock](https://datamimi.com/unlock-pdf). Convert [PDF to Word](https://datamimi.com/pdf-to-word) or [PDF to JPG](https://datamimi.com/pdf-to-jpg), and [Word](https://datamimi.com/word-to-pdf), [Excel](https://datamimi.com/excel-to-pdf), [PowerPoint](https://datamimi.com/powerpoint-to-pdf) or [images](https://datamimi.com/jpg-to-pdf) to PDF.

**Excel and CSV:** [merge Excel files](https://datamimi.com/tools/merge-excel-files), [join two files on a column (VLOOKUP)](https://datamimi.com/tools/merge-two-excel-files-by-column), [remove duplicates](https://datamimi.com/tools/remove-duplicates-excel), [clean a messy sheet](https://datamimi.com/tools/clean-messy-spreadsheet), [pivot tables](https://datamimi.com/tools/pivot-table-online), [split a file](https://datamimi.com/tools/split-excel-file), [CSV to Excel](https://datamimi.com/tools/convert-csv-to-excel), [JSON to Excel](https://datamimi.com/tools/json-to-excel), and [a dashboard from a spreadsheet](https://datamimi.com/tools/free-dashboard-from-excel).

**More:** [business calculators](https://datamimi.com/calculators), and an [AI analyst](https://datamimi.com/ai) that answers questions about your spreadsheet.

The extension works in English, Español, Português, Français, Deutsch, Bahasa Indonesia, Tiếng Việt and 日本語, following your browser's language.

## Privacy

- The only permission is `contextMenus`, for the right-click menu.
- It reads nothing from the pages you visit and sends no data anywhere.
- The tool list ships inside the extension. Nothing is fetched at run time, and no remote code runs.
- Links it opens carry `utm_source=chrome-extension`, so DataMimi can count visits that came from the extension. That is the only tracking.

Full policy: [datamimi.com/legal/privacy](https://datamimi.com/legal/privacy)

## Install from source

1. Download this repository (Code → Download ZIP) and unzip it.
2. Open `chrome://extensions` and turn on **Developer mode**.
3. Click **Load unpacked** and choose the unzipped folder.

## Files

| File | What it is |
|---|---|
| `manifest.json` | Manifest V3: the popup, the service worker and the one permission |
| `popup.html`, `popup.css`, `popup.js` | The tool finder |
| `background.js` | The right-click menu |
| `strings.js` | The words in eight languages |
| `tools.js` | The tool list, generated from datamimi.com |
| `_locales/` | The name and description in each language |

## Feedback

Found a bug, or want a tool added? [Open an issue](../../issues) or use the contact options on [datamimi.com](https://datamimi.com/about).

---

Made by [DataMimi](https://datamimi.com/?utm_source=github&utm_medium=readme): free PDF and Excel tools, plus an AI data analyst.
