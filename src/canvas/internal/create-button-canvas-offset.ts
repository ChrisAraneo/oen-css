import { divide, random, subtract } from 'lodash-es';
import { pipe } from 'remeda';
import {
  OEN_BUTTON_GRADIENT_FIRST_STEP,
  OEN_BUTTON_GRADIENT_OFFSET_STEPS,
} from '../consts.ts';

const ONE_STEP = 1;

const LAST_STEP: number = subtract(OEN_BUTTON_GRADIENT_OFFSET_STEPS, ONE_STEP);

export const createButtonCanvasOffset = (): number =>
  pipe(random(OEN_BUTTON_GRADIENT_FIRST_STEP, LAST_STEP), (step) =>
    divide(step, OEN_BUTTON_GRADIENT_OFFSET_STEPS),
  );
