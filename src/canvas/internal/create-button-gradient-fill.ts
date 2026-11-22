import { divide, map, multiply } from 'lodash-es';
import { pipe } from 'remeda';
import { runEffect } from '../../common/run-effect.ts';
import {
  OEN_BUTTON_CANVAS_ORIGIN,
  OEN_BUTTON_GRADIENT_PERCENT,
  OEN_BUTTON_GRADIENT_RAMP,
} from '../consts.ts';
import type { ButtonPalette } from '../types/button-palette.ts';
import { formatButtonGradientColor } from './format-button-gradient-color.ts';

const NO_RADIUS = 0;

const UNIT_RADIUS = 1;

const toStopOffset = (falloff: number, position: number): number =>
  multiply(divide(falloff, OEN_BUTTON_GRADIENT_PERCENT), position);

export const createButtonGradientFill = (
  context: CanvasRenderingContext2D,
  palette: ButtonPalette,
  falloff: number,
): CanvasGradient =>
  pipe(
    context.createRadialGradient(
      OEN_BUTTON_CANVAS_ORIGIN,
      OEN_BUTTON_CANVAS_ORIGIN,
      NO_RADIUS,
      OEN_BUTTON_CANVAS_ORIGIN,
      OEN_BUTTON_CANVAS_ORIGIN,
      UNIT_RADIUS,
    ),
    (gradient) =>
      runEffect(gradient, () =>
        map(OEN_BUTTON_GRADIENT_RAMP, ({ position, alpha }) =>
          gradient.addColorStop(
            toStopOffset(falloff, position),
            formatButtonGradientColor(palette, alpha),
          ),
        ),
      ),
  );
