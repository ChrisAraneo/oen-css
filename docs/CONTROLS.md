# Controls

`src/controls/` holds everything about the control box and the button on it:
the line height every control shares, the padding inside a button, the label
it carries, the corner radius, the gradient border around it, the frosted
glass behind the label, and the soft shadow it casts. Three of those are Bulma
variables, declared in
[`consts.ts`](../src/controls/consts.ts):

| Property                    | Value      | At the 14px control size |
| --------------------------- | ---------- | ------------------------ |
| `control-line-height`       | `1.5714`   | 22px of line             |
| `button-padding-vertical`   | `0.6429em` | 9px                      |
| `button-padding-horizontal` | `1.5714em` | 22px                     |

The rest are not Bulma variables at all: Bulma has nothing to configure for a
20px radius, a gradient border, an animated wash, a colored shadow or an
uppercase label, so each reaches the output as rules of its own — see
[the button radius](#the-button-radius),
[the gradient border](#the-gradient-border),
[the frosted glass](#the-frosted-glass),
[the soft shadow](#the-soft-shadow) and [the label](#the-label).

## Why the button is 40px tall

Bulma gives `.button` `height: auto`, so a button is as tall as its line box
plus its vertical padding: `22 + 9 + 9 = 40`.

Whatever border there is comes out of those 9px. Bulma writes the padding as
`calc(var(--oen-button-padding-vertical) - var(--oen-button-border-width))`,
so the two always sum to 9 however the width is set.

Most buttons carry no border at all: the gradient ring sets
`--oen-button-border-width` to `0px` and paints the edge inside the box
instead, so the padding is the full 9px — see
[the gradient border](#the-gradient-border). The loading, static and disabled
buttons keep a real `OEN_BUTTON_BORDER_WIDTH` of 2px, and their padding drops
to 7px to pay for it. Either way text sits 9px from the top edge and the box
is 40px, and the sides work the same way out to 22px.

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

## The gradient border

Every button but the ghost and the text one is ringed in its own color: a
gradient that runs from a lighter shade of the button at the top to a darker
one at the bottom, `OEN_BUTTON_BORDER_WIDTH` thick, following the corner
radius all the way round.
[`format-button-border-rules.ts`](../src/controls/format-button-border-rules.ts)
spells it, and
[`patch-oen-button-border.ts`](../src/controls/patch-oen-button-border.ts)
appends it after the radius rule.
[STYLESHEET.md](./STYLESHEET.md#what-it-generates) carries it in full.

### Why it is a masked pseudo-element and not a border

`border-color` takes a color, never a gradient, and `border-image` takes a
gradient but drops the corner radius — a 20px button would come back square.
So the ring is an `::after` the size of the button, painted with the gradient
and then masked: one mask layer clipped to the content box, one to the border
box, composited with `exclude` so only the 2px between them survives.
`border-radius: inherit` is what makes it follow `.is-rounded` and the
squared inner corners of `.buttons.has-addons` without being told about
either.

The ring sits at the button's outer edge rather than in the border area,
because the frosted glass needs `overflow: hidden` and that clips to the
padding box — a ring drawn in the border area is clipped away entirely. So
the rule sets `--oen-button-border-width` to `0px` and the ring takes the
border's place. Bulma writes the padding as
`calc(var(--oen-button-padding-vertical) - var(--oen-button-border-width))`,
so dropping the border to zero gives both pixels back to the padding and the
box does not move — see
[why the button is 40px tall](#why-the-button-is-40px-tall). It also lets the
frosted glass run right to the edge, which a real border would have clipped it
short of.

That zeroing has to beat every rule that registers a width, and the deepest of
those are `.button.is-primary:focus-visible` and `.button.is-outlined:hover`
at three classes, so the ring selector spells each exclusion as its own
`:not()` rather than one list.

`::after` is Bulma's own spinner on `.button.is-loading`, so loading buttons
are left out of the ring and keep the spinner. The static and the disabled
button are left out too: neither should wear a bright edge. All three fall
back to the flat translucent rim, which is why that rule is still there, and
why they are the only buttons that still carry a real border.

### Why the shades are clamped

Each end reads the button's own `--oen-button-background-l` and shifts it by
`OEN_BUTTON_GRADIENT_SHIFT`, but the shift alone is not enough at the ends of
the scale: nothing is lighter than a white button and nothing is darker than a
black one, so one end of the ring would vanish into the fill. The lighter stop
is therefore capped at `93%` and the darker one floored at `8%`. A white
button lands on `93%` over `86%` and a black one on `18%` over `8%` — both
still lighter above than below.

### What still wins over the ring

The whole block sits behind
`@supports (mask-composite: exclude) or (-webkit-mask-composite: xor)`. Where
the mask is not supported the `::after` would paint as a filled rectangle over
the button, so the guard drops the ring and the flat rim stays instead.

The translucent rim rule keeps its `:where()`, so `.button.is-outlined`,
`.button.is-static`, `.button:focus-visible` and the disabled rules still win
the `border-color` they set. The focus ring is a `box-shadow` outside the
button, so it reads over the gradient rather than under it.

## The frosted glass

Every button but the ghost and the text one carries a slow gradient behind its
label: six broad radial lobes in the button's own color, blurred, drifting on
a 10 second loop. It is the frozen-glass surface the border rims.
[`format-button-glass-rules.ts`](../src/controls/format-button-glass-rules.ts)
spells it, and
[`patch-oen-button-glass.ts`](../src/controls/patch-oen-button-glass.ts)
appends it third of the five:

```css
@keyframes oen-button-glass { … }
.button:where(:not(.is-ghost, .is-text)) {
  isolation: isolate;
  overflow: hidden;
}

.button:where(:not(.is-ghost, .is-text))::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: -105%;
  background-image: radial-gradient(…), …;
  filter: blur(20px);
  opacity: 0.7;
  pointer-events: none;
  animation: 10s linear infinite oen-button-glass;
}

@media (prefers-reduced-motion: reduce) { … }
```

[STYLESHEET.md](./STYLESHEET.md#what-it-generates) carries it in full.

### How the layer sits behind the label

`isolation: isolate` makes the button a stacking context. Inside one, the
painting order is the element's own background, then negative `z-index`
children, then the inline content — so `::before` at `z-index: -1` covers the
button's background color and the label still sits on top. Without the
isolation the layer would escape to the page's stacking context and paint
behind the button, where nothing would be seen of it.

`overflow: hidden` clips the layer to the border radius, which is why it
follows `.is-rounded` and the squared inner corners of `.buttons.has-addons`
without being told about either. The focus ring is a `box-shadow` on the
button itself, and `overflow` does not clip that.

`inset: -105%` holds the layer well outside the button, at about three times
its size. A blur samples what is near the edge, so a layer that stopped at the
edge would fade out along it; oversizing it puts the soft fringe outside the
clip. `blur(20px)` spreads about 30px, and the smallest button has 36px of
layer beyond each edge, so the fringe never reaches the clip. The animation
then translates, rotates and scales a layer that is already blurred, which the
compositor can do without repainting it.

The scale is what decides how much of the gradient a button shows.
`OEN_BUTTON_GLASS_ZOOM_FROM` and `OEN_BUTTON_GLASS_ZOOM_TO` hold it between
`1` and `1.15`, which fits several lobes inside one button, so the wash reads
as a gradient between tones rather than a single flat tint. Scaling further in shows
less of the gradient and flattens it toward one color. Scaling out shows more,
but it also pulls the blurred fringe inward, and below about `0.95` the fringe
reaches the clip and the smallest buttons fade along their top and bottom
edges. Raising the blur needs the spread raised with it, for the same reason.

### What it looks like on each variant

Every lobe is the button's own color. Each reads `--oen-button-h` and
`--oen-button-s` and shifts `--oen-button-background-l` by its own `offset`,
so a danger button washes in reds and a primary one in greens rather than in
a palette that has nothing to do with either. Four lobes sit near the button's
own lightness, two sit well above it and act as the highlights. Each carries
its own `falloff`, the point where it fades out: the four are wider than the
button itself and fade late, so a button shows one or two large soft fields
rather than a crowd of small ones. Growing them further trades tonal variety
for size — past about twice this, a button settles into one flat tint.

Reading the hue from the button is what keeps the variants clean. Lobes in
fixed theme colors average against the button's own and muddy it — a warning
button comes out brown, a danger one mauve — and no opacity setting fixes
that. The cost is that the wash is tonal rather than chromatic: it varies in
lightness within one hue instead of running between several.

`OEN_BUTTON_GLASS_SATURATION_BOOST` adds `75%` to the button's own
saturation. Without it the plain, white and light buttons would wash in grey,
because the scheme's saturation is only `14%`; with it they pick up the
scheme's own hue instead.

The wash is not equally strong everywhere. `OEN_BUTTON_GLASS_OPACITY` is
`0.7`, and `OEN_BUTTON_GLASS_STRONG_OPACITY` raises it to `0.95` for every
button that carries real color: `.is-black`, `.is-dark`, and the six theme
colors. A saturated or dark surface swallows a wash that a near-white one
already shows plainly, so those variants need more of it to read at all.
[`format-saturated-variant-selector.ts`](../src/controls/internal/format-saturated-variant-selector.ts)
builds that selector from `OEN_THEME_COLORS`, so a seventh theme color joins
the strong set on its own. The rule carries only `opacity` and sits after the
base one, so nothing else about the layer changes.

At `0.95` the wash is most of what you see: a danger button reads as a sweep
of reds and a primary one as a sweep of greens, light at one corner and deep
at the other, with the button's own flat color showing through only faintly.

The ghost and the text button are left out, as they are for the border. Both
are surface-less by design, and a frosted surface would make them ordinary
buttons.

### What it costs

Every button on the page gets its own blurred layer, and each one animates for
as long as the page is open. That is real compositor work on a page with many
buttons. `@media (prefers-reduced-motion: reduce)` drops the animation and
keeps the gradient still, which is both the accessible answer and the cheap
one.

## The soft shadow

Every button but the ghost and the text one casts a soft shadow in its own
color: three shadows stacked at widening blurs and falling opacity, so the
edge of it gradates away instead of stopping.
[`format-button-shadow-rules.ts`](../src/controls/format-button-shadow-rules.ts)
spells it, and
[`patch-oen-button-shadow.ts`](../src/controls/patch-oen-button-shadow.ts)
appends it fourth of the five:

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
outside the button, where a pseudo-element cannot reach: the frosted glass
needs `overflow: hidden`, which clips every descendant to the padding box.
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
appends it last of the five:

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
radius rule, both border rules, the glass rules, the shadow rule, and the
label rule, and fails with whichever it could not find.
The three properties are part of the allowlist of the equivalence check, which
would otherwise read them as drift from Bulma.

The Oen-only rules need more than an allowlist entry, because Bulma has no
lines to compare them against.
[`patch-bulma-button-radius.ts`](../src/controls/patch-bulma-button-radius.ts),
[`patch-bulma-button-border.ts`](../src/controls/patch-bulma-button-border.ts),
[`patch-bulma-button-glass.ts`](../src/controls/patch-bulma-button-glass.ts),
[`patch-bulma-button-shadow.ts`](../src/controls/patch-bulma-button-shadow.ts)
and
[`patch-bulma-button-label.ts`](../src/controls/patch-bulma-button-label.ts)
remove them from the end of our stylesheet before the comparison, the way
`src/namespace/` maps our custom properties back — see
[VERIFICATION.md](./VERIFICATION.md#the-equivalence-check). Each direction
reads the same text from `formatButtonRadiusRule`,
`formatButtonBorderRules`, `formatButtonGlassRules`,
`formatButtonShadowRules` and `formatButtonLabelRule`, so they cannot drift
apart.

They come off in reverse append order — label, shadow, glass, border, radius —
because each removal is anchored to the end of the file. All of them come off
before `patchBulmaNamespace` runs, because the border, glass and shadow rules
all name `--oen-*` properties, and the namespace mapping would rename them out
from under the removal.

## Changing a metric

Edit `src/controls/consts.ts`, or `GLOBAL_LINE_HEIGHT_IN_PIXELS` in
`src/typography/consts.ts` for the line height, then:

```bash
npm run build && npm run verify
```

Nothing else needs to change. The Sass configuration and the expected
declaration are read from the same constant, and so are the two directions of
the radius rule, of the border rules, of the glass rules, of the shadow rule,
and of the label rule.

`OEN_BUTTON_BORDER_WIDTH` is the thickness of the ring, and
`OEN_BUTTON_GRADIENT_SHIFT` how far its two ends travel from the button's own
lightness, with the clamps in `OEN_BUTTON_GRADIENT_STOPS`. The width is the
button's own, not `--oen-control-border-width`, so the input and the select
keep Bulma's 1px. `OEN_BUTTON_BORDER_OPACITY` is the flat rim that shows
where the ring cannot.

The frosted glass is in that file too. `OEN_BUTTON_GLASS_OPACITY` and
`OEN_BUTTON_GLASS_STRONG_OPACITY` are how much of the wash survives over the
button's own color, `OEN_BUTTON_GLASS_SATURATION_BOOST` how vivid it is, the
two zoom values how much of it fits in a button,
`OEN_BUTTON_GLASS_BLUR` how frozen it reads, `OEN_BUTTON_GLASS_DURATION` how
slowly it drifts, and `OEN_BUTTON_GLASS_LAYERS` the lobes themselves.

`OEN_BUTTON_SHADOW_LAYERS` and `OEN_BUTTON_SHADOW_LIGHTNESS` are the shadow,
and `OEN_BUTTON_LETTER_SPACING` with `OEN_BUTTON_TEXT_TRANSFORM` the label.
Change any of them and the rule, the expected declaration and the removal all
follow from the one constant.
