import { labelled, stack } from '../_shared/story-helpers.js';

export default {
  title: 'Elements/Delete',
  parameters: {
    docs: {
      description: {
        component:
          'A standalone cross button used by tags, notifications, messages and modals. It is a `<button>`, ' +
          'so remember to give it an accessible name.',
      },
    },
  },
};

export const Sizes = {
  render: () =>
    stack(
      labelled(
        'Sizes',
        ...['is-small', '', 'is-medium', 'is-large'].map(
          (size) =>
            `<button class="delete ${size}" aria-label="close"></button>`,
        ),
      ),
      labelled(
        'In context',
        '<span class="tag is-primary">Tag<button class="delete is-small" aria-label="remove"></button></span>',
        '<div class="notification is-info py-3">Notification<button class="delete" aria-label="close"></button></div>',
      ),
    ),
};
