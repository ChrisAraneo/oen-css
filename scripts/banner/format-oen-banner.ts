import { join } from 'lodash-es';
import type { OenBannerFacts } from './types/oen-banner-facts.ts';

export const formatOenBanner = ({
  version,
  bulmaVersion,
  bulmaCopyright,
  homepage,
}: OenBannerFacts): string =>
  join(
    [
      '/*!',
      ` * oen-css v${version} | MIT License | ${homepage}`,
      ' *',
      ` * Built from Bulma v${bulmaVersion} | MIT License | https://bulma.io`,
      ` * ${bulmaCopyright}`,
      " * Bulma's license is reproduced verbatim in LICENSE-bulma, alongside this file.",
      ' *',
      " * Bulma's `--bulma-*` custom properties are emitted as `--oen-*`; class names",
      ' * (`.button`, `.navbar`, `.is-primary`, ...) are unchanged.',
      ' */',
    ],
    '\n',
  );
