import { OEN_CUSTOM_PROPERTY_PREFIX } from '../../namespace/consts.ts';
import { OEN_BUTTON_SHADOW_LIGHTNESS } from '../consts.ts';
import type { ButtonShadowLayer } from '../types/button-shadow-layer.ts';

const BUTTON_HUE = `var(${OEN_CUSTOM_PROPERTY_PREFIX}button-h)`;

const BUTTON_SATURATION = `var(${OEN_CUSTOM_PROPERTY_PREFIX}button-s)`;

export const formatShadowLayer = ({
  offset,
  blur,
  opacity,
}: ButtonShadowLayer): string =>
  `${offset} ${blur} hsla(${BUTTON_HUE}, ${BUTTON_SATURATION}, ${OEN_BUTTON_SHADOW_LIGHTNESS}, ${opacity})`;
