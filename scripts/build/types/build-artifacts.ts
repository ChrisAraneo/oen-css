import type { LicenseComment } from '../../banner/types/license-comment.ts';
import type { AppliedMapping } from '../../namespace/types/applied-mapping.ts';

export interface BuildArtifacts {
  readonly version: string;
  readonly bulmaVersion: string;
  readonly startedAt: number;
  readonly stylesheet: string;
  readonly minifiedStylesheet: string;
  readonly oenLicense: string;
  readonly bulmaLicense: string;
  readonly thirdPartyNotices: string;
  readonly appliedMappings: readonly AppliedMapping[];
  readonly embeddedLicenseComments: readonly LicenseComment[];
  readonly warnings: readonly string[];
  readonly problems: readonly string[];
}
