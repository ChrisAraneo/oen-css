# Verification

`npm run verify` reads what was built and asserts seventeen things about it. It
writes nothing, it prints one `ok` line per check, and it exits 1 on the first
issue found.

```
  ok    package artifacts are present: oen.css, oen.min.css, oen.js, oen.min.js, LICENSE, LICENSE-bulma, THIRD_PARTY_NOTICES.md
  ...
17/17 checks passed
```

## What it reads

[`read-verify-inputs.ts`](../scripts/verify/internal/read-verify-inputs.ts)
loads the seven published files from the repository root, Bulma's own
`LICENSE` and `package.json` from `node_modules` — and compiles
**unconfigured Bulma** from source for the comparison described below. That last input is why `verify`
takes longer than the build.

## The seventeen checks

| Check                                                        | Asserts                                                                                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `package artifacts are present`                              | all seven files exist and are readable                                                                                               |
| `stylesheets start with @charset and the attribution banner` | both stylesheets carry `oen-css v`, `MIT License`, `Bulma v`, `Copyright (c)`, `LICENSE-bulma`                                       |
| `runtimes start with the attribution banner`                 | `oen.js` and `oen.min.js` open with the runtime `/*! … */` banner, naming Paper Shaders, Apache 2.0 and `THIRD_PARTY_NOTICES.md`     |
| `no bulma identifiers leak outside the banner`               | the string `bulma` appears nowhere but the banner, in either stylesheet                                                              |
| `custom properties are namespaced with --oen-`               | at least 500 distinct `--oen-*` declarations, including `--oen-primary`, `--oen-scheme-main`, `--oen-radius`, `--oen-family-primary` |
| `theme colors are the configured Oen palette`                | each of the six colors appears as its `-rgb` declaration                                                                             |
| `theme fonts are the configured Oen stack`                   | `--oen-family-primary` and `--oen-family-secondary` carry the stack                                                                  |
| `type scale is the configured Oen scale`                     | all fourteen type declarations are present, derived control sizes included                                                           |
| `controls are the configured Oen metrics`                    | the control line height, both button paddings, and the button radius, border, shadow and label rules are present                     |
| `every button carries an injected canvas layer`              | `oen.css` parks `.oen-button-canvas`, and both runtimes name the class and the host selector — see [CANVAS.md](./CANVAS.md)          |
| `component classes are unchanged from Bulma`                 | twelve spot-checked selectors still exist, from `.button` to `.skeleton-block`                                                       |
| `fixed grid container is namespaced`                         | `container-name: oen-fixed-grid` plus at least one `@container oen-fixed-grid` query                                                 |
| `minified output is smaller and still intact`                | `oen.min.css` is smaller than `oen.css` and has balanced braces                                                                      |
| `Bulma's license ships verbatim`                             | Bulma's copyright line is in `LICENSE-bulma` and in the notices                                                                      |
| `own license ships with the package`                         | `LICENSE` is an MIT notice, and its copyright line is reported                                                                       |
| `notices embedded by Bulma survive minification`             | every embedded notice is in both stylesheets and documented                                                                          |
| `output is Bulma, re-namespaced and re-themed, nothing else` | the main claim — see below                                                                                                           |

The first sixteen are cheap checks: they catch a build that half-ran, a
minifier that removed a comment, a Bulma upgrade that renamed a component. The
threshold ones are deliberately loose — "at least 500 custom properties" is a
smoke test for a truncated build, not a count to maintain.

## The equivalence check

The seventeenth is the one that makes the others nearly redundant. It proves
the published stylesheet is Bulma and nothing but Bulma, apart from the theme
and the button rules of our own.

