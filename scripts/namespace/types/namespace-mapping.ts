export interface NamespaceMapping {
  readonly description: string;
  readonly appliedBy: 'SASS' | 'BUILD';
  readonly bulmaPattern: RegExp;
  readonly oenReplacement: string;
  readonly oenPattern: RegExp;
  readonly bulmaReplacement: string;
}
