import { COLORS, stack } from '../_shared/story-helpers.js';

export default {
  title: 'Helpers/Color',
  parameters: {
    docs: {
      description: {
        component:
          'Colour helpers: `has-text-*` and `has-background-*` for every palette entry, each with a ' +
          '`-light` / `-dark` variant and a full tone scale from `-00` to `-100` in steps of five.',
      },
    },
  },
};

const PALETTE = [...COLORS, 'text', 'white', 'black', 'light', 'dark', 'grey'];

/** `grey` is the one palette entry without a matching `has-text-*-invert` helper. */
const invertOf = (color) =>
  color === 'grey' ? 'has-text-white' : `has-text-${color}-invert`;

const TONES = ['10', '25', '40', '50', '60', '75', '90'];

export const TextColors = {
  render: () =>
    stack(
      `<div class="sb-grid">${PALETTE.map(
        (color) =>
          `<div class="sb-swatch has-text-${color}"><strong>Aa</strong> <code>has-text-${color}</code></div>`,
      ).join('')}</div>`,
      `<div class="sb-grid">${[
        'primary-light',
        'primary-dark',
        'link-light',
        'link-dark',
        'danger-light',
        'danger-dark',
      ]
        .map(
          (color) =>
            `<div class="sb-swatch has-text-${color}"><strong>Aa</strong> <code>has-text-${color}</code></div>`,
        )
        .join('')}</div>`,
    ),
};

export const BackgroundColors = {
  render: () =>
    `<div class="sb-grid">${PALETTE.map(
      (color) =>
        `<div class="sb-swatch has-background-${color} ${invertOf(color)}"><code>has-background-${color}</code></div>`,
    ).join('')}</div>`,
};

export const ToneScale = {
  parameters: {
    docs: {
      description: {
        story:
          'Each palette colour exposes a lightness scale. The numbers are lightness percentages, so `-10` is ' +
          'near-black and `-90` near-white, in both themes.',
      },
    },
  },
  render: () =>
    stack(
      ...COLORS.map(
        (color) => `<div>
  <p class="sb-label">${color}</p>
  <div class="sb-grid">${TONES.map(
    (tone) =>
      `<div class="sb-swatch has-background-${color}-${tone} has-text-${color}-${tone}-invert"><code>-${tone}</code></div>`,
  ).join('')}</div>
</div>`,
      ),
    ),
};

export const Inheritance = {
  render: () =>
    `<div class="content">
  <p class="has-text-primary">
    Nested text inherits unless told otherwise:
    <span class="has-text-inherit">has-text-inherit</span>,
    <span class="has-text-current">has-text-current</span>.
  </p>
</div>`,
};
