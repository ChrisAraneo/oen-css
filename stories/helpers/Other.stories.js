import { placeholder, stack, svgImage } from '../_shared/story-helpers.js';

export default {
  title: 'Helpers/Other',
  parameters: {
    docs: {
      description: {
        component:
          'The remaining single-purpose helpers: floats and clearfix, radius and shadow removal, overlays, ' +
          'cursor and selection behaviour.',
      },
    },
  },
};

export const Floats = {
  render: () =>
    `<div class="box is-clearfix">
  <button class="button is-pulled-left">is-pulled-left</button>
  <button class="button is-pulled-right">is-pulled-right</button>
</div>
<p class="sb-note">The box carries <code>is-clearfix</code>, so it still wraps both floated buttons.</p>`,
};

export const RadiusAndShadow = {
  render: () =>
    stack(
      '<div class="box is-radiusless">is-radiusless</div>',
      '<div class="box is-shadowless">is-shadowless</div>',
      '<div class="box is-radiusless is-shadowless">is-radiusless is-shadowless</div>',
    ),
};

export const Overlay = {
  parameters: {
    docs: {
      description: {
        story:
          '`is-overlay` fills the nearest positioned ancestor: captions, scrims, badges.',
      },
    },
  },
  render: () =>
    `<div class="is-relative" style="max-width: 24rem">
  <figure class="image is-16by9"><img src="${svgImage(640, 360, 'overlay')}" alt="Placeholder" /></figure>
  <div class="is-overlay is-flex is-align-items-flex-end">
    <div class="notification is-dark m-3 py-2">A caption pinned with <code>is-overlay</code></div>
  </div>
</div>`,
};

export const Interaction = {
  render: () =>
    stack(
      `<div class="box is-clickable">is-clickable: the cursor becomes a pointer</div>`,
      `<div class="box is-unselectable">is-unselectable: try to select this text</div>`,
      `<div class="is-flex" style="gap: 0.5rem">${placeholder('is-relative', 'is-relative')}</div>`,
    ),
};