1. Compile unconfigured Bulma from the same `node_modules` the build used.
2. Remove the Oen-only button rules from the end of ours, in reverse append
   order — canvas, label, shadow, border, radius — since Bulma has no lines to
   compare them
   against; see [CONTROLS.md](./CONTROLS.md#the-button-radius). The border and
   shadow rules name `--oen-*` properties, so they come off before the mapping
   in the next step.
3. Map our stylesheet **back** to Bulma's namespace, using the reverse
   direction of every mapping in `src/namespace/` — see
   [NAMESPACE.md](./NAMESPACE.md#every-mapping-is-reversible).
4. Strip the charset and banner from both sides, since ours carries a version
   number that changes on every release.
5. Compare line by line.
6. Allow a difference only if **both** lines are themed declarations.

Step 2 is the one deliberate relaxation, and it is as narrow as a relaxation
gets: it removes five exact blocks of text, read from the same
`formatButtonRadiusRule`, `formatButtonBorderRules`,
`formatButtonShadowRules`, `formatButtonLabelRule` and
`formatButtonCanvasRules` the build appends, at the end of the stylesheet and
nowhere else. A further Oen-only rule would fail the check until it is listed
here too.

Step 6 is the allowlist, and it is narrow. `THEMED_DECLARATION_PREFIXES` in
[`is-themed-declaration.ts`](../scripts/verify/internal/is-themed-declaration.ts)
is built from the theme itself: `--bulma-<color>` for each of the six colors,
`--bulma-<property>` for each font, type, and control property, plus bare
`font-family` and `font-size` for the literal declarations the type scale
compiles into. Anything else — a changed transition speed, an extra rule — is
drift, and the check fails with the first five offending lines:

```
  line 1234:
    oen: --bulma-radius: 0.5rem;
    bulma: --bulma-radius: 0.375rem;
```

Today it reports 720 allowed theme declarations and the five Oen button rules
across 764,084 compared bytes.
A change in that number on its own is informative: the theme reaches a
different set of declarations than before.

### Relaxing the equivalence check

A new Bulma option, set in `src/stylesheet/`, fails this check — by design.
The failure is the question "did you mean to change more of Bulma than the
theme?", and answering it takes two deliberate steps:

1. Set the option where it belongs. If it is a color, a font, or a type size,
   it
   already belongs to an existing module and needs nothing more. If it is
   something else — `$radius`, `$speed`, `$scheme-h` — it is a new kind of
   change, and the module that owns it has to say so.
2. Name the declarations it moves in `THEMED_DECLARATION_PREFIXES`.

Step 2 is intentionally manual. It is where "Oen is Bulma with a theme" either
stays true or is knowingly widened, so it should appear in a diff as an
explicit decision.

A rule Bulma has no variable for is the wider case, and the button radius, the
rim, the soft shadow, the label and the canvas layer are the five examples in
the repository today. Each
takes the same two steps, in a stronger form: the module that owns it writes
the rule in one place and appends it to the generated source, and the check
removes that same text before comparing. `src/controls/` does both with
`formatButtonRadiusRule`, `formatButtonBorderRules`,
`formatButtonShadowRules` and `formatButtonLabelRule`, and `src/canvas/` with
`formatButtonCanvasRules`, so the build and the check cannot disagree about
what was added — see
[CONTROLS.md](./CONTROLS.md#the-button-radius).

## The stories check

`npm run check:stories` is a separate assertion, about the gallery rather than
the package. It renders every story under `stories/`, collects every class name
the rendered HTML and the story sources use, and checks each one exists in
`oen.css` or in `.storybook/storybook.css`.

```
  rendered 183 stories, skipped 6 that need a browser
  checked 533 distinct classes used by the gallery
  every class exists in oen.css or .storybook/storybook.css
```

It catches a story that documents a class the stylesheet does not define —
a typo, or a Bulma class that disappeared upstream. Three kinds of class name
are excluded on purpose: Font Awesome's (`fa-`, `fas`, `far`, `fab`), which
come from a separate package; gallery-only classes prefixed `sb-`, which live
in `.storybook/storybook.css`; and the few Bulma classes that are only
markup targets with no declarations of their own, such as `dropdown-trigger`.

Stories that need a real browser to render are skipped rather than failed.
