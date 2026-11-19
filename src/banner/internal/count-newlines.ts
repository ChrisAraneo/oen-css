import { size, split } from 'lodash-es';

const LINE_WITHOUT_NEWLINE = 1;

export const countNewlines = (text: string): number =>
  size(split(text, '\n')) - LINE_WITHOUT_NEWLINE;
