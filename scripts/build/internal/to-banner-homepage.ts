import { replace } from 'lodash-es';
import { match } from 'ts-pattern';

const README_ANCHOR = /#readme$/;

const FALLBACK_HOMEPAGE = 'https://github.com/ChrisAraneo/oen-css';

const NO_HOMEPAGE = '';

export const toBannerHomepage = (homepage: string | undefined): string =>
  match(replace(homepage ?? NO_HOMEPAGE, README_ANCHOR, NO_HOMEPAGE))
    .with(NO_HOMEPAGE, () => FALLBACK_HOMEPAGE)
    .otherwise((stripped) => stripped);
