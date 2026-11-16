import { map } from 'lodash-es';

const BLANK_LINE = '';

export const formatBuildProblems = (
  problems: readonly string[],
): readonly string[] => [
  BLANK_LINE,
  ...map(problems, (problem) => `Build failed: ${problem}`),
  BLANK_LINE,
];
