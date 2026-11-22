import type { BuildOptions } from 'esbuild';
import { resolve } from 'node:path';
import { SRC_DIRECTORY } from '../../consts.ts';

export const OEN_RUNTIME_ENTRY: string = resolve(
  SRC_DIRECTORY,
  'canvas',
  'oen-runtime.ts',
);

export const RUNTIME_BUILD_OPTIONS: Readonly<BuildOptions> = Object.freeze({
  entryPoints: [OEN_RUNTIME_ENTRY],
  bundle: true,
  write: false,
  format: 'iife',
  platform: 'browser',
  target: 'es2020',
  legalComments: 'none',
  charset: 'utf8',
});
