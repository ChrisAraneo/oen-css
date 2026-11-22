import type { LicenseComment } from '../../banner/types/license-comment.ts';
import type { PaperShadersFacts } from './paper-shaders-facts.ts';

export interface ThirdPartyNoticesFacts {
  readonly bulmaVersion: string;
  readonly bulmaLicense: string;
  readonly paperShaders: PaperShadersFacts;
  readonly embeddedLicenseComments: readonly LicenseComment[];
}
