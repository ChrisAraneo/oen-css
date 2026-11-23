import { multiply, subtract } from 'lodash-es';
import {
  OEN_BUTTON_PRESS_EASE_EXPONENT,
  OEN_BUTTON_PRESS_FULL_PROGRESS,
} from '../consts.ts';
import type { ButtonPressBand } from '../types/button-press-band.ts';

const toEasedPress = (press: number): number =>
  subtract(
    OEN_BUTTON_PRESS_FULL_PROGRESS,
    Math.pow(
      subtract(OEN_BUTTON_PRESS_FULL_PROGRESS, press),
      OEN_BUTTON_PRESS_EASE_EXPONENT,
    ),
  );

export const toButtonPressAlpha = (
  { alpha }: ButtonPressBand,
  press: number,
): number => multiply(alpha, toEasedPress(press));
