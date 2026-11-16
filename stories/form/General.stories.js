import { stack } from '../_shared/story-helpers.js';

export default {
  title: 'Form/General',
  parameters: {
    docs: {
      description: {
        component:
          'Every form control sits in a `.control`, which sits in a `.field` together with its `.label` and ' +
          '`.help`. That is the whole layout system: grouping, addons and horizontal forms are modifiers on those two.',
      },
    },
  },
};

export const Field = {
  render: () =>
    `<div class="field">
  <label class="label" for="general-name">Name</label>
  <div class="control">
    <input class="input" id="general-name" type="text" placeholder="Ada Lovelace" />
  </div>
  <p class="help">We only use this to address you.</p>
</div>
<div class="field">
  <label class="label" for="general-email">Email</label>
  <div class="control has-icons-left has-icons-right">
    <input class="input is-danger" id="general-email" type="email" value="ada@example" />
    <span class="icon is-small is-left"><i class="fa-solid fa-envelope"></i></span>
    <span class="icon is-small is-right"><i class="fa-solid fa-triangle-exclamation"></i></span>
  </div>
  <p class="help is-danger">This email address is invalid.</p>
</div>`,
};

export const Grouped = {
  parameters: {
    docs: {
      description: {
        story:
          '`is-grouped` puts controls side by side; `is-expanded` makes one fill the space.',
      },
    },
  },
  render: () =>
    stack(
      `<div class="field is-grouped">
  <div class="control is-expanded"><input class="input" type="text" placeholder="Find a repository" /></div>
  <div class="control"><button class="button is-primary">Search</button></div>
</div>`,
      `<div class="field is-grouped is-grouped-right">
  <div class="control"><button class="button is-light">Cancel</button></div>
  <div class="control"><button class="button is-link">Submit</button></div>
</div>`,
      `<div class="field is-grouped is-grouped-multiline">
  ${['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven']
    .map(
      (label) =>
        `<div class="control"><button class="button">${label}</button></div>`,
    )
    .join('\n  ')}
</div>`,
    ),
};

export const Addons = {
  parameters: {
    docs: {
      description: { story: '`has-addons` joins controls into a single unit.' },
    },
  },
  render: () =>
    stack(
      `<div class="field has-addons">
  <div class="control">
    <span class="select"><select aria-label="Protocol"><option>https://</option><option>http://</option></select></span>
  </div>
  <div class="control is-expanded"><input class="input" type="text" placeholder="oen-css.dev" /></div>
  <div class="control"><button class="button is-primary">Save</button></div>
</div>`,
      `<div class="field has-addons">
  <div class="control is-expanded"><input class="input" type="text" placeholder="Amount" /></div>
  <div class="control"><span class="button is-static">EUR</span></div>
</div>`,
      `<div class="field has-addons has-addons-centered">
  <div class="control"><input class="input" type="text" placeholder="Centered addons" /></div>
  <div class="control"><button class="button is-info">Go</button></div>
</div>`,
    ),
};

export const Horizontal = {
  parameters: {
    docs: {
      description: {
        story:
          '`is-horizontal` moves the label beside the control from tablet up.',
      },
    },
  },
  render: () =>
    `<div class="field is-horizontal">
  <div class="field-label is-normal"><label class="label" for="horizontal-from">From</label></div>
  <div class="field-body">
    <div class="field">
      <div class="control"><input class="input" id="horizontal-from" type="text" placeholder="Name" /></div>
    </div>
    <div class="field">
      <div class="control has-icons-left">
        <input class="input" type="email" placeholder="Email" aria-label="Email" />
        <span class="icon is-small is-left"><i class="fa-solid fa-envelope"></i></span>
      </div>
    </div>
  </div>
</div>
<div class="field is-horizontal">
  <div class="field-label"><label class="label">Department</label></div>
  <div class="field-body">
    <div class="field is-narrow">
      <div class="control">
        <div class="select is-fullwidth">
          <select aria-label="Department"><option>Engineering</option><option>Design</option><option>Support</option></select>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="field is-horizontal">
  <div class="field-label"></div>
  <div class="field-body">
    <div class="field">
      <div class="control"><button class="button is-primary">Send message</button></div>
    </div>
  </div>
</div>`,
};

export const Sizes = {
  render: () =>
    stack(
      ...['small', 'normal', 'medium', 'large'].map(
        (size) => `<div class="field">
  <label class="label ${size === 'normal' ? '' : `is-${size}`}">Label ${size}</label>
  <div class="control"><input class="input ${size === 'normal' ? '' : `is-${size}`}" type="text" placeholder="is-${size}" /></div>
</div>`,
      ),
    ),
};
