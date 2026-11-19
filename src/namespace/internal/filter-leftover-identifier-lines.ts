import { filter } from 'lodash-es';
import type { LeftoverLines } from './types/leftover-lines.ts';

const BULMA_IDENTIFIER = /bulma/i;

export const filterLeftoverIdentifierLines = ({
  fileName,
  lines,
}: LeftoverLines): LeftoverLines => ({
  fileName,
  lines: filter(lines, ({ line }) => BULMA_IDENTIFIER.test(line)),
});
