<h1 align="center">Oen CSS</h1>

<p align="center">
  <a href="https://github.com/ChrisAraneo/oen-css/blob/master/package.json"><img src="https://img.shields.io/badge/version-v0.2.1-blue" alt="version"></a>
  <a href="https://github.com/ChrisAraneo/oen-css/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="@chris.araneo/oen-css is released under the MIT license."></a>
  <a href="https://github.com/ChrisAraneo/oen-css/actions/workflows/ci.yml"><img alt="GitHub CI Status" src="https://img.shields.io/github/actions/workflow/status/ChrisAraneo/oen-css/ci.yml?label=CI&logo=GitHub"></a>
  <br>
  <br>
  <em>Oen CSS is a CSS framework built from Bulma 1.0.4.</em>
  <br>
  <br>
</p>

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

## Storybook

Every element, component, form control, layout, and helper has a Storybook page, written as plain HTML styled
only by the built stylesheet:

```sh
npm install
npm run storybook
```

## Documentation

How Oen is built, themed, and verified is documented in [docs/](./docs/README.md).

## License

MIT, see [LICENSE](./LICENSE).

Oen CSS is a derivative work of Bulma, copyright (c) 2023 Jeremy Thomas, also MIT licensed. Bulma's
copyright and permission notice is reproduced in [THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md) and
ships inside the package as `dist/LICENSE-bulma`.

Bulma's base styles also vendor [minireset.css](https://github.com/jgthms/minireset.css) (MIT, same author)
together with its own notice. That notice is embedded in both stylesheets. The build reads it back out of
the compiled stylesheet and documents it in `THIRD-PARTY-NOTICES.md`, and `npm run verify` fails if
minification strips it.
