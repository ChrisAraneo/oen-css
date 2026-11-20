import { toEm } from './internal/to-em.ts';
import { toRem } from './internal/to-rem.ts';
import { toUnitlessLineHeight } from './internal/to-unitless-line-height.ts';
import type { ThemeTypeDeclaration } from './types/theme-type-declaration.ts';

export const GENERAL_TEXT_SIZE_IN_PIXELS = 14;

const META_TEXT_SIZE_IN_PIXELS = 12;

export const GLOBAL_LINE_HEIGHT_IN_PIXELS = 22;

const OEN_TYPE_SCALE_STEPS: readonly ThemeTypeDeclaration[] = Object.freeze([
  { property: 'size-1', value: toRem(28) },
  { property: 'size-2', value: toRem(24) },
  { property: 'size-3', value: toRem(21) },
  { property: 'size-4', value: toRem(18) },
  { property: 'size-5', value: toRem(16) },
  { property: 'size-6', value: toRem(GENERAL_TEXT_SIZE_IN_PIXELS) },
  { property: 'size-7', value: toRem(META_TEXT_SIZE_IN_PIXELS) },
]);

const OEN_BASE_TEXT_METRICS: readonly ThemeTypeDeclaration[] = Object.freeze([
  { property: 'body-font-size', value: toEm(GENERAL_TEXT_SIZE_IN_PIXELS) },
  {
    property: 'body-line-height',
    value: toUnitlessLineHeight(
      GLOBAL_LINE_HEIGHT_IN_PIXELS,
      GENERAL_TEXT_SIZE_IN_PIXELS,
    ),
  },
  { property: 'small-font-size', value: toRem(META_TEXT_SIZE_IN_PIXELS) },
]);

const OEN_DERIVED_CONTROL_SIZES: readonly ThemeTypeDeclaration[] =
  Object.freeze([
    { property: 'size-small', value: toRem(META_TEXT_SIZE_IN_PIXELS) },
    { property: 'size-normal', value: toRem(GENERAL_TEXT_SIZE_IN_PIXELS) },
    { property: 'size-medium', value: toRem(16) },
    { property: 'size-large', value: toRem(18) },
  ]);

export const OEN_TYPE_VARIABLES: readonly ThemeTypeDeclaration[] =
  Object.freeze([...OEN_TYPE_SCALE_STEPS, ...OEN_BASE_TEXT_METRICS]);

export const OEN_TYPE_DECLARATIONS: readonly ThemeTypeDeclaration[] =
  Object.freeze([
    ...OEN_TYPE_SCALE_STEPS,
    ...OEN_DERIVED_CONTROL_SIZES,
    ...OEN_BASE_TEXT_METRICS,
  ]);
