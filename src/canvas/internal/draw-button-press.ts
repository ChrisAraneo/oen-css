import { pipe } from 'remeda';
import { match, P } from 'ts-pattern';
import { runEffect } from '../../common/run-effect.ts';
import type { ButtonPalette } from '../types/button-palette.ts';
import { drawEveryButtonPressBand } from './draw-every-button-press-band.ts';
import { getButtonCanvasContext } from './get-button-canvas-context.ts';

const { nullish } = P;

export const drawButtonPress = (
  canvas: HTMLCanvasElement,
  palette: ButtonPalette,
): HTMLCanvasElement =>
  match(getButtonCanvasContext(canvas))
    .with(nullish, () => canvas)
    .otherwise((context) =>
      pipe(
        context,
        (context) => runEffect(context, () => context.resetTransform()),
        (context) =>
          runEffect(context, () =>
            drawEveryButtonPressBand(context, palette, {
              width: canvas.width,
              height: canvas.height,
            }),
          ),
        () => canvas,
      ),
    );
