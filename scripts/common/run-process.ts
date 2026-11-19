import { spawn, type SpawnOptions } from 'node:child_process';
import { REPOSITORY_ROOT } from './consts.ts';

const SUCCESS_EXIT_CODE = 0;

const INHERITED_PROCESS_OPTIONS: Readonly<SpawnOptions> = Object.freeze({
  stdio: 'inherit',
});

export const runProcess = (
  cli: string,
  commandArguments: readonly string[],
): Promise<boolean> =>
  new Promise((resolve) =>
    spawn(process.execPath, [cli, ...commandArguments], {
      ...INHERITED_PROCESS_OPTIONS,
      cwd: REPOSITORY_ROOT,
    }).on('close', (code) => resolve(code === SUCCESS_EXIT_CODE)),
  );
