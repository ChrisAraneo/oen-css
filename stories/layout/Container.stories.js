import { stack } from '../_shared/story-helpers.js';

export default {
  title: 'Layout/Container',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A `.container` centres content and caps its width at each breakpoint. The `is-max-*` modifiers ' +
          'cap it earlier; `is-fluid` only adds the gutter.',
      },
    },
  },
};

const demo = (extraClass = '') =>
  `<div class="container ${extraClass}">
  <div class="notification is-primary is-light">
    <code>container ${extraClass}</code>
  </div>
</div>`;

export const Default = { render: () => demo() };

export const Fluid = {
  parameters: {
    docs: {
      description: {
        story:
          '`is-fluid` keeps the container full width with a gutter on both sides.',
      },
    },
  },
  render: () => demo('is-fluid'),
};

export const MaxWidths = {
  render: () =>
    stack(
      demo('is-max-tablet'),
      demo('is-max-desktop'),
      demo('is-max-widescreen'),
      demo('is-widescreen'),
      demo('is-fullhd'),
    ),
};
