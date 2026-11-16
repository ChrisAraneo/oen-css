import { noop } from 'lodash-es';
import { match } from 'ts-pattern';
import { patchExitCode } from '../../common/patch-exit-code.ts';
import { FAILURE_EXIT_CODE } from '../../consts.ts';
import type { GalleryReport } from '../types/gallery-report.ts';
import { hasGalleryProblems } from './has-gallery-problems.ts';

export const patchExitCodeOnGalleryProblems = (report: GalleryReport): void =>
  match(hasGalleryProblems(report))
    .with(true, () => patchExitCode(FAILURE_EXIT_CODE))
    .otherwise(noop);
