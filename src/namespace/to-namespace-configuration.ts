import { OEN_CUSTOM_PROPERTY_PREFIX } from './consts.ts';
import { toSassPrefix } from './internal/to-sass-prefix.ts';

const CUSTOM_PROPERTY_PREFIX_VARIABLE = 'cssvars-prefix';

const PRESERVED_BULMA_PREFIXES: readonly string[] = Object.freeze([
  '$class-prefix: ""',
  '$helpers-prefix: "is-"',
  '$helpers-has-prefix: "has-"',
  '$variables-host: ":root"',
]);

export const toNamespaceConfiguration = (): readonly string[] => [
  `$${CUSTOM_PROPERTY_PREFIX_VARIABLE}: "${toSassPrefix(OEN_CUSTOM_PROPERTY_PREFIX)}"`,
  ...PRESERVED_BULMA_PREFIXES,
];
