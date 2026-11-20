# Renaming `verify`

`scripts/verify.ts` and `scripts/verify/` carry the vaguest name in the repo:
every other module says what it is about (`banner`, `namespace`, `sass`,
`theme`), while `verify` only says that it is checking _something_. The
refactor into one module per script type made that worse — `scripts/check/`
now exists, it runs `verify` as one of its five steps, and `verify`'s own
units are called checks (`CheckResult`, `validateEveryArtifact`, 14
`internal/check-*.ts` files).

This is a shortlist for a better name, not a decision.

## What the module does

It reads the five published files at the repository root, Bulma's own
`LICENSE`, and Bulma's `package.json`, recompiles upstream Bulma from source,
and asserts 14 things about them. It prints `ok` lines, a tally, and exits 1
on the first issue. It never writes a file.

The main assertion is `validate-bulma-equivalence.ts`: it maps our stylesheet
back to Bulma's namespace, diffs it against a fresh Bulma compile, and allows
only differences that match the theme allowlist derived from `src/colors/`,
`src/fonts/`, and `src/typography/`. Its own wording is the best one-line
description of the module: _"output is Bulma, re-namespaced and re-themed,
nothing else."_

Eight of the 14 checks are about the change made to Bulma:

- no bulma identifiers leak outside the banner
- custom properties are namespaced with `--oen-`
- fixed grid container is namespaced
- theme colors are the configured Oen palette
- theme fonts are the configured Oen stack
- type scale is the configured Oen scale
- component classes are unchanged from Bulma
- output is Bulma, re-namespaced and re-themed, nothing else

Six are about shipping it legally and intact:

- package artifacts are present
- stylesheets start with `@charset` and the attribution banner
- minified output is smaller and still intact
- Bulma's license ships verbatim
- own license ships with the package
- notices embedded by Bulma survive minification

