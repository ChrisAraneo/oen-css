import { join, map, take } from 'lodash-es';
import type { GalleryReport } from '../types/gallery-report.ts';

const MAX_REPORTED_ORIGINS = 4;

const ISSUE_INDENT = '\n        ';

export const formatGalleryIssues = ({
  renderFailures,
  unknownClassNames,
}: GalleryReport): readonly string[] => [
  ...map(
    renderFailures,
    ({ name, issue }) =>
      `  FAIL  ${name} threw while rendering${ISSUE_INDENT}${issue}`,
  ),
  ...map(
    unknownClassNames,
    ({ className, origins, reason }) =>
      `  FAIL  .${className}: ${reason}${ISSUE_INDENT}${join(take(origins, MAX_REPORTED_ORIGINS), ISSUE_INDENT)}`,
  ),
];
