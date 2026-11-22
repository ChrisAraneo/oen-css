export interface CompiledRuntime {
  readonly code: string;
  readonly minifiedCode: string;
  readonly issue: string | undefined;
}
