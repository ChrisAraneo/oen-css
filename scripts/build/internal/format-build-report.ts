import { map } from 'lodash-es';
import {
  BULMA_LICENSE,
  OEN_MINIFIED_RUNTIME,
  OEN_MINIFIED_STYLESHEET,
  OEN_RUNTIME,
  OEN_STYLESHEET,
  THIRD_PARTY_NOTICES,
} from '../../common/package/consts.ts';
import type { BuildArtifacts } from '../types/build-artifacts.ts';
import { formatAppliedMapping } from './format-applied-mapping.ts';
import { formatArtifactSize } from './format-artifact-size.ts';

export const formatBuildReport = (
  artifacts: BuildArtifacts,
  durationMs: number,
): readonly string[] => [
  `oen-css v${artifacts.version} built from Bulma v${artifacts.bulmaVersion} in ${durationMs} ms`,
  ...map(artifacts.appliedMappings, (mapping) => formatAppliedMapping(mapping)),
  ...map(artifacts.warnings, (warning) => `  clean-css warning: ${warning}`),
  `  ${OEN_STYLESHEET}      ${formatArtifactSize(artifacts.stylesheet)}`,
  `  ${OEN_MINIFIED_STYLESHEET}  ${formatArtifactSize(artifacts.minifiedStylesheet)}`,
  `  ${OEN_RUNTIME}       ${formatArtifactSize(artifacts.runtime)}`,
  `  ${OEN_MINIFIED_RUNTIME}   ${formatArtifactSize(artifacts.minifiedRuntime)}`,
  `  ${BULMA_LICENSE}, ${THIRD_PARTY_NOTICES}`,
  ...map(
    artifacts.embeddedLicenseComments,
    (comment) => `  embedded notice preserved: ${comment.name}`,
  ),
];
