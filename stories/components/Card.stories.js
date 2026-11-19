import { svgImage } from '../_shared/story-helpers.js';

export default {
  title: 'Components/Card',
  parameters: {
    docs: {
      description: {
        component:
          'A flexible surface made of optional parts: `.card-header`, `.card-image`, `.card-content` and ' +
          '`.card-footer`. Each part is independent, so you only include what the card needs.',
      },
    },
  },
};

export const Default = {
  render: () =>
    `<div class="card sb-narrow">
  <div class="card-content">
    <p class="title is-4">Oen CSS</p>
    <p class="subtitle is-6">Bulma, re-namespaced</p>
    <div class="content">
      Every custom property is <code>--oen-*</code>, so Oen can live next to another framework
      without either one overwriting the other.
    </div>
  </div>
</div>`,
};

export const WithImage = {
  render: () =>
    `<div class="card sb-narrow">
  <div class="card-image">
    <figure class="image is-4by3"><img src="${svgImage(640, 480, 'card image')}" alt="Placeholder" /></figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48"><img src="${svgImage(48, 48, '')}" alt="Avatar" /></figure>
      </div>
      <div class="media-content">
        <p class="title is-4">Release 0.2.1</p>
        <p class="subtitle is-6">@oen-css</p>
      </div>
    </div>
    <div class="content">
      The first release tracks Bulma 1.0.4 exactly: same selectors, same values, different namespace.
      <br />
      <time datetime="2026-11-16">16 November 2026</time>
    </div>
  </div>
</div>`,
};

export const WithHeaderAndFooter = {
  render: () =>
    `<div class="card sb-narrow">
  <header class="card-header">
    <p class="card-header-title">Deployment</p>
    <button class="card-header-icon" aria-label="more options">
      <span class="icon"><i class="fa-solid fa-angle-down"></i></span>
    </button>
  </header>
  <div class="card-content">
    <div class="content">Pushing to <code>main</code> publishes the gallery and the package.</div>
  </div>
  <footer class="card-footer">
    <a href="#" class="card-footer-item">Save</a>
    <a href="#" class="card-footer-item">Edit</a>
    <a href="#" class="card-footer-item has-text-danger">Delete</a>
  </footer>
</div>`,
};

export const Grid = {
  parameters: {
    docs: {
      description: {
        story:
          'Cards in a `.columns` grid stretch to the tallest one in the row.',
      },
    },
  },
  render: () =>
    `<div class="columns">
  ${['Elements', 'Form', 'Components']
    .map(
      (name, index) => `<div class="column">
    <div class="card">
      <div class="card-image"><figure class="image is-3by2"><img src="${svgImage(
        480,
        320,
        name,
      )}" alt="${name}" /></figure></div>
      <div class="card-content">
        <p class="title is-5">${name}</p>
        <p class="subtitle is-6">${[12, 7, 10][index]} pages</p>
      </div>
      <footer class="card-footer"><a href="#" class="card-footer-item">Browse</a></footer>
    </div>
  </div>`,
    )
    .join('\n  ')}
</div>`,
};
