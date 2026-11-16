import { readFile } from 'node:fs/promises';
import { formatUnreadableFileProblem } from './internal/format-unreadable-file-problem.ts';
import type { TextFile } from './types/text-file.ts';

export const readTextFile = (path: string): Promise<TextFile> =>
  readFile(path, 'utf8').then(
    (text) => ({ path, text, problem: undefined }),
    (error: unknown) => ({
      path,
      text: '',
      problem: formatUnreadableFileProblem(path, error),
    }),
  );
