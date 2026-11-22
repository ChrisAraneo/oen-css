import { map } from 'lodash-es';
import { pipe } from 'remeda';
import { match, P } from 'ts-pattern';
import { runEffect } from '../../common/run-effect.ts';
import type { ButtonCanvasGroup } from '../types/button-canvas-group.ts';
import type { ButtonCanvasPainter } from '../types/button-canvas-painter.ts';
import { clearButtonCanvas } from './clear-button-canvas.ts';
import { drawButtonCanvas } from './draw-button-canvas.ts';
import { drawButtonGradient } from './draw-button-gradient.ts';

const { nullish } = P;

export const drawButtonCanvasGroup = (
  painter: ButtonCanvasPainter,
  { palette, canvases }: ButtonCanvasGroup,
  phase: number,
  frame: number,
): readonly HTMLCanvasElement[] =>
  match(palette)
    .with(nullish, () => map(canvases, (canvas) => clearButtonCanvas(canvas)))
    .otherwise((palette) =>
      pipe(
        runEffect(painter.source, () =>
          drawButtonGradient(painter, palette, phase, frame),
        ),
        (source) => map(canvases, (canvas) => drawButtonCanvas(canvas, source)),
      ),
    );
