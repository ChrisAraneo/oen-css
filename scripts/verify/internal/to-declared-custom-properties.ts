import { uniq } from 'lodash-es';

const DECLARED_CUSTOM_PROPERTY = /--oen-[\w-]+(?=\s*:)/g;

export const toDeclaredCustomProperties = (css: string): readonly string[] =>
  uniq(css.match(DECLARED_CUSTOM_PROPERTY) ?? []);
