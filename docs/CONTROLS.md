# Controls

`src/controls/` holds the metrics of the control box: the line height every
control shares, the padding inside a button, and the button's corner radius.
Three of them are Bulma variables, declared in
[`consts.ts`](../src/controls/consts.ts):

| Property                    | Value      | At the 14px control size |
| --------------------------- | ---------- | ------------------------ |
| `control-line-height`       | `1.5714`   | 22px of line             |
| `button-padding-vertical`   | `0.6429em` | 9px                      |
| `button-padding-horizontal` | `1.5714em` | 22px                     |

The radius is the fourth, and it is not a Bulma variable. It is 20px, and it
reaches the output as a rule of its own — see
[the button radius](#the-button-radius).

## Why the button is 40px tall

Bulma gives `.button` `height: auto`, so a button is as tall as its line box
plus its vertical padding: `22 + 9 + 9 = 40`.

The border is already inside those 9px. Bulma writes the padding as
`calc(var(--oen-button-padding-vertical) - var(--oen-button-border-width))`,
so the rendered padding is 8px and the 1px border is the ninth pixel. Text
sits 9px from the top edge, and the box is 40px. The sides work the same way:
21px of padding plus the 1px border puts text 22px from the edge.

Only `.button` takes its height from these metrics. `.input`, `.select`, and
the other controls keep Bulma's fixed `--oen-control-height` of `2.5em`, which
is 35px at 14px text, so the line height changes their leading and not their
height.

Because `1.5714` is the ratio rounded to four places, the line box is
21.9996px and the button measures 39.98px. It paints as 40 pixels. A ratio
with more places does not help: the browser snaps a line box to a sixty-fourth
of a pixel either way.

## Why the values are relative

`--oen-button-padding-vertical` and `--oen-button-padding-horizontal` are
declared on `.button`, whose font size is `--oen-control-size`, which is 14px.
One em is therefore 14px, and 9px of padding is `0.6429em`.

A relative value keeps the size modifiers in proportion: `.is-large` is 18px
text, so it gets 11.6px of vertical padding and a taller box. Padding in
pixels would hold 9px at every size and crowd the larger buttons.

`control-line-height` is unitless for the reason the body line height is — see
[TYPOGRAPHY.md](./TYPOGRAPHY.md#body-metrics).

## One global line height

`GLOBAL_LINE_HEIGHT_IN_PIXELS` is declared in
[`src/typography/consts.ts`](../src/typography/consts.ts) and read twice: once
as `body-line-height`, and once here as `control-line-height`. Body text and
controls therefore share one line height, 22px on 14px text.

Components that set their own line height keep Bulma's value: `.title`,
`.subtitle`, `.menu-list`, `.modal-card-title`, and `.panel-heading`.

## How it reaches Sass

[`to-control-configuration.ts`](../src/controls/to-control-configuration.ts)
emits one Sass variable per declaration:

```scss
$control-line-height: 1.5714,
$button-padding-vertical: 0.6429em,
$button-padding-horizontal: 1.5714em,
```

`$control-line-height` is Bulma's, from `bulma/sass/utilities/controls.scss`;
the two paddings are from `bulma/sass/elements/button.scss`. All three carry
`!default` and are forwarded by `pkg:bulma/sass`, so configuration reaches
them.

## The button radius

Buttons are 20px rounded, and nothing else is. That cannot be configured:
Bulma has no `$button-radius`. `.button` reads `--oen-control-radius` from the
shared control rule, together with `.input`, `.textarea`, `.select select`,
`.file-cta`, `.file-name`, and the four pagination controls, so setting
`$control-radius` would round all ten of them. The size modifiers would still
disagree: `.button.is-small` and the rest re-point `--oen-control-radius` at
`--oen-radius-small` and the other radius steps.

So the radius is one rule of its own, the only declaration Oen adds that Bulma
does not have. [`format-button-radius-rule.ts`](../src/controls/format-button-radius-rule.ts)
spells it:

```css
.button {
  border-radius: 20px;
}
```

[`patch-oen-button-radius.ts`](../src/controls/patch-oen-button-radius.ts)
appends it to the generated Sass source, after the `@use` statement, so Sass
compiles it like everything else and both stylesheets carry it — see
[STYLESHEET.md](./STYLESHEET.md#what-it-generates).

Appending it is what makes it work at every button size. The rule sets
`border-radius` directly instead of the variable the size modifiers rewrite,
and it comes last in the file, so it wins over the shared control rule on
source order. Two things still beat it on specificity, which is intended:

- `.button.is-rounded` stays a pill at `--oen-radius-rounded`.
- `.buttons.has-addons` still squares the inner corners, so a group reads as
  one 20px-rounded shape.

## How it is verified

The three variables are inputs to Sass and expectations about the output at
the same time: Bulma registers each one as a custom property under the same
name.
[`format-theme-control-declaration.ts`](../src/controls/format-theme-control-declaration.ts)
turns each into the declaration the compiled CSS has to contain:

```css
--oen-control-line-height: 1.5714;
```

The check `controls are the configured Oen metrics` asserts those three and
the radius rule, and fails with whichever it could not find. The three
properties are part of the allowlist of the equivalence check, which would
otherwise read them as drift from Bulma.

The radius rule needs more than an allowlist entry, because Bulma has no line
to compare it against.
[`patch-bulma-button-radius.ts`](../src/controls/patch-bulma-button-radius.ts)
removes it from the end of our stylesheet before the comparison, the way
`src/namespace/` maps our custom properties back — see
[VERIFICATION.md](./VERIFICATION.md#the-equivalence-check). Both directions
read the same rule from `formatButtonRadiusRule`, so they cannot drift apart.

## Changing a metric

Edit `src/controls/consts.ts`, or `GLOBAL_LINE_HEIGHT_IN_PIXELS` in
`src/typography/consts.ts` for the line height, then:

```bash
npm run build && npm run verify
```

Nothing else needs to change. The Sass configuration and the expected
declaration are read from the same constant, and so are the two directions of
the radius rule.
