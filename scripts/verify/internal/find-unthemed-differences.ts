import { filter } from 'lodash-es';
import { isThemedDifference } from './is-themed-difference.ts';
import type { StylesheetDifference } from './types/stylesheet-difference.ts';

export const findUnthemedDifferences = (
  differences: readonly StylesheetDifference[],
): readonly StylesheetDifference[] =>
  filter(differences, (difference) => !isThemedDifference(difference));
