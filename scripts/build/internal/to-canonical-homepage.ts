import { replace } from 'lodash-es';
import { match } from 'ts-pattern';

const README_ANCHOR = /#readme$/;
const FALLBACK_HOMEPAGE = 'https://github.com/ChrisAraneo/oen-css';

export const toCanonicalHomepage = (homepage: string | undefined): string =>
  match(replace(homepage ?? '', README_ANCHOR, ''))
    .with('', () => FALLBACK_HOMEPAGE)
    .otherwise((canonical) => canonical);
