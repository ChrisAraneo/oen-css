import { join, map } from 'lodash-es';
import { OEN_BUTTON_SHADOW_LAYERS } from './consts.ts';
import { formatShadowLayer } from './internal/format-shadow-layer.ts';

const SHADOW_BUTTON_SELECTOR = '.button:where(:not(.is-ghost, .is-text))';

const LAYER_SEPARATOR = ', ';

export const formatButtonShadowRules = (): string =>
  `${SHADOW_BUTTON_SELECTOR} {\n  box-shadow: ${join(map(OEN_BUTTON_SHADOW_LAYERS, formatShadowLayer), LAYER_SEPARATOR)};\n}`;
