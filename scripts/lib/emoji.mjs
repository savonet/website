// Decorative emoji crept into the docs ("## ⚠️ Format Availability", "#### ✅ 1. Is latency
// CPU-controlled?", "| ✅ Yes |"). They are removed for the website.
//
// Run this AFTER headings have been given explicit {#anchors}. Pandoc derived its
// identifiers from the text *including* the emoji, which is why the live site publishes
// `#synchronization-conflicts-` with a trailing dash. Stripping first would silently
// change those anchors and break every inbound deep link.
//
// Box drawing (U+2500-257F) is left alone: graph_descriptions.md draws real diagrams with
// it. So are arrows like U+2192, which are used as prose.
const EMOJI = new RegExp(
  [
    '[\\u{1F000}-\\u{1FAFF}]', // pictographs, emoticons, transport, symbols & objects
    '[\\u{2700}-\\u{27BF}]', // dingbats: check marks, crosses, sparkles
    '[\\u{2600}-\\u{26FF}]', // misc symbols: warning sign, no entry, cloud
    '[\\u{23E9}-\\u{23FA}]', // media and clock faces
    '[\\u{FE0F}\\u{FE0E}\\u{200D}]', // variation selectors and zero-width joiner
  ].join('|'),
  'gu'
);

/** Strip decorative emoji, then tidy the whitespace they leave behind. */
export function stripEmoji(md) {
  return md
    .replace(EMOJI, '')
    .split('\n')
    .map((line) =>
      line
        // "## ⚠️ Format" -> "## Format", "### Conflicts  {#id}" -> "### Conflicts {#id}"
        .replace(/[ \t]{2,}/g, ' ')
        .replace(/^(#{1,6}) +/, '$1 ')
        // a heading or table cell that started with an emoji keeps a stray leading space
        .replace(/^(#{1,6}) (?=[^\s])/, '$1 ')
        .replace(/\|\s+\|/g, '| |')
        .trimEnd()
    )
    .join('\n');
}
