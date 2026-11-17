import { svgImage, toElement } from '../_shared/story-helpers.js';

export default {
  title: 'Components/Modal',
  parameters: {
    docs: {
      description: {
        component:
          'An overlay dialog. Oen provides the styles; opening and closing is `classList.toggle("is-active")` ' +
          'on `.modal`, as the Interactive story shows. The static stories sit in a story-only ' +
          '`.sb-modal-stage` wrapper so the fixed overlay stays inside the canvas.',
      },
    },
  },
};

const card = `<div class="modal-card">
  <header class="modal-card-head">
    <p class="modal-card-title">Publish release 0.2.0?</p>
    <button class="delete" aria-label="close"></button>
  </header>
  <section class="modal-card-body">
    <div class="content">
      <p>This publishes <code>@chris.araneo/oen-css@0.2.0</code> to the public registry.</p>
      <p>The tarball contains <code>dist/oen.css</code>, <code>dist/oen.min.css</code>, both licenses and the third-party notice.</p>
    </div>
  </section>
  <footer class="modal-card-foot">
    <div class="buttons">
      <button class="button is-success">Publish</button>
      <button class="button">Cancel</button>
    </div>
  </footer>
</div>`;

const stage = (content) =>
  `<div class="sb-modal-stage">
  <div class="modal is-active">
    <div class="modal-background"></div>
    ${content}
  </div>
</div>`;

export const ModalCard = {
  parameters: {
    docs: {
      description: {
        story: 'The open state of a modal card, shown statically.',
      },
    },
  },
  render: () => stage(card),
};

export const ContentModal = {
  parameters: {
    docs: {
      description: {
        story:
          'Use `.modal-content` when the header and footer are not needed.',
      },
    },
  },
  render: () =>
    stage(`<div class="modal-content">
      <div class="box">
        <p class="title is-5">Any content</p>
        <p>A <code>.box</code>, a <code>.card</code> or plain markup all work inside <code>.modal-content</code>.</p>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>`),
};

export const ImageModal = {
  render: () =>
    stage(`<div class="modal-content">
      <figure class="image is-4by3"><img src="${svgImage(800, 600, 'modal image')}" alt="Placeholder" /></figure>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>`),
};

export const Interactive = {
  parameters: {
    docs: {
      description: {
        story:
          'A real modal, opened over the whole frame. Close it with the cross, the background or Escape.',
      },
    },
  },
  render: () => {
    const element = toElement(`<div>
  <button class="button is-primary" data-open>Open the modal</button>
  <div class="modal">
    <div class="modal-background" data-close></div>
    ${card}
  </div>
</div>`);

    const modal = element.querySelector('.modal');
    const close = () => modal.classList.remove('is-active');

    element
      .querySelector('[data-open]')
      .addEventListener('click', () => modal.classList.add('is-active'));
    element.querySelector('[data-close]').addEventListener('click', close);
    element.querySelector('.delete').addEventListener('click', close);
    element
      .querySelectorAll('.modal-card-foot .button')
      .forEach((button) => button.addEventListener('click', close));
    element.ownerDocument.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close();
    });

    return element;
  },
};
