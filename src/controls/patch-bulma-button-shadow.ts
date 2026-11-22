import { escapeRegExp, replace } from 'lodash-es';
import { formatButtonShadowRules } from './format-button-shadow-rules.ts';

const NOTHING = '';

const BUTTON_SHADOW_RULES_AT_END = new RegExp(
  `\n*${escapeRegExp(formatButtonShadowRules())}$`,
);

export const patchBulmaButtonShadow = (css: string): string =>
  replace(css, BUTTON_SHADOW_RULES_AT_END, NOTHING);
