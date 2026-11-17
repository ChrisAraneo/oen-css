import { every } from 'lodash-es';
import { isThemedDeclaration } from './is-themed-declaration.ts';
import type { StylesheetDifference } from './types/stylesheet-difference.ts';

export const isThemedDifference = ({
  ours,
  theirs,
}: StylesheetDifference): boolean =>
  every([ours, theirs], (line) => isThemedDeclaration(line));
