import type { LicenseComment } from '../../banner/types/license-comment.ts';

export interface ThirdPartyNoticesFacts {
  readonly bulmaVersion: string;
  readonly bulmaLicense: string;
  readonly embeddedLicenseComments: readonly LicenseComment[];
}
