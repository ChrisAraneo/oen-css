import {
  COLORS,
  SHADES,
  SIZES,
  boolArg,
  classes,
  labelled,
  modifier,
  row,
  selectArg,
  stack,
} from '../_shared/story-helpers.js';

export default {
  title: 'Elements/Button',
  parameters: {
    docs: {
      description: {
        component:
          'The `.button` element works on `<button>`, `<a>` and `<input type="submit">`. ' +
          'Colours, sizes and states are all expressed as `is-*` modifiers and are driven by ' +
          '`--oen-button-*` custom properties.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Button text' },
    color: selectArg(
      [...COLORS, ...SHADES, 'text', 'ghost'],
      'Colour modifier',
    ),
    size: selectArg(SIZES, 'Size modifier', { includeNone: false }),
    light: boolArg('`is-light`: tinted background, coloured text'),
    dark: boolArg('`is-dark`: darker variant of the colour'),
    outlined: boolArg('`is-outlined`: transparent with a coloured border'),
    inverted: boolArg('`is-inverted`: for use on coloured backgrounds'),
    rounded: boolArg('`is-rounded`: pill shaped'),
    loading: boolArg('`is-loading`: replaces the text with a spinner'),
    disabled: boolArg('Native `disabled` attribute'),
    fullwidth: boolArg('`is-fullwidth`: stretches to the container'),
  },
  args: {
    label: 'Button',
    color: 'primary',
    size: 'normal',
    light: false,
    dark: false,
    outlined: false,
    inverted: false,
    rounded: false,
    loading: false,
    disabled: false,
    fullwidth: false,
  },
  render: ({
    label,
    color,
    size,
    light,
    dark,
    outlined,
    inverted,
    rounded,
    loading,
    disabled,
    fullwidth,
  }) =>
    `<button class="${classes(
      'button',
      modifier(color),
      modifier(size),
      light && 'is-light',
      dark && 'is-dark',
      outlined && 'is-outlined',
      inverted && 'is-inverted',
      rounded && 'is-rounded',
      loading && 'is-loading',
      fullwidth && 'is-fullwidth',
    )}"${disabled ? ' disabled' : ''}>${label}</button>`,
};

export const Playground = {};

export const Colors = {
  render: () =>
    stack(
      labelled('Default', '<button class="button">Button</button>'),
      labelled(
        'Semantic',
        ...COLORS.map(
          (color) => `<button class="button is-${color}">${color}</button>`,
        ),
      ),
      labelled(
        'Shades',
        ...SHADES.map(
          (shade) => `<button class="button is-${shade}">${shade}</button>`,
        ),
      ),
      labelled(
        'Text and ghost',
        '<button class="button is-text">Text</button>',
        '<button class="button is-ghost">Ghost</button>',
      ),
    ),
};

export const Variants = {
  render: () =>
    stack(
      labelled(
        'Light',
        ...COLORS.map(
          (color) =>
            `<button class="button is-${color} is-light">${color}</button>`,
        ),
      ),
      labelled(
        'Dark',
        ...COLORS.map(
          (color) =>
            `<button class="button is-${color} is-dark">${color}</button>`,
        ),
      ),
      labelled(
        'Outlined',
        ...COLORS.map(
          (color) =>
            `<button class="button is-${color} is-outlined">${color}</button>`,
        ),
      ),
      labelled(
        'Rounded',
        ...COLORS.slice(0, 4).map(
          (color) =>
            `<button class="button is-${color} is-rounded">${color}</button>`,
        ),
      ),
    ),
};

export const Inverted = {
  parameters: {
    docs: {
      description: {
        story:
          '`is-inverted` is meant for coloured backgrounds, such as a hero.',
      },
    },
  },
  render: () =>
    `<div class="notification is-primary">${row(
      ...['primary', 'link', 'info'].map(
        (color) =>
          `<button class="button is-${color} is-inverted">${color} inverted</button>`,
      ),
      ...['primary', 'link'].map(
        (color) =>
          `<button class="button is-${color} is-inverted is-outlined">${color} inverted outlined</button>`,
      ),
    )}</div>`,
};

export const Sizes = {
  render: () =>
    stack(
      labelled(
        'Sizes',
        ...SIZES.map(
          (size) => `<button class="button ${modifier(size)}">${size}</button>`,
        ),
      ),
      labelled(
        'Responsive',
        '<button class="button is-responsive is-primary is-small">Small, responsive</button>',
        '<button class="button is-responsive is-primary is-normal">Normal, responsive</button>',
        '<button class="button is-responsive is-primary is-medium">Medium, responsive</button>',
      ),
    ),
};

export const States = {
  render: () =>
    stack(
      labelled(
        'Interaction states',
        '<button class="button is-primary">Normal</button>',
        '<button class="button is-primary is-hovered">Hovered</button>',
        '<button class="button is-primary is-focused">Focused</button>',
        '<button class="button is-primary is-active">Active</button>',
        '<button class="button is-primary is-loading">Loading</button>',
        '<button class="button is-primary" disabled>Disabled</button>',
      ),
      labelled(
        'Static and skeleton',
        '<button class="button is-static">Static</button>',
        '<button class="button is-primary is-skeleton">Skeleton</button>',
        '<button class="button is-skeleton">Skeleton</button>',
      ),
    ),
};

export const WithIcons = {
  render: () =>
    stack(
      labelled(
        'Icon and text',
        '<button class="button is-primary"><span class="icon"><i class="fa-solid fa-floppy-disk"></i></span><span>Save</span></button>',
        '<button class="button is-danger is-light"><span class="icon"><i class="fa-solid fa-trash"></i></span><span>Delete</span></button>',
        '<button class="button"><span>Next</span><span class="icon"><i class="fa-solid fa-arrow-right"></i></span></button>',
      ),
      labelled(
        'Icon only',
        '<button class="button is-small" aria-label="Bold"><span class="icon is-small"><i class="fa-solid fa-bold"></i></span></button>',
        '<button class="button" aria-label="Italic"><span class="icon"><i class="fa-solid fa-italic"></i></span></button>',
        '<button class="button is-medium" aria-label="Underline"><span class="icon is-medium"><i class="fa-solid fa-underline"></i></span></button>',
        '<button class="button is-large" aria-label="Strikethrough"><span class="icon is-large"><i class="fa-solid fa-strikethrough"></i></span></button>',
      ),
    ),
};

export const Groups = {
  parameters: {
    docs: {
      description: {
        story:
          '`.buttons` groups buttons with consistent spacing; `has-addons` joins them into one control.',
      },
    },
  },
  render: () =>
    stack(
      `<div><p class="sb-label">buttons</p><div class="buttons">
  <button class="button is-success">Save changes</button>
  <button class="button is-info">Save and continue</button>
  <button class="button is-danger">Cancel</button>
</div></div>`,
      `<div><p class="sb-label">buttons has-addons</p><div class="buttons has-addons">
  <button class="button">Yes</button>
  <button class="button is-primary is-selected">Maybe</button>
  <button class="button">No</button>
</div></div>`,
      `<div><p class="sb-label">buttons is-centered</p><div class="buttons is-centered">
  <button class="button is-link">One</button>
  <button class="button is-link is-light">Two</button>
  <button class="button is-link is-light">Three</button>
</div></div>`,
      `<div><p class="sb-label">buttons are-small</p><div class="buttons are-small">
  <button class="button is-primary">Small</button>
  <button class="button">Small</button>
  <button class="button is-outlined">Small</button>
</div></div>`,
    ),
};

export const Fullwidth = {
  render: () =>
    stack(
      '<button class="button is-primary is-fullwidth">Primary, fullwidth</button>',
      '<button class="button is-fullwidth">Default, fullwidth</button>',
    ),
};
