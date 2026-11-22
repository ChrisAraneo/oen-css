import { OEN_MINIFIED_STYLESHEET } from '../../common/package/consts.ts';
import { minifyStylesheet } from './minify-stylesheet.ts';
import type { BuildBanner } from './types/build-banner.ts';
import type { BuildMinification } from './types/build-minification.ts';

export const computeBuildMinification = ({
  inputs,
  namespaced,
  stylesheet,
  runtime,
  minifiedRuntime,
}: BuildBanner): BuildMinification => ({
  inputs,
  namespaced,
  stylesheet,
  runtime,
  minifiedRuntime,
  minified: minifyStylesheet(stylesheet, OEN_MINIFIED_STYLESHEET),
});
