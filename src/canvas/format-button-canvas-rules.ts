import { OEN_CUSTOM_PROPERTY_PREFIX } from '../namespace/consts.ts';
import {
  OEN_BUTTON_CANVAS_BLEND_MODE,
  OEN_BUTTON_CANVAS_HOST_SELECTOR,
  OEN_BUTTON_CANVAS_OPACITY,
  OEN_BUTTON_CANVAS_SELECTOR,
  OEN_BUTTON_CANVAS_Z_INDEX,
} from './consts.ts';

const CANVAS_LAYER_SELECTOR = `${OEN_BUTTON_CANVAS_HOST_SELECTOR} > ${OEN_BUTTON_CANVAS_SELECTOR}`;

const OPACITY = `var(${OEN_CUSTOM_PROPERTY_PREFIX}button-canvas-opacity, ${OEN_BUTTON_CANVAS_OPACITY})`;

const BLEND_MODE = `var(${OEN_CUSTOM_PROPERTY_PREFIX}button-canvas-blend-mode, ${OEN_BUTTON_CANVAS_BLEND_MODE})`;

const SURFACE = `${OEN_BUTTON_CANVAS_HOST_SELECTOR} {\n  isolation: isolate;\n  overflow: hidden;\n}`;

const LAYER = `${CANVAS_LAYER_SELECTOR} {\n  position: absolute;\n  z-index: ${OEN_BUTTON_CANVAS_Z_INDEX};\n  inset: 0;\n  display: block;\n  width: 100%;\n  height: 100%;\n  border-radius: inherit;\n  opacity: ${OPACITY};\n  mix-blend-mode: ${BLEND_MODE};\n  pointer-events: none;\n}`;

export const formatButtonCanvasRules = (): string => `${SURFACE}\n\n${LAYER}`;
