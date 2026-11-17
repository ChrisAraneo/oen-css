import { toEm } from './internal/to-em.ts';
import { toRem } from './internal/to-rem.ts';
import { toUnitlessLineHeight } from './internal/to-unitless-line-height.ts';
import type { ThemeColor } from './types/theme-color.ts';
import type { ThemeFontProperty } from './types/theme-font-property.ts';
import type { ThemeTypeDeclaration } from './types/theme-type-declaration.ts';

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

const GENERAL_TEXT_SIZE_IN_PIXELS = 14;
const META_TEXT_SIZE_IN_PIXELS = 12;
const BODY_LINE_HEIGHT_IN_PIXELS = 20;

const OEN_TYPE_SCALE_STEPS: readonly ThemeTypeDeclaration[] = Object.freeze([
  { property: 'size-1', value: toRem(28) },
  { property: 'size-2', value: toRem(24) },
  { property: 'size-3', value: toRem(21) },
  { property: 'size-4', value: toRem(18) },
  { property: 'size-5', value: toRem(16) },
  { property: 'size-6', value: toRem(GENERAL_TEXT_SIZE_IN_PIXELS) },
  { property: 'size-7', value: toRem(META_TEXT_SIZE_IN_PIXELS) },
]);

const OEN_DERIVED_CONTROL_SIZES: readonly ThemeTypeDeclaration[] =
  Object.freeze([
    { property: 'size-small', value: toRem(META_TEXT_SIZE_IN_PIXELS) },
    { property: 'size-normal', value: toRem(GENERAL_TEXT_SIZE_IN_PIXELS) },
    { property: 'size-medium', value: toRem(16) },
    { property: 'size-large', value: toRem(18) },
  ]);

const OEN_BASE_TEXT_METRICS: readonly ThemeTypeDeclaration[] = Object.freeze([
  { property: 'body-font-size', value: toEm(GENERAL_TEXT_SIZE_IN_PIXELS) },
  {
    property: 'body-line-height',
    value: toUnitlessLineHeight(
      BODY_LINE_HEIGHT_IN_PIXELS,
      GENERAL_TEXT_SIZE_IN_PIXELS,
    ),
  },
  { property: 'small-font-size', value: toRem(META_TEXT_SIZE_IN_PIXELS) },
]);

export const OEN_TYPE_DECLARATIONS: readonly ThemeTypeDeclaration[] =
  Object.freeze([
    ...OEN_TYPE_SCALE_STEPS,
    ...OEN_DERIVED_CONTROL_SIZES,
    ...OEN_BASE_TEXT_METRICS,
  ]);
