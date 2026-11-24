# Controls

`src/controls/` holds everything about the control box and the button on it:
the line height every control shares, the padding inside a button, the label
it carries, the corner radius, the rim around it, and the soft shadow it
casts. The color a button shows and the gradient drifting over it are not
here: both are painted on the injected canvas, next door in `src/canvas/` —
see [CANVAS.md](./CANVAS.md). Three of those are Bulma
variables, declared in
[`consts.ts`](../src/controls/consts.ts):

| Property                    | Value      | At the 14px control size |
| --------------------------- | ---------- | ------------------------ |
| `control-line-height`       | `1.5714`   | 22px of line             |
| `button-padding-vertical`   | `0.6429em` | 9px                      |
| `button-padding-horizontal` | `1.5714em` | 22px                     |

The rest are not Bulma variables at all: Bulma has nothing to configure for a
20px radius, a translucent rim, a colored shadow or an uppercase label, so
each reaches the output as rules of its own — see
[the button radius](#the-button-radius), [the rim](#the-rim),
[the soft shadow](#the-soft-shadow) and [the label](#the-label).

## Why the button is 40px tall

Bulma gives `.button` `height: auto`, so a button is as tall as its line box
plus its vertical padding: `22 + 9 + 9 = 40`.

Whatever border there is comes out of those 9px. Bulma writes the padding as
`calc(var(--oen-button-padding-vertical) - var(--oen-button-border-width))`,
so the two always sum to 9 however the width is set.

Every button but the ghost and the text one carries a real
`OEN_BUTTON_BORDER_WIDTH` of 2px, so its padding drops to 7px to pay for it —
see [the rim](#the-rim). Text still sits 9px from the top edge, the box is
still 40px, and the sides work the same way out to 22px.

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

So the radius is one rule of its own.
[`format-button-radius-rule.ts`](../src/controls/format-button-radius-rule.ts)
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

## The rim

Every button but the ghost and the text one is rimmed in a translucent shade
of its own text color, `OEN_BUTTON_BORDER_WIDTH` thick, following the corner
radius all the way round.
[`format-button-border-rules.ts`](../src/controls/format-button-border-rules.ts)
spells it, and
[`patch-oen-button-border.ts`](../src/controls/patch-oen-button-border.ts)
appends it after the radius rule.

```css
.button:not(.is-ghost):not(.is-text) {
  --oen-button-border-width: 2px;
}

.button:where(:not(.is-ghost, .is-text)) {
  border-color: hsla(
    var(--oen-button-h),
    var(--oen-button-s),
    var(--oen-button-color-l),
    0.2
  );
}
```

[STYLESHEET.md](./STYLESHEET.md#what-it-generates) carries it in full.

### Why it is flat, and where the gradient went

It used to be a gradient: an `::after` the size of the button, painted with a
lighter-to-darker ramp of the button's own color and masked down to the 2px
between the content box and the border box, with
`--oen-button-border-width` zeroed so that ring took the border's place.

That is gone. Gradients on a button are the canvas's job now — see
[CANVAS.md](./CANVAS.md#what-it-paints) — so the rim is a real border in a
single color again, and `::after` is free, which matters because `::after` is
also Bulma's spinner on `.button.is-loading`. The flat rim was already there
as the fallback for browsers without `mask-composite`; it is now the only
edge there is, and every button pays its 2px out of the padding rather than
only the loading, static and disabled ones.

`--oen-button-border-width` is set by a rule of its own that spells each
exclusion as a `:not()` rather than one list, so it beats every rule that
registers a width: the deepest of those are
`.button.is-primary:focus-visible` and `.button.is-outlined:hover`, at three
classes.

The color rule keeps its `:where()`, so `.button.is-outlined`,
`.button.is-static`, `.button:focus-visible` and the disabled rules still win
the `border-color` they set. The focus ring is a `box-shadow` outside the
button, so it reads over the rim rather than under it.

### The surface the canvas sits on

`isolation: isolate` and `overflow: hidden` on the button used to be declared
with the frosted glass, because the glass needed them. The glass is gone and
both moved to
[`format-button-canvas-rules.ts`](../src/canvas/format-button-canvas-rules.ts),
the only rule that needs them now — see
[CANVAS.md](./CANVAS.md#where-it-sits-in-the-button). They are still declared
once, and still on the button itself.

## The soft shadow

Every button but the ghost and the text one casts a soft shadow in its own
color: three shadows stacked at widening blurs and falling opacity, so the
edge of it gradates away instead of stopping.
[`format-button-shadow-rules.ts`](../src/controls/format-button-shadow-rules.ts)
spells it, and
[`patch-oen-button-shadow.ts`](../src/controls/patch-oen-button-shadow.ts)
appends it third of the five:

```css
.button:where(:not(.is-ghost, .is-text)) {
  box-shadow:
    0 0 8px hsla(var(--oen-button-h), var(--oen-button-s), 45%, 0.08),
    0 2px 10px hsla(var(--oen-button-h), var(--oen-button-s), 45%, 0.08),
    0 8px 24px hsla(var(--oen-button-h), var(--oen-button-s), 45%, 0.06);
}
```

### Why it is three shadows and not one gradient

`box-shadow` takes a color, never a gradient, and the shadow has to paint
outside the button, where a child cannot reach: the canvas layer needs
`overflow: hidden`, which clips every descendant to the padding box.
Stacking shadows is what is left, and it is enough — `OEN_BUTTON_SHADOW_LAYERS`
is a halo with no offset, a short drop, and a long faint one, and the three
falloffs sum to a smooth gradient.

The color is `hsla()` on `--oen-button-h` and `--oen-button-s` at a fixed
`OEN_BUTTON_SHADOW_LIGHTNESS`, so a primary button throws green, a danger one
red, and the plain and white buttons throw the scheme's own near-neutral.
Holding the lightness at `45%` rather than reading the button's own keeps the
shadow visible in both schemes: against a dark page it sits lighter than the
background and reads as a glow.

### What still wins over it

The rule is a `:where()`, so it counts as one class — the same as `.button`
itself. It beats Bulma's own `box-shadow` on source order and loses every
other contest: `.button:focus-visible` keeps the focus ring, `[disabled]`
keeps `--oen-button-disabled-shadow`, and `.button.is-ghost` keeps its
`none`.

One thing Bulma does and this does not: Bulma drops the shadow on `:active` by
zeroing `--oen-button-outer-shadow-a`. That variable feeds the declaration
this rule replaces, so a pressed button keeps its shadow.

## The label

Every button's label is uppercase, with `0.75px` of letter spacing.
[`format-button-label-rule.ts`](../src/controls/format-button-label-rule.ts)
spells it, and
[`patch-oen-button-label.ts`](../src/controls/patch-oen-button-label.ts)
appends it fourth of the five:

```css
.button {
  letter-spacing: 0.75px;
  text-transform: uppercase;
}
```

Bulma has no variable for either. It exposes `$button-weight` and
`$button-family` and nothing else about the label, so this is a rule of its
own like the radius.

The selector is the plain `.button`, with no `:not()`: unlike the surface
rules, this applies to the ghost and the text button too, because both still
carry a label. One class is enough — nothing in Bulma sets either property on
a button — and the `.is-uppercase`, `.is-lowercase` and `.is-capitalize`
helpers all carry `!important`, so a button that opts into one of those still
wins.

### What it changes about the box

Nothing vertical. The line height is untouched, so every button is still
exactly as tall as it was — 40px at the default size.

Buttons do get wider, which is inherent to the request rather than a side
effect to fix: uppercase glyphs are wider than lowercase, and `0.75px` of
tracking is added between every pair. A default button goes from 78px to 86px,
a small one from 67px to 74px, a large one from 100px to 109px. Anything
sizing a button in `ch` or holding a row of them in a fixed width will feel
that.

## The pressed label

A button that is held moves its label down, so the text sinks with the surface
the canvas paints under it:

```css
.button {
  --oen-button-press: 0;
  --oen-button-press-depth: 0.0714em;
  padding-bottom: calc(
    var(--oen-button-padding-vertical) - var(--oen-button-border-width) -
      var(--oen-button-press) * var(--oen-button-press-depth)
  );
  padding-top: calc(
    var(--oen-button-padding-vertical) - var(--oen-button-border-width) +
      var(--oen-button-press) * var(--oen-button-press-depth)
  );
}
```

`--oen-button-press` is a number between 0 and 1 that the canvas runtime
writes onto the button while it is pressed — see
[CANVAS.md](./CANVAS.md#the-press-animates) for where it comes from and how it
eases. `--oen-button-press-depth` is how far a full press moves the label:
`0.0714em`, one pixel at the control's own text size, so it scales with
`.is-small` and `.is-large` the way the padding does.

### Why it is padding and not a transform

What must _not_ move decides this. The border is the button's rim and the
canvas is the recess behind it, and a surface that has sunk means the label
drops while both of those hold still. A `transform` on the button would take
the rim, the background and the canvas with it, and there is no element around
the label to transform instead — a Bulma button's text is usually a bare text
node, which nothing can target.

Padding moves the content and leaves the border box alone, which is exactly
the split that is wanted.

### What it changes about the box

Nothing, which is the point. The two paddings move by the same amount in
opposite directions, so a pressed button is exactly as tall as a resting one
and nothing on the page reflows around it. Measured in a browser, the label
moves 1.44px on a 20px button while the height changes by 0.016px, which is
the layout engine rounding the two halves rather than a real shift.

The expression repeats Bulma's own `padding-vertical` minus
`border-width`, which is the one cost of overriding it: if Bulma changes how
it computes button padding, this rule has to follow. The check
`controls are the configured Oen metrics` asserts the whole rule, so the
drift would fail the build rather than go unnoticed.

Setting `--oen-button-press-depth` in your own CSS changes how far the label
sinks without touching the runtime, and setting `--oen-button-press: 1` pins
a button down.

## How it is verified

The three variables are inputs to Sass and expectations about the output at
the same time: Bulma registers each one as a custom property under the same
name.
[`format-theme-control-declaration.ts`](../src/controls/format-theme-control-declaration.ts)
turns each into the declaration the compiled CSS has to contain:

```css
--oen-control-line-height: 1.5714;
```

The check `controls are the configured Oen metrics` asserts those three, the
radius rule, both border rules, the shadow rule, the label rule and the press
rule, and fails with whichever it could not find.
The three properties are part of the allowlist of the equivalence check, which
would otherwise read them as drift from Bulma.

The Oen-only rules need more than an allowlist entry, because Bulma has no
lines to compare them against.
[`patch-bulma-button-radius.ts`](../src/controls/patch-bulma-button-radius.ts),
[`patch-bulma-button-border.ts`](../src/controls/patch-bulma-button-border.ts),
[`patch-bulma-button-shadow.ts`](../src/controls/patch-bulma-button-shadow.ts),
[`patch-bulma-button-label.ts`](../src/controls/patch-bulma-button-label.ts)
and
[`patch-bulma-button-press.ts`](../src/controls/patch-bulma-button-press.ts)
remove them from the end of our stylesheet before the comparison, the way
`src/namespace/` maps our custom properties back — see
[VERIFICATION.md](./VERIFICATION.md#the-equivalence-check). Each direction
reads the same text from `formatButtonRadiusRule`,
`formatButtonBorderRules`, `formatButtonShadowRules`,
`formatButtonLabelRule` and `formatButtonPressRule`, so they cannot drift
apart.

The canvas layer is appended after all five and removed before all five by
[`patch-bulma-button-canvas.ts`](../src/canvas/patch-bulma-button-canvas.ts) —
see [CANVAS.md](./CANVAS.md).

They come off in reverse append order — canvas, press, label, shadow, border,
radius — because each removal is anchored to the end of the file. All of them
come off before `patchBulmaNamespace` runs, because the border and shadow
rules both name `--oen-*` properties, and the namespace mapping would rename
them out from under the removal.

## Changing a metric

Edit `src/controls/consts.ts`, or `GLOBAL_LINE_HEIGHT_IN_PIXELS` in
`src/typography/consts.ts` for the line height, then:

```bash
npm run build && npm run verify
```

Nothing else needs to change. The Sass configuration and the expected
declaration are read from the same constant, and so are the two directions of
the radius rule, of the border rules, of the shadow rule, and of the label
rule.

`OEN_BUTTON_BORDER_WIDTH` is the thickness of the rim and
`OEN_BUTTON_BORDER_OPACITY` how much of the text color shows through it. The
width is the button's own, not `--oen-control-border-width`, so the input and
the select keep Bulma's 1px.

The moving gradient is not in this file at all: it is drawn on the canvas,
and every constant behind it lives in
[`src/canvas/consts.ts`](../src/canvas/consts.ts) — see
[CANVAS.md](./CANVAS.md#tuning-what-it-paints).

`OEN_BUTTON_SHADOW_LAYERS` and `OEN_BUTTON_SHADOW_LIGHTNESS` are the shadow,
and `OEN_BUTTON_LETTER_SPACING` with `OEN_BUTTON_TEXT_TRANSFORM` the label.
Change any of them and the rule, the expected declaration and the removal all
follow from the one constant.
