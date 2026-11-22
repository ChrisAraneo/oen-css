import { escapeRegExp, replace } from 'lodash-es';
import { formatButtonGlassRules } from './format-button-glass-rules.ts';

const NOTHING = '';

const BUTTON_GLASS_RULES_AT_END = new RegExp(
  `\n*${escapeRegExp(formatButtonGlassRules())}$`,
);

export const patchBulmaButtonGlass = (css: string): string =>
  replace(css, BUTTON_GLASS_RULES_AT_END, NOTHING);
