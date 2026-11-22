import { pipe } from 'remeda';
import { match, P } from 'ts-pattern';
import { runEffect } from '../../common/run-effect.ts';
import { OEN_BUTTON_CANVAS_ORIGIN } from '../consts.ts';
import { getButtonCanvasContext } from './get-button-canvas-context.ts';

const { nullish } = P;

export const clearButtonCanvas = (
  canvas: HTMLCanvasElement,
): HTMLCanvasElement =>
  match(getButtonCanvasContext(canvas))
    .with(nullish, () => canvas)
    .otherwise((context) =>
      pipe(
        context,
        (context) => runEffect(context, () => context.resetTransform()),
        (context) =>
          runEffect(context, () =>
            context.clearRect(
              OEN_BUTTON_CANVAS_ORIGIN,
              OEN_BUTTON_CANVAS_ORIGIN,
              canvas.width,
              canvas.height,
            ),
          ),
        () => canvas,
      ),
    );
