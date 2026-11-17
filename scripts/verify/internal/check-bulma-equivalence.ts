import { isEmpty, join, size } from 'lodash-es';
import { pipe } from 'remeda';
import { match } from 'ts-pattern';
import { toStylesheetBody } from '../../banner/to-stylesheet-body.ts';
import { parsePackageManifest } from '../../common/parse-package-manifest.ts';
import { OEN_STYLESHEET } from '../../dist/consts.ts';
import { toBulmaNamespace } from '../../namespace/to-bulma-namespace.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { findStylesheetDifferences } from './find-stylesheet-differences.ts';
import { findUnthemedDifferences } from './find-unthemed-differences.ts';
import { formatFirstDifferences } from './format-first-differences.ts';
import type { StylesheetDifference } from './types/stylesheet-difference.ts';

const CHECK_NAME = 'output is Bulma, re-namespaced and re-themed, nothing else';
const BYTE_COUNT_LOCALE = 'en-US';

const formatEquivalenceProblem = (
  unthemed: readonly StylesheetDifference[],
): string | undefined =>
  match(isEmpty(unthemed))
    .with(true, () => undefined)
    .otherwise(
      () =>
        `dist/${OEN_STYLESHEET} differs from Bulma outside the Oen theme. Either a NamespaceMapping in ` +
        `scripts/namespace/consts.ts is too broad, or src/oen.scss now overrides something beyond the colors ` +
        `and the font stack in scripts/theme/consts.ts. In that case this check needs to be relaxed ` +
        `deliberately.\n${join(formatFirstDifferences(unthemed), '\n')}`,
    );

export const checkBulmaEquivalence = ({
  stylesheet,
  bulmaManifest,
  upstreamBulmaStylesheet,
}: VerifyInputs): CheckResult =>
  pipe(
    {
      ours: toBulmaNamespace(toStylesheetBody(stylesheet.text)),
      theirs: toStylesheetBody(upstreamBulmaStylesheet.css),
    },
    ({ ours, theirs }) => ({
      ours,
      differences: findStylesheetDifferences(ours, theirs),
    }),
    ({ ours, differences }) => ({
      name: CHECK_NAME,
      detail: `Bulma v${parsePackageManifest(bulmaManifest.text).version} apart from ${size(differences)} theme declarations (${size(ours).toLocaleString(BYTE_COUNT_LOCALE)} bytes compared)`,
      problem: formatEquivalenceProblem(findUnthemedDifferences(differences)),
    }),
  );
