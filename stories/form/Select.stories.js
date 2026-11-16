import {
  COLORS,
  SIZES,
  labelled,
  modifier,
  stack,
} from '../_shared/story-helpers.js';

export default {
  title: 'Form/Select',
  parameters: {
    docs: {
      description: {
        component:
          'Wrap a native `<select>` in `<div class="select">`: the wrapper draws the arrow and the border, ' +
          'so the control keeps the operating system dropdown behaviour.',
      },
    },
  },
};

const options = ['Select a theme', 'Light', 'Dark', 'System']
  .map((o) => `<option>${o}</option>`)
  .join('');

export const Default = {
  render: () =>
    `<div class="select"><select aria-label="Theme">${options}</select></div>`,
};

export const Colors = {
  render: () =>
    stack(
      ...COLORS.map((color) =>
        labelled(
          `is-${color}`,
          `<div class="select is-${color}"><select aria-label="is-${color}">${options}</select></div>`,
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
          `<div class="select ${modifier(size)}"><select aria-label="is-${size}">${options}</select></div>`,
        ),
      ),
    ),
};

export const Multiple = {
  render: () =>
    `<div class="select is-multiple">
  <select multiple size="4" aria-label="Pick components">
    <option>Button</option><option>Card</option><option>Modal</option><option>Navbar</option><option>Table</option>
  </select>
</div>`,
};

export const States = {
  render: () =>
    stack(
      labelled(
        'is-loading',
        `<div class="select is-loading"><select aria-label="Loading">${options}</select></div>`,
      ),
      labelled(
        'disabled',
        `<div class="select"><select disabled aria-label="Disabled">${options}</select></div>`,
      ),
      labelled(
        'is-rounded',
        `<div class="select is-rounded"><select aria-label="Rounded">${options}</select></div>`,
      ),
      labelled(
        'is-skeleton',
        `<div class="select is-skeleton"><select aria-label="Skeleton">${options}</select></div>`,
      ),
    ),
};

export const WithIcon = {
  render: () =>
    `<div class="field">
  <div class="control has-icons-left">
    <div class="select">
      <select aria-label="Country"><option>Poland</option><option>Germany</option><option>Japan</option></select>
    </div>
    <span class="icon is-small is-left"><i class="fa-solid fa-globe"></i></span>
  </div>
</div>`,
};
