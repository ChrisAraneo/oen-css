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
3. Inserts `<canvas class="oen-button-canvas" aria-hidden="true">` as the
   button's **first** child, if it has none yet.
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

Each frame, every canvas is painted with two layers:

| Layer      | What it is                                                       |
| ---------- | ---------------------------------------------------------------- |
| **bottom** | the liquid metal shader, shared by every button on the page      |
| **top**    | a mix of gradients in the button's own color, partly transparent |

The top layer is what makes a button look like itself; the metal shows
through it and is what makes it move. Neither layer is in the stylesheet.

### The liquid metal layer

The bottom layer is `liquidMetalFragmentShader` from
[Paper Shaders](https://shaders.paper.design), mounted once with that
package's own `ShaderMount`. One WebGL context exists on the page however
many buttons there are: `startButtonMetal` creates an invisible host element,
mounts the shader into it, and hands back the canvas that the shader draws
into. Every button then reads that one canvas.

The host is `position: fixed` at the top left of the viewport with
`opacity: 0` and `pointer-events: none`. It has to be _in_ the viewport rather
than parked off-screen: `ShaderMount` watches its own host with an
`IntersectionObserver` and stops the shader when it leaves the viewport, which
is the right default for a shader you can see and the wrong one for a shader
you only copy from.

The context is asked for with `preserveDrawingBuffer: true`. Without it a
WebGL drawing buffer is cleared once the browser has composited the frame, and
`drawImage` from it returns nothing — which is exactly what this runtime does
with it, one frame later, from its own loop.

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

### One source canvas, one blit per button

Painting six lobes into every button every frame does not scale — eighty
buttons at 60fps is eighty times the gradient work. Instead the frame groups
the canvases by palette with `toButtonCanvasGroups`, draws the metal and the
gradients for each palette once into a single offscreen source canvas of
`OEN_BUTTON_GRADIENT_SOURCE_WIDTH` by `OEN_BUTTON_GRADIENT_SOURCE_HEIGHT`,
and `drawImage`s that source into every canvas in the group. The expensive
work is therefore per distinct color on screen — typically under ten — and
each button pays only for one scaled blit.

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
when it is set, so the lobes are painted in one position and never move. The
frame loop still runs, because that is what keeps hover, the scheme switch and
every other color change on the canvas; what it draws just stops changing.

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
[`draw-button-metal.ts`](../src/canvas/internal/draw-button-metal.ts).

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
`toButtonGradientPhase`, `toButtonGradientDrift`, `toButtonCanvasGroups`,
`toButtonMetalUniforms`, `formatButtonCanvasRules` and both patches.

The files that only wire the DOM or issue draw commands have none, because
there is neither in a spec: everything named `create-*`, `draw-*`, `write-*`,
`read-*`, `find-*`, `watch-*`, `clear-*`, `get-*`, `run-*` and `start-*`.
They are checked in a browser instead, and `verify` asserts that both
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
| `OEN_BUTTON_GRADIENT_TINT_ALPHA`        | how much of the metal the color gradient hides |
| `OEN_BUTTON_GRADIENT_OPACITY`           | how much of it the lobes hide                  |
| `OEN_BUTTON_GRADIENT_STOPS`             | the two ends of the vertical gradient          |
| `OEN_BUTTON_GRADIENT_SHIFT`             | how far each end travels from the button       |
| `OEN_BUTTON_GRADIENT_LAYERS`            | the six lobes: offset, radii, position, fade   |
| `OEN_BUTTON_GRADIENT_SATURATION_BOOST`  | how vivid the lobes are against the button     |
| `OEN_BUTTON_GRADIENT_RAMP`              | how soft a lobe's edge is                      |
| `OEN_BUTTON_GRADIENT_DURATION`          | how long one lobe loop takes, in milliseconds  |
| `OEN_BUTTON_GRADIENT_DRIFT_LEFT`/`_TOP` | how far the lobe layer travels                 |
| `OEN_BUTTON_GRADIENT_ZOOM_FROM`/`_TO`   | how much of that layer fits in a button        |
| `OEN_BUTTON_GRADIENT_SPREAD`            | how far it reaches outside the button          |
| `OEN_BUTTON_GRADIENT_SOURCE_*`          | the resolution every button is blitted from    |

The zoom is what decides how much of the gradient a button shows. Between `1`
and `1.15` a button holds one or two lobes, so the wash reads as a gradient
between tones rather than one flat tint. Zooming in further shows less of it
and flattens it; zooming out shows more, but also pulls the layer's fringe
toward the clip.

`OEN_BUTTON_CANVAS_CLASS` is the class the rule targets and the runtime sets,
so one edit moves both. `OEN_BUTTON_CANVAS_HOST_SELECTOR` is which buttons get
a canvas, and it mirrors the selector the rim and the shadow use.
`OEN_BUTTON_CANVAS_Z_INDEX` is where the layer sits.
