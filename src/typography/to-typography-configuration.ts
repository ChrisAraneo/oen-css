import { map } from 'lodash-es';
import { OEN_TYPE_VARIABLES } from './consts.ts';

export const toTypographyConfiguration = (): readonly string[] =>
  map(OEN_TYPE_VARIABLES, ({ property, value }) => `$${property}: ${value}`);
