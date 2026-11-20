import type { ThemeControlProperty } from './theme-control-property.ts';

export interface ThemeControlDeclaration {
  readonly property: ThemeControlProperty;
  readonly value: string;
}
