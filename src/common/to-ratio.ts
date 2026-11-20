import { round } from 'lodash-es';

const RATIO_DECIMAL_PLACES = 4;

export const toRatio = (pixels: number, basisInPixels: number): string =>
  `${round(pixels / basisInPixels, RATIO_DECIMAL_PLACES)}`;
