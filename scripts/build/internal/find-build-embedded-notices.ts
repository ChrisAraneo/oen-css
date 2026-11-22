import { filterEmbeddedLicenseComments } from '../../../src/banner/filter-embedded-license-comments.ts';
import type { BuildCheck } from './types/build-check.ts';
import type { BuildNotices } from './types/build-notices.ts';

export const findBuildEmbeddedNotices = ({
  inputs,
  namespaced,
  stylesheet,
  minified,
  stylesheetIssues,
  runtime,
  minifiedRuntime,
}: BuildCheck): BuildNotices => ({
  inputs,
  namespaced,
  stylesheet,
  minified,
  stylesheetIssues,
  runtime,
  minifiedRuntime,
  embeddedLicenseComments: filterEmbeddedLicenseComments(stylesheet),
});
