# Namespace

The namespace is the change that defines the library: Bulma's `--bulma-*`
custom properties are emitted as `--oen-*`, about 1400 of them, while class
names are left exactly as Bulma writes them.

That split is the whole compatibility story. `.button`, `.navbar`,
`.is-primary`, `.has-text-centered` and the rest keep working as they do in
Bulma, so the two stylesheets are drop-in interchangeable — but the custom
properties, which is what you override when you theme at the CSS level, are
unmistakably Oen's.

## What Sass does

[`to-namespace-configuration.ts`](../src/namespace/to-namespace-configuration.ts)
sets five Bulma knobs:

```scss
$cssvars-prefix: "oen-",   // the one real change
$class-prefix: "",         // kept at Bulma's value
$helpers-prefix: "is-",    // kept at Bulma's value
$helpers-has-prefix: "has-",
$variables-host: ":root",
```

Only the first changes anything. The other four are pinned on purpose: they
are what would rename or relocate class names if someone set them, and
pinning them states that this is not wanted and makes an accidental change
visible in a diff.

`$cssvars-prefix` is the part _after_ the two dashes Bulma writes itself, so
the value is derived from `OEN_CUSTOM_PROPERTY_PREFIX` (`--oen-`) by
[`to-sass-prefix.ts`](../src/namespace/internal/to-sass-prefix.ts) rather than
written twice.

## What Sass cannot do

Two things are not reachable through configuration, because Bulma hard-codes
them. They are applied to the compiled CSS by the build, and they are declared
in [`consts.ts`](../src/namespace/consts.ts) as `NAMESPACE_MAPPINGS` with
`appliedBy: 'BUILD'`:

| Mapping                 | From                           | To                   |
| ----------------------- | ------------------------------ | -------------------- |
| Fixed-grid container    | `bulma-fixed-grid`             | `oen-fixed-grid`     |
| Section marker comments | `/* Bulma Elements */` and kin | `/* Oen Elements */` |

The container name is hard-coded in `bulma/sass/grid/grid.scss`, and it
appears both as a `container-name` declaration and in the `@container`
queries that read it — eleven occurrences in the current Bulma, which is what
the build report counts.

`patchOenNamespace` applies these in order and records a count per mapping, so
a rename that silently stops matching after a Bulma upgrade shows up as `0x`
in the report rather than as a surprise in the output.

## Every mapping is reversible

Each `NamespaceMapping` carries both directions:

| Fields                           | Direction        | Used by   |
| -------------------------------- | ---------------- | --------- |
| `bulmaPattern`, `oenReplacement` | Bulma &rarr; Oen | the build |
| `oenPattern`, `bulmaReplacement` | Oen &rarr; Bulma | `verify`  |

The reverse direction is what makes the equivalence check possible.
[`patch-bulma-namespace.ts`](../src/namespace/patch-bulma-namespace.ts) maps our
compiled stylesheet _back_ to Bulma's namespace — all three mappings this
time, including the `--oen-` prefix — so it can be diffed against a fresh
compile of unconfigured Bulma. See
[verification.md](./verification.md#the-equivalence-check).

If you add a mapping, fill in both directions. A one-way mapping would make
the equivalence check report every one of its occurrences as drift.

## Leftover detection

[`filter-leftover-bulma-identifiers.ts`](../src/namespace/filter-leftover-bulma-identifiers.ts)
scans both stylesheets for the string `bulma`, case-insensitively, and reports
file and line for each hit, up to twenty. The attribution banner legitimately
says "Bulma" several times, so the header is blanked out first — by
[`patch-blanked-stylesheet-header.ts`](../src/banner/patch-blanked-stylesheet-header.ts),
which replaces it with the same number of newlines so the reported line
numbers still match the real file.

This runs twice: in the build, before anything is written, and again in
`verify` against what was written. A hit means a new hard-coded identifier
appeared upstream and needs a mapping — not a blanket search and replace,
which would also rewrite the banner and the upstream URLs it points at.
