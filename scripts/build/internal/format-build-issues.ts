import { map } from 'lodash-es';
import { BLANK_LINE } from '../../common/consts.ts';

export const formatBuildIssues = (
  issues: readonly string[],
): readonly string[] => [
  BLANK_LINE,
  ...map(issues, (issue) => `Build failed: ${issue}`),
  BLANK_LINE,
];
