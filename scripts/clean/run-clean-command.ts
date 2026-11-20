import { map } from 'lodash-es';
import { rm } from 'node:fs/promises';
import { GENERATED_PATHS } from './consts.ts';
import { writeCleanReport } from './internal/write-clean-report.ts';

export const runCleanCommand = (): Promise<void> =>
  Promise.all(
    map(GENERATED_PATHS, (path) => rm(path, { recursive: true, force: true })),
  ).then(() => writeCleanReport(GENERATED_PATHS));
