import { OEN_CUSTOM_PROPERTY_PREFIX } from '../namespace/consts.ts';
import type { ThemeControlDeclaration } from './types/theme-control-declaration.ts';

export const formatThemeControlDeclaration = ({
  property,
  value,
}: ThemeControlDeclaration): string =>
  `${OEN_CUSTOM_PROPERTY_PREFIX}${property}: ${value};`;
