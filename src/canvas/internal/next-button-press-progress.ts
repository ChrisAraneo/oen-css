import { add, divide, subtract } from 'lodash-es';
import { match } from 'ts-pattern';
import {
  OEN_BUTTON_PRESS_FULL_PROGRESS,
  OEN_BUTTON_PRESS_LIFT_DURATION,
  OEN_BUTTON_PRESS_NO_PROGRESS,
  OEN_BUTTON_PRESS_SINK_DURATION,
} from '../consts.ts';

const toStep = (elapsed: number, duration: number): number =>
  divide(elapsed, duration);

export const nextButtonPressProgress = (
  progress: number,
  pressed: boolean,
  elapsed: number,
): number =>
  match(pressed)
    .with(true, () =>
      Math.min(
        add(progress, toStep(elapsed, OEN_BUTTON_PRESS_SINK_DURATION)),
        OEN_BUTTON_PRESS_FULL_PROGRESS,
      ),
    )
    .otherwise(() =>
      Math.max(
        subtract(progress, toStep(elapsed, OEN_BUTTON_PRESS_LIFT_DURATION)),
        OEN_BUTTON_PRESS_NO_PROGRESS,
      ),
    );
