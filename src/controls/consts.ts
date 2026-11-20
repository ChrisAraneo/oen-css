import { toRatio } from '../common/to-ratio.ts';
import {
  GENERAL_TEXT_SIZE_IN_PIXELS,
  GLOBAL_LINE_HEIGHT_IN_PIXELS,
} from '../typography/consts.ts';
import { toControlEm } from './internal/to-control-em.ts';
import type { ThemeControlDeclaration } from './types/theme-control-declaration.ts';

const BUTTON_PADDING_VERTICAL_IN_PIXELS = 9;

const BUTTON_PADDING_HORIZONTAL_IN_PIXELS = 22;

const BUTTON_RADIUS_IN_PIXELS = 20;

export const OEN_BUTTON_RADIUS: string = `${BUTTON_RADIUS_IN_PIXELS}px`;

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
