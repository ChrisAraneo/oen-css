import { toRatio } from '../../common/to-ratio.ts';
import { GENERAL_TEXT_SIZE_IN_PIXELS } from '../../typography/consts.ts';

export const toControlEm = (pixels: number): string =>
  `${toRatio(pixels, GENERAL_TEXT_SIZE_IN_PIXELS)}em`;
