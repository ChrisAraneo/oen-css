import { OEN_CUSTOM_PROPERTY_PREFIX } from '../namespace/consts.ts';
import { OEN_BUTTON_PRESS_DEPTH, OEN_BUTTON_PRESS_REST } from './consts.ts';

const BUTTON_SELECTOR = '.button';

const PRESS_PROPERTY = `${OEN_CUSTOM_PROPERTY_PREFIX}button-press`;

const DEPTH_PROPERTY = `${OEN_CUSTOM_PROPERTY_PREFIX}button-press-depth`;

const PADDING = `var(${OEN_CUSTOM_PROPERTY_PREFIX}button-padding-vertical) - var(${OEN_CUSTOM_PROPERTY_PREFIX}button-border-width)`;

const SHIFT = `var(${PRESS_PROPERTY}) * var(${DEPTH_PROPERTY})`;

export const formatButtonPressRule = (): string =>
  `${BUTTON_SELECTOR} {\n  ${PRESS_PROPERTY}: ${OEN_BUTTON_PRESS_REST};\n  ${DEPTH_PROPERTY}: ${OEN_BUTTON_PRESS_DEPTH};\n  padding-bottom: calc(${PADDING} - ${SHIFT});\n  padding-top: calc(${PADDING} + ${SHIFT});\n}`;
