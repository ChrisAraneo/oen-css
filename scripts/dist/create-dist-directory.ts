import { mkdir } from 'node:fs/promises';
import { DIST_DIRECTORY } from '../consts.ts';

export const createDistDirectory = (): Promise<string | undefined> => mkdir(DIST_DIRECTORY, { recursive: true });
