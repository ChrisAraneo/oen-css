import { stack } from '../_shared/story-helpers.js';

export default {
  title: 'Helpers/Typography',
  parameters: {
    docs: {
      description: {
        component:
          'Typography helpers cover size (`is-size-1` … `is-size-7`, with `-mobile`, `-tablet`, `-desktop` ' +
          'variants), alignment, transformation, weight and font family.',
      },
    },
  },
};

export const Sizes = {
  render: () =>
    stack(
      ...[1, 2, 3, 4, 5, 6, 7].map(
        (size) =>
          `<p class="is-size-${size}">is-size-${size}: The quick brown fox</p>`,
      ),
    ),
};

export const ResponsiveSizes = {
  parameters: {
    docs: {
      description: {
        story:
          'Resize the canvas: this paragraph is `is-size-3-mobile`, `is-size-5-tablet` and `is-size-7-desktop`.',
      },
    },
  },
  render: () =>
    '<p class="is-size-3-mobile is-size-5-tablet is-size-7-desktop">This text shrinks as the viewport widens.</p>',
};

export const Alignment = {
  render: () =>
    stack(
      ...[
        'has-text-left',
        'has-text-centered',
        'has-text-right',
        'has-text-justified',
      ].map(
        (helper) =>
          `<p class="${helper} sb-outline">${helper}: Oen keeps Bulma's class names, so this markup is portable between the two frameworks.</p>`,
      ),
    ),
};

export const Transformation = {
  render: () =>
    stack(
      ...[
        'is-capitalized',
        'is-lowercase',
        'is-uppercase',
        'is-italic',
        'is-underlined',
      ].map(
        (helper) =>
          `<p class="${helper}">${helper}: Oen CSS Typography Helpers</p>`,
      ),
    ),
};

export const Weight = {
  render: () =>
    stack(
      ...[
        'has-text-weight-light',
        'has-text-weight-normal',
        'has-text-weight-medium',
        'has-text-weight-semibold',
        'has-text-weight-bold',
      ].map((helper) => `<p class="${helper}">${helper}</p>`),
    ),
};

export const Family = {
  render: () =>
    stack(
      ...[
        'is-family-sans-serif',
        'is-family-monospace',
        'is-family-primary',
        'is-family-secondary',
        'is-family-code',
      ].map(
        (helper) =>
          `<p class="${helper}">${helper}: The quick brown fox jumps over the lazy dog, 0123456789</p>`,
      ),
    ),
};
