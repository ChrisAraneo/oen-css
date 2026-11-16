import { findEmbeddedLicenseComments } from '../../banner/find-embedded-license-comments.ts';
import type { BuildCheck } from './types/build-check.ts';
import type { BuildNotices } from './types/build-notices.ts';

export const findBuildEmbeddedNotices = ({
  inputs,
  namespaced,
  stylesheet,
  minified,
  stylesheetProblems,
}: BuildCheck): BuildNotices => ({
  inputs,
  namespaced,
  stylesheet,
  minified,
  stylesheetProblems,
  embeddedLicenseComments: findEmbeddedLicenseComments(stylesheet),
});
