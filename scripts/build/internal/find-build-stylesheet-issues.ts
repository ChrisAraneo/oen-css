import { compact } from 'lodash-es';
import { filterLeftoverBulmaIdentifiers } from '../../../src/namespace/filter-leftover-bulma-identifiers.ts';
import { formatLeftoverIssue } from '../../../src/namespace/format-leftover-issue.ts';
import {
  OEN_MINIFIED_STYLESHEET,
  OEN_STYLESHEET,
} from '../../common/package/consts.ts';
import type { BuildCheck } from './types/build-check.ts';
import type { BuildMinification } from './types/build-minification.ts';

export const findBuildStylesheetIssues = ({
  inputs,
  namespaced,
  stylesheet,
  minified,
  runtime,
  minifiedRuntime,
}: BuildMinification): BuildCheck => ({
  inputs,
  namespaced,
  stylesheet,
  minified,
  runtime,
  minifiedRuntime,
  stylesheetIssues: compact([
    formatLeftoverIssue(
      filterLeftoverBulmaIdentifiers(stylesheet, OEN_STYLESHEET),
      OEN_STYLESHEET,
    ),
    formatLeftoverIssue(
      filterLeftoverBulmaIdentifiers(minified.css, OEN_MINIFIED_STYLESHEET),
      OEN_MINIFIED_STYLESHEET,
    ),
  ]),
});
