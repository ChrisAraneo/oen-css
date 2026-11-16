import { map } from 'lodash-es';
import { rm } from 'node:fs/promises';
import { GENERATED_DIRECTORIES } from './consts.ts';
import { writeCleanReport } from './internal/write-clean-report.ts';

export const runCleanCommand = (): Promise<void> =>
  Promise.all(
    map(GENERATED_DIRECTORIES, (directory) =>
      rm(directory, { recursive: true, force: true }),
    ),
  ).then(() => writeCleanReport(GENERATED_DIRECTORIES));
