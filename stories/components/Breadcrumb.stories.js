import { labelled, stack } from '../_shared/story-helpers.js';

export default {
  title: 'Components/Breadcrumb',
  parameters: {
    docs: {
      description: {
        component:
          'A `<nav class="breadcrumb">` wrapping a `<ul>`. Mark the current page with `is-active` and the ' +
          'separator comes from `--oen-breadcrumb-item-separator-color`.',
      },
    },
  },
};

const crumbs = (items) =>
  `<nav class="breadcrumb" aria-label="breadcrumbs">
  <ul>
    ${items
      .map(
        (item, index) =>
          `<li${index === items.length - 1 ? ' class="is-active"' : ''}><a href="#"${
            index === items.length - 1 ? ' aria-current="page"' : ''
          }>${item}</a></li>`,
      )
      .join('\n    ')}
  </ul>
</nav>`;

export const Default = {
  render: () => crumbs(['Docs', 'Components', 'Breadcrumb']),
};

export const WithIcons = {
  render: () =>
    `<nav class="breadcrumb" aria-label="breadcrumbs">
  <ul>
    <li><a href="#"><span class="icon is-small"><i class="fa-solid fa-house"></i></span><span>Home</span></a></li>
    <li><a href="#"><span class="icon is-small"><i class="fa-solid fa-book"></i></span><span>Docs</span></a></li>
    <li class="is-active"><a href="#" aria-current="page"><span class="icon is-small"><i class="fa-solid fa-puzzle-piece"></i></span><span>Breadcrumb</span></a></li>
  </ul>
</nav>`,
};

export const Alignment = {
  render: () =>
    stack(
      labelled(
        'is-centered',
        crumbs(['Oen', 'Components', 'Breadcrumb']).replace(
          'breadcrumb"',
          'breadcrumb is-centered"',
        ),
      ),
      labelled(
        'is-right',
        crumbs(['Oen', 'Components', 'Breadcrumb']).replace(
          'breadcrumb"',
          'breadcrumb is-right"',
        ),
      ),
    ),
};

export const Separators = {
  render: () =>
    stack(
      ...[
        '',
        'has-arrow-separator',
        'has-bullet-separator',
        'has-dot-separator',
        'has-succeeds-separator',
      ].map((separator) =>
        labelled(
          separator || 'default (slash)',
          crumbs(['Oen', 'Components', 'Breadcrumb']).replace(
            'breadcrumb"',
            `breadcrumb ${separator}"`,
          ),
        ),
      ),
    ),
};

export const Sizes = {
  render: () =>
    stack(
      ...['is-small', '', 'is-medium', 'is-large'].map((size) =>
        labelled(
          size || 'normal',
          crumbs(['Oen', 'Docs', 'Breadcrumb']).replace(
            'breadcrumb"',
            `breadcrumb ${size}"`,
          ),
        ),
      ),
    ),
};
