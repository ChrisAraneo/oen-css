import { toRatio } from '../common/to-ratio.ts';
import {
  GENERAL_TEXT_SIZE_IN_PIXELS,
  GLOBAL_LINE_HEIGHT_IN_PIXELS,
} from '../typography/consts.ts';
import { toControlEm } from './internal/to-control-em.ts';
import type { ButtonGlassLayer } from './types/button-glass-layer.ts';
import type { ButtonGradientStop } from './types/button-gradient-stop.ts';
import type { ButtonShadowLayer } from './types/button-shadow-layer.ts';
import type { ThemeControlDeclaration } from './types/theme-control-declaration.ts';

const BUTTON_PADDING_VERTICAL_IN_PIXELS = 9;

const BUTTON_PADDING_HORIZONTAL_IN_PIXELS = 22;

const BUTTON_RADIUS_IN_PIXELS = 20;

export const OEN_BUTTON_RADIUS: string = `${BUTTON_RADIUS_IN_PIXELS}px`;

export const OEN_BUTTON_LETTER_SPACING = '0.75px';

export const OEN_BUTTON_TEXT_TRANSFORM = 'uppercase';

export const OEN_BUTTON_BORDER_WIDTH = '2px';

export const OEN_BUTTON_BORDER_OPACITY: number = 0.2;

export const OEN_BUTTON_GRADIENT_SHIFT = '14%';

export const OEN_BUTTON_GRADIENT_STOPS: readonly ButtonGradientStop[] =
  Object.freeze([
    { direction: 'lighter', limit: '93%' },
    { direction: 'darker', limit: '8%' },
  ]);

export const OEN_BUTTON_SHADOW_LIGHTNESS = '45%';

export const OEN_BUTTON_SHADOW_LAYERS: readonly ButtonShadowLayer[] =
  Object.freeze([
    { offset: '0 0', blur: '8px', opacity: 0.08 },
    { offset: '0 2px', blur: '10px', opacity: 0.08 },
    { offset: '0 8px', blur: '24px', opacity: 0.06 },
  ]);

export const OEN_BUTTON_SATURATED_VARIANTS: readonly string[] = Object.freeze([
  'black',
  'dark',
]);

export const OEN_BUTTON_GLASS_ANIMATION = 'oen-button-glass';

export const OEN_BUTTON_GLASS_SPREAD = '-105%';

export const OEN_BUTTON_GLASS_BLUR = '20px';

export const OEN_BUTTON_GLASS_SATURATION_BOOST = '75%';

export const OEN_BUTTON_GLASS_OPACITY: number = 0.7;

export const OEN_BUTTON_GLASS_STRONG_OPACITY: number = 0.95;

export const OEN_BUTTON_GLASS_ZOOM_FROM: number = 1;

export const OEN_BUTTON_GLASS_ZOOM_TO: number = 1.15;

export const OEN_BUTTON_GLASS_DURATION = '10s';

export const OEN_BUTTON_GLASS_LAYERS: readonly ButtonGlassLayer[] =
  Object.freeze([
    { offset: 34, size: '86% 112%', position: '20% 26%', falloff: '72%' },
    { offset: -28, size: '100% 126%', position: '74% 20%', falloff: '72%' },
    { offset: 20, size: '110% 100%', position: '70% 80%', falloff: '72%' },
    { offset: -39, size: '96% 116%', position: '16% 74%', falloff: '72%' },
    { offset: 59, size: '38% 46%', position: '50% 8%', falloff: '62%' },
    { offset: 50, size: '43% 38%', position: '85% 60%', falloff: '62%' },
  ]);

export const OEN_CONTROL_DECLARATIONS: readonly ThemeControlDeclaration[] =
  Object.freeze([
    {
      property: 'control-line-height',
      value: toRatio(GLOBAL_LINE_HEIGHT_IN_PIXELS, GENERAL_TEXT_SIZE_IN_PIXELS),
    },
    {
      property: 'button-padding-vertical',
      value: toControlEm(BUTTON_PADDING_VERTICAL_IN_PIXELS),
    },
    {
      property: 'button-padding-horizontal',
      value: toControlEm(BUTTON_PADDING_HORIZONTAL_IN_PIXELS),
    },
  ]);
