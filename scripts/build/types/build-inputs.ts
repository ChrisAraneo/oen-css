export interface BuildInputs {
  readonly startedAt: number;
  readonly version: string;
  readonly homepage: string;
  readonly bulmaVersion: string;
  readonly bulmaCopyright: string;
  readonly bulmaLicense: string;
  readonly oenLicense: string;
  readonly stylesheet: string;
  readonly issues: readonly string[];
}
