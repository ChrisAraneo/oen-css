import { escapeRegExp, replace } from 'lodash-es';
import { formatButtonLabelRule } from './format-button-label-rule.ts';

const NOTHING = '';

const BUTTON_LABEL_RULE_AT_END = new RegExp(
  `\n*${escapeRegExp(formatButtonLabelRule())}$`,
);

export const patchBulmaButtonLabel = (css: string): string =>
  replace(css, BUTTON_LABEL_RULE_AT_END, NOTHING);
