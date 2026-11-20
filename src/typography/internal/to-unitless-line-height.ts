import { toRatio } from '../../common/to-ratio.ts';

export const toUnitlessLineHeight = (
  lineHeightInPixels: number,
  fontSizeInPixels: number,
): string => toRatio(lineHeightInPixels, fontSizeInPixels);
