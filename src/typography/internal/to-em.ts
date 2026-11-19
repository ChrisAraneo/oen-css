import { ROOT_FONT_SIZE_IN_PIXELS } from './consts.ts';

export const toEm = (pixels: number): string =>
  `${pixels / ROOT_FONT_SIZE_IN_PIXELS}em`;
