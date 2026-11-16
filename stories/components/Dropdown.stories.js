import { stack, toElement } from '../_shared/story-helpers.js';

export default {
  title: 'Components/Dropdown',
  parameters: {
    docs: {
      description: {
        component:
          'A toggleable menu. Oen ships only the styles: adding and removing `is-active` on `.dropdown` is ' +
          'your job, and takes about five lines of JavaScript (see the Interactive story).',
      },
    },
  },
};

const menu = (id) =>
  `<div class="dropdown-menu" id="${id}" role="menu">
  <div class="dropdown-content">
    <a href="#" class="dropdown-item">Overview</a>
    <a href="#" class="dropdown-item is-active">Custom properties</a>
    <a href="#" class="dropdown-item">Dark mode</a>
    <hr class="dropdown-divider" />
    <div class="dropdown-item"><p>Any markup is allowed inside a <code>.dropdown-item</code>.</p></div>
    <hr class="dropdown-divider" />
    <a href="#" class="dropdown-item">Changelog</a>
  </div>
</div>`;

const trigger = (label, menuId) =>
  `<div class="dropdown-trigger">
  <button class="button" aria-haspopup="true" aria-controls="${menuId}">
    <span>${label}</span>
    <span class="icon is-small"><i class="fa-solid fa-angle-down"></i></span>
  </button>
</div>`;

export const Active = {
  parameters: {
    docs: {
      description: {
        story: 'The open state, shown statically with `is-active`.',
      },
    },
  },
  render: () =>
    `<div class="dropdown is-active">${trigger('Docs', 'dropdown-static')}${menu('dropdown-static')}</div>`,
};

export const Interactive = {
  render: () => {
    const element = toElement(
      `<div class="dropdown">${trigger('Click me', 'dropdown-live')}${menu('dropdown-live')}</div>`,
    );
    const button = element.querySelector('button');

    button.addEventListener('click', (event) => {
      event.stopPropagation();
      element.classList.toggle('is-active');
    });
    document.addEventListener('click', () =>
      element.classList.remove('is-active'),
    );

    return element;
  },
};

export const Hoverable = {
  parameters: {
    docs: {
      description: {
        story:
          '`is-hoverable` opens on hover and focus, with no JavaScript at all.',
      },
    },
  },
  render: () =>
    `<div class="dropdown is-hoverable">${trigger('Hover me', 'dropdown-hover')}${menu('dropdown-hover')}</div>`,
};

export const Placement = {
  render: () =>
    stack(
      `<div class="dropdown is-active is-right">${trigger('is-right', 'dropdown-right')}${menu('dropdown-right')}</div>`,
      `<div class="mt-6"><div class="dropdown is-active is-up">${trigger('is-up', 'dropdown-up')}${menu('dropdown-up')}</div></div>`,
    ),
};
