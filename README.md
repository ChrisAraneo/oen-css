<h1 align="center">Oen CSS</h1>

<p align="center">
  <a href="https://github.com/ChrisAraneo/oen-css/blob/master/package.json"><img src="https://img.shields.io/badge/version-v0.2.0-blue" alt="version"></a>
  <a href="https://github.com/ChrisAraneo/oen-css/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="@chris.araneo/oen-css is released under the MIT license."></a>
  <a href="https://github.com/ChrisAraneo/oen-css/actions/workflows/ci.yml"><img alt="GitHub CI Status" src="https://img.shields.io/github/actions/workflow/status/ChrisAraneo/oen-css/ci.yml?label=CI&logo=GitHub"></a>
  <br>
  <br>
  <em>Oen CSS is a CSS framework built from Bulma 1.0.4.</em>
  <br>
  <br>
</p>

Every custom property it declares is namespaced `--oen-*` instead of `--bulma-*`. The published package is plain CSS.

Class names are untouched. `.button`, `.navbar`, `.columns`, `.is-primary` and `.has-text-centered` behave
exactly as they do in Bulma. What changes is the namespace the theme lives in — the ~1 400 custom properties
that carry the colours, fonts, radii and spacing.

## Install

```sh
npm install "@chris.araneo/oen-css"
```

```html
<link
  rel="stylesheet"
  href="node_modules/@chris.araneo/oen-css/dist/oen.min.css"
/>
```

From a bundler:

```js
import '@chris.araneo/oen-css'; // or '@chris.araneo/oen-css/oen.min.css'
```

## Colour Palette

| Colour  | Hex       | Property        | Helpers                                                       |
| ------- | --------- | --------------- | ------------------------------------------------------------- |
| Primary | `#47b27b` | `--oen-primary` | `.is-primary`, `.has-text-primary`, `.has-background-primary` |
| Link    | `#b24795` | `--oen-link`    | `.is-link`, `.has-text-link`, `.has-background-link`          |
| Info    | `#479db2` | `--oen-info`    | `.is-info`, `.has-text-info`, `.has-background-info`          |
| Success | `#47b247` | `--oen-success` | `.is-success`, `.has-text-success`, `.has-background-success` |
| Warning | `#b26747` | `--oen-warning` | `.is-warning`, `.has-text-warning`, `.has-background-warning` |
| Danger  | `#b24747` | `--oen-danger`  | `.is-danger`, `.has-text-danger`, `.has-background-danger`    |

## Typography

| Stack      | Property                                         | Value                                                                                                            |
| ---------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Sans-serif | `--oen-family-primary`, `--oen-family-secondary` | `"Trebuchet MS", Seravek, "Gill Sans Nova", "Segoe UI", Ubuntu, Calibri, "Noto Sans", "DejaVu Sans", sans-serif` |
| Monospace  | `--oen-family-code`                              | Bulma's default                                                                                                  |

`--oen-body-family` reads the primary stack, so it is the document default.

### Type scale

Text is **14px** everywhere Bulma would set 16px: `--oen-size-normal` is the default control size, so every
button, input, select and file control follows it, and `--oen-body-font-size` sets the same size on `body`.

| Property       | Value       | Size | Read by                                        | Role            |
| -------------- | ----------- | ---- | ---------------------------------------------- | --------------- |
| `--oen-size-1` | `1.75rem`   | 28px | `.title.is-1`, `.is-size-1`                    | Display heading |
| `--oen-size-2` | `1.5rem`    | 24px | `.title.is-2`, `.is-size-2`                    | Level 1 heading |
| `--oen-size-3` | `1.3125rem` | 21px | `.title`, `.is-size-3`                         | Level 2 heading |
| `--oen-size-4` | `1.125rem`  | 18px | `.is-size-4`, `--oen-size-large`               | Level 3 heading |
| `--oen-size-5` | `1rem`      | 16px | `.subtitle`, `.is-size-5`, `--oen-size-medium` | Level 4 heading |
| `--oen-size-6` | `0.875rem`  | 14px | `.is-size-6`, `--oen-size-normal`, `body`      | Body text       |
| `--oen-size-7` | `0.75rem`   | 12px | `.is-size-7`, `--oen-size-small`, `small`      | Meta text       |

## Contents

| File                          | Contents                                                |
| ----------------------------- | ------------------------------------------------------- |
| `dist/oen.css`                | The full stylesheet                                     |
| `dist/oen.min.css`            | Minified stylesheet                                     |
| `dist/LICENSE`                | Oen's MIT license                                       |
| `dist/LICENSE-bulma`          | Bulma's MIT license, verbatim                           |
| `dist/THIRD-PARTY-NOTICES.md` | The attribution notice, with Bulma's license reproduced |

## Storybook

Every element, component, form control, layout and helper has a Storybook page, written as plain HTML styled
only by the built stylesheet:

```sh
npm install
npm run storybook
```

## License

MIT, see [LICENSE](./LICENSE).

Oen CSS is a derivative work of Bulma, copyright (c) 2023 Jeremy Thomas, also MIT licensed. Bulma's
copyright and permission notice is reproduced in [THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md) and
ships inside the package as `dist/LICENSE-bulma`.

Bulma's base styles also vendor [minireset.css](https://github.com/jgthms/minireset.css) (MIT, same author)
along with its own notice. That notice travels inside both stylesheets; the build reads it back out of the
compiled artifact to document it in `THIRD-PARTY-NOTICES.md`, and `npm run verify` fails if minification
ever strips it.
