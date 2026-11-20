import { formatButtonRadiusRule } from './format-button-radius-rule.ts';

export const patchOenButtonRadius = (source: string): string =>
  `${source}\n${formatButtonRadiusRule()}\n`;
