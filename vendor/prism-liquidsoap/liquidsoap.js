/**
 * Prism grammar for the Liquidsoap scripting language.
 *
 * Standalone on purpose: plain JavaScript, no build step, no framework imports. It is
 * meant to be lifted out of this repository into `savonet/prism-liquidsoap` and published
 * to npm alongside the existing `highlightjs-liquidsoap`, so that anything Prism-based --
 * this site, other docs, the Discord bot -- shares one definition.
 *
 * Usage:
 *   const registerLiquidsoap = require('prism-liquidsoap');
 *   registerLiquidsoap(Prism);
 *
 * Scope: this covers the constructs that actually occur in the Liquidsoap documentation,
 * measured across its 1312 code blocks -- named arguments, references, encoders, string
 * interpolation, labels and doc comments. It is not a port of the TextMate grammar in
 * savonet/vscode-liquidsoap (17 rules, 57 scopes). If fidelity ever matters more than
 * simplicity, render with Shiki and use that grammar directly rather than growing this.
 */

function registerLiquidsoap(Prism) {
  Prism.languages.liquidsoap = {
    shebang: {
      pattern: /^#!.*/,
      alias: 'comment',
      greedy: true,
    },

    // `# @param`, `# @category`, `# @flag`, `# @argsof`, `# @docof` drive the generated
    // API reference, so they are more than a comment.
    'doc-comment': {
      pattern: /#[ \t]*@(?:argsof|category|docof|flag|method|param)\b.*/,
      greedy: true,
      alias: 'comment',
      inside: { keyword: /@\w+/ },
    },

    comment: {
      pattern: /#.*/,
      greedy: true,
    },

    string: {
      pattern: /(["'])(?:\\[\s\S]|(?!\1)[^\\])*\1/,
      greedy: true,
      inside: {
        interpolation: {
          pattern: /#\{(?:[^{}"']|"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|\{[^{}]*\})*\}/,
          inside: {
            'interpolation-punctuation': {
              pattern: /^#\{|\}$/,
              alias: 'punctuation',
            },
            // `rest` is attached below, so interpolated expressions highlight as code.
          },
        },
        escape: /\\[\s\S]/,
      },
    },

    // Encoders: %mp3, %ffmpeg, %audio(codec="aac"). Must precede `operator`, which would
    // otherwise claim the `%`.
    encoder: {
      pattern: /%[a-zA-Z][\w.]*/,
      alias: 'builtin',
    },

    // Time predicates such as 10h or 0m30s, used for scheduling.
    time: {
      pattern: /\b\d+(?:h|m|s)(?:\d+(?:m|s))*\b/,
      alias: 'number',
    },

    number: /\b(?:0x[\da-f]+|\d+\.\d*|\.\d+|\d+)\b/i,

    boolean: /\b(?:false|true)\b/,

    null: {
      pattern: /\bnull\b/,
      alias: 'keyword',
    },

    'function-definition': {
      pattern: /(\bdef\s+(?:rec\s+)?)[a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*/,
      lookbehind: true,
      alias: 'function',
    },

    keyword:
      /\b(?:begin|catch|def|do|elsif|else|end|eval|finally|for|fun|if|in|let|open|rec|replaces|then|to|try|while)\b/,

    // A named argument in call position -- f(start=true) -- as distinct from a binding
    // such as `radio = playlist(...)`, which stays plain.
    'named-argument': {
      pattern: /(?<=[(,]\s*)[a-zA-Z_]\w*(?=\s*=(?!=))/,
      alias: 'attr-name',
    },

    label: {
      pattern: /~[a-zA-Z_]\w*/,
      alias: 'attr-name',
    },

    'function-call': {
      pattern: /\b[a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*(?=\s*\()/,
      alias: 'function',
    },

    method: {
      pattern: /(?<=\.)[a-zA-Z_]\w*/,
      alias: 'property',
    },

    // `:=` assigns to a ref, `!` dereferences one, `??` is null coalescing.
    operator: /:=|\?\?|->|\.\.\.|==|!=|<=|>=|::|\|>|\b(?:and|not|or)\b|[-+*/^<>=!?]/,

    punctuation: /[{}[\];(),.:]/,
  };

  // Interpolated expressions are ordinary Liquidsoap, so recurse into them.
  Prism.languages.liquidsoap.string.inside.interpolation.inside.rest =
    Prism.languages.liquidsoap;

  // `.liq` is the file extension, and appears as a fence language in the wild.
  Prism.languages.liq = Prism.languages.liquidsoap;

  return Prism.languages.liquidsoap;
}

module.exports = registerLiquidsoap;
module.exports.default = registerLiquidsoap;
