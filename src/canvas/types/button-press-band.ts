import type { ButtonPressSide } from './button-press-side.ts';

export interface ButtonPressBand {
  readonly side: ButtonPressSide;
  readonly depth: number;
  readonly lightnessShift: number;
  readonly alpha: number;
}
