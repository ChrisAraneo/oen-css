import type { NumberedLine } from './numbered-line.ts';

export interface LeftoverLines {
  readonly fileName: string;
  readonly lines: readonly NumberedLine[];
}
