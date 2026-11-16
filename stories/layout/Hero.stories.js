import { COLORS, stack } from '../_shared/story-helpers.js';

export default {
  title: 'Layout/Hero',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A full-width banner. Sizes run from the default through `is-medium`, `is-large`, `is-halfheight` to ' +
          '`is-fullheight`; `.hero-head`, `.hero-body` and `.hero-foot` split it into three rows.',
      },
    },
  },
};

const hero = (
  extraClass = '',
  { title = 'Oen CSS', subtitle = 'Bulma, re-namespaced' } = {},
) =>
  `<section class="hero ${extraClass}">
  <div class="hero-body">
    <div class="container">
      <p class="title">${title}</p>
      <p class="subtitle">${subtitle}</p>
    </div>
  </div>
</section>`;

export const Default = { render: () => hero() };

export const Colors = {
  render: () =>
    stack(
      ...COLORS.map((color) =>
        hero(`is-${color}`, {
          title: `is-${color}`,
          subtitle: 'A coloured hero',
        }),
      ),
    ),
};

export const Sizes = {
  render: () =>
    stack(
      ...['is-small', '', 'is-medium', 'is-large'].map((size) =>
        hero(`is-link ${size}`, {
          title: size || 'normal',
          subtitle: 'hero size',
        }),
      ),
    ),
};

export const ThreeParts = {
  render: () =>
    `<section class="hero is-primary is-medium">
  <div class="hero-head">
    <nav class="navbar is-transparent" role="navigation" aria-label="hero navigation">
      <div class="navbar-brand"><a class="navbar-item has-text-weight-bold" href="#">Oen</a></div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <a class="navbar-item" href="#">Docs</a>
          <a class="navbar-item" href="#">Gallery</a>
        </div>
      </div>
    </nav>
  </div>
  <div class="hero-body">
    <div class="container has-text-centered">
      <p class="title">Three-part hero</p>
      <p class="subtitle">head, body and foot</p>
    </div>
  </div>
  <div class="hero-foot">
    <nav class="tabs is-boxed is-fullwidth">
      <div class="container">
        <ul>
          <li class="is-active"><a href="#">Overview</a></li>
          <li><a href="#">Elements</a></li>
          <li><a href="#">Components</a></li>
        </ul>
      </div>
    </nav>
  </div>
</section>`,
};

export const Gradient = {
  parameters: {
    docs: {
      description: {
        story:
          '`has-background-*` helpers and `is-bold` give the hero a gradient.',
      },
    },
  },
  render: () =>
    stack(
      hero('is-info is-bold', {
        title: 'is-info is-bold',
        subtitle: 'A gradient hero',
      }),
    ),
};
