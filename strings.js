// Words the popup and the right-click menu show, in the eight languages datamimi.com speaks.
// The store listing's name and description are in _locales/.

export const LANGS = ["en", "es", "pt", "fr", "de", "id", "vi", "ja"];

/** The browser's language, as one of ours; English otherwise. */
export function pickLang(ui) {
  const base = String(ui || "en").toLowerCase().split(/[-_]/)[0];
  return LANGS.includes(base) ? base : "en";
}

export const WORDS = {
  en: {
    search: "Search 60+ free tools",
    popular: "Popular",
    kinds: { pdf: "PDF", excel: "Excel", ai: "AI", calc: "Calculators" },
    none: "No tool matches. Try “merge”, “compress” or “excel”.",
    all: "All tools on datamimi.com",
    free: "Free · no account · files deleted within 2 hours",
    menu: "Open with DataMimi",
    menuPdf: { compress: "Compress PDF", word: "PDF to Word", merge: "Merge PDF", split: "Split PDF" },
    menuSheet: { merge: "Merge Excel files", clean: "Clean a spreadsheet", pivot: "Pivot table", ai: "Ask AI about this file" },
    menuPage: "Find a DataMimi tool",
    hint: "Download the file, then drop it on the page that opens.",
  },
  vi: {
    search: "Tìm trong 60+ công cụ miễn phí",
    popular: "Hay dùng",
    kinds: { pdf: "PDF", excel: "Excel", ai: "AI", calc: "Máy tính" },
    none: "Không có công cụ nào khớp. Thử “ghép”, “nén” hoặc “excel”.",
    all: "Mọi công cụ trên datamimi.com",
    free: "Miễn phí · không cần tài khoản · file xoá sau 2 giờ",
    menu: "Mở bằng DataMimi",
    menuPdf: { compress: "Nén PDF", word: "PDF sang Word", merge: "Ghép PDF", split: "Tách PDF" },
    menuSheet: { merge: "Ghép file Excel", clean: "Làm sạch bảng tính", pivot: "Bảng tổng hợp (pivot)", ai: "Hỏi AI về file này" },
    menuPage: "Tìm công cụ DataMimi",
    hint: "Tải file về máy rồi kéo vào trang vừa mở.",
  },
  es: {
    search: "Busca entre más de 60 herramientas gratis",
    popular: "Populares",
    kinds: { pdf: "PDF", excel: "Excel", ai: "IA", calc: "Calculadoras" },
    none: "Ninguna herramienta coincide. Prueba “unir”, “comprimir” o “excel”.",
    all: "Todas las herramientas en datamimi.com",
    free: "Gratis · sin cuenta · archivos borrados en 2 horas",
    menu: "Abrir con DataMimi",
    menuPdf: { compress: "Comprimir PDF", word: "PDF a Word", merge: "Unir PDF", split: "Dividir PDF" },
    menuSheet: { merge: "Unir archivos de Excel", clean: "Limpiar una hoja", pivot: "Tabla dinámica", ai: "Preguntar a la IA sobre este archivo" },
    menuPage: "Buscar una herramienta de DataMimi",
    hint: "Descarga el archivo y suéltalo en la página que se abre.",
  },
  pt: {
    search: "Pesquise mais de 60 ferramentas grátis",
    popular: "Populares",
    kinds: { pdf: "PDF", excel: "Excel", ai: "IA", calc: "Calculadoras" },
    none: "Nenhuma ferramenta encontrada. Tente “juntar”, “comprimir” ou “excel”.",
    all: "Todas as ferramentas em datamimi.com",
    free: "Grátis · sem conta · arquivos apagados em 2 horas",
    menu: "Abrir com DataMimi",
    menuPdf: { compress: "Comprimir PDF", word: "PDF para Word", merge: "Juntar PDF", split: "Dividir PDF" },
    menuSheet: { merge: "Juntar arquivos Excel", clean: "Limpar uma planilha", pivot: "Tabela dinâmica", ai: "Perguntar à IA sobre este arquivo" },
    menuPage: "Encontrar uma ferramenta DataMimi",
    hint: "Baixe o arquivo e solte-o na página que abrir.",
  },
  fr: {
    search: "Cherchez parmi plus de 60 outils gratuits",
    popular: "Populaires",
    kinds: { pdf: "PDF", excel: "Excel", ai: "IA", calc: "Calculatrices" },
    none: "Aucun outil ne correspond. Essayez « fusionner », « compresser » ou « excel ».",
    all: "Tous les outils sur datamimi.com",
    free: "Gratuit · sans compte · fichiers supprimés sous 2 heures",
    menu: "Ouvrir avec DataMimi",
    menuPdf: { compress: "Compresser un PDF", word: "PDF en Word", merge: "Fusionner des PDF", split: "Diviser un PDF" },
    menuSheet: { merge: "Fusionner des fichiers Excel", clean: "Nettoyer un tableur", pivot: "Tableau croisé dynamique", ai: "Demander à l’IA sur ce fichier" },
    menuPage: "Trouver un outil DataMimi",
    hint: "Téléchargez le fichier, puis déposez-le sur la page qui s’ouvre.",
  },
  de: {
    search: "Über 60 kostenlose Tools durchsuchen",
    popular: "Beliebt",
    kinds: { pdf: "PDF", excel: "Excel", ai: "KI", calc: "Rechner" },
    none: "Kein Tool gefunden. Versuchen Sie „zusammenfügen“, „komprimieren“ oder „excel“.",
    all: "Alle Tools auf datamimi.com",
    free: "Kostenlos · ohne Konto · Dateien nach 2 Stunden gelöscht",
    menu: "Mit DataMimi öffnen",
    menuPdf: { compress: "PDF komprimieren", word: "PDF in Word", merge: "PDF zusammenfügen", split: "PDF teilen" },
    menuSheet: { merge: "Excel-Dateien zusammenführen", clean: "Tabelle bereinigen", pivot: "Pivot-Tabelle", ai: "KI zu dieser Datei fragen" },
    menuPage: "Ein DataMimi-Tool finden",
    hint: "Laden Sie die Datei herunter und ziehen Sie sie auf die geöffnete Seite.",
  },
  id: {
    search: "Cari di 60+ alat gratis",
    popular: "Populer",
    kinds: { pdf: "PDF", excel: "Excel", ai: "AI", calc: "Kalkulator" },
    none: "Tidak ada alat yang cocok. Coba “gabung”, “kompres” atau “excel”.",
    all: "Semua alat di datamimi.com",
    free: "Gratis · tanpa akun · file dihapus dalam 2 jam",
    menu: "Buka dengan DataMimi",
    menuPdf: { compress: "Kompres PDF", word: "PDF ke Word", merge: "Gabungkan PDF", split: "Pisahkan PDF" },
    menuSheet: { merge: "Gabungkan file Excel", clean: "Bersihkan spreadsheet", pivot: "Tabel pivot", ai: "Tanya AI tentang file ini" },
    menuPage: "Cari alat DataMimi",
    hint: "Unduh file, lalu letakkan di halaman yang terbuka.",
  },
  ja: {
    search: "60以上の無料ツールを検索",
    popular: "よく使われる",
    kinds: { pdf: "PDF", excel: "Excel", ai: "AI", calc: "計算ツール" },
    none: "一致するツールがありません。「結合」「圧縮」「excel」などで探してください。",
    all: "datamimi.com のすべてのツール",
    free: "無料 · アカウント不要 · ファイルは2時間以内に削除",
    menu: "DataMimi で開く",
    menuPdf: { compress: "PDF を圧縮", word: "PDF を Word に変換", merge: "PDF を結合", split: "PDF を分割" },
    menuSheet: { merge: "Excel ファイルを結合", clean: "表をクリーンアップ", pivot: "ピボットテーブル", ai: "このファイルについて AI に質問" },
    menuPage: "DataMimi のツールを探す",
    hint: "ファイルをダウンロードして、開いたページにドロップしてください。",
  },
};

/** A datamimi.com address with the extension's mark, so its visits are counted as its own. */
export function siteUrl(path) {
  const url = new URL(path, "https://datamimi.com");
  url.searchParams.set("utm_source", "chrome-extension");
  url.searchParams.set("utm_medium", "extension");
  return url.toString();
}
