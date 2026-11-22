import type { ShaderMount } from '@paper-design/shaders';

export interface ButtonCanvasPainter {
  readonly source: HTMLCanvasElement;
  readonly metal: ShaderMount | undefined;
}
