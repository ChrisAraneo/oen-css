import { stack } from '../_shared/story-helpers.js';

export default {
  title: 'Form/Checkbox',
  parameters: {
    docs: {
      description: {
        component:
          'The `.checkbox` class goes on the `<label>` that wraps the input, which gives the whole label the ' +
          'pointer cursor and the disabled styling.',
      },
    },
  },
};

export const Default = {
  render: () =>
    '<label class="checkbox"><input type="checkbox" /> Remember me</label>',
};

export const WithLink = {
  render: () =>
    '<label class="checkbox"><input type="checkbox" checked /> I agree to the <a href="#">terms and conditions</a></label>',
};

export const Disabled = {
  render: () =>
    '<label class="checkbox" disabled><input type="checkbox" disabled /> Not available on this plan</label>',
};

export const List = {
  render: () =>
    stack(
      `<div class="field">
  <label class="label">Notify me about</label>
  <div class="control">
    ${['Releases', 'Security advisories', 'Discussions']
      .map(
        (label, index) =>
          `<label class="checkbox mr-4"><input type="checkbox"${index === 0 ? ' checked' : ''} /> ${label}</label>`,
      )
      .join('\n    ')}
  </div>
</div>`,
      `<div class="field">
  <label class="label">Stacked</label>
  ${['Email', 'Push notification', 'Weekly digest']
    .map(
      (label) =>
        `<div class="control"><label class="checkbox"><input type="checkbox" /> ${label}</label></div>`,
    )
    .join('\n  ')}
</div>`,
    ),
};
