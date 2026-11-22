import { add, subtract } from 'lodash-es';
import { match } from 'ts-pattern';
import { OEN_BUTTON_GRADIENT_SHIFT } from '../consts.ts';
import type { ButtonGradientStop } from '../types/button-gradient-stop.ts';
import type { ButtonPalette } from '../types/button-palette.ts';

const toLightness = (
  lightness: number,
  { direction, limit }: ButtonGradientStop,
): number =>
  match(direction)
    .with('lighter', () =>
      Math.min(add(lightness, OEN_BUTTON_GRADIENT_SHIFT), limit),
    )
    .with('darker', () =>
      Math.max(subtract(lightness, OEN_BUTTON_GRADIENT_SHIFT), limit),
    )
    .exhaustive();

export const toButtonGradientTintPalette = (
  { hue, saturation, lightness }: ButtonPalette,
  stop: ButtonGradientStop,
): ButtonPalette => ({
  hue,
  saturation,
  lightness: toLightness(lightness, stop),
});
