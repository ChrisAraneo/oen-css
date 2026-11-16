import { placeholder, stack } from '../_shared/story-helpers.js';

export default {
  title: 'Grid/Columns',
  parameters: {
    docs: {
      description: {
        component:
          'The flexbox column system: a `.columns` row holding `.column` children. Without a size modifier the ' +
          'columns share the width equally; with one (`is-half`, `is-4`, ...) they take a twelfth-based fraction.',
      },
    },
  },
};

const column = (label, extraClass = '') =>
  `<div class="column ${extraClass}">${placeholder(label)}</div>`;

export const Equal = {
  render: () =>
    stack(
      `<div class="columns">${[1, 2, 3, 4].map((n) => column(`column ${n}`)).join('')}</div>`,
      `<div class="columns">${[1, 2, 3].map((n) => column(`column ${n}`)).join('')}</div>`,
    ),
};

export const Sizes = {
  render: () =>
    stack(
      ...[
        ['is-three-quarters', 'is-one-quarter'],
        ['is-two-thirds', 'is-one-third'],
        ['is-half', 'is-half'],
      ].map(
        ([first, second]) =>
          `<div class="columns">${column(first, first)}${column(second, second)}</div>`,
      ),
      `<div class="columns">${column('is-4', 'is-4')}${column('is-3', 'is-3')}${column('is-5', 'is-5')}</div>`,
      `<div class="columns">${column('is-2', 'is-2')}${column('auto')}${column('is-2', 'is-2')}</div>`,
    ),
};

export const Offsets = {
  render: () =>
    stack(
      `<div class="columns">${column('is-half is-offset-one-quarter', 'is-half is-offset-one-quarter')}</div>`,
      `<div class="columns">${column('is-4 is-offset-8', 'is-4 is-offset-8')}</div>`,
    ),
};

export const Narrow = {
  parameters: {
    docs: {
      description: {
        story:
          '`is-narrow` shrinks a column to its content; the siblings fill the rest.',
      },
    },
  },
  render: () =>
    `<div class="columns">
  <div class="column is-narrow"><div class="box">Narrow</div></div>
  <div class="column">${placeholder('fills the remaining space')}</div>
</div>`,
};

export const Gaps = {
  render: () =>
    stack(
      ...['is-gapless', 'is-1', 'is-4', 'is-8'].map(
        (modifier) =>
          `<div><p class="sb-label">${modifier}</p><div class="columns ${modifier}">${[
            1, 2, 3, 4,
          ]
            .map((n) => column(`column ${n}`))
            .join('')}</div></div>`,
      ),
    ),
};

export const Multiline = {
  render: () =>
    `<div class="columns is-multiline is-mobile">
  ${[
    'is-half',
    'is-half',
    'is-one-third',
    'is-one-third',
    'is-one-third',
    'is-full',
  ]
    .map((size) => column(size, size))
    .join('\n  ')}
</div>`,
};

export const Responsive = {
  parameters: {
    docs: {
      description: {
        story:
          'Columns stack below `desktop` by default. `is-mobile` keeps them side by side everywhere, and ' +
          'breakpoint-scoped modifiers (`is-half-tablet`, `is-one-third-desktop`) change the fraction per width.',
      },
    },
  },
  render: () =>
    stack(
      `<div><p class="sb-label">columns is-mobile</p><div class="columns is-mobile">${[
        1, 2, 3, 4,
      ]
        .map((n) => column(`column ${n}`))
        .join('')}</div></div>`,
      `<div><p class="sb-label">is-half-mobile is-one-third-tablet is-one-quarter-desktop</p><div class="columns is-multiline is-mobile">${Array.from(
        { length: 4 },
        () =>
          column(
            'responsive',
            'is-half-mobile is-one-third-tablet is-one-quarter-desktop',
          ),
      ).join('')}</div></div>`,
    ),
};

export const VerticalAlignment = {
  render: () =>
    stack(
      `<div><p class="sb-label">is-vcentered</p><div class="columns is-vcentered">
  <div class="column is-8">${placeholder('is-8')}</div>
  <div class="column"><div class="box">Short column, vertically centred.</div></div>
</div></div>`,
      `<div><p class="sb-label">is-centered</p><div class="columns is-centered">
  <div class="column is-half">${placeholder('is-half, centred row')}</div>
</div></div>`,
    ),
};
