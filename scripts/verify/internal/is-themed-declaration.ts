import { some, startsWith, trim } from 'lodash-es';
import { THEMED_DECLARATION_PREFIXES } from './consts.ts';

export const isThemedDeclaration = (line: string | undefined): boolean =>
  some(THEMED_DECLARATION_PREFIXES, (prefix) => startsWith(trim(line), prefix));
