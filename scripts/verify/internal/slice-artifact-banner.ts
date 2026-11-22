import { head } from 'lodash-es';

const LEADING_COMMENT = /^[\s\S]*?\*\//;

export const sliceArtifactBanner = (text: string): string =>
  head(text.match(LEADING_COMMENT) ?? []) ?? '';
