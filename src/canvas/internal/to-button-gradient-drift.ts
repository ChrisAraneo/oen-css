import { add, multiply, subtract } from 'lodash-es';
import { pipe } from 'remeda';
import {
  OEN_BUTTON_GRADIENT_DRIFT_LEFT,
  OEN_BUTTON_GRADIENT_DRIFT_TOP,
  OEN_BUTTON_GRADIENT_TURN,
  OEN_BUTTON_GRADIENT_ZOOM_FROM,
  OEN_BUTTON_GRADIENT_ZOOM_TO,
} from '../consts.ts';
import type { ButtonGradientDrift } from '../types/button-gradient-drift.ts';

const SWAY_PEAK = 1;

const SWAY_SPAN = 2;

const toSway = (phase: number): number =>
  subtract(
    SWAY_PEAK,
    Math.abs(subtract(multiply(SWAY_SPAN, phase), SWAY_PEAK)),
  );

const toSwayed = (from: number, to: number, sway: number): number =>
  add(from, multiply(subtract(to, from), sway));

export const toButtonGradientDrift = (phase: number): ButtonGradientDrift =>
  pipe(toSway(phase), (sway) => ({
    left: toSwayed(
      -OEN_BUTTON_GRADIENT_DRIFT_LEFT,
      OEN_BUTTON_GRADIENT_DRIFT_LEFT,
      sway,
    ),
    top: toSwayed(
      -OEN_BUTTON_GRADIENT_DRIFT_TOP,
      OEN_BUTTON_GRADIENT_DRIFT_TOP,
      sway,
    ),
    turn: multiply(phase, OEN_BUTTON_GRADIENT_TURN),
    zoom: toSwayed(
      OEN_BUTTON_GRADIENT_ZOOM_FROM,
      OEN_BUTTON_GRADIENT_ZOOM_TO,
      sway,
    ),
  }));
