import type { ThemeColor } from './types/theme-color.ts';
import type { ThemeFontProperty } from './types/theme-font-property.ts';

export const OEN_THEME_COLORS: readonly ThemeColor[] = Object.freeze([
  { name: 'primary', hex: '#47b27b' },
  { name: 'link', hex: '#b24795' },
  { name: 'info', hex: '#479db2' },
  { name: 'success', hex: '#47b247' },
  { name: 'warning', hex: '#b26747' },
  { name: 'danger', hex: '#b24747' },
]);

export const OEN_FONT_STACK =
  '"Trebuchet MS", Seravek, "Gill Sans Nova", "Segoe UI", Ubuntu, Calibri, "Noto Sans", "DejaVu Sans", sans-serif';

export const OEN_FONT_PROPERTIES: readonly ThemeFontProperty[] = Object.freeze([
  'family-primary',
  'family-secondary',
]);
