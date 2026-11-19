export interface MinifiedStylesheet {
  readonly css: string;
  readonly warnings: readonly string[];
  readonly issue: string | undefined;
}
