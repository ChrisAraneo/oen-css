import { round, toString } from 'lodash-es';
import { pipe } from 'remeda';
import { match } from 'ts-pattern';
import { runEffect } from '../../common/run-effect.ts';
import {
  OEN_BUTTON_PRESS_DECIMAL_PLACES,
  OEN_BUTTON_PRESS_NO_PROGRESS,
  OEN_BUTTON_PRESS_PROPERTY,
} from '../consts.ts';
import { toButtonPressStrength } from './to-button-press-strength.ts';

const NO_STRENGTH = '';

const toStrength = (press: number): string =>
  match(press)
    .with(OEN_BUTTON_PRESS_NO_PROGRESS, () => NO_STRENGTH)
    .otherwise(() =>
      toString(
        round(toButtonPressStrength(press), OEN_BUTTON_PRESS_DECIMAL_PLACES),
      ),
    );

export const writeButtonPressStrength = (
  host: HTMLElement,
  press: number,
): HTMLElement =>
  pipe(toStrength(press), (strength) =>
    match(host.style.getPropertyValue(OEN_BUTTON_PRESS_PROPERTY))
      .with(strength, () => host)
      .otherwise(() =>
        runEffect(host, () =>
          host.style.setProperty(OEN_BUTTON_PRESS_PROPERTY, strength),
        ),
      ),
  );
