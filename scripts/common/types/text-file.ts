export interface TextFile {
  readonly path: string;
  readonly text: string;
  readonly issue: string | undefined;
}
