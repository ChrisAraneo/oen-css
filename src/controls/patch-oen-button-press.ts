import { formatButtonPressRule } from './format-button-press-rule.ts';

export const patchOenButtonPress = (source: string): string =>
  `${source}\n${formatButtonPressRule()}\n`;
