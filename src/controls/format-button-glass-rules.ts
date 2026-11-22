import { join, map } from 'lodash-es';
import {
  OEN_BUTTON_GLASS_ANIMATION,
  OEN_BUTTON_GLASS_BLUR,
  OEN_BUTTON_GLASS_DURATION,
  OEN_BUTTON_GLASS_LAYERS,
  OEN_BUTTON_GLASS_OPACITY,
  OEN_BUTTON_GLASS_SPREAD,
  OEN_BUTTON_GLASS_STRONG_OPACITY,
  OEN_BUTTON_GLASS_ZOOM_FROM,
  OEN_BUTTON_GLASS_ZOOM_TO,
} from './consts.ts';
import { formatGlassLayer } from './internal/format-glass-layer.ts';
import { formatSaturatedVariantSelector } from './internal/format-saturated-variant-selector.ts';

const GLASS_BUTTON_SELECTOR = '.button:where(:not(.is-ghost, .is-text))';

const LAYER_SEPARATOR = ', ';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const DRIFT = `@keyframes ${OEN_BUTTON_GLASS_ANIMATION} {\n  0% {\n    transform: translate3d(-6%, -5%, 0) rotate(0turn) scale(${OEN_BUTTON_GLASS_ZOOM_FROM});\n  }\n  50% {\n    transform: translate3d(6%, 5%, 0) rotate(0.5turn) scale(${OEN_BUTTON_GLASS_ZOOM_TO});\n  }\n  100% {\n    transform: translate3d(-6%, -5%, 0) rotate(1turn) scale(${OEN_BUTTON_GLASS_ZOOM_FROM});\n  }\n}`;

const SURFACE = `${GLASS_BUTTON_SELECTOR} {\n  isolation: isolate;\n  overflow: hidden;\n}`;

const STRONG = `${formatSaturatedVariantSelector()}::before {
  opacity: ${OEN_BUTTON_GLASS_STRONG_OPACITY};
}`;

const STILL = `@media ${REDUCED_MOTION_QUERY} {\n  ${GLASS_BUTTON_SELECTOR}::before {\n    animation: none;\n  }\n}`;

export const formatButtonGlassRules = (): string =>
  `${DRIFT}\n${SURFACE}\n\n${GLASS_BUTTON_SELECTOR}::before {\n  content: "";\n  position: absolute;\n  z-index: -1;\n  inset: ${OEN_BUTTON_GLASS_SPREAD};\n  background-image: ${join(map(OEN_BUTTON_GLASS_LAYERS, formatGlassLayer), LAYER_SEPARATOR)};\n  filter: blur(${OEN_BUTTON_GLASS_BLUR});\n  opacity: ${OEN_BUTTON_GLASS_OPACITY};\n  pointer-events: none;\n  animation: ${OEN_BUTTON_GLASS_DURATION} linear infinite ${OEN_BUTTON_GLASS_ANIMATION};\n}\n\n${STRONG}\n\n${STILL}`;
