import type { ButtonPalette } from './button-palette.ts';

export interface ButtonCanvasGroup {
  readonly palette: ButtonPalette | undefined;
  readonly offset: number;
  readonly canvases: readonly HTMLCanvasElement[];
}
