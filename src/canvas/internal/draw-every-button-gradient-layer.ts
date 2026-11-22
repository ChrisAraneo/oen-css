import { map } from 'lodash-es';
import { pipe } from 'remeda';
import { runEffect } from '../../common/run-effect.ts';
import {
  OEN_BUTTON_CANVAS_STACK_OPERATION,
  OEN_BUTTON_GRADIENT_LAYERS,
  OEN_BUTTON_GRADIENT_OPACITY,
} from '../consts.ts';
import type { ButtonGradientDrift } from '../types/button-gradient-drift.ts';
import type { ButtonPalette } from '../types/button-palette.ts';
import { drawButtonGradientLayer } from './draw-button-gradient-layer.ts';

export const drawEveryButtonGradientLayer = (
  context: CanvasRenderingContext2D,
  palette: ButtonPalette,
  drift: ButtonGradientDrift,
): readonly CanvasRenderingContext2D[] =>
  pipe(
    context,
    (context) =>
      runEffect(
        context,
        () => (context.globalAlpha = OEN_BUTTON_GRADIENT_OPACITY),
      ),
    (context) =>
      runEffect(
        context,
        () =>
          (context.globalCompositeOperation =
            OEN_BUTTON_CANVAS_STACK_OPERATION),
      ),
    (context) =>
      map(OEN_BUTTON_GRADIENT_LAYERS, (layer) =>
        drawButtonGradientLayer(context, palette, layer, drift),
      ),
  );
