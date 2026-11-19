# Commands

Every npm script is one TypeScript entry point, and every entry point is one
module under `scripts/`. No shell script is involved: the chaining is done in
the `check` and `storybook` modules, where it can be read and typechecked.

| Script                    | Runs                                | Does                                                             |
| ------------------------- | ----------------------------------- | ---------------------------------------------------------------- |
| `npm run build`           | `node scripts/build.ts`             | compiles, renames, prepends the banner, minifies, writes `dist/` |
| `npm run build:watch`     | `node scripts/build.ts --watch`     | the same, then rebuilds on every change under `src/`             |
| `npm run check`           | `node scripts/check.ts`             | format, typecheck, build, verify, stories — in that order        |
| `npm run check:stories`   | `node scripts/check.ts --stories`   | only the stories check                                           |
| `npm run typecheck`       | `node scripts/check.ts --types`     | only `tsc --noEmit`                                              |
| `npm run clean`           | `node scripts/clean.ts`             | removes `dist/` and `storybook-static/`                          |
| `npm run format`          | `node scripts/format.ts`            | Prettier, writing                                                |
| `npm run format:check`    | `node scripts/format.ts --check`    | Prettier, checking                                               |
| `npm run storybook`       | `node scripts/storybook.ts`         | builds and verifies, then serves the gallery on port 6006        |
| `npm run storybook:build` | `node scripts/storybook.ts --build` | builds and verifies, then writes `storybook-static/`             |
| `npm run verify`          | `node scripts/verify.ts`            | the 14 assertions about `dist/`                                  |

`prepack` runs `build` then `verify`, so a published tarball cannot contain an
unverified stylesheet. `prepublishOnly` runs the whole `check`.

## check

[`scripts/check/`](../scripts/check/) owns a registry of five steps, each with
a name, a flag and a runner:

| Step        | Flag        | Implementation                   |
| ----------- | ----------- | -------------------------------- |
| `format`    | `--format`  | `scripts/format/`, in check mode |
| `typecheck` | `--types`   | spawns `tsc --noEmit`            |
| `build`     | `--build`   | `scripts/build/`                 |
| `verify`    | `--verify`  | `scripts/verify/`                |
| `stories`   | `--stories` | `scripts/check/stories/`         |

No flags runs all five. Any combination of flags runs that subset, which is
how `check:stories` and `typecheck` are expressed without separate entry
points. Steps run in order and **stop at the first failure**, because a failed
build makes verify and stories meaningless. The report ends with a tally:

```
4/5 steps passed
failed: verify
```

Four of the five steps are the other command modules, called in process. Only
`typecheck` has no module of its own, so its runner lives in
`scripts/check/internal/`.

## Running the external CLIs

Prettier, `tsc`, and Storybook are spawned as child processes by
[`run-process.ts`](../scripts/common/run-process.ts), which runs
`node <cli> <args…>` with the working directory set to the repository root
and stdio inherited. The CLI paths are resolved from `node_modules` in each
module's `consts.ts`, so no `.bin` shim or shell is involved and the behavior
is the same on every platform.

Exit codes propagate: each module returns a boolean, the `-command` wrapper
turns `false` into exit code 1 via
[`patch-exit-code-on-failure.ts`](../scripts/common/patch-exit-code-on-failure.ts).

## storybook

The gallery renders against `dist/oen.css`, so both Storybook commands build
and verify the stylesheet first — that is what the old
`npm run build && storybook …` chain did, now expressed in
[`run-verified-build.ts`](../scripts/storybook/internal/run-verified-build.ts).
If either step fails, Storybook is not started.

## CI

[`.github/workflows/ci.yml`](../.github/workflows/ci.yml) has two jobs:
`check` runs `npm run check`, and `storybook` runs `npm run storybook:build`
and uploads `storybook-static/` as an artifact for seven days.

## Known local issue: CRLF

On Windows with `core.autocrlf=true`, the working tree has CRLF line endings
while Prettier expects LF, so `npm run format:check` reports every file as
unformatted. CI on Linux checks out LF and is unaffected. To check content
formatting locally, ignoring line endings:

```bash
node node_modules/prettier/bin/prettier.cjs --check --end-of-line auto .
```

Adding `"endOfLine": "auto"` to `.prettierrc.json` would stop those reports
permanently; that is a project decision, not a bug in the command.
