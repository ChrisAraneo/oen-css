import { escapeRegExp, replace } from 'lodash-es';
import { formatButtonBorderRules } from './format-button-border-rules.ts';

const NOTHING = '';

const BUTTON_BORDER_RULES_AT_END = new RegExp(
  `\n*${escapeRegExp(formatButtonBorderRules())}$`,
);

export const patchBulmaButtonBorder = (css: string): string =>
  replace(css, BUTTON_BORDER_RULES_AT_END, NOTHING);
