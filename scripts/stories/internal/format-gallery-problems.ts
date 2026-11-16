import { join, map, take } from 'lodash-es';
import type { GalleryReport } from '../types/gallery-report.ts';

const MAX_REPORTED_ORIGINS = 4;
const PROBLEM_INDENT = '\n        ';

export const formatGalleryProblems = ({
  renderFailures,
  unknownClassNames,
}: GalleryReport): readonly string[] => [
  ...map(
    renderFailures,
    ({ name, problem }) =>
      `  FAIL  ${name} threw while rendering${PROBLEM_INDENT}${problem}`,
  ),
  ...map(
    unknownClassNames,
    ({ className, origins, reason }) =>
      `  FAIL  .${className}: ${reason}${PROBLEM_INDENT}${join(take(origins, MAX_REPORTED_ORIGINS), PROBLEM_INDENT)}`,
  ),
];
