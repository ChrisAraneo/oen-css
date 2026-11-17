import { OEN_CUSTOM_PROPERTY_PREFIX } from '../namespace/consts.ts';
import type { ThemeTypeDeclaration } from './types/theme-type-declaration.ts';

export const formatThemeTypeDeclaration = ({
  property,
  value,
}: ThemeTypeDeclaration): string =>
  `${OEN_CUSTOM_PROPERTY_PREFIX}${property}: ${value};`;
