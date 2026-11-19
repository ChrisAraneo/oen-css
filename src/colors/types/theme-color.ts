import type { ThemeColorName } from './theme-color-name.ts';

export interface ThemeColor {
  readonly name: ThemeColorName;
  readonly hex: string;
}
