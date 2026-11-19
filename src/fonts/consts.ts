import type { ThemeFontProperty } from './types/theme-font-property.ts';

export const OEN_FONT_STACK =
  '"Trebuchet MS", Seravek, "Gill Sans Nova", "Segoe UI", Ubuntu, Calibri, "Noto Sans", "DejaVu Sans", sans-serif';

export const OEN_FONT_PROPERTIES: readonly ThemeFontProperty[] = Object.freeze([
  'family-primary',
  'family-secondary',
]);
