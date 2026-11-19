# Fonts

`src/fonts/` holds one value, the sans-serif stack, declared in
[`consts.ts`](../src/fonts/consts.ts):

```
"Trebuchet MS", Seravek, "Gill Sans Nova", "Segoe UI", Ubuntu, Calibri,
"Noto Sans", "DejaVu Sans", sans-serif
```

It is a system-font stack: nothing is downloaded, and each entry is the best
available humanist sans on a given platform, with a generic `sans-serif` as
the last resort.

## How it reaches Sass

[`to-font-configuration.ts`](../src/fonts/to-font-configuration.ts) sets
Bulma's `$family-sans-serif`:

<!-- prettier-ignore -->
```scss
$family-sans-serif: ("Trebuchet MS", Seravek, ..., sans-serif),
```

The parentheses matter. Without them the commas would make the stack nine
arguments to `@use … with` instead of one Sass list, and the compile would
fail.

## Which properties it reaches

Bulma passes `$family-sans-serif` to two custom properties, and a third reads
the first of them:

| Property                 | Set from               |
| ------------------------ | ---------------------- |
| `--oen-family-primary`   | `$family-sans-serif`   |
| `--oen-family-secondary` | `$family-sans-serif`   |
| `--oen-body-family`      | `--oen-family-primary` |

`$family-monospace` is deliberately left at Bulma's value, so
`--oen-family-code` — used by `code`, `pre`, and `.is-family-code` — is still
Bulma's monospace stack. To change that too, set a new Bulma option: see
[STYLESHEET.md](./STYLESHEET.md#adding-a-bulma-option).

## How it is verified

`OEN_FONT_PROPERTIES` in `src/fonts/consts.ts` lists the two properties the
stack has to reach, and
[`format-theme-font-declaration.ts`](../src/fonts/format-theme-font-declaration.ts)
builds the declaration each one must contain. The quotes are stripped when
comparing, because Sass emits the stack unquoted:

```css
--oen-family-primary: Trebuchet MS, Seravek, ..., sans-serif;
```

## Changing the stack

Edit `OEN_FONT_STACK` in `src/fonts/consts.ts`, keeping it a valid CSS font
list, then run `npm run build && npm run verify`. Both the configuration and
the expected declarations come from that one string.
