import { pipe } from 'remeda';
import { match, P } from 'ts-pattern';
import { runEffect } from '../../common/run-effect.ts';
import {
  OEN_BUTTON_CANVAS_ORIGIN,
  OEN_BUTTON_CANVAS_REPLACE_OPERATION,
  OEN_BUTTON_GRADIENT_FULL_ALPHA,
  OEN_BUTTON_GRADIENT_SOURCE_HEIGHT,
  OEN_BUTTON_GRADIENT_SOURCE_WIDTH,
} from '../consts.ts';
import type { ButtonPalette } from '../types/button-palette.ts';
import { formatButtonGradientColor } from './format-button-gradient-color.ts';

const { nullish } = P;

const drawMetalImage = (
  context: CanvasRenderingContext2D,
  metal: HTMLCanvasElement,
): CanvasRenderingContext2D =>
  runEffect(context, () =>
    context.drawImage(
      metal,
      OEN_BUTTON_CANVAS_ORIGIN,
      OEN_BUTTON_CANVAS_ORIGIN,
      OEN_BUTTON_GRADIENT_SOURCE_WIDTH,
      OEN_BUTTON_GRADIENT_SOURCE_HEIGHT,
    ),
  );

const drawMetalFallback = (
  context: CanvasRenderingContext2D,
  palette: ButtonPalette,
): CanvasRenderingContext2D =>
  pipe(
    context,
    (context) =>
      runEffect(
        context,
        () =>
          (context.fillStyle = formatButtonGradientColor(
            palette,
            OEN_BUTTON_GRADIENT_FULL_ALPHA,
          )),
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

export const drawButtonMetal = (
  context: CanvasRenderingContext2D,
  metal: HTMLCanvasElement | undefined,
  palette: ButtonPalette,
): CanvasRenderingContext2D =>
  pipe(
    context,
    (context) => runEffect(context, () => context.resetTransform()),
    (context) =>
      runEffect(
        context,
        () => (context.globalAlpha = OEN_BUTTON_GRADIENT_FULL_ALPHA),
      ),
    (context) =>
      runEffect(
        context,
        () =>
          (context.globalCompositeOperation =
            OEN_BUTTON_CANVAS_REPLACE_OPERATION),
      ),
    (context) =>
      match(metal)
        .with(nullish, () => drawMetalFallback(context, palette))
        .otherwise((metal) => drawMetalImage(context, metal)),
  );
