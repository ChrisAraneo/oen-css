import {
  COLORS,
  SIZES,
  icon,
  labelled,
  stack,
} from '../_shared/story-helpers.js';

export default {
  title: 'Elements/Icon',
  parameters: {
    docs: {
      description: {
        component:
          '`.icon` reserves a square box so icons line up with text no matter which icon font or SVG you use. ' +
          'The gallery uses Font Awesome, which is not a dependency of Oen CSS.',
      },
    },
  },
};

export const Sizes = {
  render: () =>
    stack(
      labelled(
        'Icon sizes',
        ...SIZES.map((size) =>
          icon('home', { size: size === 'normal' ? undefined : size }),
        ),
      ),
      labelled(
        'Matching text size',
        ...[
          ['is-small', 'is-size-7'],
          ['', ''],
          ['is-medium', 'is-size-4'],
          ['is-large', 'is-size-2'],
        ].map(
          ([iconSize, textSize]) =>
            `<span class="icon-text ${textSize}"><span class="icon ${iconSize}"><i class="fa-solid fa-star"></i></span><span>Rating</span></span>`,
        ),
      ),
    ),
};

export const Colors = {
  render: () =>
    labelled(
      'has-text-*',
      ...COLORS.map((color) => icon('heart', { color, size: 'medium' })),
    ),
};

export const IconText = {
  parameters: {
    docs: {
      description: {
        story:
          '`.icon-text` keeps an icon and its label on the same baseline, and wraps as one unit.',
      },
    },
  },
  render: () =>
    stack(
      `<span class="icon-text">
  <span class="icon has-text-info"><i class="fa-solid fa-info-circle"></i></span>
  <span>Information</span>
</span>`,
      `<p class="icon-text">
  <span class="icon has-text-success"><i class="fa-solid fa-check-circle"></i></span>
  <span>Saved</span>
  <span class="icon has-text-warning"><i class="fa-solid fa-triangle-exclamation"></i></span>
  <span>Two warnings</span>
  <span class="icon has-text-danger"><i class="fa-solid fa-circle-xmark"></i></span>
  <span>One error</span>
</p>`,
      `<span class="icon-text is-flex-direction-column has-text-centered">
  <span class="icon is-large"><i class="fa-solid fa-truck fa-2x"></i></span>
  <span>Stacked</span>
</span>`,
    ),
};
