import { COLORS, row, stack, toElement } from './_shared/story-helpers.js';

export default {
  title: 'Theme/Overview',
  parameters: {
    docs: {
      description: {
        component:
          'Oen is Bulma re-namespaced and re-themed: every custom property the stylesheet declares is ' +
          '`--oen-*` rather than `--bulma-*`, which lets it sit next to Bulma (or any other framework) ' +
          'without either one overwriting the other. The six colours below, the sans-serif stack and the ' +
          'type scale are Oen, every other value is Bulma 1.0.4. ' +
          'Everything on this page is driven by those properties; there is no JavaScript in the library, ' +
          'and no build step for consumers.',
      },
    },
  },
};

const KEY_PROPERTIES = [
  ['--oen-scheme-main', 'Page background'],
  ['--oen-scheme-main-bis', 'Alternate surface'],
  ['--oen-text', 'Body text'],
  ['--oen-text-strong', 'Emphasised text'],
  ['--oen-text-weak', 'Muted text'],
  ['--oen-link', 'Link colour'],
  ['--oen-border', 'Borders'],
  ['--oen-border-weak', 'Subtle borders'],
  ['--oen-primary', 'Primary colour'],
  ['--oen-family-primary', 'Body font stack'],
  ['--oen-family-code', 'Code font stack'],
  ['--oen-size-normal', 'Default text size'],
  ['--oen-control-size', 'Control text size'],
  ['--oen-radius', 'Default corner radius'],
  ['--oen-radius-large', 'Large corner radius'],
  ['--oen-block-spacing', 'Vertical rhythm'],
  ['--oen-duration', 'Transition duration'],
];

export const Palette = {
  render: () =>
    stack(
      ...COLORS.map(
        (color) => `<div>
  <p class="sb-label">${color}</p>
  <div class="sb-grid">
    ${['', '-light', '-dark']
      .map(
        (variant) =>
          `<div class="sb-swatch has-background-${color}${variant}"><code class="has-text-${color}${variant}-invert">--oen-${color}${variant}</code></div>`,
      )
      .join('\n    ')}
  </div>
</div>`,
      ),
    ),
};

const TYPE_SCALE = [
  ['--oen-size-1', 1, 'Display heading'],
  ['--oen-size-2', 2, 'Level 1 heading'],
  ['--oen-size-3', 3, 'Level 2 heading, and .title'],
  ['--oen-size-4', 4, 'Level 3 heading, and .is-large controls'],
  ['--oen-size-5', 5, 'Level 4 heading, .subtitle, .is-medium controls'],
  ['--oen-size-6', 6, 'Body text and every default control'],
  ['--oen-size-7', 7, 'Meta text, small print, .is-small controls'],
];

export const TypeScale = {
  parameters: {
    docs: {
      description: {
        story:
          'The general size is 14px: `--oen-size-6` feeds Bulma’s `--oen-size-normal`, which ' +
          '`--oen-control-size` reads, so buttons, inputs, selects and file controls are 14px, and ' +
          '`--oen-body-font-size` sets the same size on `body`. The seven steps run 12px to 28px. ' +
          'The root stays at 16px, so `rem`-based spacing and radii are untouched. The pixel ' +
          'column is measured from the rendered sample, not read from the source.',
      },
    },
  },
  render: () => {
    const element = toElement(`<div class="table-container">
  <table class="table is-fullwidth is-striped">
    <thead><tr><th>Property</th><th>Helper</th><th>Value</th><th>Rendered</th><th>Role</th></tr></thead>
    <tbody>
      ${TYPE_SCALE.map(
        ([property, step, role]) =>
          `<tr>
        <td><code>${property}</code></td>
        <td><code>.is-size-${step}</code></td>
        <td><code data-value="${property}">…</code></td>
        <td><span class="is-size-${step}" data-sample="${property}">Aa</span></td>
        <td>${role}</td>
      </tr>`,
      ).join('\n      ')}
    </tbody>
  </table>
</div>`);

    // Same contract as the table above: the declared value comes from the
    // document, and the pixel size is measured off the rendered sample, so a
    // change to the scale shows up here without anyone editing this story.
    requestAnimationFrame(() => {
      const styles = getComputedStyle(document.documentElement);
      for (const [property] of TYPE_SCALE) {
        const sample = element.querySelector(`[data-sample="${property}"]`);
        const pixels = getComputedStyle(sample).fontSize;
        element.querySelector(`[data-value="${property}"]`).textContent =
          `${styles.getPropertyValue(property).trim()} (${pixels})`;
      }
    });

    return element;
  },
};

