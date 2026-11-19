# Colors

`src/colors/` holds the six theme colors and nothing else. They are declared
in [`consts.ts`](../src/colors/consts.ts):

| Name      | Hex       |
| --------- | --------- |
| `primary` | `#47b27b` |
| `link`    | `#b24795` |
| `info`    | `#479db2` |
| `success` | `#47b247` |
| `warning` | `#b26747` |
| `danger`  | `#b24747` |

## Why six values are the whole palette

Bulma derives everything else from a theme color. For each of the six it
emits, in both the light and dark schemes:

- the color itself, and its `-rgb` and `-h` / `-s` / `-l` channel parts,
- `-light`, `-dark`, `-invert`, `-on-scheme` variants,
- the `-00-l` … `-100-l` lightness steps,
- the matching `-light-invert`, `-dark-invert`, and hover/active steps used by
  buttons, tags, notifications, and the rest.

Bulma's own Sass functions compute all of that from the one hex value.
Changing a color here changes every variant of it in the compiled stylesheet,
and no other file needs editing.

## How it reaches Sass

[`to-color-configuration.ts`](../src/colors/to-color-configuration.ts) maps
each entry to its Bulma variable, which is the color's own name:

```scss
$primary: #47b27b,
$link: #b24795,
```

## How it is verified

`verify` does not trust that Bulma consumed the configuration. For each
color,
[`format-theme-color-declaration.ts`](../src/colors/format-theme-color-declaration.ts)
turns the hex into the declaration the compiled CSS must literally contain:

```css
--oen-primary-rgb: 71, 178, 123;
```

The hex is split into decimal channels by
[`to-rgb-channels.ts`](../src/colors/internal/to-rgb-channels.ts), and the
check fails with the expected declaration if it is missing. The `-rgb` form is
used because it is unambiguous — one declaration per color, no rounding, no
scheme to disambiguate.

## Changing a color

Edit `src/colors/consts.ts`, then:

```bash
npm run build && npm run verify
```

Nothing else needs to change. The Sass configuration and the expected
declaration are read from the same constant. Two checks cover it: `theme
colors are the configured Oen palette`, and the equivalence check, which
counts `--oen-<name>-*` declarations as part of the allowed theme delta rather
than as drift from Bulma.
