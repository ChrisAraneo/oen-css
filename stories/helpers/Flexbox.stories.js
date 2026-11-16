import { placeholder, stack } from '../_shared/story-helpers.js';

export default {
  title: 'Helpers/Flexbox',
  parameters: {
    docs: {
      description: {
        component:
          'Every flexbox property has a helper class: `is-flex-direction-*`, `is-justify-content-*`, ' +
          '`is-align-items-*`, `is-flex-wrap-*`, `is-flex-grow-*` and `is-flex-shrink-*`.',
      },
    },
  },
};

const items = (count = 3) =>
  Array.from({ length: count }, (_, i) => placeholder(`item ${i + 1}`)).join(
    '',
  );

const demo = (helper, count = 3, extra = '') =>
  `<div><p class="sb-label">${helper}</p><div class="is-flex ${helper} ${extra} sb-outline" style="gap: 0.5rem; min-height: 6rem">${items(
    count,
  )}</div></div>`;

export const Direction = {
  render: () =>
    stack(
      ...[
        'is-flex-direction-row',
        'is-flex-direction-row-reverse',
        'is-flex-direction-column',
      ].map((h) => demo(h)),
    ),
};

export const JustifyContent = {
  render: () =>
    stack(
      ...[
        'is-justify-content-flex-start',
        'is-justify-content-center',
        'is-justify-content-flex-end',
        'is-justify-content-space-between',
        'is-justify-content-space-around',
      ].map((h) => demo(h)),
    ),
};

export const AlignItems = {
  render: () =>
    stack(
      ...[
        'is-align-items-flex-start',
        'is-align-items-center',
        'is-align-items-flex-end',
        'is-align-items-stretch',
      ].map((h) => demo(h)),
    ),
};

export const Wrap = {
  render: () =>
    stack(demo('is-flex-wrap-wrap', 10), demo('is-flex-wrap-nowrap', 10)),
};

export const GrowAndShrink = {
  parameters: {
    docs: {
      description: {
        story:
          '`is-flex-grow-*` and `is-flex-shrink-*` take the values 0 to 5.',
      },
    },
  },
  render: () =>
    `<div class="is-flex sb-outline" style="gap: 0.5rem">
  <div class="is-flex-grow-1">${placeholder('is-flex-grow-1')}</div>
  <div class="is-flex-grow-3">${placeholder('is-flex-grow-3')}</div>
  <div class="is-flex-grow-0">${placeholder('is-flex-grow-0')}</div>
</div>`,
};
