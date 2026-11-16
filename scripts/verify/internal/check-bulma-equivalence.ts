import { isEqual, join, size } from 'lodash-es';
import { pipe } from 'remeda';
import { match } from 'ts-pattern';
import { toStylesheetBody } from '../../banner/to-stylesheet-body.ts';
import { parsePackageManifest } from '../../common/parse-package-manifest.ts';
import { OEN_STYLESHEET } from '../../dist/consts.ts';
import { toBulmaNamespace } from '../../namespace/to-bulma-namespace.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { formatFirstDifferences } from './format-first-differences.ts';

const CHECK_NAME = 'output is Bulma, re-namespaced and nothing else changed';
const BYTE_COUNT_LOCALE = 'en-US';

const formatEquivalenceProblem = (
  ours: string,
  theirs: string,
): string | undefined =>
  match(isEqual(ours, theirs))
    .with(true, () => undefined)
    .otherwise(
      () =>
        `dist/${OEN_STYLESHEET} is not a pure re-namespacing of Bulma. Either a NamespaceMapping in ` +
        `scripts/namespace/consts.ts is too broad, or src/oen.scss now overrides a theme variable. In that ` +
        `case this check needs to be relaxed deliberately.\n${join(formatFirstDifferences(ours, theirs), '\n')}`,
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
      name: CHECK_NAME,
      detail: `identical to Bulma v${parsePackageManifest(bulmaManifest.text).version} (${size(ours).toLocaleString(BYTE_COUNT_LOCALE)} bytes compared)`,
      problem: formatEquivalenceProblem(ours, theirs),
    }),
  );
