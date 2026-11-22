import { formatButtonGlassRules } from './format-button-glass-rules.ts';

export const patchOenButtonGlass = (source: string): string =>
  `${source}\n${formatButtonGlassRules()}\n`;
