# Typography

`src/typography/` holds the type scale. Oen sets 14px text everywhere Bulma
would set 16px, and rescales the seven steps around it.

## The scale

Declared in [`consts.ts`](../src/typography/consts.ts) in pixels, converted to
rem by [`to-rem.ts`](../src/typography/internal/to-rem.ts) against a 16px
root:

| Step     | Pixels | rem         | Used by                                  |
| -------- | ------ | ----------- | ---------------------------------------- |
| `size-1` | 28     | `1.75rem`   | display heading                          |
| `size-2` | 24     | `1.5rem`    | level 1 heading                          |
| `size-3` | 21     | `1.3125rem` | level 2 heading, and `.title`            |
| `size-4` | 18     | `1.125rem`  | level 3 heading, `.is-large` controls    |
| `size-5` | 16     | `1rem`      | level 4 heading, large body, `.subtitle` |
| `size-6` | 14     | `0.875rem`  | body text, the default control size      |
| `size-7` | 12     | `0.75rem`   | meta text, `.is-small` controls          |

`html` keeps Bulma's `1em` root — `$body-size` is not overridden — so 1rem is
still 16px and every rem-based radius, spacing, and breakpoint value is
untouched. Only the type is rescaled.

## Body metrics

| Variable           | Value     | Why                                   |
| ------------------ | --------- | ------------------------------------- |
| `body-font-size`   | `0.875em` | 14px of the 1em root                  |
| `body-line-height` | `1.5714`  | 22px at 14px, as a unitless ratio     |
| `small-font-size`  | `0.75rem` | `<small>` on the same scale as step 7 |

`GLOBAL_LINE_HEIGHT_IN_PIXELS`, the 22, is also read by `src/controls/` as the
line height of every control, so body text and controls share one line
height — see [CONTROLS.md](./CONTROLS.md#one-global-line-height).

`body-line-height` is computed, not typed: the constants say 22px of line on
14px of text, and
[`to-unitless-line-height.ts`](../src/typography/internal/to-unitless-line-height.ts)
converts it with [`to-ratio.ts`](../src/common/to-ratio.ts), which rounds to
four places. A unitless line height is used so nested
elements inherit the ratio rather than a fixed pixel height.

## How the scale reaches rendered text

The seven steps reach rendered text in three ways, so changing one step
changes more than that step:

1. **Control sizes.** Bulma derives `$size-small`, `$size-normal`,
   `$size-medium`, and `$size-large` from steps 7, 6, 5, and 4.
   `--oen-size-normal` sets `--oen-control-size`, which makes every button,
   input, select, and file control 14px, with `.is-small` at 12px,
   `.is-medium` at 16px, and `.is-large` at 18px.
2. **Literal declarations.** The steps compile into `font-size` declarations
   for `.title.is-1` … `.is-7`, `.subtitle.is-1` … `.is-7`, and the
   `.is-size-1` … `.is-size-7` helpers, including their responsive variants.
3. **Body text.** `$body-font-size` sets `--oen-body-font-size` on `body`, so
   text belonging to no component is 14px too.

`.title` reads step 3 and `.subtitle` reads step 5, so both follow the scale
without being set anywhere.

## Configured versus verified

The module exports two lists, and the difference matters:

- **`OEN_TYPE_VARIABLES`** — the ten values passed to Sass: the seven steps
  plus the three body metrics. This is what
  [`to-typography-configuration.ts`](../src/typography/to-typography-configuration.ts)
  emits.
- **`OEN_TYPE_DECLARATIONS`** — the fourteen declarations the compiled
  stylesheet has to carry. The extra four are `size-small`, `size-normal`,
  `size-medium`, and `size-large`: Bulma derives them, so they are an
  expectation about the output, never an input.

Checking the derived four catches a Bulma upgrade that changes how control
sizes are computed. The configuration would still be accepted, and only the
output would stop matching the scale.

## Changing a size

Edit the pixel value in `src/typography/consts.ts`, then run
`npm run build && npm run verify`. If you change step 4, 5, 6, or 7, the
derived control size in `OEN_DERIVED_CONTROL_SIZES` asserts what Bulma
produces from it. Update both, or the check names the one you missed.
