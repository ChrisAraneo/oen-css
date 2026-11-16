import { COLORS, stack, toElement } from '../_shared/story-helpers.js';

export default {
  title: 'Components/Navbar',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The top-level navigation bar: `.navbar-brand`, `.navbar-menu` with `.navbar-start` / `.navbar-end`, ' +
          'and `.navbar-item`s that can become dropdowns. On touch widths the menu collapses behind the burger.',
      },
    },
  },
};

const brand = (burger = true) =>
  `<div class="navbar-brand">
  <a class="navbar-item has-text-weight-bold" href="#">Oen</a>
  ${
    burger
      ? `<a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-burger>
    <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
  </a>`
      : ''
  }
</div>`;

const menu = `<div class="navbar-menu" data-menu>
  <div class="navbar-start">
    <a class="navbar-item" href="#">Home</a>
    <a class="navbar-item" href="#">Documentation</a>
    <div class="navbar-item has-dropdown is-hoverable">
      <a class="navbar-link" href="#">More</a>
      <div class="navbar-dropdown">
        <a class="navbar-item" href="#">About</a>
        <a class="navbar-item" href="#">Changelog</a>
        <a class="navbar-item" href="#">Contact</a>
        <hr class="navbar-divider" />
        <a class="navbar-item" href="#">Report an issue</a>
      </div>
    </div>
  </div>
  <div class="navbar-end">
    <div class="navbar-item">
      <div class="buttons">
        <a class="button is-primary" href="#"><strong>Sign up</strong></a>
        <a class="button is-light" href="#">Log in</a>
      </div>
    </div>
  </div>
</div>`;

const navbar = (extraClass = '', { burger = true } = {}) =>
  `<nav class="navbar ${extraClass}" role="navigation" aria-label="main navigation">${brand(burger)}${menu}</nav>`;

export const Default = { render: () => navbar() };

export const Colors = {
  render: () => stack(...COLORS.map((color) => navbar(`is-${color}`))),
};

export const Transparent = {
  parameters: {
    docs: {
      description: {
        story:
          '`is-transparent` removes the hover background, for navbars sitting on top of a hero.',
      },
    },
  },
  render: () =>
    `<section class="hero is-primary is-medium">
  <div class="hero-head">${navbar('is-transparent')}</div>
  <div class="hero-body">
    <div class="container">
      <p class="title">Hero with a navbar</p>
      <p class="subtitle">The navbar lives in <code>.hero-head</code>.</p>
    </div>
  </div>
</section>`,
};

export const Fixed = {
  parameters: {
    docs: {
      description: {
        story:
          'In a real document, `is-fixed-top` pins the navbar to the viewport and `<html>` needs ' +
          '`has-navbar-fixed-top` so the content is padded. Here a story-only `.sb-fixed-stage` wrapper ' +
          'pins it to the example instead.',
      },
    },
  },
  render: () =>
    `<div class="sb-fixed-stage">
  ${navbar('is-fixed-top', { burger: false })}
  <div class="section">
    <p class="content">Content sitting under a fixed navbar.</p>
  </div>
  ${navbar('is-fixed-bottom', { burger: false })}
</div>`,
};

export const Interactive = {
  parameters: {
    docs: {
      description: {
        story:
          'Narrow the viewport until the burger appears, then click it: the burger toggles `is-active` on both elements.',
      },
    },
  },
  render: () => {
    const element = toElement(navbar());
    const burger = element.querySelector('[data-burger]');
    const target = element.querySelector('[data-menu]');

    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('is-active');
      target.classList.toggle('is-active', open);
      burger.setAttribute('aria-expanded', String(open));
    });

    return element;
  },
};
