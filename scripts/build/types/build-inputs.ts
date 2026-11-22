import type { PaperShadersFacts } from '../../../src/licenses/types/paper-shaders-facts.ts';

export interface BuildInputs {
  readonly startedAt: number;
  readonly version: string;
  readonly homepage: string;
  readonly bulmaVersion: string;
  readonly bulmaCopyright: string;
  readonly bulmaLicense: string;
  readonly paperShaders: PaperShadersFacts;
  readonly paperShadersCopyright: string;
  readonly stylesheet: string;
  readonly runtime: string;
  readonly minifiedRuntime: string;
  readonly issues: readonly string[];
}
