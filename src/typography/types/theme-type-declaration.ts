import type { ThemeTypeProperty } from './theme-type-property.ts';

export interface ThemeTypeDeclaration {
  readonly property: ThemeTypeProperty;
  readonly value: string;
}
