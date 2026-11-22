import { add, divide, multiply } from 'lodash-es';
import { pipe } from 'remeda';
import { runEffect } from '../../common/run-effect.ts';
import {
  OEN_BUTTON_GRADIENT_PERCENT,
  OEN_BUTTON_GRADIENT_SOURCE_HEIGHT,
  OEN_BUTTON_GRADIENT_SOURCE_WIDTH,
  OEN_BUTTON_GRADIENT_SPREAD,
} from '../consts.ts';
import type { ButtonGradientDrift } from '../types/button-gradient-drift.ts';
import type { ButtonGradientLayer } from '../types/button-gradient-layer.ts';

const BOTH_EDGES = 2;

const MEAN_DIVISOR = 2;

const LAYER_SCALE = divide(
  add(
    OEN_BUTTON_GRADIENT_PERCENT,
    multiply(BOTH_EDGES, OEN_BUTTON_GRADIENT_SPREAD),
  ),
  OEN_BUTTON_GRADIENT_PERCENT,
);

const LAYER_WIDTH = multiply(OEN_BUTTON_GRADIENT_SOURCE_WIDTH, LAYER_SCALE);

const LAYER_HEIGHT = multiply(OEN_BUTTON_GRADIENT_SOURCE_HEIGHT, LAYER_SCALE);

const TURN_IN_RADIANS = multiply(BOTH_EDGES, Math.PI);

const toLength = (basis: number, percent: number): number =>
  divide(multiply(basis, percent), OEN_BUTTON_GRADIENT_PERCENT);

const toCenter = (length: number): number => divide(length, MEAN_DIVISOR);

export const writeButtonGradientTransform = (
  context: CanvasRenderingContext2D,
  layer: ButtonGradientLayer,
  drift: ButtonGradientDrift,
): CanvasRenderingContext2D =>
  pipe(
    context,
    (context) => runEffect(context, () => context.resetTransform()),
    (context) =>
      runEffect(context, () =>
        context.translate(
          toCenter(OEN_BUTTON_GRADIENT_SOURCE_WIDTH),
          toCenter(OEN_BUTTON_GRADIENT_SOURCE_HEIGHT),
        ),
      ),
    (context) =>
      runEffect(context, () =>
        context.translate(
          toLength(LAYER_WIDTH, drift.left),
          toLength(LAYER_HEIGHT, drift.top),
        ),
      ),
    (context) =>
      runEffect(context, () =>
        context.rotate(multiply(drift.turn, TURN_IN_RADIANS)),
      ),
    (context) =>
      runEffect(context, () => context.scale(drift.zoom, drift.zoom)),
    (context) =>
      runEffect(context, () =>
        context.translate(-toCenter(LAYER_WIDTH), -toCenter(LAYER_HEIGHT)),
      ),
    (context) =>
      runEffect(context, () =>
        context.translate(
          toLength(LAYER_WIDTH, layer.positionLeft),
          toLength(LAYER_HEIGHT, layer.positionTop),
        ),
      ),
    (context) =>
      runEffect(context, () =>
        context.scale(
          toLength(LAYER_WIDTH, layer.radiusWidth),
          toLength(LAYER_HEIGHT, layer.radiusHeight),
        ),
      ),
  );
