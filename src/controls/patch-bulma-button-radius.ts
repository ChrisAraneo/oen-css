import { escapeRegExp, replace } from 'lodash-es';
import { formatButtonRadiusRule } from './format-button-radius-rule.ts';

const NOTHING = '';

const BUTTON_RADIUS_RULE_AT_END = new RegExp(
  `\\n*${escapeRegExp(formatButtonRadiusRule())}$`,
);

export const patchBulmaButtonRadius = (css: string): string =>
  replace(css, BUTTON_RADIUS_RULE_AT_END, NOTHING);
