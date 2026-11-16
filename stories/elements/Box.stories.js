import { COLORS, row, stack, svgImage } from '../_shared/story-helpers.js';

export default {
  title: 'Elements/Box',
  parameters: {
    docs: {
      description: {
        component:
          'A white container with a subtle shadow and rounded corners, the default surface for grouped content.',
      },
    },
  },
};

export const Default = {
  render: () => '<div class="box">A plain box, ready for any content.</div>',
};

export const WithContent = {
  render: () =>
    `<div class="box">
  <article class="media">
    <div class="media-left">
      <figure class="image is-64x64">
        <img src="${svgImage(64, 64, 'avatar')}" alt="Avatar" />
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <p><strong>Oen CSS</strong> <small>@oen-css</small> <small>31m</small><br />A box pairs naturally with the media object for comment and feed layouts.</p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item" aria-label="reply"><span class="icon is-small"><i class="fa-solid fa-reply"></i></span></a>
          <a class="level-item" aria-label="retweet"><span class="icon is-small"><i class="fa-solid fa-retweet"></i></span></a>
          <a class="level-item" aria-label="like"><span class="icon is-small"><i class="fa-solid fa-heart"></i></span></a>
        </div>
      </nav>
    </div>
  </article>
</div>`,
};

export const AsLink = {
  parameters: {
    docs: {
      description: {
        story:
          'Using an `<a class="box">` lifts the shadow on hover and focus.',
      },
    },
  },
  render: () =>
    '<a class="box" href="#">A clickable box. Hover or focus it to see the shadow react.</a>',
};

export const Colored = {
  parameters: {
    docs: {
      description: {
        story:
          'A box takes its surface from `--oen-box-background-color`; combine it with text helpers for emphasis.',
      },
    },
  },
  render: () =>
    stack(
      row(
        ...COLORS.slice(0, 3).map(
          (color) =>
            `<div class="box"><span class="has-text-${color} has-text-weight-semibold">has-text-${color}</span></div>`,
        ),
      ),
      '<div class="box has-background-primary-light">A box with the <code>has-background-primary-light</code> helper.</div>',
    ),
};
