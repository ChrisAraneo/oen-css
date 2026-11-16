import { stack } from '../_shared/story-helpers.js';

export default {
  title: 'Helpers/Visibility',
  parameters: {
    docs: {
      description: {
        component:
          'Display and visibility helpers, most of them available per breakpoint: `is-hidden-mobile`, ' +
          '`is-block-tablet-only`, `is-flex-desktop`, and so on. `is-sr-only` keeps content for screen ' +
          'readers while hiding it visually.',
      },
    },
  },
};

export const Responsive = {
  parameters: {
    docs: {
      description: {
        story:
          'Resize the canvas. Each row announces the width at which it is visible.',
      },
    },
  },
  render: () =>
    stack(
      ...[
        ['is-hidden-mobile', 'Hidden below 769px'],
        ['is-hidden-tablet-only', 'Hidden between 769px and 1023px'],
        ['is-hidden-desktop-only', 'Hidden between 1024px and 1215px'],
        ['is-hidden-touch', 'Hidden below 1024px'],
        ['is-hidden-desktop', 'Hidden from 1024px up'],
      ].map(
        ([helper, description]) =>
          `<div class="notification is-info is-light ${helper}"><code>${helper}</code>: ${description}</div>`,
      ),
    ),
};

export const DisplayHelpers = {
  render: () =>
    stack(
      ...[
        'is-block',
        'is-flex',
        'is-inline',
        'is-inline-block',
        'is-inline-flex',
      ].map(
        (helper) =>
          `<div class="${helper} sb-outline p-2"><code>${helper}</code></div>`,
      ),
    ),
};

export const Hidden = {
  render: () =>
    stack(
      '<div class="notification is-warning is-light">The next two blocks are present in the DOM but not on screen.</div>',
      '<div class="is-hidden">is-hidden</div>',
      '<div class="is-invisible">is-invisible (still takes up space)</div>',
      '<p><span class="is-sr-only">This sentence is only read by screen readers.</span><code>is-sr-only</code> keeps text accessible while hiding it.</p>',
    ),
};
