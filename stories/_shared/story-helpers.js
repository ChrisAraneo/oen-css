/**
 * Small helpers shared by the stories.
 *
 * Everything here returns plain HTML strings: the gallery deliberately uses no
 * framework, so each story is a snippet you can copy into a page that links
 * `oen.css`.
 */

/** The six semantic colors Oen inherits from Bulma. */
export const COLORS = [
  'primary',
  'link',
  'info',
  'success',
  'warning',
  'danger',
];

/** Monochrome shades available to buttons, tags, and notifications. */
export const SHADES = ['white', 'light', 'dark', 'black'];

/** Size modifiers shared by most components. */
export const SIZES = ['small', 'normal', 'medium', 'large'];

/** Joins class names, dropping anything falsy. */
export const classes = (...parts) => parts.filter(Boolean).join(' ');

/** Stacks the blocks of a story vertically. */
export const stack = (...blocks) =>
  `<div class="sb-stack">${blocks.filter(Boolean).join('')}</div>`;

/** Arranges the examples in a row that wraps. */
export const row = (...items) =>
  `<div class="sb-row">${items.filter(Boolean).join('')}</div>`;

/** Arranges the examples in a row under a small uppercase caption. */
export const labelled = (label, ...items) =>
  `<div><p class="sb-label">${label}</p>${row(...items)}</div>`;

/** Returns a caption printed under an example. */
export const note = (text) => `<p class="sb-note">${text}</p>`;

/** Returns a neutral box used in place of real content in layout examples. */
export const placeholder = (text, extraClass = '') =>
  `<div class="${classes('sb-placeholder', extraClass)}">${text}</div>`;

/** Returns a Font Awesome icon wrapped in Oen's `.icon` element. */
export const icon = (name, { size, color } = {}) =>
  `<span class="${classes('icon', size && `is-${size}`, color && `has-text-${color}`)}"><i class="fa-solid fa-${name}"></i></span>`;

/** Returns an inline SVG image, so image stories need no network access. */
export const svgImage = (
  width,
  height = width,
  label = `${width}x${height}`,
) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label} placeholder"><rect width="${width}" height="${height}" fill="hsl(221 14% 86%)"/><path d="M0 ${height} L${width / 2} ${height / 3} L${width} ${height}Z" fill="hsl(221 14% 71%)"/><circle cx="${width * 0.75}" cy="${height * 0.28}" r="${Math.max(6, width * 0.08)}" fill="hsl(42 100% 53%)"/><text x="50%" y="${height - 10}" fill="hsl(221 14% 29%)" font-family="monospace" font-size="${Math.max(10, width * 0.07)}" text-anchor="middle">${label}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

/** Returns a `select` control for Storybook's args table. */
export const selectArg = (
  options,
  description,
  { includeNone = true } = {},
) => ({
  control: 'select',
  options: includeNone ? ['', ...options] : options,
  description,
});

/** Returns a `boolean` control for Storybook's args table. */
export const boolArg = (description) => ({ control: 'boolean', description });

/** Returns the `is-*` modifier, or an empty string when the value is falsy or `normal`. */
export const modifier = (value, prefix = 'is') =>
  !value || value === 'normal' ? '' : `${prefix}-${value}`;

/**
 * Parses an HTML string into a DOM node.
 *
 * Most stories return a string, which Storybook injects unchanged. The few
 * components that need interaction (dropdown, modal, navbar burger, tabs)
 * return a node instead, so they can attach the plain JavaScript a user of a
 * CSS-only framework has to write.
 */
export const toElement = (html) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html.trim();
  return wrapper.children.length === 1 ? wrapper.firstElementChild : wrapper;
};
