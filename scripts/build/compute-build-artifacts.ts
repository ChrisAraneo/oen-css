import { pipe } from 'remeda';
import { computeBuildMinification } from './internal/compute-build-minification.ts';
import { findBuildEmbeddedNotices } from './internal/find-build-embedded-notices.ts';
import { findBuildStylesheetProblems } from './internal/find-build-stylesheet-problems.ts';
import { formatBuildNotices } from './internal/format-build-notices.ts';
import { patchBuildBanner } from './internal/patch-build-banner.ts';
import { patchBuildNamespace } from './internal/patch-build-namespace.ts';
import type { BuildArtifacts } from './types/build-artifacts.ts';
import type { BuildInputs } from './types/build-inputs.ts';

export const computeBuildArtifacts = (inputs: BuildInputs): BuildArtifacts =>
  pipe(
    inputs,
    patchBuildNamespace,
    patchBuildBanner,
    computeBuildMinification,
    findBuildStylesheetProblems,
    findBuildEmbeddedNotices,
    formatBuildNotices,
  );
