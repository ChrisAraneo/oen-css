# Architecture

## Two trees

```
src/            what the library is          (TypeScript, no Sass file)
  banner/       the attribution header prepended to every built artifact
  canvas/       the canvas every button wears, and the runtime that paints it
  colors/       the six theme colors
  common/       countMatches, toRatio and runEffect, the helpers more than one module needs
  controls/     the control metrics, the button radius, rim, shadow and label
  fonts/        the sans-serif stack
  licenses/     THIRD_PARTY_NOTICES.md and the embedded notices
  namespace/    the --oen- prefix and the renames Sass cannot make
  stylesheet/   assembles the Bulma configuration and the Oen button rules
  typography/   the seven-step type scale and the body metrics

scripts/        the tooling that builds and checks it
  build.ts      check.ts  clean.ts  format.ts  storybook.ts  verify.ts
  build/        compile, rename, banner, minify, write
  check/        runs the other commands as one gate; owns the stories check
  clean/        removes the generated package files and storybook-static/
  common/       paths, process spawning, package file IO, the Sass and esbuild wrappers
  format/       Prettier
  storybook/    the Storybook CLI, with a built stylesheet as its prerequisite
  verify/       the 17 assertions about the published files
```

### The dependency rule

`scripts/` imports `src/`, never the reverse. `src/` is the declaration of the
artifact and has to be readable on its own; the tooling is what consumes it.
The one helper both trees need, `countMatches`, therefore lives in
`src/common/` — the lower layer — rather than in `scripts/common/`.

Inside each tree the convention is the same:

- a module's public surface is the files at its root,
- `internal/` is private to that module,
- `types/` holds its type declarations,
- `consts.ts` holds its constants,
- one exported function per file, named after the file.

## The build pipeline

`node scripts/build.ts` runs five stages. The whole run takes about 300ms.

### 1. Read the inputs

[`read-build-inputs.ts`](../scripts/build/internal/read-build-inputs.ts) reads
three files, compiles one stylesheet and bundles one runtime, all in
parallel:

| Input                             | Used for                                    |
| --------------------------------- | ------------------------------------------- |
| `package.json`                    | the version and homepage in the banner      |
| `node_modules/bulma/package.json` | the Bulma version in the banner and notices |
| `node_modules/bulma/LICENSE`      | `LICENSE-bulma` and the copyright line      |
| `@paper-design/shaders` manifest  | the shader version in the runtime banner    |
| `@paper-design/shaders` LICENSE   | the Apache 2.0 text in the notices          |
| `@paper-design/shaders` NOTICE    | its notice and copyright line               |
| the compiled stylesheet           | everything downstream                       |
| the bundled runtime               | `oen.js` and `oen.min.js`                   |

The stylesheet comes from
[`read-compiled-oen-stylesheet.ts`](../scripts/common/sass/read-compiled-oen-stylesheet.ts),
which asks `src/stylesheet/` for the Bulma configuration and compiles it in
memory. See [STYLESHEET.md](./STYLESHEET.md).

The runtime comes from
[`read-compiled-oen-runtime.ts`](../scripts/common/runtime/read-compiled-oen-runtime.ts),
which asks esbuild to bundle `src/canvas/oen-runtime.ts` into an IIFE, twice:
once expanded and once minified. Both come back in memory, like the
stylesheet, so nothing is written before the whole build succeeds. A bundle
that comes back empty is an issue of its own. That runtime is what injects
the canvas into every button and paints it, and it is where
`@paper-design/shaders` ends up — see [CANVAS.md](./CANVAS.md).

The build detects two issues here rather than later: an unreadable input file,
and a Bulma version mismatch between `oen.bulmaVersion` in `package.json` and
the installed `node_modules/bulma`. A missing `Copyright (c)` line in Bulma's
license is also an issue, because the banner quotes it.

### 2. Rename what Sass could not

`patchOenNamespace` applies the mappings Sass cannot reach: the fixed-grid
container name and Bulma's section marker comments. It records how many
replacements each mapping made, and the build report prints those counts. See
[NAMESPACE.md](./NAMESPACE.md).

### 3. Prepend the header

`patchStylesheetHeader` strips the `@charset` line Sass emitted, then writes
`@charset "UTF-8";` followed by the attribution banner.
`patchRuntimeHeader` puts a different banner in front of both bundles — one
that names the bundled shader and its Apache 2.0 notice rather than Bulma —
where the `/*! … */` comment is already valid JavaScript and no `@charset` is
wanted. See [BANNER.md](./BANNER.md).

### 4. Minify

clean-css at level 1 with `specialComments: 'all'`, so every `/*! … */`
license comment survives — both ours and the ones Bulma vendored into its own
sources.

### 5. Check, then write

Before anything reaches disk, the build searches both stylesheets for leftover
`bulma` identifiers. It also reads the embedded license comments out of the
expanded stylesheet to generate the notices. Then
[`write-every-build-artifact.ts`](../scripts/build/internal/write-every-build-artifact.ts)
writes six files, all of them at the repository root, which is also the
package root:

```
oen.css                 the expanded stylesheet
oen.min.css             the minified stylesheet
oen.js                  the expanded runtime
oen.min.js              the minified runtime
LICENSE-bulma           Bulma's license, verbatim
THIRD_PARTY_NOTICES.md  generated from the built CSS
```

The seventh published file, our own `LICENSE`, is not generated: it is kept in
the repository and ships as it is.

If any stage produced an issue, the build prints the issues instead of the
report and exits 1. Nothing is half-written: the artifacts are computed in
memory first and the writes happen last.

## Watch mode

`npm run build:watch` watches `src/` and runs each rebuild as a **fresh child
process**. That is deliberate. The theme is imported TypeScript, and Node's
module cache would otherwise keep returning the values the watcher imported
when it started, so edits would not apply and nothing would report it. The
cost is one process start per rebuild; the alternative is a rebuild that
reports success while the output still holds the old values.
