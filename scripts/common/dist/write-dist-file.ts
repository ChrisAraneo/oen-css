import { writeFile } from 'node:fs/promises';
import { toDistPath } from './internal/to-dist-path.ts';
import type { DistFile } from './types/dist-file.ts';

export const writeDistFile = (file: DistFile, text: string): Promise<void> =>
  writeFile(toDistPath(file), text, 'utf8');
