import { readTextFile } from '../common/read-text-file.ts';
import type { TextFile } from '../common/types/text-file.ts';
import { toDistPath } from './internal/to-dist-path.ts';
import type { DistFile } from './types/dist-file.ts';

export const readDistFile = (file: DistFile): Promise<TextFile> => readTextFile(toDistPath(file));
