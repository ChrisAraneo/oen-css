import { add, clamp, multiply, subtract } from 'lodash-es';
import { pipe } from 'remeda';
import { match, P } from 'ts-pattern';
import {
  OEN_BUTTON_LIGHTNESS_CEILING,
  OEN_BUTTON_LIGHTNESS_FLOOR,
} from '../consts.ts';
import type { ButtonPalette } from '../types/button-palette.ts';
import type { ButtonPressBand } from '../types/button-press-band.ts';

const toLimit = (lightnessShift: number): number =>
  match(lightnessShift)
    .with(P.number.negative(), () => OEN_BUTTON_LIGHTNESS_FLOOR)
    .otherwise(() => OEN_BUTTON_LIGHTNESS_CEILING);

const toShiftedLightness = (
  lightness: number,
  lightnessShift: number,
): number =>
  add(
    lightness,
    multiply(
      Math.abs(lightnessShift),
      subtract(toLimit(lightnessShift), lightness),
    ),
  );

export const toButtonPressPalette = (
  { hue, saturation, lightness }: ButtonPalette,
  { lightnessShift }: ButtonPressBand,
): ButtonPalette =>
  pipe(toShiftedLightness(lightness, lightnessShift), (shifted) => ({
    hue,
    saturation,
    lightness: clamp(
      shifted,
      OEN_BUTTON_LIGHTNESS_FLOOR,
      OEN_BUTTON_LIGHTNESS_CEILING,
    ),
  }));
