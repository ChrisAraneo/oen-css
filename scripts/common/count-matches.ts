import { size } from 'lodash-es';

export const countMatches = (text: string, pattern: RegExp): number =>
  size(text.match(pattern) ?? []);
