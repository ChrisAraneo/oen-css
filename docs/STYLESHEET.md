# The stylesheet source

`src/stylesheet/` is what used to be `src/oen.scss`.

## Why there is no .scss file

Bulma is a Sass library, and its theming API _is_ Sass variables: you load
`pkg:bulma/sass` with a configuration, and Bulma derives everything else —
every color variant, every scheme, every control size — from what you pass
in. There is no CSS-level equivalent that produces the same output.

So the Sass is still here; the **file** is not.
[`to-oen-stylesheet-source.ts`](../src/stylesheet/to-oen-stylesheet-source.ts)
builds the `@use` statement as a string from the sibling modules, and
[`read-compiled-oen-stylesheet.ts`](../scripts/common/sass/read-compiled-oen-stylesheet.ts)
passes that string to dart-sass's `compileString`. No file is written, and no
`.scss` is checked in. The only Sass in the repository is Bulma's own, in
`node_modules`.

This is also the same call the equivalence check already used to compile
_unconfigured_ Bulma for comparison, so both sides of that diff now come from
`compileString`.

## What it generates

Verbatim, as of today:

<!-- prettier-ignore -->
```scss
@use "pkg:bulma/sass" with (
  $cssvars-prefix: "oen-",
  $class-prefix: "",
  $helpers-prefix: "is-",
  $helpers-has-prefix: "has-",
  $variables-host: ":root",
  $family-sans-serif: ("Trebuchet MS", Seravek, "Gill Sans Nova", "Segoe UI", Ubuntu, Calibri, "Noto Sans", "DejaVu Sans", sans-serif),
  $primary: #2DE5A7,
  $link: #E55DB4,
  $info: #2DC1E2,
  $success: #2DE52D,
  $warning: #E5612D,
  $danger: #E25A5A,
  $size-1: 1.75rem,
  $size-2: 1.5rem,
  $size-3: 1.3125rem,
  $size-4: 1.125rem,
  $size-5: 1rem,
  $size-6: 0.875rem,
  $size-7: 0.75rem,
  $body-font-size: 0.875em,
  $body-line-height: 1.5714,
  $small-font-size: 0.75rem,
  $control-line-height: 1.5714,
  $button-padding-vertical: 0.6429em,
  $button-padding-horizontal: 1.5714em
);

.button {
  border-radius: 20px;
}

.button:not(.is-ghost):not(.is-text) {
  --oen-button-border-width: 2px;
}

.button:where(:not(.is-ghost, .is-text)) {
  border-color: hsla(var(--oen-button-h), var(--oen-button-s), var(--oen-button-color-l), 0.2);
}

.button:where(:not(.is-ghost, .is-text)) {
  box-shadow: 0 0 8px hsla(var(--oen-button-h), var(--oen-button-s), 45%, 0.08), 0 2px 10px hsla(var(--oen-button-h), var(--oen-button-s), 45%, 0.08), 0 8px 24px hsla(var(--oen-button-h), var(--oen-button-s), 45%, 0.06);
}

.button {
  letter-spacing: 0.75px;
  text-transform: uppercase;
}

.button:where(:not(.is-ghost, .is-text)) {
  isolation: isolate;
  overflow: hidden;
}

.button:where(:not(.is-ghost, .is-text)) > canvas.oen-button-canvas {
  position: absolute;
  z-index: -1;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  opacity: var(--oen-button-canvas-opacity, 1);
  mix-blend-mode: var(--oen-button-canvas-blend-mode, normal);
  pointer-events: none;
}
```

The `@use` statement is the whole configuration. The rules after it are what
Oen adds that Bulma has no variable for: the button radius, the rim, the soft
shadow, the label and the canvas layer. `src/controls/` owns the first four
and [CONTROLS.md](./CONTROLS.md#the-button-radius) explains why each has to be
a rule; `src/canvas/` owns the fifth and [CANVAS.md](./CANVAS.md) explains it.

Nothing here paints a gradient. The color a button shows and the gradient
drifting over it are painted by `oen.js` onto the canvas this last rule parks
— see [CANVAS.md](./CANVAS.md#what-it-paints).

Nothing in that output is written by hand. Each group comes from the module
that owns it, and
[`to-bulma-configuration.ts`](../src/stylesheet/internal/to-bulma-configuration.ts)
concatenates them in this order:

| Fragment                      | Owner             | Document                         |
| ----------------------------- | ----------------- | -------------------------------- |
| `toNamespaceConfiguration()`  | `src/namespace/`  | [NAMESPACE.md](./NAMESPACE.md)   |
| `toFontConfiguration()`       | `src/fonts/`      | [FONTS.md](./FONTS.md)           |
| `toColorConfiguration()`      | `src/colors/`     | [COLORS.md](./COLORS.md)         |
| `toTypographyConfiguration()` | `src/typography/` | [TYPOGRAPHY.md](./TYPOGRAPHY.md) |
| `toControlConfiguration()`    | `src/controls/`   | [CONTROLS.md](./CONTROLS.md)     |

Each module emits already-formatted `$name: value` fragments, so the module
that owns a value also owns how it is spelled in Sass — the parentheses that
keep the font stack one value, the quotes around a prefix, the units on a
size. `src/stylesheet/` only indents and joins them, and then appends the
button radius rule with `patchOenButtonRadius`, the two button border rules
with `patchOenButtonBorder`, the soft shadow with `patchOenButtonShadow`, the
label with `patchOenButtonLabel`, and the canvas rules with
`patchOenButtonCanvas`. They are appended in that order, and the equivalence
check takes them off in the reverse one — see
[CONTROLS.md](./CONTROLS.md#how-it-is-verified).

## One source of truth

The values used to be written twice: once in `oen.scss` for Sass, and once in
TypeScript so that `verify` could assert they reached the output. A check made
sure the two copies agreed.

Now each value is declared once and read twice — into the configuration above,
and into the expected declarations `verify` looks for. The two cannot drift,
because there is only one of them.

## Adding a Bulma option

Bulma accepts far more than the 25 variables above; the full list is in
`node_modules/bulma/sass/utilities/initial-variables.scss`. Setting one more
is a two-line change, but it is intentionally not the whole job: the
equivalence check knows about the groups above and nothing else, so a new
option moves bytes it does not expect to move and the check fails. See
[VERIFICATION.md](./VERIFICATION.md#relaxing-the-equivalence-check) for the
deliberate way to allow it.

## Checking what was generated

```bash
node -e "import('./src/stylesheet/to-oen-stylesheet-source.ts').then(({toOenStylesheetSource}) => console.log(toOenStylesheetSource()))"
```
