import { map } from 'lodash-es';
import {
  BULMA_LICENSE,
  OEN_LICENSE,
  OEN_MINIFIED_STYLESHEET,
  OEN_STYLESHEET,
  THIRD_PARTY_NOTICES,
} from '../../dist/consts.ts';
import type { BuildArtifacts } from '../types/build-artifacts.ts';
import { formatAppliedMapping } from './format-applied-mapping.ts';
import { formatStylesheetSize } from './format-stylesheet-size.ts';

export const formatBuildReport = (
  artifacts: BuildArtifacts,
  durationMs: number,
): readonly string[] => [
  `oen-css v${artifacts.version} built from Bulma v${artifacts.bulmaVersion} in ${durationMs} ms`,
  ...map(artifacts.appliedMappings, (mapping) => formatAppliedMapping(mapping)),
  ...map(artifacts.warnings, (warning) => `  clean-css warning: ${warning}`),
  `  dist/${OEN_STYLESHEET}      ${formatStylesheetSize(artifacts.stylesheet)}`,
  `  dist/${OEN_MINIFIED_STYLESHEET}  ${formatStylesheetSize(artifacts.minifiedStylesheet)}`,
  `  dist/${OEN_LICENSE}, dist/${BULMA_LICENSE}, dist/${THIRD_PARTY_NOTICES}`,
  ...map(
    artifacts.embeddedLicenseComments,
    (comment) => `  embedded notice preserved: ${comment.name}`,
  ),
];
