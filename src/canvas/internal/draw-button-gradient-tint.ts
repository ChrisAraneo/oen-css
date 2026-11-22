import { pipe } from 'remeda';
import { runEffect } from '../../common/run-effect.ts';
import {
  OEN_BUTTON_CANVAS_ORIGIN,
  OEN_BUTTON_CANVAS_STACK_OPERATION,
  OEN_BUTTON_GRADIENT_SOURCE_HEIGHT,
  OEN_BUTTON_GRADIENT_SOURCE_WIDTH,
  OEN_BUTTON_GRADIENT_TINT_ALPHA,
} from '../consts.ts';
import type { ButtonPalette } from '../types/button-palette.ts';
import { createButtonGradientTintFill } from './create-button-gradient-tint-fill.ts';

export const drawButtonGradientTint = (
  context: CanvasRenderingContext2D,
  palette: ButtonPalette,
): CanvasRenderingContext2D =>
  pipe(
    context,
    (context) => runEffect(context, () => context.resetTransform()),
    (context) =>
      runEffect(
        context,
        () => (context.globalAlpha = OEN_BUTTON_GRADIENT_TINT_ALPHA),
      ),
    (context) =>
      runEffect(
        context,
        () =>
          (context.globalCompositeOperation =
            OEN_BUTTON_CANVAS_STACK_OPERATION),
      ),
    (context) =>
      runEffect(
        context,
        () =>
          (context.fillStyle = createButtonGradientTintFill(context, palette)),
      ),
    (context) =>
      runEffect(context, () =>
        context.fillRect(
          OEN_BUTTON_CANVAS_ORIGIN,
          OEN_BUTTON_CANVAS_ORIGIN,
          OEN_BUTTON_GRADIENT_SOURCE_WIDTH,
          OEN_BUTTON_GRADIENT_SOURCE_HEIGHT,
        ),
      ),
  );
