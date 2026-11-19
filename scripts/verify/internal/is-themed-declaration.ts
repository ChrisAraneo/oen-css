import { concat, map, some, startsWith, trim } from 'lodash-es';
import { OEN_THEME_COLORS } from '../../../src/colors/consts.ts';
import { OEN_FONT_PROPERTIES } from '../../../src/fonts/consts.ts';
import { BULMA_CUSTOM_PROPERTY_PREFIX } from '../../../src/namespace/consts.ts';
import { OEN_TYPE_DECLARATIONS } from '../../../src/typography/consts.ts';

const FONT_FAMILY_PROPERTY = 'font-family';

const FONT_SIZE_PROPERTY = 'font-size';

const THEMED_DECLARATION_PREFIXES: readonly string[] = Object.freeze(
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

export const isThemedDeclaration = (line: string | undefined): boolean =>
  some(THEMED_DECLARATION_PREFIXES, (prefix) => startsWith(trim(line), prefix));
