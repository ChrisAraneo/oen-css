import { join } from 'lodash-es';
import { OEN_CUSTOM_PROPERTY_PREFIX } from '../namespace/consts.ts';
import { toRgbChannels } from './internal/to-rgb-channels.ts';
import type { ThemeColor } from './types/theme-color.ts';

const RGB_PROPERTY_SUFFIX = '-rgb';
const RGB_CHANNEL_SEPARATOR = ', ';

export const formatThemeColorDeclaration = ({
  name,
  hex,
}: ThemeColor): string =>
  `${OEN_CUSTOM_PROPERTY_PREFIX}${name}${RGB_PROPERTY_SUFFIX}: ${join(toRgbChannels(hex), RGB_CHANNEL_SEPARATOR)};`;
