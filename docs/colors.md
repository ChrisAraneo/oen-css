# Colours

`src/colors/` holds the six theme colours and nothing else. They are declared
in [`consts.ts`](../src/colors/consts.ts):

| Name      | Hex       |
| --------- | --------- |
| `primary` | `#47b27b` |
| `link`    | `#b24795` |
| `info`    | `#479db2` |
| `success` | `#47b247` |
| `warning` | `#b26747` |
| `danger`  | `#b24747` |

## Why six values is the whole palette

Bulma derives everything else from a theme colour. For each of the six it
emits, in both the light and dark schemes:

- the colour itself, and its `-rgb` and `-h` / `-s` / `-l` channel parts,
- `-light`, `-dark`, `-invert`, `-on-scheme` variants,
- the `-00-l` … `-100-l` lightness ladder,
- the matching `-light-invert`, `-dark-invert` and hover/active steps used by
  buttons, tags, notifications and the rest.

All of that is computed by Bulma's own Sass functions from the one hex value,
which is why changing a colour here changes every variant of it in the
compiled stylesheet, and why no other file needs editing.

## How it reaches Sass

[`to-color-configuration.ts`](../src/colors/to-color-configuration.ts) maps
each entry to its Bulma variable, which is simply the colour's own name:

```scss
$primary: #47b27b,
$link: #b24795,
```

## How it is verified

`verify` does not trust that Bulma consumed the configuration. For each
colour,
[`format-theme-color-declaration.ts`](../src/colors/format-theme-color-declaration.ts)
turns the hex into the declaration the compiled CSS must literally contain:

```css
--oen-primary-rgb: 71, 178, 123;
```

The hex is split into decimal channels by
[`to-rgb-channels.ts`](../src/colors/internal/to-rgb-channels.ts), and the
check fails with the expected declaration if it is missing. The `-rgb` form is
used because it is unambiguous — one declaration per colour, no rounding, no
scheme to disambiguate.

## Changing a colour

Edit `src/colors/consts.ts`, then:

```bash
npm run build && npm run verify
```

Nothing else needs to change. The new value flows into the Sass configuration
and into the expected declaration from the same constant. Two checks will
exercise it: `theme colors are the configured Oen palette`, and the
equivalence check, which recognises `--oen-<name>-*` declarations as part of
the allowed theme delta rather than as drift from Bulma.
