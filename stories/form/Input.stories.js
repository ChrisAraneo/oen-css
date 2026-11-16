import {
  COLORS,
  SIZES,
  boolArg,
  classes,
  labelled,
  modifier,
  selectArg,
  stack,
} from '../_shared/story-helpers.js';

export default {
  title: 'Form/Input',
  parameters: {
    docs: {
      description: {
        component:
          'The `.input` class styles every single-line text control: `text`, `email`, `password`, `number`, `search`, `tel`.',
      },
    },
  },
  argTypes: {
    placeholder: { control: 'text' },
    value: { control: 'text' },
    color: selectArg(COLORS, 'Colour modifier'),
    size: selectArg(SIZES, 'Size modifier', { includeNone: false }),
    rounded: boolArg('`is-rounded`'),
    disabled: boolArg('Native `disabled`'),
    readonly: boolArg('Native `readonly`'),
  },
  args: {
    placeholder: 'Type something',
    value: '',
    color: '',
    size: 'normal',
    rounded: false,
    disabled: false,
    readonly: false,
  },
  render: ({ placeholder, value, color, size, rounded, disabled, readonly }) =>
    `<input class="${classes('input', modifier(color), modifier(size), rounded && 'is-rounded')}" type="text" placeholder="${placeholder}" value="${value}"${
      disabled ? ' disabled' : ''
    }${readonly ? ' readonly' : ''} aria-label="Example input" />`,
};

export const Playground = {};

export const Colors = {
  render: () =>
    stack(
      labelled(
        'Default',
        '<input class="input" type="text" placeholder="Default" aria-label="Default" />',
      ),
      ...COLORS.map((color) =>
        labelled(
          `is-${color}`,
          `<input class="input is-${color}" type="text" placeholder="is-${color}" aria-label="is-${color}" />`,
        ),
      ),
    ),
};

export const Sizes = {
  render: () =>
    stack(
      ...SIZES.map((size) =>
        labelled(
          `is-${size}`,
          `<input class="input ${modifier(size)}" type="text" placeholder="is-${size}" aria-label="is-${size}" />`,
        ),
      ),
    ),
};

export const States = {
  render: () =>
    stack(
      labelled(
        'is-hovered',
        '<input class="input is-hovered" type="text" placeholder="Hovered" aria-label="Hovered" />',
      ),
      labelled(
        'is-focused',
        '<input class="input is-focused" type="text" placeholder="Focused" aria-label="Focused" />',
      ),
      labelled(
        'disabled',
        '<input class="input" type="text" placeholder="Disabled" disabled aria-label="Disabled" />',
      ),
      labelled(
        'readonly',
        '<input class="input" type="text" value="Read only" readonly aria-label="Read only" />',
      ),
      labelled(
        'is-static',
        '<input class="input is-static" type="text" value="ada@example.com" readonly aria-label="Static" />',
      ),
      labelled(
        'is-skeleton',
        '<input class="input is-skeleton" type="text" aria-label="Skeleton" />',
      ),
    ),
};

export const WithIcons = {
  render: () =>
    stack(
      `<div class="field">
  <div class="control has-icons-left has-icons-right">
    <input class="input is-success" type="email" value="ada@example.com" aria-label="Email" />
    <span class="icon is-small is-left"><i class="fa-solid fa-envelope"></i></span>
    <span class="icon is-small is-right"><i class="fa-solid fa-check"></i></span>
  </div>
  <p class="help is-success">This email address is available.</p>
</div>`,
      `<div class="field">
  <div class="control has-icons-left">
    <input class="input is-large" type="search" placeholder="Search packages" aria-label="Search" />
    <span class="icon is-left"><i class="fa-solid fa-magnifying-glass"></i></span>
  </div>
</div>`,
    ),
};

export const Rounded = {
  render: () =>
    labelled(
      'is-rounded',
      '<input class="input is-rounded" type="text" placeholder="Rounded input" aria-label="Rounded" />',
    ),
};
