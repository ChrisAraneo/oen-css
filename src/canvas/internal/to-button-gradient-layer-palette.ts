import { add, clamp, divide, multiply } from 'lodash-es';
import {
  OEN_BUTTON_GRADIENT_PERCENT,
  OEN_BUTTON_GRADIENT_SATURATION_BOOST,
  OEN_BUTTON_LIGHTNESS_CEILING,
  OEN_BUTTON_LIGHTNESS_FLOOR,
  OEN_BUTTON_SATURATION_CEILING,
} from '../consts.ts';
import type { ButtonGradientLayer } from '../types/button-gradient-layer.ts';
import type { ButtonPalette } from '../types/button-palette.ts';

const SATURATION_FACTOR = divide(
  add(OEN_BUTTON_GRADIENT_PERCENT, OEN_BUTTON_GRADIENT_SATURATION_BOOST),
  OEN_BUTTON_GRADIENT_PERCENT,
);

export const toButtonGradientLayerPalette = (
  { hue, saturation, lightness }: ButtonPalette,
  { lightnessOffset }: ButtonGradientLayer,
): ButtonPalette => ({
  hue,
  saturation: clamp(
    multiply(saturation, SATURATION_FACTOR),
    OEN_BUTTON_LIGHTNESS_FLOOR,
    OEN_BUTTON_SATURATION_CEILING,
  ),
  lightness: clamp(
    add(lightness, lightnessOffset),
    OEN_BUTTON_LIGHTNESS_FLOOR,
    OEN_BUTTON_LIGHTNESS_CEILING,
  ),
});
