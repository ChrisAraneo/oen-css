import { match } from 'ts-pattern';
import { OEN_CUSTOM_PROPERTY_PREFIX } from '../../namespace/consts.ts';
import { OEN_BUTTON_GRADIENT_SHIFT } from '../consts.ts';
import type { ButtonGradientStop } from '../types/button-gradient-stop.ts';

const BUTTON_HUE = `var(${OEN_CUSTOM_PROPERTY_PREFIX}button-h)`;

const BUTTON_SATURATION = `var(${OEN_CUSTOM_PROPERTY_PREFIX}button-s)`;

const BUTTON_LIGHTNESS = `var(${OEN_CUSTOM_PROPERTY_PREFIX}button-background-l)`;

const formatLightness = ({ direction, limit }: ButtonGradientStop): string =>
  match(direction)
    .with(
      'lighter',
      () => `min(${BUTTON_LIGHTNESS} + ${OEN_BUTTON_GRADIENT_SHIFT}, ${limit})`,
    )
    .with(
      'darker',
      () => `max(${BUTTON_LIGHTNESS} - ${OEN_BUTTON_GRADIENT_SHIFT}, ${limit})`,
    )
    .exhaustive();

export const formatGradientStop = (stop: ButtonGradientStop): string =>
  `hsl(${BUTTON_HUE}, ${BUTTON_SATURATION}, ${formatLightness(stop)})`;
