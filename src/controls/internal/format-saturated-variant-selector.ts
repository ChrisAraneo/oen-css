import { join, map } from 'lodash-es';
import { OEN_THEME_COLORS } from '../../colors/consts.ts';
import { OEN_BUTTON_SATURATED_VARIANTS } from '../consts.ts';

const VARIANT_SEPARATOR = ', ';

const BUTTON_SELECTOR = '.button';

export const formatSaturatedVariantSelector = (): string =>
  `${BUTTON_SELECTOR}:is(${join(
    map(
      [...OEN_BUTTON_SATURATED_VARIANTS, ...map(OEN_THEME_COLORS, 'name')],
      (variant) => `.is-${variant}`,
    ),
    VARIANT_SEPARATOR,
  )})`;
