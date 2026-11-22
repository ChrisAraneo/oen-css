import { divide, map, size, subtract } from 'lodash-es';
import { pipe } from 'remeda';
import { runEffect } from '../../common/run-effect.ts';
import {
  OEN_BUTTON_CANVAS_ORIGIN,
  OEN_BUTTON_GRADIENT_FULL_ALPHA,
  OEN_BUTTON_GRADIENT_SOURCE_HEIGHT,
  OEN_BUTTON_GRADIENT_STOPS,
} from '../consts.ts';
import type { ButtonPalette } from '../types/button-palette.ts';
import { formatButtonGradientColor } from './format-button-gradient-color.ts';
import { toButtonGradientTintPalette } from './to-button-gradient-tint-palette.ts';

const ONE_STOP = 1;

const LAST_STOP_INDEX = Math.max(
  subtract(size(OEN_BUTTON_GRADIENT_STOPS), ONE_STOP),
  ONE_STOP,
);

export const createButtonGradientTintFill = (
  context: CanvasRenderingContext2D,
  palette: ButtonPalette,
): CanvasGradient =>
  pipe(
    context.createLinearGradient(
      OEN_BUTTON_CANVAS_ORIGIN,
      OEN_BUTTON_CANVAS_ORIGIN,
      OEN_BUTTON_CANVAS_ORIGIN,
      OEN_BUTTON_GRADIENT_SOURCE_HEIGHT,
    ),
    (gradient) =>
      runEffect(gradient, () =>
        map(OEN_BUTTON_GRADIENT_STOPS, (stop, index) =>
          gradient.addColorStop(
            divide(index, LAST_STOP_INDEX),
            formatButtonGradientColor(
              toButtonGradientTintPalette(palette, stop),
              OEN_BUTTON_GRADIENT_FULL_ALPHA,
            ),
          ),
        ),
      ),
  );
