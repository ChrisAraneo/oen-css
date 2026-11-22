import { join } from 'lodash-es';
import {
  PAPER_SHADERS_HOMEPAGE,
  PAPER_SHADERS_LICENSE_NAME,
  PAPER_SHADERS_NAME,
} from '../licenses/consts.ts';
import type { OenRuntimeBannerFacts } from './types/oen-runtime-banner-facts.ts';

export const formatOenRuntimeBanner = ({
  version,
  homepage,
  paperShadersVersion,
  paperShadersCopyright,
}: OenRuntimeBannerFacts): string =>
  join(
    [
      '/*!',
      ` * oen-css v${version} | MIT License | ${homepage}`,
      ' *',
      ' * The browser runtime: it injects a <canvas> into every .button and paints it.',
      ' * The stylesheet needs none of this.',
      ' *',
      ` * Bundles ${PAPER_SHADERS_NAME} v${paperShadersVersion} | ${PAPER_SHADERS_LICENSE_NAME} | ${PAPER_SHADERS_HOMEPAGE}`,
      ` * ${paperShadersCopyright}`,
      ` * ${PAPER_SHADERS_NAME}' notice and the ${PAPER_SHADERS_LICENSE_NAME} are reproduced in full`,
      ' * in THIRD_PARTY_NOTICES.md, alongside this file.',
      ' */',
    ],
    '\n',
  );
