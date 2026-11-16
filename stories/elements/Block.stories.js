import { placeholder, stack } from '../_shared/story-helpers.js';

export default {
  title: 'Elements/Block',
  parameters: {
    docs: {
      description: {
        component:
          'A `.block` adds `--oen-block-spacing` below itself, except for the last one. ' +
          'It is the spacing primitive the other elements are built on.',
      },
    },
  },
};

export const Default = {
  render: () =>
    `<div class="box">
  <div class="block">This text is in a block. Blocks are separated by a consistent margin...</div>
  <div class="block">...so stacking them never needs custom spacing utilities.</div>
  <div class="block">The final block has no bottom margin, so the parent keeps its own padding.</div>
</div>`,
};

export const WithoutBlocks = {
  parameters: {
    docs: {
      description: {
        story: 'The same markup without `.block`, for comparison.',
      },
    },
  },
  render: () =>
    stack(
      `<div class="box">
  <div>No block spacing here.</div>
  <div>The lines sit directly on top of each other.</div>
</div>`,
      placeholder('margin-bottom: var(--oen-block-spacing)'),
    ),
};
