import { size } from 'lodash-es';
import type { CheckResult } from '../types/check-result.ts';
import { formatCustomPropertyIssue } from './format-custom-property-issue.ts';

const CHECK_NAME = 'custom properties are namespaced with --oen-';

export const toCustomPropertiesResult = (
  declared: readonly string[],
): CheckResult => ({
  name: CHECK_NAME,
  detail: `${size(declared)} distinct properties`,
  issue: formatCustomPropertyIssue(declared),
});
