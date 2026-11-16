import { isEmpty } from 'lodash-es';
import type { GalleryReport } from '../types/gallery-report.ts';

export const hasGalleryProblems = ({
  renderFailures,
  unknownClassNames,
}: GalleryReport): boolean =>
  !isEmpty(renderFailures) || !isEmpty(unknownClassNames);
