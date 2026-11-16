import { stack } from '../_shared/story-helpers.js';

export default {
  title: 'Form/Radio',
  parameters: {
    docs: {
      description: {
        component:
          'Radios share a `name` so the browser groups them. Siblings with the `.radio` class get spacing ' +
          'between them automatically.',
      },
    },
  },
};

export const Default = {
  render: () =>
    `<div class="control">
  <label class="radio"><input type="radio" name="answer" checked /> Yes</label>
  <label class="radio"><input type="radio" name="answer" /> No</label>
</div>`,
};

export const Disabled = {
  render: () =>
    `<div class="control">
  <label class="radio"><input type="radio" name="plan" checked /> Free</label>
  <label class="radio"><input type="radio" name="plan" /> Pro</label>
  <label class="radio" disabled><input type="radio" name="plan" disabled /> Enterprise (contact sales)</label>
</div>`,
};

export const InAField = {
  render: () =>
    stack(
      `<div class="field">
  <label class="label">Theme</label>
  <div class="control">
    ${['Light', 'Dark', 'Follow the system']
      .map(
        (label, index) =>
          `<label class="radio"><input type="radio" name="theme"${index === 0 ? ' checked' : ''} /> ${label}</label>`,
      )
      .join('\n    ')}
  </div>
  <p class="help">Oen re-declares every custom property under <code>[data-theme="dark"]</code>.</p>
</div>`,
      `<div class="field">
  <label class="label">Stacked</label>
  ${['Monthly', 'Yearly (two months free)']
    .map(
      (label, index) =>
        `<div class="control"><label class="radio"><input type="radio" name="billing"${
          index === 0 ? ' checked' : ''
        } /> ${label}</label></div>`,
    )
    .join('\n  ')}
</div>`,
    ),
};
