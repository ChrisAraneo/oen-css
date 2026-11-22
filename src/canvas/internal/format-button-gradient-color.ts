import type { ButtonPalette } from '../types/button-palette.ts';

export const formatButtonGradientColor = (
  { hue, saturation, lightness }: ButtonPalette,
  alpha: number,
): string => `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
