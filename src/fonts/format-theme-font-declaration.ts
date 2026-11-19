import { replace } from 'lodash-es';
import { OEN_CUSTOM_PROPERTY_PREFIX } from '../namespace/consts.ts';
import { OEN_FONT_STACK } from './consts.ts';
import type { ThemeFontProperty } from './types/theme-font-property.ts';

const QUOTE = /"/g;

const UNQUOTED = '';

export const formatThemeFontDeclaration = (
  property: ThemeFontProperty,
): string =>
  `${OEN_CUSTOM_PROPERTY_PREFIX}${property}: ${replace(OEN_FONT_STACK, QUOTE, UNQUOTED)};`;
