import { readFile } from 'node:fs/promises';
import { formatUnreadableFileIssue } from './internal/format-unreadable-file-issue.ts';
import type { TextFile } from './types/text-file.ts';

export const readTextFile = (path: string): Promise<TextFile> =>
  readFile(path, 'utf8').then(
    (text) => ({ path, text, issue: undefined }),
    (error: unknown) => ({
      path,
      text: '',
      issue: formatUnreadableFileIssue(path, error),
    }),
  );
