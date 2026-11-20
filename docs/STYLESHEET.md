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
```

The `@use` statement is the whole configuration. The rule after it is the one
thing Oen adds that Bulma has no variable for, the button radius; `src/controls/`
owns it and [CONTROLS.md](./CONTROLS.md#the-button-radius) explains why it has
to be a rule.

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
button radius rule with `patchOenButtonRadius`.

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
