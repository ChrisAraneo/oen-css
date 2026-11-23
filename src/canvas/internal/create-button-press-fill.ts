import { map } from 'lodash-es';
import { pipe } from 'remeda';
import { runEffect } from '../../common/run-effect.ts';
import { OEN_BUTTON_PRESS_RAMP } from '../consts.ts';
import type { ButtonCanvasSize } from '../types/button-canvas-size.ts';
import type { ButtonPalette } from '../types/button-palette.ts';
import type { ButtonPressBand } from '../types/button-press-band.ts';
import type { ButtonPressLine } from '../types/button-press-line.ts';
import { formatButtonGradientColor } from './format-button-gradient-color.ts';
import { toButtonPressLine } from './to-button-press-line.ts';
import { toButtonPressPalette } from './to-button-press-palette.ts';

const createPressGradient = (
  context: CanvasRenderingContext2D,
  { startLeft, startTop, endLeft, endTop }: ButtonPressLine,
): CanvasGradient =>
  context.createLinearGradient(startLeft, startTop, endLeft, endTop);

export const createButtonPressFill = (
  context: CanvasRenderingContext2D,
  palette: ButtonPalette,
  size: ButtonCanvasSize,
  band: ButtonPressBand,
): CanvasGradient =>
  pipe(
    createPressGradient(context, toButtonPressLine(size, band)),
    (gradient) =>
      runEffect(gradient, () =>
        map(OEN_BUTTON_PRESS_RAMP, ({ position, alpha }) =>
          gradient.addColorStop(
            position,
            formatButtonGradientColor(
              toButtonPressPalette(palette, band),
              alpha,
            ),
          ),
        ),
      ),
  );
