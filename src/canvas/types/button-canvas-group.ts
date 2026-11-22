import type { ButtonPalette } from './button-palette.ts';

export interface ButtonCanvasGroup {
  readonly palette: ButtonPalette | undefined;
  readonly canvases: readonly HTMLCanvasElement[];
}
