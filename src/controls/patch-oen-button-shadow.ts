import { formatButtonShadowRules } from './format-button-shadow-rules.ts';

export const patchOenButtonShadow = (source: string): string =>
  `${source}\n${formatButtonShadowRules()}\n`;
