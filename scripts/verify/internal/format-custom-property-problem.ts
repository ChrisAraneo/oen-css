import { difference, isEmpty, join, size } from 'lodash-es';
import { match } from 'ts-pattern';
import {
  MINIMUM_EXPECTED_CUSTOM_PROPERTIES,
  REQUIRED_CUSTOM_PROPERTIES,
} from './consts.ts';

export const formatCustomPropertyProblem = (
  declared: readonly string[],
): string | undefined =>
  match({ declared, missing: difference(REQUIRED_CUSTOM_PROPERTIES, declared) })
    .when(
      ({ declared }) => size(declared) < MINIMUM_EXPECTED_CUSTOM_PROPERTIES,
      ({ declared }) =>
        `expected at least ${MINIMUM_EXPECTED_CUSTOM_PROPERTIES} --oen-* declarations, found ${size(declared)}`,
    )
    .when(
      ({ missing }) => !isEmpty(missing),
      ({ missing }) =>
        `expected these properties to be declared: ${join(missing, ', ')}`,
    )
    .otherwise(() => undefined);
