import { boolArg, classes, stack } from '../_shared/story-helpers.js';

export default {
  title: 'Elements/Table',
  parameters: {
    docs: {
      description: {
        component:
          'The `.table` class styles a native `<table>`: `thead`, `tbody`, `tfoot`, `th`, `td` and ' +
          'row modifiers such as `is-selected` all work without extra markup.',
      },
    },
  },
  argTypes: {
    bordered: boolArg('`is-bordered`'),
    striped: boolArg('`is-striped`'),
    narrow: boolArg('`is-narrow`'),
    hoverable: boolArg('`is-hoverable`'),
    fullwidth: boolArg('`is-fullwidth`'),
  },
  args: {
    bordered: false,
    striped: true,
    narrow: false,
    hoverable: true,
    fullwidth: true,
  },
  render: ({ bordered, striped, narrow, hoverable, fullwidth }) =>
    renderTable(
      classes(
        'table',
        bordered && 'is-bordered',
        striped && 'is-striped',
        narrow && 'is-narrow',
        hoverable && 'is-hoverable',
        fullwidth && 'is-fullwidth',
      ),
    ),
};

const ROWS = [
  ['1', 'Oen CSS', '0.1.0', 'MIT', '713 kB'],
  ['2', 'Bulma', '1.0.4', 'MIT', '764 kB'],
  ['3', 'Storybook', '10.6.7', 'MIT', '-'],
  ['4', 'Sass', '1.108.2', 'MIT', '-'],
];

const renderTable = (tableClass, { selectedRow = 2 } = {}) =>
  `<table class="${tableClass}">
  <thead>
    <tr><th><abbr title="Position">#</abbr></th><th>Package</th><th>Version</th><th>License</th><th>Size</th></tr>
  </thead>
  <tfoot>
    <tr><th>#</th><th>Package</th><th>Version</th><th>License</th><th>Size</th></tr>
  </tfoot>
  <tbody>
    ${ROWS.map(
      (cells, index) =>
        `<tr${index === selectedRow ? ' class="is-selected"' : ''}><th>${cells[0]}</th>${cells
          .slice(1)
          .map((cell) => `<td>${cell}</td>`)
          .join('')}</tr>`,
    ).join('\n    ')}
  </tbody>
</table>`;

export const Playground = {};

export const Variants = {
  render: () =>
    stack(
      `<div><p class="sb-label">is-bordered</p>${renderTable('table is-bordered is-fullwidth')}</div>`,
      `<div><p class="sb-label">is-striped is-narrow</p>${renderTable('table is-striped is-narrow is-fullwidth')}</div>`,
      `<div><p class="sb-label">is-hoverable</p>${renderTable('table is-hoverable is-fullwidth')}</div>`,
    ),
};

export const Scrollable = {
  parameters: {
    docs: {
      description: {
        story:
          'Wrap a wide table in `.table-container` to make it scroll horizontally instead of breaking the layout.',
      },
    },
  },
  render: () =>
    `<div class="table-container">
  <table class="table is-bordered is-striped is-narrow">
    <thead><tr>${Array.from({ length: 18 }, (_, i) => `<th>Column ${i + 1}</th>`).join('')}</tr></thead>
    <tbody>${Array.from(
      { length: 3 },
      (_, row) =>
        `<tr>${Array.from({ length: 18 }, (_, i) => `<td>${row + 1}.${i + 1}</td>`).join('')}</tr>`,
    ).join('')}</tbody>
  </table>
</div>`,
};

export const Skeleton = {
  render: () =>
    renderTable('table is-fullwidth is-skeleton', { selectedRow: -1 }),
};
