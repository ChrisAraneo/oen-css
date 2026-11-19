import { difference, isEmpty, join, size } from 'lodash-es';
import { match } from 'ts-pattern';

const MINIMUM_EXPECTED_CUSTOM_PROPERTIES = 500;

const REQUIRED_CUSTOM_PROPERTIES: readonly string[] = Object.freeze([
  '--oen-primary',
  '--oen-scheme-main',
  '--oen-radius',
  '--oen-family-primary',
]);

export const formatCustomPropertyIssue = (
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