export const CustomProperties = {
  parameters: {
    docs: {
      description: {
        story:
          'The values below are read live from the document with `getComputedStyle`, so switching the theme ' +
          'in the toolbar changes them in place. This is the whole theming contract.',
      },
    },
  },
  render: () => {
    const element = toElement(`<div class="table-container">
  <table class="table is-fullwidth is-striped">
    <thead><tr><th>Custom property</th><th>Role</th><th>Computed value</th><th>Sample</th></tr></thead>
    <tbody>
      ${KEY_PROPERTIES.map(
        ([property, role]) =>
          `<tr>
        <td><code>${property}</code></td>
        <td>${role}</td>
        <td><code data-value="${property}">…</code></td>
        <td><span class="sb-swatch sb-sample" data-sample="${property}"></span></td>
      </tr>`,
      ).join('\n      ')}
    </tbody>
  </table>
</div>`);

    // Reading the values back is what makes this table honest: it shows what the
    // browser resolved, not what the source says.
    requestAnimationFrame(() => {
      const styles = getComputedStyle(document.documentElement);
      for (const [property] of KEY_PROPERTIES) {
        const value = styles.getPropertyValue(property).trim();
        element.querySelector(`[data-value="${property}"]`).textContent =
          value || '(not set)';
        const sample = element.querySelector(`[data-sample="${property}"]`);
        sample.style.background = /^(hsl|rgb|#)/.test(value)
          ? value
          : 'transparent';
      }
    });

    return element;
  },
};

export const DarkAndLight = {
  parameters: {
    docs: {
      description: {
        story:
          'The theme is a scope, not a global switch: `[data-theme="dark"]` (or `.theme-dark`) re-declares the ' +
          'properties on any element, so a dark island inside a light page costs one attribute.',
      },
    },
  },
  render: () =>
    `<div class="columns">
  ${['light', 'dark']
    .map(
      (theme) => `<div class="column">
    <div data-theme="${theme}" class="p-4" style="background-color: var(--oen-scheme-main)">
      <p class="sb-label">data-theme="${theme}"</p>
      <p class="title is-5">Title</p>
      <p class="subtitle is-6">Subtitle</p>
      <div class="box">A box on the ${theme} scheme.</div>
      <div class="buttons">
        <button class="button is-primary">Primary</button>
        <button class="button">Default</button>
        <button class="button is-link is-light">Link light</button>
      </div>
      <div class="notification is-info is-light mb-0">A notification.</div>
    </div>
  </div>`,
    )
    .join('\n  ')}
</div>`,
};

export const ScopedOverride = {
  parameters: {
    docs: {
      description: {
        story:
          'Because the components read their colours through the properties, overriding a property on any ' +
          'ancestor re-themes everything inside it: no recompile, no extra classes.',
      },
    },
  },
  render: () =>
    stack(
      row(
        '<button class="button is-primary">Default primary</button>',
        '<span class="tag is-primary">Default</span>',
        '<progress class="progress is-primary" value="60" max="100">60%</progress>',
      ),
      `<div class="box" style="--oen-primary-h: 288deg; --oen-primary-s: 72%; --oen-primary-l: 56%">
  <p class="sb-label">--oen-primary-h: 288deg</p>
  <div class="buttons">
    <button class="button is-primary">Re-themed primary</button>
    <button class="button is-primary is-light">Light</button>
    <button class="button is-primary is-outlined">Outlined</button>
  </div>
  <span class="tag is-primary">Re-themed</span>
  <progress class="progress is-primary mt-3" value="60" max="100">60%</progress>
</div>`,
      `<div class="box" style="--oen-radius: 0; --oen-radius-large: 0">
  <p class="sb-label">--oen-radius: 0</p>
  <div class="buttons">
    <button class="button is-link">Square button</button>
    <button class="button">Square button</button>
  </div>
  <input class="input" type="text" placeholder="Square input" aria-label="Square input" />
</div>`,
    ),
};
