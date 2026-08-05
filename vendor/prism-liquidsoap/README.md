# prism-liquidsoap

[Prism](https://prismjs.com) syntax highlighting for the
[Liquidsoap](https://www.liquidsoap.info) scripting language.

Prism ships no Liquidsoap language, so this adds one. It is the Prism counterpart to
[`highlightjs-liquidsoap`](https://github.com/savonet/highlightjs-liquidsoap).

> This currently lives inside the website repository under `vendor/`. It has no build step
> and no framework imports, so moving it to its own repository and publishing it is a file
> move. Until then, the site loads it by relative path from
> `src/theme/prism-include-languages.ts`.

## Usage

```js
const Prism = require('prismjs');
require('prism-liquidsoap')(Prism);

Prism.highlight(code, Prism.languages.liquidsoap, 'liquidsoap');
```

Registers both `liquidsoap` and `liq`.

With Docusaurus, swizzle `prism-include-languages` and call it on the `PrismObject` you
are handed.

## What it covers

Comments and `@param`/`@category`/`@flag` doc tags, single- and double-quoted strings with
recursive `#{...}` interpolation, `%encoder` forms including nested ones, keywords,
booleans, `null`, decimal/float/hex numbers, time predicates such as `10h30m`, function
definitions and calls including dotted names, named arguments and `~labels`, methods, and
the operators Liquidsoap actually leans on — `:=`, `!`, `??`, `->`, `...`, `::`, `|>`.

Named arguments are distinguished from bindings: `f(start=true)` highlights `start` as an
argument, while `radio = playlist(...)` leaves `radio` plain.

## Scope

This is deliberately not a port of the TextMate grammar in
[`vscode-liquidsoap`](https://github.com/savonet/vscode-liquidsoap) (17 rules, 57 scopes).
It targets the constructs that actually appear in the Liquidsoap documentation, measured
across its code blocks. If fidelity ever matters more than simplicity, the better move is
to render with [Shiki](https://shiki.style) and consume that TextMate grammar directly,
rather than growing this file toward it.

## Tests

```sh
npm test
```

Fixed cases assert specific constructs produce specific tokens. The suite additionally
runs the grammar over every Liquidsoap code block in the site's synced documentation
(~3,900 blocks) to catch runaway patterns — the usual failure mode, where one greedy rule
swallows an entire file.
