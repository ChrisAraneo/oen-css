import { NodePackageImporter, type Options } from 'sass';

export const SASS_COMPILE_OPTIONS: Options<'sync'> = Object.freeze({
  importers: [new NodePackageImporter()],
  style: 'expanded',
  quietDeps: true,
  sourceMap: false,
});

export const UNCONFIGURED_BULMA_ENTRY_POINT = '@use "pkg:bulma/sass";';
