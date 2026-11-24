# The button canvas

Every button that carries a surface also carries a `<canvas>`, and that canvas
is the button's surface: a liquid metal shader at the bottom, a mix of
gradients in the button's own color over it. The stylesheet parks the layer
under the label; `oen.js` puts the element there, keeps it sized, and paints
it.

Without the script the stylesheet still paints a button — one flat color, the
rim and the shadow — and that is all it is meant to do. The flat color is the
fallback; the canvas is the surface.

`src/canvas/` owns the whole thing: the class name both sides agree on, the
rule that parks the layer, the runtime that injects it, and the painting.

## Using it

```html
<link rel="stylesheet" href="node_modules/@chris.araneo/oen-css/oen.min.css" />
<script src="node_modules/@chris.araneo/oen-css/oen.min.js"></script>
```

From a bundler:

```js
import '@chris.araneo/oen-css'; // or '@chris.araneo/oen-css/oen.min.css'
import '@chris.araneo/oen-css/oen.min.js';
```

The script is optional. The stylesheet works on its own, and without the
script no canvas is ever added. There is nothing to call: the runtime starts
itself on `DOMContentLoaded`, or right away when the document has already
parsed, so `defer` and a tag at the end of `<body>` both work.

`oen.css` and `oen.js` are the same two files unminified. All four are
published, each carries its own attribution banner, and `exports` names every
one of them.

## What the runtime does

1. Finds every `.button` that is not `.is-ghost` or `.is-text`.
2. Skips the ones that cannot hold a child.
3. Inserts `<canvas class="oen-button-canvas" aria-hidden="true"
data-oen-button-offset="…">` as the button's **first** child, if it has
   none yet.
4. Sets the canvas `width` and `height` attributes to the button's size in
   device pixels.
5. Watches the document for buttons added later, and every button it has
   already seen for a size change.
6. Paints every canvas, once per animation frame.

It never removes a canvas and never disconnects its two observers. Both run
for the lifetime of the page, and there are only two of them however many
buttons there are: one `MutationObserver` on the document, one
`ResizeObserver` shared by every host.

### Why `<input>` is skipped

`.button` is a class, not an element. Bulma puts it on `<button>`, on `<a>`,
and on `<input type="submit">`. An `<input>` is a void element: it cannot have
children, so a canvas cannot go inside one. `canHoldButtonCanvas` reads the
tag name against `OEN_BUTTON_CANVAS_VOID_TAG_NAMES` and leaves those buttons
alone. They keep the flat color, the rim and the shadow, and they get no
gradient. A row that mixes `<button class="button">` with
`<input type="submit" class="button">` shows that difference.

