import { divide, toFinite } from 'lodash-es';
import { pipe } from 'remeda';
import { match } from 'ts-pattern';
import {
  OEN_BUTTON_GRADIENT_DURATION,
  OEN_BUTTON_GRADIENT_STILL_PHASE,
} from '../consts.ts';

export const toButtonGradientPhase = (time: number, still: boolean): number =>
  match(still)
    .with(true, () => OEN_BUTTON_GRADIENT_STILL_PHASE)
    .otherwise(() =>
      pipe(toFinite(time) % OEN_BUTTON_GRADIENT_DURATION, (elapsed) =>
        divide(elapsed, OEN_BUTTON_GRADIENT_DURATION),
      ),
    );
