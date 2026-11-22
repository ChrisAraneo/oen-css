import { add } from 'lodash-es';
import { OEN_BUTTON_GRADIENT_CYCLE } from '../consts.ts';

export const toButtonGradientOffsetPhase = (
  phase: number,
  offset: number,
): number => add(phase, offset) % OEN_BUTTON_GRADIENT_CYCLE;
