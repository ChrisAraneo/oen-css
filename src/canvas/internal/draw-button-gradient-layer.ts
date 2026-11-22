import { pipe } from 'remeda';
import { runEffect } from '../../common/run-effect.ts';
import type { ButtonGradientDrift } from '../types/button-gradient-drift.ts';
import type { ButtonGradientLayer } from '../types/button-gradient-layer.ts';
import type { ButtonPalette } from '../types/button-palette.ts';
import { createButtonGradientFill } from './create-button-gradient-fill.ts';
import { toButtonGradientLayerPalette } from './to-button-gradient-layer-palette.ts';
import { writeButtonGradientTransform } from './write-button-gradient-transform.ts';

const UNIT_RADIUS = 1;

const UNIT_SPAN = 2;

export const drawButtonGradientLayer = (
  context: CanvasRenderingContext2D,
  palette: ButtonPalette,
  layer: ButtonGradientLayer,
  drift: ButtonGradientDrift,
): CanvasRenderingContext2D =>
  pipe(
    writeButtonGradientTransform(context, layer, drift),
    (context) =>
      runEffect(
        context,
        () =>
          (context.fillStyle = createButtonGradientFill(
            context,
            toButtonGradientLayerPalette(palette, layer),
            layer.falloff,
          )),
      ),
    (context) =>
      runEffect(context, () =>
        context.fillRect(-UNIT_RADIUS, -UNIT_RADIUS, UNIT_SPAN, UNIT_SPAN),
      ),
  );
