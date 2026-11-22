import { formatButtonLabelRule } from './format-button-label-rule.ts';

export const patchOenButtonLabel = (source: string): string =>
  `${source}\n${formatButtonLabelRule()}\n`;
