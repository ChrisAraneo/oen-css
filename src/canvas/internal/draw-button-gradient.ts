import { pipe } from 'remeda';
import { match, P } from 'ts-pattern';
import { runEffect } from '../../common/run-effect.ts';
import type { ButtonCanvasPainter } from '../types/button-canvas-painter.ts';
import type { ButtonPalette } from '../types/button-palette.ts';
import { drawButtonGradientTint } from './draw-button-gradient-tint.ts';
import { drawButtonMetal } from './draw-button-metal.ts';
import { drawEveryButtonGradientLayer } from './draw-every-button-gradient-layer.ts';
import { getButtonCanvasContext } from './get-button-canvas-context.ts';
import { toButtonGradientDrift } from './to-button-gradient-drift.ts';

const { nullish } = P;

export const drawButtonGradient = (
  { source, metal }: ButtonCanvasPainter,
  palette: ButtonPalette,
  phase: number,
  frame: number,
): HTMLCanvasElement =>
  match(getButtonCanvasContext(source))
    .with(nullish, () => source)
    .otherwise((context) =>
      pipe(
        context,
        (context) =>
          runEffect(context, () =>
            drawButtonMetal(context, metal, palette, frame),
          ),
        (context) =>
          runEffect(context, () => drawButtonGradientTint(context, palette)),
        (context) =>
          runEffect(context, () =>
            drawEveryButtonGradientLayer(
              context,
              palette,
              toButtonGradientDrift(phase),
            ),
          ),
        () => source,
      ),
    );
