export interface TextFile {
  readonly path: string;
  readonly text: string;
  readonly problem: string | undefined;
}
