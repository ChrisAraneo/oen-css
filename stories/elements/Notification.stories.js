import {
  COLORS,
  boolArg,
  classes,
  modifier,
  selectArg,
  stack,
} from '../_shared/story-helpers.js';

export default {
  title: 'Elements/Notification',
  parameters: {
    docs: {
      description: {
        component:
          'A dismissible block of coloured feedback. Pair it with `.delete` for the close button.',
      },
    },
  },
  argTypes: {
    text: { control: 'text' },
    color: selectArg(COLORS, 'Colour modifier'),
    light: boolArg('`is-light`: tinted variant'),
    dismissible: boolArg('Render the `.delete` button'),
  },
  args: {
    text: 'Your changes have been saved.',
    color: 'primary',
    light: false,
    dismissible: true,
  },
  render: ({ text, color, light, dismissible }) =>
    `<div class="${classes('notification', modifier(color), light && 'is-light')}">${
      dismissible ? '<button class="delete" aria-label="close"></button>' : ''
    }${text}</div>`,
};

export const Playground = {};

export const Colors = {
  render: () =>
    stack(
      '<div class="notification">The default notification, with no colour modifier.</div>',
      ...COLORS.map(
        (color) =>
          `<div class="notification is-${color}"><button class="delete" aria-label="close"></button><strong>is-${color}</strong>: a sentence of feedback for the reader.</div>`,
      ),
    ),
};

export const Light = {
  render: () =>
    stack(
      ...COLORS.map(
        (color) =>
          `<div class="notification is-${color} is-light"><button class="delete" aria-label="close"></button><strong>is-${color} is-light</strong>: a quieter variant for dense pages.</div>`,
      ),
    ),
};

export const WithContent = {
  render: () =>
    `<div class="notification is-warning">
  <button class="delete" aria-label="close"></button>
  <div class="content">
    <h4 class="title is-5">Storage almost full</h4>
    <p>You are using 92% of your quota. Remove old exports or upgrade your plan to keep publishing.</p>
    <div class="buttons">
      <button class="button is-warning is-inverted">Manage storage</button>
      <button class="button is-warning is-light">Remind me later</button>
    </div>
  </div>
</div>`,
};
