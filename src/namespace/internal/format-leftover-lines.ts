import { map } from 'lodash-es';
import type { LeftoverLines } from './types/leftover-lines.ts';

export const formatLeftoverLines = ({
  fileName,
  lines,
}: LeftoverLines): readonly string[] =>
  map(lines, ({ line, number }) => `  ${fileName}:${number}: ${line}`);
