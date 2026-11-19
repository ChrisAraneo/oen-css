import { compact } from 'lodash-es';
import { formatThirdPartyNotices } from '../../../src/licenses/format-third-party-notices.ts';
import type { BuildArtifacts } from '../types/build-artifacts.ts';
import type { BuildNotices } from './types/build-notices.ts';

export const formatBuildNotices = ({
  inputs,
  namespaced,
  stylesheet,
  minified,
  stylesheetIssues,
  embeddedLicenseComments,
}: BuildNotices): BuildArtifacts => ({
  version: inputs.version,
  bulmaVersion: inputs.bulmaVersion,
  startedAt: inputs.startedAt,
  stylesheet,
  minifiedStylesheet: minified.css,
  oenLicense: inputs.oenLicense,
  bulmaLicense: inputs.bulmaLicense,
  thirdPartyNotices: formatThirdPartyNotices({
    bulmaVersion: inputs.bulmaVersion,
    bulmaLicense: inputs.bulmaLicense,
    embeddedLicenseComments,
  }),
  appliedMappings: namespaced.applied,
  embeddedLicenseComments,
  warnings: minified.warnings,
  issues: [...inputs.issues, ...stylesheetIssues, ...compact([minified.issue])],
});
