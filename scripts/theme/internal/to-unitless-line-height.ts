import { round } from 'lodash-es';

const LINE_HEIGHT_DECIMAL_PLACES = 4;

export const toUnitlessLineHeight = (
  lineHeightInPixels: number,
  fontSizeInPixels: number,
): string =>
  `${round(lineHeightInPixels / fontSizeInPixels, LINE_HEIGHT_DECIMAL_PLACES)}`;
