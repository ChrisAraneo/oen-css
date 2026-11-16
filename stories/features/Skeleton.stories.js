import { labelled, stack } from '../_shared/story-helpers.js';

export default {
  title: 'Features/Skeleton',
  parameters: {
    docs: {
      description: {
        component:
          'Loading placeholders come in two forms: the `is-skeleton` modifier, which turns an existing ' +
          'component into its own placeholder, and the standalone `.skeleton-block` / `.skeleton-lines` ' +
          'elements for content that has no component yet.',
      },
    },
  },
};

export const Blocks = {
  render: () =>
    stack(
      labelled('skeleton-block', '<div class="skeleton-block"></div>'),
      `<div>
  <p class="sb-label">skeleton-lines</p>
  <div class="skeleton-lines"><div></div><div></div><div></div><div></div></div>
</div>`,
    ),
};

export const ComponentModifier = {
  render: () =>
    stack(
      labelled(
        'Buttons and tags',
        '<button class="button is-skeleton">Button</button>',
        '<button class="button is-primary is-skeleton">Primary</button>',
        '<span class="tag is-skeleton">Tag</span>',
      ),
      labelled(
        'Form controls',
        '<input class="input is-skeleton" type="text" aria-label="Skeleton input" />',
        '<div class="select is-skeleton"><select aria-label="Skeleton select"><option>Loading</option></select></div>',
      ),
      labelled(
        'Titles',
        '<p class="title is-3 is-skeleton">A loading title</p>',
      ),
      labelled(
        'Images',
        '<figure class="image is-96x96 is-skeleton"></figure>',
      ),
      labelled(
        'Icons',
        '<span class="icon is-skeleton"><i class="fa-solid fa-star"></i></span>',
      ),
    ),
};

export const LoadingCard = {
  parameters: {
    docs: {
      description: {
        story:
          'A realistic placeholder: the final layout, with every part skeletonised.',
      },
    },
  },
  render: () =>
    `<div class="columns">
  <div class="column is-half">
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left"><figure class="image is-48x48 is-skeleton"></figure></div>
          <div class="media-content">
            <p class="title is-5 is-skeleton">Loading name</p>
            <p class="subtitle is-6 is-skeleton">@loading</p>
          </div>
        </div>
        <div class="skeleton-lines"><div></div><div></div><div></div></div>
      </div>
      <footer class="card-footer">
        <span class="card-footer-item"><span class="button is-skeleton is-small">Action</span></span>
        <span class="card-footer-item"><span class="button is-skeleton is-small">Action</span></span>
      </footer>
    </div>
  </div>
  <div class="column is-half">
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left"><figure class="image is-48x48"><span class="skeleton-block" style="height: 100%"></span></figure></div>
          <div class="media-content">
            <p class="title is-5">Ada Lovelace</p>
            <p class="subtitle is-6">@ada</p>
          </div>
        </div>
        <div class="content">The loaded version of the same card, for comparison.</div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" href="#">Follow</a>
        <a class="card-footer-item" href="#">Message</a>
      </footer>
    </div>
  </div>
</div>`,
};
