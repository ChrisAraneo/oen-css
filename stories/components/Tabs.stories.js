import { labelled, stack, toElement } from '../_shared/story-helpers.js';

export default {
  title: 'Components/Tabs',
  parameters: {
    docs: {
      description: {
        component:
          'A simple responsive tab bar. The `is-active` class marks the selected tab; Oen does not ship the ' +
          'panel-switching behaviour, which is a few lines of JavaScript (see Interactive).',
      },
    },
  },
};

const tabs = (extraClass = '', { icons = false } = {}) =>
  `<div class="tabs ${extraClass}">
  <ul>
    ${[
      ['Pictures', 'image'],
      ['Music', 'music'],
      ['Videos', 'film'],
      ['Documents', 'file-lines'],
    ]
      .map(
        ([label, glyph], index) =>
          `<li${index === 0 ? ' class="is-active"' : ''}><a href="#">${
            icons
              ? `<span class="icon is-small"><i class="fa-solid fa-${glyph}"></i></span>`
              : ''
          }<span>${label}</span></a></li>`,
      )
      .join('\n    ')}
  </ul>
</div>`;

export const Default = { render: () => tabs() };

export const Alignment = {
  render: () =>
    stack(
      labelled('is-centered', tabs('is-centered')),
      labelled('is-right', tabs('is-right')),
    ),
};

export const Styles = {
  render: () =>
    stack(
      labelled('is-boxed', tabs('is-boxed', { icons: true })),
      labelled('is-toggle', tabs('is-toggle')),
      labelled(
        'is-toggle is-toggle-rounded',
        tabs('is-toggle is-toggle-rounded'),
      ),
      labelled('is-fullwidth', tabs('is-fullwidth')),
      labelled(
        'is-centered is-boxed is-fullwidth',
        tabs('is-centered is-boxed is-fullwidth'),
      ),
    ),
};

export const Sizes = {
  render: () =>
    stack(
      ...['is-small', '', 'is-medium', 'is-large'].map((size) =>
        labelled(size || 'normal', tabs(size)),
      ),
    ),
};

export const Interactive = {
  parameters: {
    docs: {
      description: {
        story: 'Clicking a tab moves `is-active` and swaps the panel below it.',
      },
    },
  },
  render: () => {
    const panels = ['Pictures', 'Music', 'Videos', 'Documents'];
    const element = toElement(`<div>
  ${tabs('is-boxed', { icons: true })}
  <div class="content">
    ${panels
      .map(
        (label, index) =>
          `<p data-panel="${index}"${index === 0 ? '' : ' hidden'}>The <strong>${label}</strong> panel.</p>`,
      )
      .join('\n    ')}
  </div>
</div>`);

    const items = [...element.querySelectorAll('.tabs li')];
    items.forEach((item, index) => {
      item.querySelector('a').addEventListener('click', (event) => {
        event.preventDefault();
        items.forEach((other, otherIndex) =>
          other.classList.toggle('is-active', otherIndex === index),
        );
        element.querySelectorAll('[data-panel]').forEach((panel) => {
          panel.hidden = panel.dataset.panel !== String(index);
        });
      });
    });

    return element;
  },
};
