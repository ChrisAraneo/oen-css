export interface StylesheetDifference {
  readonly lineNumber: number;
  readonly ours: string | undefined;
  readonly theirs: string | undefined;
}
