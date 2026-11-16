import {
  COLORS,
  SIZES,
  labelled,
  modifier,
  stack,
} from '../_shared/story-helpers.js';

export default {
  title: 'Form/Textarea',
  parameters: {
    docs: {
      description: {
        component:
          'A multi-line text control. `has-fixed-size` disables the browser resize handle.',
      },
    },
  },
};

export const Default = {
  render: () =>
    '<textarea class="textarea" placeholder="Leave a comment" aria-label="Comment"></textarea>',
};

export const Colors = {
  render: () =>
    stack(
      ...COLORS.map((color) =>
        labelled(
          `is-${color}`,
          `<textarea class="textarea is-${color}" placeholder="is-${color}" aria-label="is-${color}"></textarea>`,
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
          `<textarea class="textarea ${modifier(size)}" placeholder="is-${size}" aria-label="is-${size}"></textarea>`,
        ),
      ),
    ),
};

export const RowsAndResizing = {
  render: () =>
    stack(
      labelled(
        'rows="2"',
        '<textarea class="textarea" rows="2" placeholder="Two rows" aria-label="Two rows"></textarea>',
      ),
      labelled(
        'has-fixed-size',
        '<textarea class="textarea has-fixed-size" placeholder="Not resizable" aria-label="Fixed size"></textarea>',
      ),
    ),
};

export const States = {
  render: () =>
    stack(
      labelled(
        'disabled',
        '<textarea class="textarea" placeholder="Disabled" disabled aria-label="Disabled"></textarea>',
      ),
      labelled(
        'readonly',
        '<textarea class="textarea" readonly aria-label="Read only">Read only content</textarea>',
      ),
      labelled(
        'is-skeleton',
        '<textarea class="textarea is-skeleton" aria-label="Skeleton"></textarea>',
      ),
    ),
};
