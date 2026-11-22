import {
  add,
  divide,
  lt,
  max,
  min,
  multiply,
  round,
  subtract,
  toFinite,
} from 'lodash-es';
import { pipe } from 'remeda';
import { match, P } from 'ts-pattern';
import {
  OEN_BUTTON_ACHROMATIC_SATURATION,
  OEN_BUTTON_CHANNEL_CEILING,
  OEN_BUTTON_GRADIENT_FULL_ALPHA,
  OEN_BUTTON_GRADIENT_PERCENT,
  OEN_BUTTON_PALETTE_DECIMAL_PLACES,
} from '../consts.ts';
import type { ButtonPalette } from '../types/button-palette.ts';
import type { ButtonRgb } from '../types/button-rgb.ts';
import { toButtonHue } from './to-button-hue.ts';
import { toButtonRgb } from './to-button-rgb.ts';

const { nullish } = P;

const NO_SPAN = 0;

const FULL_RATIO = 1;

const MEAN_DIVISOR = 2;

const toChannelRatio = (channel: number): number =>
  divide(channel, OEN_BUTTON_CHANNEL_CEILING);

const toLargestRatio = ({ red, green, blue }: ButtonRgb): number =>
  toChannelRatio(toFinite(max([red, green, blue])));

const toSmallestRatio = ({ red, green, blue }: ButtonRgb): number =>
  toChannelRatio(toFinite(min([red, green, blue])));

const toLightnessRatio = (rgb: ButtonRgb): number =>
  divide(add(toLargestRatio(rgb), toSmallestRatio(rgb)), MEAN_DIVISOR);

const toSaturationRatio = (rgb: ButtonRgb, lightness: number): number =>
  match(subtract(toLargestRatio(rgb), toSmallestRatio(rgb)))
    .with(NO_SPAN, () => OEN_BUTTON_ACHROMATIC_SATURATION)
    .otherwise((span) =>
      divide(
        span,
        subtract(
          FULL_RATIO,
          Math.abs(subtract(multiply(MEAN_DIVISOR, lightness), FULL_RATIO)),
        ),
      ),
    );

const toPercent = (ratio: number): number =>
  round(
    multiply(ratio, OEN_BUTTON_GRADIENT_PERCENT),
    OEN_BUTTON_PALETTE_DECIMAL_PLACES,
  );

const toOpaquePalette = (rgb: ButtonRgb): ButtonPalette =>
  pipe(toLightnessRatio(rgb), (lightness) => ({
    hue: round(toButtonHue(rgb), OEN_BUTTON_PALETTE_DECIMAL_PLACES),
    saturation: toPercent(toSaturationRatio(rgb, lightness)),
    lightness: toPercent(lightness),
  }));

const toSolidPalette = (rgb: ButtonRgb): ButtonPalette | undefined =>
  match(lt(rgb.alpha, OEN_BUTTON_GRADIENT_FULL_ALPHA))
    .with(true, () => undefined)
    .otherwise(() => toOpaquePalette(rgb));

export const toButtonPalette = (color: string): ButtonPalette | undefined =>
  match(toButtonRgb(color))
    .with(nullish, () => undefined)
    .otherwise((rgb) => toSolidPalette(rgb));
