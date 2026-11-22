import { OEN_CUSTOM_PROPERTY_PREFIX } from '../namespace/consts.ts';
import {
  OEN_BUTTON_BORDER_OPACITY,
  OEN_BUTTON_BORDER_WIDTH,
} from './consts.ts';

const BORDERED_BUTTON_SELECTOR = '.button:not(.is-ghost):not(.is-text)';

const TINTED_BUTTON_SELECTOR = '.button:where(:not(.is-ghost, .is-text))';

const BORDER_WIDTH_PROPERTY = `${OEN_CUSTOM_PROPERTY_PREFIX}button-border-width`;

const BUTTON_HUE = `var(${OEN_CUSTOM_PROPERTY_PREFIX}button-h)`;

const BUTTON_SATURATION = `var(${OEN_CUSTOM_PROPERTY_PREFIX}button-s)`;

const BUTTON_COLOR_LIGHTNESS = `var(${OEN_CUSTOM_PROPERTY_PREFIX}button-color-l)`;

const WIDTH = `${BORDERED_BUTTON_SELECTOR} {\n  ${BORDER_WIDTH_PROPERTY}: ${OEN_BUTTON_BORDER_WIDTH};\n}`;

const TINT = `${TINTED_BUTTON_SELECTOR} {\n  border-color: hsla(${BUTTON_HUE}, ${BUTTON_SATURATION}, ${BUTTON_COLOR_LIGHTNESS}, ${OEN_BUTTON_BORDER_OPACITY});\n}`;

export const formatButtonBorderRules = (): string => `${WIDTH}\n\n${TINT}`;
