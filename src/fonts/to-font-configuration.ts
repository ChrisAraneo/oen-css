import { OEN_FONT_STACK } from './consts.ts';

const FONT_STACK_VARIABLE = 'family-sans-serif';

export const toFontConfiguration = (): readonly string[] => [
  `$${FONT_STACK_VARIABLE}: (${OEN_FONT_STACK})`,
];
