import type { ButtonPalette } from './button-palette.ts';

export interface ButtonCanvasPaint {
  readonly canvas: HTMLCanvasElement;
  readonly palette: ButtonPalette | undefined;
  readonly offset: number;
  readonly press: number;
}
