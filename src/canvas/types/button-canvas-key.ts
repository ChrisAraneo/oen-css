import type { ButtonPalette } from './button-palette.ts';

export interface ButtonCanvasKey {
  readonly palette: ButtonPalette | undefined;
  readonly offset: number;
  readonly pressed: boolean;
}
