import { labelled, row, stack, svgImage } from '../_shared/story-helpers.js';

export default {
  title: 'Elements/Image',
  parameters: {
    docs: {
      description: {
        component:
          '`.image` is a responsive container that reserves space for an image before it loads, ' +
          'preventing layout shift. Fixed sizes and aspect ratios are `is-*` modifiers.',
      },
    },
  },
};

const FIXED = ['16x16', '24x24', '32x32', '48x48', '64x64', '96x96', '128x128'];
const RATIOS = [
  'is-square',
  'is-1by1',
  'is-5by4',
  'is-4by3',
  'is-3by2',
  'is-16by9',
  'is-2by1',
];

export const FixedSquares = {
  render: () =>
    labelled(
      'is-NxN',
      ...FIXED.map((size) => {
        const px = Number(size.split('x')[0]);
        return `<figure class="image is-${size}"><img src="${svgImage(px, px, String(px))}" alt="${size} placeholder" /></figure>`;
      }),
    ),
};

export const AspectRatios = {
  render: () =>
    `<div class="columns is-multiline">${RATIOS.map(
      (ratio) => `<div class="column is-one-third">
  <p class="sb-label">${ratio}</p>
  <figure class="image ${ratio}"><img src="${svgImage(480, 270, ratio)}" alt="${ratio} placeholder" /></figure>
</div>`,
    ).join('')}</div>`,
};

export const Rounded = {
  render: () =>
    stack(
      labelled(
        'is-rounded',
        ...['48x48', '64x64', '96x96'].map((size) => {
          const px = Number(size.split('x')[0]);
          return `<figure class="image is-${size}"><img class="is-rounded" src="${svgImage(px, px, '')}" alt="Avatar" /></figure>`;
        }),
      ),
      row(
        `<figure class="image is-128x128"><img class="is-rounded" src="${svgImage(128, 128, '')}" alt="Avatar" /></figure>`,
        '<p class="sb-note">Add <code>is-rounded</code> to the <code>&lt;img&gt;</code>, not to the figure.</p>',
      ),
    ),
};

export const Fullwidth = {
  render: () =>
    `<figure class="image is-16by9"><img src="${svgImage(960, 540, 'fullwidth')}" alt="A wide placeholder" /></figure>`,
};

export const Skeleton = {
  parameters: {
    docs: {
      description: {
        story:
          'While an image loads, `is-skeleton` animates the reserved space.',
      },
    },
  },
  render: () =>
    labelled(
      'is-skeleton',
      ...['is-48x48', 'is-96x96', 'is-128x128'].map(
        (size) => `<figure class="image ${size} is-skeleton"></figure>`,
      ),
    ),
};
