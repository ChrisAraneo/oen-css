import { join, map } from 'lodash-es';
import { OEN_CUSTOM_PROPERTY_PREFIX } from '../namespace/consts.ts';
import {
  OEN_BUTTON_BORDER_OPACITY,
  OEN_BUTTON_BORDER_WIDTH,
  OEN_BUTTON_GRADIENT_STOPS,
} from './consts.ts';
import { formatGradientStop } from './internal/format-gradient-stop.ts';

const BORDERED_BUTTON_SELECTOR = '.button:not(.is-ghost):not(.is-text)';

const TINTED_BUTTON_SELECTOR = '.button:where(:not(.is-ghost, .is-text))';

const RINGED_BUTTON_SELECTOR =
  '.button:not(.is-ghost):not(.is-text):not(.is-loading):not(.is-static):not([disabled])';

const MASK_SUPPORT_QUERY =
  '(mask-composite: exclude) or (-webkit-mask-composite: xor)';

const STOP_SEPARATOR = ', ';

const BORDER_WIDTH_PROPERTY = `${OEN_CUSTOM_PROPERTY_PREFIX}button-border-width`;

const BUTTON_HUE = `var(${OEN_CUSTOM_PROPERTY_PREFIX}button-h)`;

const BUTTON_SATURATION = `var(${OEN_CUSTOM_PROPERTY_PREFIX}button-s)`;

const BUTTON_COLOR_LIGHTNESS = `var(${OEN_CUSTOM_PROPERTY_PREFIX}button-color-l)`;

const NO_BORDER = '0px';

const RING_MASK = `  -webkit-mask-image: linear-gradient(#000 0 0), linear-gradient(#000 0 0);\n    mask-image: linear-gradient(#000 0 0), linear-gradient(#000 0 0);\n    -webkit-mask-clip: content-box, border-box;\n    mask-clip: content-box, border-box;\n    -webkit-mask-composite: xor;\n    mask-composite: exclude;`;

const WIDTH = `${BORDERED_BUTTON_SELECTOR} {\n  ${BORDER_WIDTH_PROPERTY}: ${OEN_BUTTON_BORDER_WIDTH};\n}`;

const TINT = `${TINTED_BUTTON_SELECTOR} {\n  border-color: hsla(${BUTTON_HUE}, ${BUTTON_SATURATION}, ${BUTTON_COLOR_LIGHTNESS}, ${OEN_BUTTON_BORDER_OPACITY});\n}`;

const RING = `  ${RINGED_BUTTON_SELECTOR} {\n    ${BORDER_WIDTH_PROPERTY}: ${NO_BORDER};\n  }\n  ${RINGED_BUTTON_SELECTOR}::after {\n    content: "";\n    position: absolute;\n    inset: 0;\n    border-radius: inherit;\n    padding: ${OEN_BUTTON_BORDER_WIDTH};\n    background-image: linear-gradient(to bottom, ${join(map(OEN_BUTTON_GRADIENT_STOPS, formatGradientStop), STOP_SEPARATOR)});\n  ${RING_MASK}\n    pointer-events: none;\n  }`;

export const formatButtonBorderRules = (): string =>
  `${WIDTH}\n\n${TINT}\n\n@supports ${MASK_SUPPORT_QUERY} {\n${RING}\n}`;
