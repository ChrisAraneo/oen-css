import {
  COLORS,
  SIZES,
  labelled,
  modifier,
  stack,
} from '../_shared/story-helpers.js';

export default {
  title: 'Form/File',
  parameters: {
    docs: {
      description: {
        component:
          'A styled file input: the real `<input type="file">` stays in the markup (and keeps working) while ' +
          '`.file-cta` and `.file-name` provide the visible control.',
      },
    },
  },
};

const field = (
  extraClass = '',
  { name = false, label = 'Choose a file…' } = {},
) =>
  `<div class="file ${extraClass}">
  <label class="file-label">
    <input class="file-input" type="file" name="resume" />
    <span class="file-cta">
      <span class="file-icon"><i class="fa-solid fa-upload"></i></span>
      <span class="file-label">${label}</span>
    </span>
    ${name ? '<span class="file-name">oen-css-0.2.1.tgz</span>' : ''}
  </label>
</div>`;

export const Default = { render: () => field() };

export const WithFileName = {
  render: () => field('has-name', { name: true }),
};

export const Boxed = {
  render: () =>
    stack(
      labelled('is-boxed', field('is-boxed')),
      labelled('is-boxed has-name', field('is-boxed has-name', { name: true })),
    ),
};

export const Colors = {
  render: () =>
    stack(
      ...COLORS.map((color) =>
        labelled(`is-${color}`, field(`is-${color} has-name`, { name: true })),
      ),
    ),
};

export const Sizes = {
  render: () =>
    stack(
      ...SIZES.map((size) =>
        labelled(
          `is-${size}`,
          field(`${modifier(size)} has-name`, { name: true }),
        ),
      ),
    ),
};

export const Alignment = {
  render: () =>
    stack(
      labelled('is-centered is-boxed', field('is-centered is-boxed')),
      labelled('is-right has-name', field('is-right has-name', { name: true })),
      labelled(
        'is-fullwidth has-name',
        field('is-fullwidth has-name', { name: true }),
      ),
    ),
};
