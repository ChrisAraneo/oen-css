import { size } from 'lodash-es';
import { pipe } from 'remeda';
import { toStylesheetBody } from '../../../src/banner/to-stylesheet-body.ts';
import { patchBulmaNamespace } from '../../../src/namespace/patch-bulma-namespace.ts';
import { parsePackageManifest } from '../../common/parse-package-manifest.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { computeStylesheetDifferences } from './compute-stylesheet-differences.ts';
import { filterUnthemedDifferences } from './filter-unthemed-differences.ts';
import { formatEquivalenceIssue } from './format-equivalence-issue.ts';

const CHECK_NAME = 'output is Bulma, re-namespaced and re-themed, nothing else';

const BYTE_COUNT_LOCALE = 'en-US';

export const validateBulmaEquivalence = ({
  stylesheet,
  bulmaManifest,
  upstreamBulmaStylesheet,
}: VerifyInputs): CheckResult =>
  pipe(
    {
      ours: patchBulmaNamespace(toStylesheetBody(stylesheet.text)),
      theirs: toStylesheetBody(upstreamBulmaStylesheet.css),
    },
    ({ ours, theirs }) => ({
      ours,
      differences: computeStylesheetDifferences(ours, theirs),
    }),
    ({ ours, differences }) => ({
      name: CHECK_NAME,
      detail: `Bulma v${parsePackageManifest(bulmaManifest.text).version} apart from ${size(differences)} theme declarations (${size(ours).toLocaleString(BYTE_COUNT_LOCALE)} bytes compared)`,
      issue: formatEquivalenceIssue(filterUnthemedDifferences(differences)),
    }),
  );