So the module is mostly, but not only, about the Bulma delta. A name chosen
purely for the delta leaves those six checks without a place — see
[Splitting it instead](#splitting-it-instead).

## Where a replacement has to fit

| Slot                | Today                                       |
| ------------------- | ------------------------------------------- |
| Command             | `npm run verify`                            |
| Entry               | `scripts/verify.ts`                         |
| Module              | `scripts/verify/`                           |
| Runner              | `runVerify()`, `runVerifyCommand()`         |
| Inputs              | `VerifyInputs`, `readVerifyInputs()`        |
| Report              | `writeVerifyReport()`                       |
| Step inside `check` | `VERIFY_FLAG = '--verify'`, step `'verify'` |
| Prose (README, CI)  | "`npm run verify` fails if minification…"   |

Three constraints follow from that:

1. **The name has to work as a noun and as a command.** It appears as a
   directory, as `npm run <name>`, and as a type prefix (`<Name>Inputs`).
2. **It must not sound like doing the change.** This module changes nothing.
   The changing is declared in `src/` — `src/namespace/` for the mappings and
   the patching, `src/stylesheet/` for the Bulma configuration — and applied
   by `scripts/build/`.
3. **It must not collide** with the script modules — `build`, `check`,
   `clean`, `common`, `format`, `storybook` — or with the source modules in
   `src/`: `banner`, `colors`, `fonts`, `licenses`, `namespace`, `stylesheet`,
   `typography`.

## Candidates

### Strong

**`parity`** — `npm run parity`, `scripts/parity/`, `ParityInputs`. Claims
exactly what the main check claims: the published CSS is Bulma, apart from
the declared theme. Short, reads well as both noun and command, and nothing in
the repo competes for the word. The cost is that the six license and packaging
checks sit under it only loosely. If plain `parity` feels too abstract,
`bulma-parity` spells out the second operand and stays honest.

**`provenance`** — `npm run provenance`, `scripts/provenance/`. The widest
honest fit: it covers the banner, both licenses, the embedded third-party
notices, _and_ the Bulma equivalence, because all of those answer "where did
this file come from and what was done to it". Weakest for the two mechanical
checks (artifacts present, minified output intact). Caveat: npm uses
"provenance" for publish attestations (`npm publish --provenance`), so the
word already means something else in a JavaScript repo.

**`fidelity`** — `npm run fidelity`, `scripts/fidelity/`. Same framing as
`parity` — faithfulness to upstream, plus the declared divergence — and it
carries the idea of an intended deviation slightly better. Marginally more
abstract, and `FidelityInputs` reads worse than `ParityInputs`.

### Workable

- **`audit`** — covers all 14, read-only and finding-shaped, which is exactly
  the module's behavior. The problem is `npm run audit`
  sitting next to `npm audit`; in a JS repo that confusion is permanent.
- **`attest`** / **`attestation`** — "attest that what we ship is what we
  claim". Covers everything, pairs well with the license checks, but collides
  with supply-chain attestation vocabulary and `npm run attest` reads oddly.
- **`invariants`** — accurate for all 14 ("the invariants the package must
  satisfy") and unambiguous, but academic, and long in every slot.
- **`equivalence`** — already the internal name of the main check
  (`validateBulmaEquivalence`); promoting it to the module name is consistent,
  but it describes one check rather than the set.
- **`conformance`** — formal and accurate ("the package conforms to the
  contract"), long, and vague about _which_ contract.
- **`drift`** / **`divergence`** — names what is measured: everything that
  differs from Bulma. `npm run drift` reads as a detector, which fits, but
  the polarity is inverted (passing means no drift beyond the allowlist) and
  licenses do not drift.
- **`derivation`** / **`lineage`** — Oen is a derivative work, and the module
  proves the derivation is honest, including the license obligations that come
  with it. Covers both halves, but `npm run derivation` is awkward and
  `lineage` is vague.

### Weak

- **`theme`** — the theme is what `src/colors/`, `src/fonts/` and
  `src/typography/` already hold, and this module checks the output _against_
  them. Naming the checker after the thing it checks would be unreadable, and
  only 3 of 14 checks are about the theme at all.
- **`transform`** — describes performing the change, not checking it, and the
  change is made in `src/namespace/`, `src/stylesheet/`, and `build/`. A
  `transform/` module that only asserts would mislead every reader. Same
  objection to `patch`, `rewrite`, `reskin`, `recast`, and `restyle` — these
  are good names for the doing side (see below), wrong for the checking side.
- **`validate`**, **`assert`**, **`certify`**, **`vouch`**, **`sanity`** —
  synonyms of `verify`; they inherit the exact vagueness being fixed.
- **`diff`** / **`delta`** — generic, and `diff` already has a local meaning
  (`StylesheetDifference`, `computeStylesheetDifferences`).
- **`gate`**, **`guard`**, **`inspect`**, **`review`**, **`contract`** —
  either vague about the subject or awkward English as a command.

## Recommendation

`parity`, with `bulma-parity` as the explicit variant and `provenance` as the
runner-up. It states the claim the module exists to defend, it reads well in
every slot, and it frees the word "check" for `scripts/check/`.

If the name changes, rename the vocabulary with it in the same pass — that is
most of the value. `CheckResult` → `ParityResult`, `validateEveryArtifact` →
`checkEveryParity` (or `findParityIssues`), and the 14 `internal/check-*.ts`
files keep their names, which now read as the individual checks of one named
suite rather than as generic "checks" competing with the check command.

## Splitting it instead

The 14 checks fall into two groups cleanly enough that two names are a
defensible alternative to finding one word for all of them:

- `parity` — the 8 checks about the Bulma delta, needing a Bulma recompile and
  the namespace and theme configuration.
- `packaging` — the 6 checks about the published files being complete,
  minified, licensed, and carrying the banner.

The seven-module top level is the constraint here: two top-level modules would
make it eight, so the split belongs _inside_ the renamed module, as
`<name>/parity/` and `<name>/packaging/` behind one command and one report.
Making them two commands instead — two more top-level modules and two more
steps in `check` — gains one real thing: only the first group needs the Bulma
recompile, so `npm run packaging` would skip it.

## Rename checklist

Whatever name wins, these are the places that mention the current one:

- `scripts/verify.ts` → `scripts/<name>.ts`
- `scripts/verify/` → `scripts/<name>/`
- `scripts/verify/run-verify.ts`, `run-verify-command.ts`
- `scripts/verify/internal/read-verify-inputs.ts`,
  `internal/write-verify-report.ts`
- `scripts/verify/types/verify-inputs.ts` (`VerifyInputs`)
- `scripts/verify/types/check-result.ts` (`CheckResult`) — optional, but this
  is the one that collides with `scripts/check/`
- `scripts/verify/internal/validate-every-artifact.ts`
  (`validateEveryArtifact`)
- `scripts/check/consts.ts` — `VERIFY_FLAG = '--verify'`
- `scripts/check/internal/to-check-steps.ts` — `VERIFY_STEP_NAME = 'verify'`
- `scripts/storybook/internal/run-verified-build.ts` — the file name
  says "verified"; as plain English it survives any rename, so this one is a
  judgment call
- `package.json` — the `verify` script and `prepack`
- `README.md` line 104 — "`npm run verify` fails if minification…"
- `.github/workflows/ci.yml` line 37 — the step name "Format, typecheck,
  build, verify, stories"
