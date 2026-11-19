# oen-css documentation

oen-css is Bulma, re-namespaced and re-themed. Nothing else: the published
stylesheet is Bulma's own compiled output apart from the custom property
prefix, the six theme colours, the sans-serif stack and the type scale — and
`npm run verify` fails if that stops being true.

The repository has two trees, and the split between them matters:

- **`src/`** declares what the library _is_ — the theme, the namespace, the
  banner, the notices. It is plain TypeScript; there is no `.scss` file
  anywhere in the repository.
- **`scripts/`** is the tooling that turns that declaration into `dist/` and
  then checks the result.

`scripts/` imports `src/`. `src/` never imports `scripts/`.

## Where to start

| Document                                 | What it covers                                                     |
| ---------------------------------------- | ------------------------------------------------------------------ |
| [architecture.md](./architecture.md)     | The two trees, the build pipeline end to end, the dependency rule  |
| [stylesheet.md](./stylesheet.md)         | How Bulma is configured without a `.scss` file                     |
| [colors.md](./colors.md)                 | The six theme colours, and everything Bulma derives from them      |
| [fonts.md](./fonts.md)                   | The sans-serif stack and the properties it reaches                 |
| [typography.md](./typography.md)         | The seven-step type scale and the body metrics                     |
| [namespace.md](./namespace.md)           | `--oen-*`, the renames Sass cannot make, and the leftover check    |
| [banner.md](./banner.md)                 | The attribution header, and the notices embedded in the stylesheet |
| [licenses.md](./licenses.md)             | What ships, and the MIT obligations behind it                      |
| [commands.md](./commands.md)             | Every npm script, and what it actually runs                        |
| [verification.md](./verification.md)     | The 14 checks, and how to relax one deliberately                   |
| [verify-renames.md](./verify-renames.md) | Candidate names for the `verify` module                            |

## Changing the theme

Every theme value lives in exactly one place, as TypeScript:

| To change           | Edit                       | Then read                        |
| ------------------- | -------------------------- | -------------------------------- |
| A theme colour      | `src/colors/consts.ts`     | [colors.md](./colors.md)         |
| The font stack      | `src/fonts/consts.ts`      | [fonts.md](./fonts.md)           |
| A type size         | `src/typography/consts.ts` | [typography.md](./typography.md) |
| The property prefix | `src/namespace/consts.ts`  | [namespace.md](./namespace.md)   |
| Anything else Bulma | `src/stylesheet/`          | [stylesheet.md](./stylesheet.md) |

Then run `npm run build && npm run verify`. The first three need no other
change: the value flows into the Bulma configuration and into what `verify`
asserts about the output from the same constant. The last one is deliberately
harder — see [verification.md](./verification.md#relaxing-the-equivalence-check).
