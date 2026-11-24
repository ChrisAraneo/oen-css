import { toRatio } from '../common/to-ratio.ts';
import {
  GENERAL_TEXT_SIZE_IN_PIXELS,
  GLOBAL_LINE_HEIGHT_IN_PIXELS,
} from '../typography/consts.ts';
import { toControlEm } from './internal/to-control-em.ts';
import type { ButtonShadowLayer } from './types/button-shadow-layer.ts';
import type { ThemeControlDeclaration } from './types/theme-control-declaration.ts';

const BUTTON_PADDING_VERTICAL_IN_PIXELS = 9;

const BUTTON_PADDING_HORIZONTAL_IN_PIXELS = 22;

const BUTTON_RADIUS_IN_PIXELS = 20;

const BUTTON_PRESS_DEPTH_IN_PIXELS = 1;

export const OEN_BUTTON_RADIUS: string = `${BUTTON_RADIUS_IN_PIXELS}px`;

export const OEN_BUTTON_LETTER_SPACING = '0.75px';

export const OEN_BUTTON_PRESS_REST = '0';

export const OEN_BUTTON_PRESS_DEPTH: string = toControlEm(
  BUTTON_PRESS_DEPTH_IN_PIXELS,
);

export const OEN_BUTTON_TEXT_TRANSFORM = 'uppercase';

export const OEN_BUTTON_BORDER_WIDTH = '2px';

export const OEN_BUTTON_BORDER_OPACITY: number = 0.2;

export const OEN_BUTTON_SHADOW_LIGHTNESS = '45%';

export const OEN_BUTTON_SHADOW_LAYERS: readonly ButtonShadowLayer[] =
  Object.freeze([
    { offset: '0 0', blur: '8px', opacity: 0.08 },
    { offset: '0 2px', blur: '10px', opacity: 0.08 },
    { offset: '0 8px', blur: '24px', opacity: 0.06 },
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
