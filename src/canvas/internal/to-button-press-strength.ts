import { subtract } from 'lodash-es';
import {
  OEN_BUTTON_PRESS_EASE_EXPONENT,
  OEN_BUTTON_PRESS_FULL_PROGRESS,
} from '../consts.ts';

export const toButtonPressStrength = (press: number): number =>
  subtract(
    OEN_BUTTON_PRESS_FULL_PROGRESS,
    Math.pow(
      subtract(OEN_BUTTON_PRESS_FULL_PROGRESS, press),
      OEN_BUTTON_PRESS_EASE_EXPONENT,
    ),
  );
