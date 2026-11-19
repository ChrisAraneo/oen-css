import type { AppliedMapping } from './applied-mapping.ts';

export interface NamespacedStylesheet {
  readonly css: string;
  readonly applied: readonly AppliedMapping[];
}