The ghost and the text button are left out for the reason they are left out of
the rim and the shadow: both are surface-less by design — see
[CONTROLS.md](./CONTROLS.md#the-rim).

### Why the canvas is the first child

A button's label is its own content, and the canvas has to sit behind it
without being part of it. Inserting the canvas first keeps the label where it
was in the source, and `aria-hidden="true"` keeps the canvas out of the
accessible name. `pointer-events: none` keeps clicks on the button.

### The backing store

`toButtonCanvasSize` turns the button's `clientWidth` and `clientHeight` into
the canvas pixel size:

- the device pixel ratio is clamped between
  `OEN_BUTTON_CANVAS_MIN_PIXEL_RATIO` and `OEN_BUTTON_CANVAS_MAX_PIXEL_RATIO`,
  so a 3x phone still allocates 2x pixels and a ratio of `0` or `NaN` falls
  back to 1;
- each length is clamped between `OEN_BUTTON_CANVAS_MIN_PIXELS` and
  `OEN_BUTTON_CANVAS_MAX_PIXELS`, so a hidden button never gets a `0x0`
  backing store and a very wide one never asks for more pixels than a texture
  can hold.

A default button is 86x40 CSS pixels, so its canvas is `172x80` at a ratio
of 2. The CSS holds the element at `100%` of the button either way.

`writeButtonCanvasSize` compares the wanted size with the one the canvas
already has and returns `undefined` when they match, so a resize that does not
change the pixel size costs nothing and clears no drawing.

## What it paints

Each frame, every canvas is painted with two layers, and a button that is
held gets a third:

| Layer      | What it is                                                       |
| ---------- | ---------------------------------------------------------------- |
| **bottom** | the liquid metal shader, shared by every button on the page      |
| **middle** | a mix of gradients in the button's own color, partly transparent |
| **top**    | the pressed shading, painted only while a press is on the canvas |

The middle layer is what makes a button look like itself; the metal shows
through it and is what makes it move. The top layer is the only one a button
pays for some of the time rather than all of it. None of the three is in the
stylesheet.

### The liquid metal layer

The bottom layer is `liquidMetalFragmentShader` from
[Paper Shaders](https://shaders.paper.design), mounted once with that
package's own `ShaderMount`. One WebGL context exists on the page however
many buttons there are: `startButtonMetal` creates an invisible host element,
mounts the shader into it, and hands back the mount. Every button then reads
the one canvas that mount draws into.

The mount is created with a speed of `OEN_BUTTON_METAL_STILL_SPEED`, which is
zero, so it never starts a rAF loop of its own and never advances its own
clock. This runtime's frame loop drives it instead: before each group is
blitted, `writeButtonMetalFrame` calls `setFrame` with that group's instant,
and `ShaderMount` renders synchronously because its loop is stopped. One
context therefore paints as many different instants per frame as there are
groups — see [below](#the-metal-is-desynchronized-too).

Driving the clock also settles what the host has to be. `ShaderMount` watches
its own host with an `IntersectionObserver` and stops the shader when it
leaves the viewport, which is the right default for a shader you can see and
the wrong one for a shader you only copy from; with the speed at zero that
observer has nothing left to pause, and renders happen on demand wherever the
host sits. It is still `position: fixed` at the top left with `opacity: 0`
and `pointer-events: none`.

The context is asked for with `preserveDrawingBuffer: true`. Without it a
WebGL drawing buffer is cleared once the browser has composited the frame, and
`drawImage` from it returns nothing.

If the mount throws — no WebGL2, a context limit, a blocked GPU — the host is
removed and `startButtonMetal` returns `undefined`. The frame loop then fills
the bottom layer with the button's flat color instead, and everything else
behaves the same. A page without WebGL gets the gradients and no metal.

Paper Shaders is Apache 2.0 and ships a NOTICE. Both are reproduced in
`THIRD_PARTY_NOTICES.md` and named in the runtime banner — see
[LICENSES.md](./LICENSES.md#paper-shaders).

### The gradient layer

Over the metal go, in order:

1. a vertical gradient from a lighter to a darker shade of the button's color,
   at `OEN_BUTTON_GRADIENT_TINT_ALPHA`;
2. six broad radial lobes in that color, lighter and darker by fixed offsets,
   drifting on a 10 second loop, at `OEN_BUTTON_GRADIENT_OPACITY`.

Both are partly transparent, which is what lets the metal read through them.
Raising either alpha buries the metal; lowering both leaves a button that is
mostly metal and barely its own color. The lobes are what used to be the
frosted glass: the same six positions, the same sizes and falloffs, the same
translate-rotate-scale loop, moved from a CSS `::before` onto the canvas.

### The pressed layer

A pressed button is a surface that has sunk below its rim, and the canvas
paints it that way. `isButtonPressed` reads the host against
`OEN_BUTTON_PRESS_SELECTOR`, which is `:active, .is-active` — the same
pair Bulma's own rule targets — and a canvas with any press on it gets one
more pass after the blit. The press is a number rather than a flag, so the
pass eases in and out instead of appearing whole; [the press
animates](#the-press-animates) covers that part.

That pass is `OEN_BUTTON_PRESS_BANDS`: a list of linear gradients, each one
running from one edge of the canvas inward and fading out over
`OEN_BUTTON_PRESS_RAMP`. Four of the seven are the walls of the recess casting
onto its floor — two from the top, where the shadow is deepest, and one from
each side. The last two are the bottom: a shallow shade, and over it the light
the floor catches, which is the band that makes the surface read as sunk
rather than as merely darker.

Each band carries a `side`, a `depth`, a `lightnessShift` and an `alpha`.
`toButtonPressLine` turns the side and the depth into the gradient's two
points, measuring the depth from the **shorter** side of the canvas, so a band
is as thick on a fullwidth button as on a small one.

`lightnessShift` is a share of the distance to black or to white, not a flat
number of lightness points. A flat `-50` crushes a dark button's shadow to
black and barely marks a white one; `-0.76` takes any button 76% of the way to
the floor, so the same band reads the same on a dark green button, on a white
one, and in either scheme — which matters here, because Bulma's `:active`
darkens a button in the light scheme and lightens it in the dark one.

The pass is drawn into the button's own canvas rather than into the shared
source, in the canvas's own pixel space. That is the point of it: a band
drawn into the 256x128 source would be stretched with it, and a 400px button
would wear a side band four times the thickness of a small button's. The
bands cost a group nothing, and a pressed button pays for seven `fillRect`s
in each frame that carries a press.

The canvas carries the button's `border-radius`, so the bands are clipped to
the pill without being told its shape.

### The press animates

The press is a progress number between `OEN_BUTTON_PRESS_NO_PROGRESS` and
`OEN_BUTTON_PRESS_FULL_PROGRESS`, and every frame moves it toward whatever
`isButtonPressed` says. `nextButtonPressProgress` does the moving, over
`OEN_BUTTON_PRESS_SINK_DURATION` on the way in and
`OEN_BUTTON_PRESS_LIFT_DURATION` on the way out. The two are not the same
number on purpose: a button sinks in a third of the time it takes to rise, so
even a tap too short to register as a hold shows the whole recess, and letting
go still reads as a release rather than as the shading being switched off.

The lift is shorter than the `--oen-duration` Bulma spends easing the
button's `background-color` back, so the recess has gone before the color
has finished returning. That is deliberate — the shading is what says
"pressed", and it should stop saying it as soon as the finger is up — but it
is the one place where the canvas and the stylesheet are on purpose out of
step.

`toButtonPressStrength` turns that progress into how much of the press is
applied: an ease-out curve — `1 - (1 - press)²`, the exponent being
`OEN_BUTTON_PRESS_EASE_EXPONENT` — which mirrors the `--oen-easing` the
stylesheet uses on the color, so most of the effect lands in the first third
of the sink and the button feels like it answers the pointer.
`toButtonPressAlpha` multiplies each band's own alpha by it. Only the alpha
moves: the bands keep their geometry, so the recess fades in rather than
growing inward.

The same strength moves the label. `writeButtonPressStrength` writes it onto
the host as `--oen-button-press`, and the stylesheet multiplies that by
`--oen-button-press-depth` to shift the button's top and bottom padding in
opposite directions, so the text sinks while the rim and the canvas hold
still — see [the pressed label](./CONTROLS.md#the-pressed-label). The
stylesheet owns the distance and the runtime owns the progress, so neither
repeats the other's number. The write is skipped when the strength has not
changed, and at rest the property is removed rather than set to zero, so a
button nobody has pressed carries no inline style at all.

The progress lives on the canvas, in `data-oen-button-press`, the way the
offset does:

```html
<canvas
  class="oen-button-canvas"
  aria-hidden="true"
  data-oen-button-offset="0.375"
  data-oen-button-press="0.42"
></canvas>
```

`readButtonCanvasPress` reads it, `nextButtonCanvasPress` advances it and
writes it back — but **only when the number changed**. A page of buttons
nobody is touching reads an absent attribute, computes the same zero, and
writes nothing, so the attribute never appears on a canvas that has not been
pressed and the frame costs no style invalidation.

The step comes from `toButtonPressElapsed`, which is the frame's own delta:
`runButtonCanvasFrame` now carries the previous timestamp alongside the
current one. The delta is clamped to `OEN_BUTTON_PRESS_MAX_ELAPSED`, so a tab
that was in the background for a minute does not come back to a press that
jumped past its target, and a backward clock contributes nothing instead of
running the press in reverse.

Reduced motion is the one case that keeps the old behavior:
`toButtonPressElapsed` returns the whole of `OEN_BUTTON_PRESS_MAX_ELAPSED`
when `(prefers-reduced-motion: reduce)` is set, which is enough for one frame
to finish either direction, so the shading snaps on and off exactly as it did
before it animated.

### The color comes from the button, every frame

`readButtonPalette` reads the host's computed `background-color` and
`toButtonPalette` turns that `rgb(…)` into a hue, a saturation and a
lightness. Nothing else is read, which is what makes the layer follow
everything Bulma does to a button: the six theme colors, `.is-light` and
`.is-dark`, the light and dark schemes, `:hover` and `:active` lightness
deltas, `[disabled]`. Each is a different `background-color`, and a different
`background-color` is a different palette on the next frame.

A background that is not fully opaque has no palette, and its canvas is
cleared rather than painted. `.button.is-outlined` and the disabled outlined
button compute to `rgba(0, 0, 0, 0)`, so they stay see-through, which is the
whole point of an outlined button.

The lobes take the button's own hue, so a danger button washes in reds and a
primary one in greens. `OEN_BUTTON_GRADIENT_SATURATION_BOOST` makes them
`75%` more saturated than the button itself, as a multiple and not as an
addition: a white or grey button has no hue to boost, and adding a flat `75%`
to a saturation of `0` would wash it in whatever hue `0` happens to be, which
is red.

### Every canvas starts somewhere else in the loop

Buttons that share a color used to share a frame exactly: one source canvas
was painted per palette and blitted into all of them, so a row of primary
buttons breathed in lockstep. Each canvas now carries its own starting point
in the loop, drawn when the element is created and written onto it:

```html
<canvas
  class="oen-button-canvas"
  aria-hidden="true"
  data-oen-button-offset="0.375"
></canvas>
```

`createButtonCanvasOffset` draws it, `readButtonCanvasOffset` reads it back
each frame, and `toButtonGradientOffsetPhase` adds it to the frame's phase and
wraps at `OEN_BUTTON_GRADIENT_CYCLE`. The button above is three eighths of the
way through the same ten second loop as its neighbours rather than at the
start of it, so nothing on the page breathes in time with anything else.

The offset is one of `OEN_BUTTON_GRADIENT_OFFSET_STEPS` points in the loop and
not a free-running number, which is what keeps the batching below possible: a
unique offset per button would mean a gradient source per button, which is
exactly the cost that batching exists to avoid.

The attribute is the state. A canvas is created once and never removed, the
offset is written once, and nothing in the runtime keeps a map from element to
offset — so a button a script adds an hour later draws its own offset the
moment its canvas is injected, with no bookkeeping to miss it.

#### The metal is desynchronized too

The offset shifts both layers, not just the lobes. `toButtonMetalFrame` turns
the frame's timestamp into a shader frame at `OEN_BUTTON_METAL_SPEED`, and
`toButtonMetalOffsetFrame` adds `offset * OEN_BUTTON_METAL_SPREAD` to it, so
each group asks the shader for a different moment of the same flow.

The spread is large on purpose. The shader's inner time is
`t = .3 * (u_time + 2.8)`, and the term that decides what the metal looks like
is `snoise(uv - t)` — the noise field is _translated_ by time rather than
cycled through it, so two instants look unrelated once they are about one unit
of `t` apart and never repeat. `OEN_BUTTON_METAL_SPREAD` of 48000 puts one
step at 3000 frame-milliseconds, which is 3 units of `u_time` and 0.9 of
`t`: far enough apart that two buttons read as two different pieces of metal
rather than the same piece a moment later.

Under reduced motion `toButtonMetalFrame` returns a fixed
`OEN_BUTTON_METAL_STILL_FRAME`, and the offset is still added to it, so the
buttons hold still at different patches of metal rather than at one.

### One source canvas, one blit per button

Painting six lobes into every button every frame does not scale — eighty
buttons at 60fps is eighty times the gradient work. Instead the frame groups
the canvases by palette, offset **and** press with `toButtonCanvasGroups`,
draws the metal and the gradients for each group once into a single offscreen
canvas of `OEN_BUTTON_GRADIENT_SOURCE_WIDTH` by
`OEN_BUTTON_GRADIENT_SOURCE_HEIGHT`, and `drawImage`s that source into every
canvas in the group. Each button pays only for one scaled blit.

A group now costs a shader render as well as the gradients, because each one
asks the mount for its own instant before it blits. The group count is what
bounds both, and the two parts of its key that a whole page shares are
bounded: the palettes on screen are typically under ten, and the offsets
cannot outnumber `OEN_BUTTON_GRADIENT_OFFSET_STEPS`. Eighty primary buttons
are therefore sixteen sources rather than eighty, and that sixteen is a
constant, not a function of how many buttons the page has.

Press is the third part of the key, and unlike the other two it is a
continuous number, so a button in the middle of a press is a group of one.
That costs nothing, because such a button is already a group of one: Bulma
gives `:active` its own `background-color` and transitions it over
`--oen-duration`, so the palette a pressing button reports changes every
frame anyway. What bounds this part is the pointer — one or two buttons are
mid-press at a time, and a button nobody is touching sits at exactly
`OEN_BUTTON_PRESS_NO_PROGRESS` and groups with every other button like it.

Raising the step count is close to free on an ordinary page, where there are
fewer buttons of one color than there are steps and the group count follows
the buttons either way. It costs only on a page that has more buttons of one
color than steps — and that is the page the cap is there for.

The source is a fixed size and the blit stretches it to the button, so a wide
button stretches both layers horizontally. They are soft, broad and moving, so
the stretch does not read.

`globalCompositeOperation` is `copy` for the blit and for the metal, which
replaces what was there instead of compositing onto it. That is what keeps a
canvas from accumulating alpha frame after frame, with no `clearRect` in the
loop.

### The lobes are drawn in the layer's own space

In CSS the lobes lived on a layer `inset: -105%` — about three times the
button — so that the blur's soft fringe stayed outside the clip and the
rotation never swept an empty corner into view. The canvas keeps that layer:
`writeButtonGradientTransform` sets the context transform to the button
center, applies the drift, then steps into the oversized layer box and finally
into the unit circle of one lobe, so a lobe is drawn as `fillRect(-1, -1, 2, 2)`
under a transform rather than as an ellipse with hand-computed radii.

`OEN_BUTTON_GRADIENT_RAMP` replaces the CSS `filter: blur(20px)`. A canvas
`filter` is scaled by the current transform, and the transform here scales by
a few hundred, so a blur in it is unusable. The ramp is five alpha stops
across the falloff instead, which gives the same soft edge for a fraction of
the cost.

### Reduced motion

`isButtonGradientStill` reads `(prefers-reduced-motion: reduce)` each frame,
and `toButtonGradientPhase` returns a fixed `OEN_BUTTON_GRADIENT_STILL_PHASE`
when it is set, so the lobes are painted in one position and never move. A
canvas still adds its own offset to that fixed phase, so the buttons settle at
sixteen different points in the loop instead of all at the same one; nothing
moves either way. The frame loop still runs, because that is what keeps hover, the scheme switch and
every other color change on the canvas; what it draws just stops changing.
The pressed layer is still painted — a press is a state, not an animation —
but it stops easing and snaps, which [the press animates](#the-press-animates)
explains.

## The layer

```css
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

[`format-button-canvas-rules.ts`](../src/canvas/format-button-canvas-rules.ts)
spells both, and
[`patch-oen-button-canvas.ts`](../src/canvas/patch-oen-button-canvas.ts)
appends them last of the five Oen button rules — see
[STYLESHEET.md](./STYLESHEET.md#what-it-generates).

### Where it sits in the button

`isolation: isolate` makes the button a stacking context. Inside one, the
painting order is the element's own background, then its negative `z-index`
children from the most negative up, then the inline content. So the stack
reads:

| Layer            | `z-index` | Comes from                 |
| ---------------- | --------- | -------------------------- |
| the button color | —         | Bulma's `background-color` |
| **the canvas**   | `-1`      | `src/canvas/`              |
| the label        | —         | the button's own content   |

Without the isolation a `z-index: -1` child escapes to the page's stacking
context and paints behind the button, where nothing is seen of it. Both that
rule and the `overflow: hidden` beside it used to belong to the frosted glass;
they moved here when the glass did.

`overflow: hidden` clips the canvas to the corner radius, which is why the
layer follows `.is-rounded` and the squared inner corners of
`.buttons.has-addons` without being told about either. `width: 100%` and
`height: 100%` are not redundant with `inset: 0`: a canvas is a replaced
element, and an absolutely positioned replaced element with `auto` width falls
back to its intrinsic size and ignores `right`.

`inset: 0` on an absolutely positioned child resolves against the padding box,
so the canvas stops at the inside of the 2px rim. The 2px the canvas does not
cover is the button's own `background-color` under a translucent
`border-color`, which is the same color the canvas starts from.

### The two knobs

`--oen-button-canvas-opacity` and `--oen-button-canvas-blend-mode` are read
with defaults and declared nowhere, so they cost nothing until something sets
them. A renderer that wants what it draws to read as a highlight rather than a
fill sets them on the button, or on any ancestor:

```css
.button {
  --oen-button-canvas-opacity: 0.9;
  --oen-button-canvas-blend-mode: screen;
}
```

`OEN_BUTTON_CANVAS_OPACITY` and `OEN_BUTTON_CANVAS_BLEND_MODE` in
[`consts.ts`](../src/canvas/consts.ts) are the defaults that reach the
stylesheet.

## Drawing something else into it

The frame loop owns the canvas: it repaints every one of them every frame, so
anything drawn from outside is overwritten on the next frame. A renderer that
wants the whole surface replaces
[`draw-button-gradient.ts`](../src/canvas/internal/draw-button-gradient.ts),
which is the one function that stacks the two layers; a renderer that only
wants a different bottom layer replaces
[`draw-button-metal.ts`](../src/canvas/internal/draw-button-metal.ts), and one
that only wants a different pressed state replaces
[`draw-button-press.ts`](../src/canvas/internal/draw-button-press.ts).

Two events are still dispatched, and both bubble, so one listener on the
document is enough:

| Event                      | Dispatched on | When                                  |
| -------------------------- | ------------- | ------------------------------------- |
| `oen:button-canvas-mount`  | the canvas    | right after it is added to a button   |
| `oen:button-canvas-resize` | the canvas    | after its `width` or `height` changed |

There is no global object and no registry to register with. The class name is
the API, and the two events are the timing.

### One WebGL context per button will not work

A browser keeps a small number of WebGL contexts alive — commonly sixteen —
and drops the oldest when a page asks for more. A page with twenty buttons
would lose contexts as it scrolls. A shader belongs in one offscreen canvas,
copied into each button's `2d` context with `drawImage` — which is exactly
what this runtime does with the liquid metal layer, and why there is one
`ShaderMount` on the page rather than one per button.

## What is not tested

`vitest` runs in the `node` environment, with no DOM and no canvas. The
functions that compute something take plain data and have specs beside them:
`canHoldButtonCanvas`, `toButtonCanvasSize`, `isButtonCanvasSized`,
`toButtonRgb`, `toButtonHue`, `toButtonPalette`, `formatButtonGradientColor`,
`toButtonGradientLayerPalette`, `toButtonGradientTintPalette`,
`toButtonGradientPhase`, `toButtonGradientOffsetPhase`,
`toButtonGradientDrift`, `toButtonCanvasGroups`, `toButtonMetalUniforms`,
`toButtonMetalFrame`, `toButtonMetalOffsetFrame`, `toButtonPressLine`,
`toButtonPressPalette`, `toButtonPressElapsed`,
`nextButtonPressProgress`, `toButtonPressStrength`, `toButtonPressAlpha`,
`formatButtonCanvasRules` and both patches.

The files that only wire the DOM or issue draw commands have none, because
there is neither in a spec: everything named `create-*`, `draw-*`, `write-*`,
`read-*`, `find-*`, `watch-*`, `clear-*`, `get-*`, `run-*` and `start-*` —
apart from `createButtonCanvasOffset`, which touches no DOM at all, and
`readButtonCanvasOffset` and `readButtonCanvasPress`, which want one
attribute and take it from a stub. `isButtonPressed` wants one `matches`
call and takes that from a stub too. `nextButtonCanvasPress` has none,
because the arithmetic it wires together is `nextButtonPressProgress`, which
has its own.
The rest are checked in a browser instead, and `verify` asserts that both
published runtimes still name the class and the host selector they read — see
[VERIFICATION.md](./VERIFICATION.md#the-seventeen-checks).

## Tuning what it paints

Edit [`src/canvas/consts.ts`](../src/canvas/consts.ts), then:

```bash
npm run build && npm run verify
```

| Constant                                | What it decides                                |
| --------------------------------------- | ---------------------------------------------- |
| `OEN_BUTTON_METAL_*`                    | every uniform the liquid metal shader reads    |
| `OEN_BUTTON_METAL_SPEED`                | how fast the metal flows, `0` to stop it       |
| `OEN_BUTTON_METAL_SPREAD`               | how far apart two buttons' metal looks         |
| `OEN_BUTTON_GRADIENT_TINT_ALPHA`        | how much of the metal the color gradient hides |
| `OEN_BUTTON_GRADIENT_OPACITY`           | how much of it the lobes hide                  |
| `OEN_BUTTON_GRADIENT_STOPS`             | the two ends of the vertical gradient          |
| `OEN_BUTTON_GRADIENT_SHIFT`             | how far each end travels from the button       |
| `OEN_BUTTON_GRADIENT_LAYERS`            | the six lobes: offset, radii, position, fade   |
| `OEN_BUTTON_GRADIENT_SATURATION_BOOST`  | how vivid the lobes are against the button     |
| `OEN_BUTTON_GRADIENT_RAMP`              | how soft a lobe's edge is                      |
| `OEN_BUTTON_GRADIENT_DURATION`          | how long one lobe loop takes, in milliseconds  |
| `OEN_BUTTON_GRADIENT_OFFSET_STEPS`      | how many starting points a canvas can draw     |
| `OEN_BUTTON_GRADIENT_DRIFT_LEFT`/`_TOP` | how far the lobe layer travels                 |
| `OEN_BUTTON_GRADIENT_ZOOM_FROM`/`_TO`   | how much of that layer fits in a button        |
| `OEN_BUTTON_GRADIENT_SPREAD`            | how far it reaches outside the button          |
| `OEN_BUTTON_GRADIENT_SOURCE_*`          | the resolution every button is blitted from    |
| `OEN_BUTTON_PRESS_BANDS`                | the recess: side, depth, shift and alpha       |
| `OEN_BUTTON_PRESS_RAMP`                 | how fast a band fades away from its edge       |
| `OEN_BUTTON_PRESS_SINK_DURATION`        | how long the recess takes to appear            |
| `OEN_BUTTON_PRESS_LIFT_DURATION`        | how long it takes to fade once let go          |
| `OEN_BUTTON_PRESS_EASE_EXPONENT`        | the shape of both, as an ease-out power        |

The zoom is what decides how much of the gradient a button shows. Between `1`
and `1.15` a button holds one or two lobes, so the wash reads as a gradient
between tones rather than one flat tint. Zooming in further shows less of it
and flattens it; zooming out shows more, but also pulls the layer's fringe
toward the clip.

`OEN_BUTTON_CANVAS_CLASS` is the class the rule targets and the runtime sets,
so one edit moves both. `OEN_BUTTON_CANVAS_HOST_SELECTOR` is which buttons get
a canvas, and it mirrors the selector the rim and the shadow use.
`OEN_BUTTON_CANVAS_Z_INDEX` is where the layer sits.
`OEN_BUTTON_PRESS_SELECTOR` is which buttons count as pressed, and it mirrors
the selector Bulma's own `:active` rule uses. `OEN_BUTTON_PRESS_PROPERTY` is
the custom property the strength is written to, and how far that strength
moves the label is `--oen-button-press-depth`, which lives in
[`src/controls/consts.ts`](../src/controls/consts.ts) rather than here,
because it is a control metric and not a canvas one. The two press durations are
read against `--oen-duration`, which is `294ms`: the lift is half of that,
and the sink is a third of the lift.
