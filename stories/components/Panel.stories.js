export default {
  title: 'Components/Panel',
  parameters: {
    docs: {
      description: {
        component:
          'A composable side panel: a `.panel-heading`, optional `.panel-tabs`, and `.panel-block`s that can ' +
          'hold anything: inputs, checkboxes, buttons or links.',
      },
    },
  },
};

export const Default = {
  render: () =>
    `<nav class="panel sb-narrow">
  <p class="panel-heading">Repositories</p>
  <div class="panel-block">
    <p class="control has-icons-left">
      <input class="input" type="text" placeholder="Search" aria-label="Search repositories" />
      <span class="icon is-left"><i class="fa-solid fa-magnifying-glass"></i></span>
    </p>
  </div>
  <p class="panel-tabs">
    <a class="is-active" href="#">All</a>
    <a href="#">Public</a>
    <a href="#">Private</a>
    <a href="#">Sources</a>
  </p>
  ${[
    ['oen-css', 'book'],
    ['bulma', 'book'],
    ['storybook', 'code-branch'],
    ['sass', 'code-branch'],
  ]
    .map(
      ([name, glyph], index) =>
        `<a class="panel-block${index === 0 ? ' is-active' : ''}" href="#">
    <span class="panel-icon"><i class="fa-solid fa-${glyph}"></i></span>
    ${name}
  </a>`,
    )
    .join('\n  ')}
  <label class="panel-block">
    <input type="checkbox" />
    Remember these filters
  </label>
  <div class="panel-block">
    <button class="button is-link is-outlined is-fullwidth">Reset all filters</button>
  </div>
</nav>`,
};

export const Colors = {
  render: () =>
    `<div class="columns">
  ${['primary', 'info', 'success']
    .map(
      (color) => `<div class="column">
    <nav class="panel is-${color}">
      <p class="panel-heading">is-${color}</p>
      <a class="panel-block is-active" href="#"><span class="panel-icon"><i class="fa-solid fa-circle-check"></i></span>Active item</a>
      <a class="panel-block" href="#"><span class="panel-icon"><i class="fa-solid fa-circle"></i></span>Another item</a>
    </nav>
  </div>`,
    )
    .join('\n  ')}
</div>`,
};
