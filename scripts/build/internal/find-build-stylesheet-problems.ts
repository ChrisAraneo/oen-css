import { compact } from 'lodash-es';
import { OEN_MINIFIED_STYLESHEET, OEN_STYLESHEET } from '../../dist/consts.ts';
import { findLeftoverBulmaIdentifiers } from '../../namespace/find-leftover-bulma-identifiers.ts';
import { formatLeftoverProblem } from '../../namespace/format-leftover-problem.ts';
import type { BuildCheck } from './types/build-check.ts';
import type { BuildMinification } from './types/build-minification.ts';

export const findBuildStylesheetProblems = ({
  inputs,
  namespaced,
  stylesheet,
  minified,
}: BuildMinification): BuildCheck => ({
  inputs,
  namespaced,
  stylesheet,
  minified,
  stylesheetProblems: compact([
    formatLeftoverProblem(
      findLeftoverBulmaIdentifiers(stylesheet, OEN_STYLESHEET),
      OEN_STYLESHEET,
    ),
    formatLeftoverProblem(
      findLeftoverBulmaIdentifiers(minified.css, OEN_MINIFIED_STYLESHEET),
      OEN_MINIFIED_STYLESHEET,
    ),
  ]),
});
