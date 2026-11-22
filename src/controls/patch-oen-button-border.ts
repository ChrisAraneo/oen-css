import { formatButtonBorderRules } from './format-button-border-rules.ts';

export const patchOenButtonBorder = (source: string): string =>
  `${source}\n${formatButtonBorderRules()}\n`;
