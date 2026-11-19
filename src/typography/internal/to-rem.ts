import { ROOT_FONT_SIZE_IN_PIXELS } from './consts.ts';

export const toRem = (pixels: number): string =>
  `${pixels / ROOT_FONT_SIZE_IN_PIXELS}rem`;
