# The stylesheet source

`src/stylesheet/` is what used to be `src/oen.scss`.

## Why there is no .scss file

Bulma is a Sass library, and its theming API _is_ Sass variables: you load
`pkg:bulma/sass` with a configuration, and Bulma derives everything else —
every colour variant, every scheme, every control size — from what you pass
in. There is no CSS-level equivalent that produces the same output.

So the Sass did not go away; the **file** did.
[`to-oen-stylesheet-source.ts`](../src/stylesheet/to-oen-stylesheet-source.ts)
builds the `@use` statement as a string from the sibling modules, and
[`read-compiled-oen-stylesheet.ts`](../scripts/common/sass/read-compiled-oen-stylesheet.ts)
hands that string to dart-sass's `compileString`. No file is written, and no
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
  $primary: #47b27b,
  $link: #b24795,
  $info: #479db2,
  $success: #47b247,
  $warning: #b26747,
  $danger: #b24747,
  $size-1: 1.75rem,
  $size-2: 1.5rem,
  $size-3: 1.3125rem,
  $size-4: 1.125rem,
  $size-5: 1rem,
  $size-6: 0.875rem,
  $size-7: 0.75rem,
  $body-font-size: 0.875em,
  $body-line-height: 1.4286,
  $small-font-size: 0.75rem
);
```

Nothing in that output is written by hand. Each group comes from the module
that owns it, and
[`to-bulma-configuration.ts`](../src/stylesheet/internal/to-bulma-configuration.ts)
concatenates them in this order:

| Fragment                      | Owner             | Document                         |
| ----------------------------- | ----------------- | -------------------------------- |
| `toNamespaceConfiguration()`  | `src/namespace/`  | [namespace.md](./namespace.md)   |
| `toFontConfiguration()`       | `src/fonts/`      | [fonts.md](./fonts.md)           |
| `toColorConfiguration()`      | `src/colors/`     | [colors.md](./colors.md)         |
| `toTypographyConfiguration()` | `src/typography/` | [typography.md](./typography.md) |

Each module emits already-formatted `$name: value` fragments, so the module
that owns a value also owns how it is spelled in Sass — the parentheses that
keep the font stack one value, the quotes around a prefix, the units on a
size. `src/stylesheet/` only indents and joins them.

## One source of truth

The values used to be written twice: once in `oen.scss` for Sass, and once in
TypeScript so that `verify` could assert they reached the output. A check made
sure the two copies agreed.

Now each value is declared once and read twice — into the configuration above,
and into the expected declarations `verify` looks for. The two cannot drift,
because there is only one of them.

## Adding a Bulma knob

Bulma accepts far more than the 23 variables above; the full list is in
`node_modules/bulma/sass/utilities/initial-variables.scss`. Setting one more
is a two-line change, but it is intentionally not the whole job: the
equivalence check knows about the groups above and nothing else, so a new knob
moves bytes it does not expect to move and it will fail. See
[verification.md](./verification.md#relaxing-the-equivalence-check) for the
deliberate way through.

## Checking what was generated

```bash
node -e "import('./src/stylesheet/to-oen-stylesheet-source.ts').then(({toOenStylesheetSource}) => console.log(toOenStylesheetSource()))"
```
