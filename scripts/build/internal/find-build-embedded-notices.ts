import { filterEmbeddedLicenseComments } from '../../../src/banner/filter-embedded-license-comments.ts';
import type { BuildCheck } from './types/build-check.ts';
import type { BuildNotices } from './types/build-notices.ts';

export const findBuildEmbeddedNotices = ({
  inputs,
  namespaced,
  stylesheet,
  minified,
  stylesheetIssues,
}: BuildCheck): BuildNotices => ({
  inputs,
  namespaced,
  stylesheet,
  minified,
  stylesheetIssues,
  embeddedLicenseComments: filterEmbeddedLicenseComments(stylesheet),
});
