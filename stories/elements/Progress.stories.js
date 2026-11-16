import {
  COLORS,
  SIZES,
  classes,
  labelled,
  modifier,
  selectArg,
  stack,
} from '../_shared/story-helpers.js';

export default {
  title: 'Elements/Progress',
  parameters: {
    docs: {
      description: {
        component:
          'A styled native `<progress>` element. Omitting the `value` attribute turns it into an ' +
          'indeterminate bar, driven by `--oen-progress-indeterminate-duration`.',
      },
    },
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    color: selectArg(COLORS, 'Colour modifier'),
    size: selectArg(SIZES, 'Size modifier', { includeNone: false }),
  },
  args: { value: 45, color: 'primary', size: 'normal' },
  render: ({ value, color, size }) =>
    `<progress class="${classes('progress', modifier(color), modifier(size))}" value="${value}" max="100">${value}%</progress>`,
};

export const Playground = {};

export const Colors = {
  render: () =>
    stack(
      '<progress class="progress" value="15" max="100">15%</progress>',
      ...COLORS.map(
        (color, index) =>
          `<progress class="progress is-${color}" value="${(index + 2) * 12}" max="100">${(index + 2) * 12}%</progress>`,
      ),
    ),
};

export const Sizes = {
  render: () =>
    stack(
      ...SIZES.map((size) =>
        labelled(
          `is-${size}`,
          `<progress class="progress ${modifier(size)} is-info" value="60" max="100">60%</progress>`,
        ),
      ),
    ),
};

export const Indeterminate = {
  parameters: {
    docs: {
      description: {
        story: 'With no `value`, the bar animates to signal unknown duration.',
      },
    },
  },
  render: () =>
    stack(
      '<progress class="progress is-small is-primary" max="100">loading</progress>',
      '<progress class="progress is-link" max="100">loading</progress>',
      '<progress class="progress is-large is-danger" max="100">loading</progress>',
    ),
};
