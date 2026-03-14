// Escapes html which gets render on the website avoiding XSS
export function escapeHtml(text) {
  if (text === null || text === undefined) return "";

  return text
    .replaceAll("&", "&#38;")
    .replaceAll("<", "&#60;")
    .replaceAll(">", "&#62;")
    .replaceAll("'", "&#39;")
    .replaceAll('"', "&#34;");
}
