# oen-css documentation

oen-css is Bulma, re-namespaced and re-themed. The published stylesheet is
Bulma's own compiled output, apart from the custom property prefix, the six
theme colors, the sans-serif stack, and the type scale. `npm run verify` fails
when that stops being true.

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
| [ARCHITECTURE.md](./ARCHITECTURE.md)     | The two trees, the build pipeline end to end, the dependency rule  |
| [STYLESHEET.md](./STYLESHEET.md)         | How Bulma is configured without a `.scss` file                     |
| [COLORS.md](./COLORS.md)                 | The six theme colors, and everything Bulma derives from them       |
| [FONTS.md](./FONTS.md)                   | The sans-serif stack and the properties it reaches                 |
| [TYPOGRAPHY.md](./TYPOGRAPHY.md)         | The seven-step type scale and the body metrics                     |
| [NAMESPACE.md](./NAMESPACE.md)           | `--oen-*`, the renames Sass cannot make, and the leftover check    |
| [BANNER.md](./BANNER.md)                 | The attribution header, and the notices embedded in the stylesheet |
| [LICENSES.md](./LICENSES.md)             | What ships, and the MIT obligations behind it                      |
| [COMMANDS.md](./COMMANDS.md)             | Every npm script, and what it runs                                 |
| [VERIFICATION.md](./VERIFICATION.md)     | The 14 checks, and how to relax one deliberately                   |
| [VERIFY-RENAMES.md](./VERIFY-RENAMES.md) | Candidate names for the `verify` module                            |

## Changing the theme

Every theme value lives in exactly one place, as TypeScript:

| To change           | Edit                       | Then read                        |
| ------------------- | -------------------------- | -------------------------------- |
| A theme color       | `src/colors/consts.ts`     | [COLORS.md](./COLORS.md)         |
| The font stack      | `src/fonts/consts.ts`      | [FONTS.md](./FONTS.md)           |
| A type size         | `src/typography/consts.ts` | [TYPOGRAPHY.md](./TYPOGRAPHY.md) |
| The property prefix | `src/namespace/consts.ts`  | [NAMESPACE.md](./NAMESPACE.md)   |
| Anything else Bulma | `src/stylesheet/`          | [STYLESHEET.md](./STYLESHEET.md) |

Then run `npm run build && npm run verify`. The first three need no other
change: the same constant is read by the Bulma configuration and by what
`verify` asserts about the output. The last one is deliberately
harder — see [VERIFICATION.md](./VERIFICATION.md#relaxing-the-equivalence-check).
