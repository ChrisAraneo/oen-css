import { concat, map } from 'lodash-es';
import { BULMA_CUSTOM_PROPERTY_PREFIX } from '../../namespace/consts.ts';
import {
  OEN_FONT_PROPERTIES,
  OEN_THEME_COLORS,
  OEN_TYPE_DECLARATIONS,
} from '../../theme/consts.ts';

const FONT_FAMILY_PROPERTY = 'font-family';
const FONT_SIZE_PROPERTY = 'font-size';

export const REQUIRED_BANNER_FRAGMENTS: readonly string[] = Object.freeze([
  'oen-css v',
  'MIT License',
  'Bulma v',
  'Copyright (c)',
  'LICENSE-bulma',
]);

export const SPOT_CHECKED_BULMA_SELECTORS: readonly string[] = Object.freeze([
  '.button',
  '.navbar',
  '.card',
  '.modal',
  '.columns',
  '.fixed-grid',
  '.hero',
  '.tag',
  '.input',
  '.is-primary',
  '.has-text-centered',
  '.skeleton-block',
]);

export const REQUIRED_CUSTOM_PROPERTIES: readonly string[] = Object.freeze([
  '--oen-primary',
  '--oen-scheme-main',
  '--oen-radius',
  '--oen-family-primary',
]);

export const THEMED_DECLARATION_PREFIXES: readonly string[] = Object.freeze(
  concat(
    map(
      OEN_THEME_COLORS,
      ({ name }) => `${BULMA_CUSTOM_PROPERTY_PREFIX}${name}`,
    ),
    map(
      OEN_FONT_PROPERTIES,
      (property) => `${BULMA_CUSTOM_PROPERTY_PREFIX}${property}`,
    ),
    map(
      OEN_TYPE_DECLARATIONS,
      ({ property }) => `${BULMA_CUSTOM_PROPERTY_PREFIX}${property}`,
    ),
    FONT_FAMILY_PROPERTY,
    FONT_SIZE_PROPERTY,
  ),
);

export const MINIMUM_EXPECTED_CUSTOM_PROPERTIES = 500;

export const NO_COPYRIGHT_LINE = '';
