import { resolve } from 'node:path';
import { DIST_DIRECTORY } from '../../consts.ts';
import type { DistFile } from '../types/dist-file.ts';

export const toDistPath = (file: DistFile): string => resolve(DIST_DIRECTORY, file);
