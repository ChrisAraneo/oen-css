import { multiply } from 'lodash-es';
import type { ButtonPressBand } from '../types/button-press-band.ts';
import { toButtonPressStrength } from './to-button-press-strength.ts';

export const toButtonPressAlpha = (
  { alpha }: ButtonPressBand,
  press: number,
): number => multiply(alpha, toButtonPressStrength(press));
