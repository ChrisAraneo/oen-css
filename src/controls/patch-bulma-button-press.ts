import { escapeRegExp, replace } from 'lodash-es';
import { formatButtonPressRule } from './format-button-press-rule.ts';

const NOTHING = '';

const BUTTON_PRESS_RULE_AT_END = new RegExp(
  `\n*${escapeRegExp(formatButtonPressRule())}$`,
);

export const patchBulmaButtonPress = (css: string): string =>
  replace(css, BUTTON_PRESS_RULE_AT_END, NOTHING);
