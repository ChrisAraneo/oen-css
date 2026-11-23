import { pipe } from 'remeda';
import { match, P } from 'ts-pattern';
import { runEffect } from '../../common/run-effect.ts';
import {
  OEN_BUTTON_CANVAS_ORIGIN,
  OEN_BUTTON_CANVAS_REPLACE_OPERATION,
  OEN_BUTTON_GRADIENT_FULL_ALPHA,
} from '../consts.ts';
import type { ButtonPalette } from '../types/button-palette.ts';
import { drawButtonPress } from './draw-button-press.ts';
import { getButtonCanvasContext } from './get-button-canvas-context.ts';

const { nullish } = P;

export const drawButtonCanvas = (
  canvas: HTMLCanvasElement,
  source: HTMLCanvasElement,
  palette: ButtonPalette,
  pressed: boolean,
): HTMLCanvasElement =>
  match(getButtonCanvasContext(canvas))
    .with(nullish, () => canvas)
    .otherwise((context) =>
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
          runEffect(context, () =>
            context.drawImage(
              source,
              OEN_BUTTON_CANVAS_ORIGIN,
              OEN_BUTTON_CANVAS_ORIGIN,
              canvas.width,
              canvas.height,
            ),
          ),
        () =>
          match(pressed)
            .with(true, () => drawButtonPress(canvas, palette))
            .otherwise(() => canvas),
      ),
    );
