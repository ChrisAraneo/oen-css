import { NodePackageImporter, type Options } from 'sass';

export const SASS_COMPILE_OPTIONS: Readonly<Options<'sync'>> = Object.freeze({
  importers: [new NodePackageImporter()],
  style: 'expanded',
  quietDeps: true,
  sourceMap: false,
});
