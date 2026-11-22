import type { ButtonGradientDirection } from './button-gradient-direction.ts';

export interface ButtonGradientStop {
  readonly direction: ButtonGradientDirection;
  readonly limit: number;
}
