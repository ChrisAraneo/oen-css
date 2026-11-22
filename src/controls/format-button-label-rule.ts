import {
  OEN_BUTTON_LETTER_SPACING,
  OEN_BUTTON_TEXT_TRANSFORM,
} from './consts.ts';

const BUTTON_SELECTOR = '.button';

export const formatButtonLabelRule = (): string =>
  `${BUTTON_SELECTOR} {\n  letter-spacing: ${OEN_BUTTON_LETTER_SPACING};\n  text-transform: ${OEN_BUTTON_TEXT_TRANSFORM};\n}`;
