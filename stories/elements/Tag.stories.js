import {
  COLORS,
  SHADES,
  boolArg,
  classes,
  labelled,
  modifier,
  selectArg,
  stack,
} from '../_shared/story-helpers.js';

export default {
  title: 'Elements/Tag',
  parameters: {
    docs: {
      description: {
        component:
          'Small labels for metadata, counts and removable selections. Tags group with `.tags`.',
      },
    },
  },
  argTypes: {
    text: { control: 'text' },
    color: selectArg([...COLORS, ...SHADES], 'Colour modifier'),
    size: selectArg(['normal', 'medium', 'large'], 'Size modifier', {
      includeNone: false,
    }),
    light: boolArg('`is-light`'),
    rounded: boolArg('`is-rounded`'),
    deletable: boolArg('Append a `.delete` button'),
  },
  args: {
    text: 'Tag',
    color: 'primary',
    size: 'normal',
    light: false,
    rounded: false,
    deletable: false,
  },
  render: ({ text, color, size, light, rounded, deletable }) =>
    `<span class="${classes('tag', modifier(color), modifier(size), light && 'is-light', rounded && 'is-rounded')}">${text}${
      deletable
        ? '<button class="delete is-small" aria-label="remove"></button>'
        : ''
    }</span>`,
};

export const Playground = {};

export const Colors = {
  render: () =>
    stack(
      labelled('Default', '<span class="tag">Tag</span>'),
      labelled(
        'Semantic',
        ...COLORS.map(
          (color) => `<span class="tag is-${color}">${color}</span>`,
        ),
      ),
      labelled(
        'Light',
        ...COLORS.map(
          (color) => `<span class="tag is-${color} is-light">${color}</span>`,
        ),
      ),
      labelled(
        'Shades',
        ...SHADES.map(
          (shade) => `<span class="tag is-${shade}">${shade}</span>`,
        ),
      ),
    ),
};

export const Sizes = {
  render: () =>
    stack(
      labelled(
        'Sizes',
        '<span class="tag">normal</span>',
        '<span class="tag is-medium">medium</span>',
        '<span class="tag is-large">large</span>',
      ),
      labelled(
        'are-* on a group',
        '<div class="tags are-medium"><span class="tag is-link">medium</span><span class="tag is-link">medium</span></div>',
        '<div class="tags are-large"><span class="tag is-info">large</span><span class="tag is-info">large</span></div>',
      ),
    ),
};

export const Deletable = {
  render: () =>
    stack(
      labelled(
        'Tag with delete',
        ...['normal', 'medium', 'large'].map(
          (size) =>
            `<span class="tag ${modifier(size)} is-success">${size}<button class="delete ${
              size === 'large' ? '' : 'is-small'
            }" aria-label="remove"></button></span>`,
        ),
      ),
      labelled(
        'Delete only',
        '<button class="tag is-delete" aria-label="remove"></button>',
      ),
    ),
};

export const Groups = {
  parameters: {
    docs: {
      description: {
        story:
          '`.tags` wraps a list of tags; `has-addons` joins a label and a value into one pill, which is the ' +
          'idiomatic way to show a key/value pair.',
      },
    },
  },
  render: () =>
    stack(
      `<div><p class="sb-label">tags</p><div class="tags">
  ${['One', 'Two', 'Three', 'Four', 'Five'].map((t) => `<span class="tag">${t}</span>`).join('\n  ')}
</div></div>`,
      `<div><p class="sb-label">tags has-addons</p><div class="field is-grouped is-grouped-multiline">
  ${[
    ['package', '@chris.araneo/oen-css', 'is-primary'],
    ['license', 'MIT', 'is-info'],
    ['built from', 'Bulma 1.0.4', 'is-link'],
  ]
    .map(
      ([key, value, color]) =>
        `<div class="control"><div class="tags has-addons"><span class="tag ${color}">${key}</span><span class="tag">${value}</span></div></div>`,
    )
    .join('\n  ')}
</div></div>`,
      `<div><p class="sb-label">tags has-addons with delete</p><div class="tags has-addons">
  <span class="tag is-danger">Remove me</span><button class="tag is-delete" aria-label="remove"></button>
</div></div>`,
    ),
};

export const Rounded = {
  render: () =>
    labelled(
      'is-rounded',
      ...COLORS.map(
        (color) => `<span class="tag is-${color} is-rounded">${color}</span>`,
      ),
    ),
};
