import { stack } from '../_shared/story-helpers.js';

export default {
  title: 'Helpers/Spacing',
  parameters: {
    docs: {
      description: {
        component:
          'Margin and padding helpers follow the pattern `{m|p}{side}-{0..6}`, where side is ' +
          '`t`, `r`, `b`, `l`, `x`, `y` or omitted. The scale is 0, 0.25, 0.5, 0.75, 1, 1.5 and 3 rem.',
      },
    },
  },
};

const SCALE = [0, 1, 2, 3, 4, 5, 6];

export const Margin = {
  render: () =>
    stack(
      ...SCALE.map(
        (step) => `<div class="sb-outline">
  <div class="notification is-primary is-light m-${step} mb-0">
    <code>m-${step}</code>
  </div>
</div>`,
      ),
    ),
};

export const Padding = {
  render: () =>
    stack(
      ...SCALE.map(
        (step) =>
          `<div class="notification is-link is-light p-${step}"><code>p-${step}</code></div>`,
      ),
    ),
};

export const Directions = {
  render: () =>
    `<div class="sb-grid">${[
      'mt-5',
      'mr-5',
      'mb-5',
      'ml-5',
      'mx-5',
      'my-5',
      'pt-5',
      'pr-5',
      'pb-5',
      'pl-5',
      'px-5',
      'py-5',
    ]
      .map(
        (helper) =>
          `<div class="sb-outline"><div class="notification is-info is-light ${helper} mb-0"><code>${helper}</code></div></div>`,
      )
      .join('')}</div>`,
};

export const Auto = {
  parameters: {
    docs: {
      description: {
        story:
          '`mx-auto` centres a block in its parent; `ml-auto` and `mr-auto` push it to one side.',
      },
    },
  },
  render: () =>
    stack(
      '<div class="notification is-success is-light mx-auto" style="max-width: 16rem"><code>mx-auto</code></div>',
      '<div class="notification is-success is-light ml-auto" style="max-width: 16rem"><code>ml-auto</code></div>',
    ),
};
