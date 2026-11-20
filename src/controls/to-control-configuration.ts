import { map } from 'lodash-es';
import { OEN_CONTROL_DECLARATIONS } from './consts.ts';

export const toControlConfiguration = (): readonly string[] =>
  map(
    OEN_CONTROL_DECLARATIONS,
    ({ property, value }) => `$${property}: ${value}`,
  );
