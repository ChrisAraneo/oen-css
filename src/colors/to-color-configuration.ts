import { map } from 'lodash-es';
import { OEN_THEME_COLORS } from './consts.ts';

export const toColorConfiguration = (): readonly string[] =>
  map(OEN_THEME_COLORS, ({ name, hex }) => `$${name}: ${hex}`);
