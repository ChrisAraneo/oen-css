import { map, nth, toNumber } from 'lodash-es';
import { pipe } from 'remeda';
import { match, P } from 'ts-pattern';
import {
  OEN_BUTTON_CHANNEL_COUNT,
  OEN_BUTTON_GRADIENT_FULL_ALPHA,
} from '../consts.ts';
import type { ButtonRgb } from '../types/button-rgb.ts';

const { nullish, number } = P;

const CHANNEL_PATTERN = /\d+(\.\d+)?/g;

const RED_INDEX = 0;

const GREEN_INDEX = 1;

const BLUE_INDEX = 2;

const toChannels = (color: string): readonly number[] =>
  map(
    match(color.match(CHANNEL_PATTERN))
      .with(nullish, () => [])
      .otherwise((found) => found),
    toNumber,
  );

const toAlpha = (channels: readonly number[]): number =>
  match(nth(channels, OEN_BUTTON_CHANNEL_COUNT))
    .with(nullish, () => OEN_BUTTON_GRADIENT_FULL_ALPHA)
    .otherwise((alpha) => alpha);

export const toButtonRgb = (color: string): ButtonRgb | undefined =>
  pipe(toChannels(color), (channels) =>
    match([
      nth(channels, RED_INDEX),
      nth(channels, GREEN_INDEX),
      nth(channels, BLUE_INDEX),
    ])
      .with([number, number, number], ([red, green, blue]) => ({
        red,
        green,
        blue,
        alpha: toAlpha(channels),
      }))
      .otherwise(() => undefined),
  );
