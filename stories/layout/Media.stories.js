import { svgImage } from '../_shared/story-helpers.js';

export default {
  title: 'Layout/Media object',
  parameters: {
    docs: {
      description: {
        component:
          'The media object: a fixed-width figure beside flexible content. Nest `.media` inside `.media-content` ' +
          'to build threaded replies.',
      },
    },
  },
};

const avatar = (size, seed) =>
  `<figure class="image is-${size}x${size}"><img src="${svgImage(size, size, '')}" alt="Avatar of ${seed}" /></figure>`;

export const Default = {
  render: () =>
    `<article class="media">
  <figure class="media-left">${avatar(64, 'Ada')}</figure>
  <div class="media-content">
    <div class="content">
      <p><strong>Ada</strong> <small>@ada</small> <small>31m</small><br />
      The media object is the smallest useful layout in the framework: an image, some text, and actions.</p>
    </div>
    <nav class="level is-mobile">
      <div class="level-left">
        <a class="level-item" aria-label="reply"><span class="icon is-small"><i class="fa-solid fa-reply"></i></span></a>
        <a class="level-item" aria-label="retweet"><span class="icon is-small"><i class="fa-solid fa-retweet"></i></span></a>
        <a class="level-item" aria-label="like"><span class="icon is-small"><i class="fa-solid fa-heart"></i></span></a>
      </div>
    </nav>
  </div>
  <div class="media-right"><button class="delete" aria-label="dismiss"></button></div>
</article>`,
};

export const WithForm = {
  render: () =>
    `<article class="media">
  <figure class="media-left">${avatar(64, 'you')}</figure>
  <div class="media-content">
    <div class="field">
      <p class="control"><textarea class="textarea" placeholder="Add a comment" aria-label="Add a comment"></textarea></p>
    </div>
    <nav class="level">
      <div class="level-left"><div class="level-item"><button class="button is-info">Submit</button></div></div>
      <div class="level-right">
        <div class="level-item"><label class="checkbox"><input type="checkbox" /> Notify me</label></div>
      </div>
    </nav>
  </div>
</article>`,
};

export const Nested = {
  render: () =>
    `<article class="media">
  <figure class="media-left">${avatar(64, 'Ada')}</figure>
  <div class="media-content">
    <div class="content"><p><strong>Ada</strong><br />Does the dark theme need any JavaScript?</p></div>
    <article class="media">
      <figure class="media-left">${avatar(48, 'Grace')}</figure>
      <div class="media-content">
        <div class="content"><p><strong>Grace</strong><br />No, <code>[data-theme="dark"]</code> re-declares the custom properties.</p></div>
        <article class="media">
          <figure class="media-left">${avatar(32, 'Ada')}</figure>
          <div class="media-content"><div class="content"><p><strong>Ada</strong><br />Perfect.</p></div></div>
        </article>
      </div>
    </article>
  </div>
</article>`,
};
