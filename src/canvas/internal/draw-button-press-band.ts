import { pipe } from 'remeda';
import { runEffect } from '../../common/run-effect.ts';
import { OEN_BUTTON_CANVAS_ORIGIN } from '../consts.ts';
import type { ButtonCanvasSize } from '../types/button-canvas-size.ts';
import type { ButtonPalette } from '../types/button-palette.ts';
import type { ButtonPressBand } from '../types/button-press-band.ts';
import { createButtonPressFill } from './create-button-press-fill.ts';

export const drawButtonPressBand = (
  context: CanvasRenderingContext2D,
  palette: ButtonPalette,
  size: ButtonCanvasSize,
  band: ButtonPressBand,
): CanvasRenderingContext2D =>
  pipe(
    context,
    (context) => runEffect(context, () => (context.globalAlpha = band.alpha)),
    (context) =>
      runEffect(
        context,
        () =>
          (context.fillStyle = createButtonPressFill(
            context,
            palette,
            size,
            band,
          )),
      ),
    (context) =>
      runEffect(context, () =>
        context.fillRect(
          OEN_BUTTON_CANVAS_ORIGIN,
          OEN_BUTTON_CANVAS_ORIGIN,
          size.width,
          size.height,
        ),
      ),
  );
