import { placeholder, stack } from '../_shared/story-helpers.js';

export default {
  title: 'Grid/Grid',
  parameters: {
    docs: {
      description: {
        component:
          'Oen ships both CSS-grid systems from Bulma 1.0. The **smart grid** (`.grid` + `.cell`) fills the row ' +
          'with as many columns as fit, driven by `--oen-grid-column-min`. The **fixed grid** ' +
          '(`.fixed-grid > .grid`) uses a container query, renamed here to `oen-fixed-grid`, to set an exact ' +
          'column count per breakpoint.',
      },
    },
  },
};

const cells = (count, extraClass = '') =>
  Array.from(
    { length: count },
    (_, i) =>
      `<div class="cell ${extraClass}">${placeholder(`cell ${i + 1}`)}</div>`,
  ).join('');

export const SmartGrid = {
  render: () => `<div class="grid">${cells(12)}</div>`,
};

export const MinimumColumnWidth = {
  parameters: {
    docs: {
      description: {
        story:
          '`is-col-min-*` raises the minimum cell width, so fewer columns fit on a row.',
      },
    },
  },
  render: () =>
    stack(
      ...['is-col-min-2', 'is-col-min-8', 'is-col-min-16'].map(
        (modifier) =>
          `<div><p class="sb-label">grid ${modifier}</p><div class="grid ${modifier}">${cells(8)}</div></div>`,
      ),
    ),
};

export const Gaps = {
  render: () =>
    stack(
      ...['is-gap-0', 'is-gap-2', 'is-gap-8'].map(
        (modifier) =>
          `<div><p class="sb-label">grid ${modifier}</p><div class="grid ${modifier}">${cells(8)}</div></div>`,
      ),
    ),
};

export const CellSpans = {
  parameters: {
    docs: {
      description: {
        story:
          'A cell can span columns and rows with `is-col-span-*` and `is-row-span-*`.',
      },
    },
  },
  render: () =>
    `<div class="grid">
  <div class="cell is-col-span-2">${placeholder('is-col-span-2')}</div>
  ${cells(3)}
  <div class="cell is-row-span-2">${placeholder('is-row-span-2')}</div>
  ${cells(6)}
</div>`,
};

export const FixedGrid = {
  render: () =>
    stack(
      ...['has-1-cols', 'has-3-cols', 'has-6-cols', 'has-12-cols'].map(
        (modifier) =>
          `<div><p class="sb-label">fixed-grid ${modifier}</p><div class="fixed-grid ${modifier}"><div class="grid">${cells(
            12,
          )}</div></div></div>`,
      ),
    ),
};

export const FixedGridResponsive = {
  parameters: {
    docs: {
      description: {
        story:
          'Breakpoint-scoped counts (`has-2-cols-mobile`, `has-6-cols-desktop`, ...) are resolved by the ' +
          '`@container oen-fixed-grid` queries. Resize the canvas to watch the column count change. ' +
          '`has-auto-count` falls back to one column per breakpoint step.',
      },
    },
  },
  render: () =>
    stack(
      `<div><p class="sb-label">has-2-cols-mobile has-4-cols-tablet has-8-cols-desktop</p>
<div class="fixed-grid has-2-cols-mobile has-4-cols-tablet has-8-cols-desktop"><div class="grid">${cells(8)}</div></div></div>`,
      `<div><p class="sb-label">fixed-grid has-auto-count</p>
<div class="fixed-grid has-auto-count"><div class="grid">${cells(8)}</div></div></div>`,
    ),
};
