import { stack } from '../_shared/story-helpers.js';

export default {
  title: 'Layout/Level',
  parameters: {
    docs: {
      description: {
        component:
          'A horizontal bar whose children are vertically centred: `.level-left` and `.level-right` for the ' +
          'two ends, or bare `.level-item`s for an evenly spaced row. `is-mobile` keeps it horizontal on phones.',
      },
    },
  },
};

export const Default = {
  render: () =>
    `<nav class="level">
  <div class="level-left">
    <div class="level-item">
      <p class="subtitle is-5"><strong>128</strong> components</p>
    </div>
    <div class="level-item">
      <div class="field has-addons">
        <p class="control"><input class="input" type="text" placeholder="Find a component" aria-label="Find a component" /></p>
        <p class="control"><button class="button">Search</button></p>
      </div>
    </div>
  </div>
  <div class="level-right">
    <p class="level-item"><strong>All</strong></p>
    <p class="level-item"><a href="#">Published</a></p>
    <p class="level-item"><a href="#">Drafts</a></p>
    <p class="level-item"><button class="button is-primary">New</button></p>
  </div>
</nav>`,
};

export const Centered = {
  parameters: {
    docs: {
      description: {
        story: 'Bare `.level-item`s share the width equally: a statistics bar.',
      },
    },
  },
  render: () =>
    `<nav class="level">
  ${[
    ['Custom properties', '1 416'],
    ['Components', '32'],
    ['Minified size', '636 kB'],
    ['Dependencies', '0'],
  ]
    .map(
      ([label, value]) => `<div class="level-item has-text-centered">
    <div>
      <p class="is-size-7 is-uppercase has-text-weight-semibold has-text-grey">${label}</p>
      <p class="title">${value}</p>
    </div>
  </div>`,
    )
    .join('\n  ')}
</nav>`,
};

export const Mobile = {
  render: () =>
    stack(
      `<div><p class="sb-label">level is-mobile</p><nav class="level is-mobile">
  <div class="level-left"><div class="level-item">Left</div></div>
  <div class="level-right"><div class="level-item">Right</div></div>
</nav></div>`,
      `<div><p class="sb-label">level (stacks on mobile)</p><nav class="level">
  <div class="level-left"><div class="level-item">Left</div></div>
  <div class="level-right"><div class="level-item">Right</div></div>
</nav></div>`,
    ),
};
