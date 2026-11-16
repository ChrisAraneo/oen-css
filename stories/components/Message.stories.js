import { COLORS, stack } from '../_shared/story-helpers.js';

export default {
  title: 'Components/Message',
  parameters: {
    docs: {
      description: {
        component:
          'A coloured callout with an optional header. Use it for inline documentation, warnings and tips.',
      },
    },
  },
};

const message = (color, { header = true } = {}) =>
  `<article class="message ${color ? `is-${color}` : ''}">
  ${
    header
      ? `<div class="message-header">
    <p>${color || 'Default'}</p>
    <button class="delete" aria-label="delete"></button>
  </div>`
      : ''
  }
  <div class="message-body">
    Oen keeps Bulma's class names, so this markup is portable between the two. Only the
    <code>--oen-*</code> custom properties differ.
  </div>
</article>`;

export const Default = { render: () => message('') };

export const Colors = {
  render: () => stack(...COLORS.map((color) => message(color))),
};

export const BodyOnly = {
  parameters: {
    docs: {
      description: {
        story:
          'The header is optional: `.message-body` alone renders a simple callout.',
      },
    },
  },
  render: () =>
    stack(
      message('info', { header: false }),
      message('warning', { header: false }),
    ),
};

export const Sizes = {
  render: () =>
    stack(
      ...['is-small', '', 'is-medium', 'is-large'].map((size) =>
        message('primary').replace('message ', `message ${size} `),
      ),
    ),
};
