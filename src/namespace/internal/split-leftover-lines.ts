import { map, split, trim } from 'lodash-es';
import { patchBlankedStylesheetHeader } from '../../banner/patch-blanked-stylesheet-header.ts';
import type { LeftoverLines } from './types/leftover-lines.ts';

const FIRST_LINE_NUMBER = 1;

export const splitLeftoverLines = ({
  css,
  fileName,
}: {
  readonly css: string;
  readonly fileName: string;
}): LeftoverLines => ({
  fileName,
  lines: map(split(patchBlankedStylesheetHeader(css), '\n'), (line, index) => ({
    line: trim(line),
    number: index + FIRST_LINE_NUMBER,
  })),
});
