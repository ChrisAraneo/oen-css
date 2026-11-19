export interface CheckStep {
  readonly name: string;
  readonly flag: string;
  readonly run: () => Promise<boolean>;
}
