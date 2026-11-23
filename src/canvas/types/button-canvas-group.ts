import type { ButtonPalette } from './button-palette.ts';

export interface ButtonCanvasGroup {
  readonly palette: ButtonPalette | undefined;
  readonly offset: number;
  readonly pressed: boolean;
  readonly canvases: readonly HTMLCanvasElement[];
}
