import { OEN_BUTTON_RADIUS } from './consts.ts';

const BUTTON_SELECTOR = '.button';

export const formatButtonRadiusRule = (): string =>
  `${BUTTON_SELECTOR} {\n  border-radius: ${OEN_BUTTON_RADIUS};\n}`;
