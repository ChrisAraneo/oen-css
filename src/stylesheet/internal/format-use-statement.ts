const BULMA_SASS_PACKAGE = 'pkg:bulma/sass';

export const formatUseStatement = (configuration: string): string =>
  `@use "${BULMA_SASS_PACKAGE}" with (\n${configuration}\n);\n`;
