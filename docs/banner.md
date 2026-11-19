# Banner

Both published stylesheets open with a charset declaration and an attribution
header:

```css
@charset "UTF-8";
/*!
 * oen-css v0.2.1 | MIT License | https://github.com/ChrisAraneo/oen-css
 *
 * Built from Bulma v1.0.4 | MIT License | https://bulma.io
 * Copyright (c) 2023 Jeremy Thomas
 * Bulma's license is reproduced verbatim in LICENSE-bulma, alongside this file.
 *
 * Bulma's `--bulma-*` custom properties are emitted as `--oen-*`; class names
 * (`.button`, `.navbar`, `.is-primary`, ...) are unchanged.
 */
```

Nothing in it is typed by hand.
[`format-oen-banner.ts`](../src/banner/format-oen-banner.ts) takes four facts
— our version, Bulma's version, Bulma's copyright line and our homepage — all
read from `package.json`, `node_modules/bulma/package.json` and Bulma's
`LICENSE` during the build. The copyright line is found by
[`find-copyright-line.ts`](../src/licenses/find-copyright-line.ts); if it is
missing the build fails rather than shipping a banner that attributes nothing.

The homepage is canonicalised first: npm's `homepage` field ends in `#readme`,
which is a fragment for humans, not an address for a stylesheet comment, so
[`to-canonical-homepage.ts`](../scripts/build/internal/to-canonical-homepage.ts)
strips it.

## `/*!` and minification

The comment opens with `/*!`, not `/*`. That marks it as a licence comment,
and clean-css is configured with `specialComments: 'all'`, so it survives
minification — `dist/oen.min.css` carries the same header as the expanded
file.

## Charset

Sass emits its own `@charset` when the output contains non-ASCII characters,
and it has to come first in the file.
[`patch-stylesheet-header.ts`](../src/banner/patch-stylesheet-header.ts)
removes that line and re-emits `@charset "UTF-8";` above the banner, so the
order is always charset, then banner, then CSS — rather than depending on
where Sass happened to put it.

## Reading the header back off

Three helpers exist because the header is noise to everything that inspects
the stylesheet afterwards:

| Helper                          | Does                                           | Used by                    |
| ------------------------------- | ---------------------------------------------- | -------------------------- |
| `toStylesheetBody`              | strips charset and banner                      | the equivalence check      |
| `patchBlankedStylesheetHeader`  | replaces them with the same number of newlines | leftover `bulma` detection |
| `filterEmbeddedLicenseComments` | finds every other `/*! … */` in the body       | the notices, and `verify`  |

The blanking variant exists so reported line numbers still match the real
file. The body variant exists because the banner contains the version, which
changes on every release and would otherwise show up as a difference from
Bulma on every byte-level comparison.

## Notices Bulma embedded

Bulma vendors [minireset.css](https://github.com/jgthms/minireset.css) into
its own sources together with its licence comment, so that notice arrives
inside the compiled CSS. `filterEmbeddedLicenseComments` reads those comments
out of the built stylesheet,
[`to-license-comment.ts`](../src/banner/internal/to-license-comment.ts) splits
each on `|` into a name and details, and the result is deduplicated by text.

Those parsed comments are what
[`format-third-party-notices.ts`](../src/licenses/format-third-party-notices.ts)
documents, and what `verify` checks still survive minification. See
[licenses.md](./licenses.md).
