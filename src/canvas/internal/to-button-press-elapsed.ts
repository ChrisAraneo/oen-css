import { clamp, subtract, toFinite } from 'lodash-es';
import { match } from 'ts-pattern';
import {
  OEN_BUTTON_PRESS_MAX_ELAPSED,
  OEN_BUTTON_PRESS_NO_ELAPSED,
} from '../consts.ts';

export const toButtonPressElapsed = (
  time: number,
  last: number,
  still: boolean,
): number =>
  match(still)
    .with(true, () => OEN_BUTTON_PRESS_MAX_ELAPSED)
    .otherwise(() =>
      clamp(
        subtract(toFinite(time), toFinite(last)),
        OEN_BUTTON_PRESS_NO_ELAPSED,
        OEN_BUTTON_PRESS_MAX_ELAPSED,
      ),
    );
