import { map } from 'lodash-es';
import { pipe } from 'remeda';
import { runEffect } from '../../common/run-effect.ts';
import {
  OEN_BUTTON_CANVAS_STACK_OPERATION,
  OEN_BUTTON_PRESS_BANDS,
} from '../consts.ts';
import type { ButtonCanvasSize } from '../types/button-canvas-size.ts';
import type { ButtonPalette } from '../types/button-palette.ts';
import { drawButtonPressBand } from './draw-button-press-band.ts';

export const drawEveryButtonPressBand = (
  context: CanvasRenderingContext2D,
  palette: ButtonPalette,
  size: ButtonCanvasSize,
): readonly CanvasRenderingContext2D[] =>
  pipe(
    context,
    (context) =>
      runEffect(
        context,
        () =>
          (context.globalCompositeOperation =
            OEN_BUTTON_CANVAS_STACK_OPERATION),
      ),
    (context) =>
      map(OEN_BUTTON_PRESS_BANDS, (band) =>
        drawButtonPressBand(context, palette, size, band),
      ),
  );
