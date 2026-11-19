import { compact, filter, map, sortBy, toPairs } from 'lodash-es';
import { pipe } from 'remeda';
import type { Gallery } from '../types/gallery.ts';
import type { UnknownClassName } from '../types/unknown-class-name.ts';
import { isCheckableClassName } from './is-checkable-class-name.ts';
import { tryToUnknownClassName } from './try-to-unknown-class-name.ts';
import type { ClassNameOrigins } from './types/class-name-origins.ts';

export const findUnknownClassNames = (
  classNameOrigins: ClassNameOrigins,
  gallery: Gallery,
): readonly UnknownClassName[] =>
  pipe(
    toPairs(classNameOrigins),
    (pairs) => sortBy(pairs, ([className]) => className),
    (pairs) => filter(pairs, ([className]) => isCheckableClassName(className)),
    (pairs) =>
      map(pairs, ([className, origins]) =>
        tryToUnknownClassName(className, origins, gallery),
      ),
    (candidates) => compact(candidates),
  );
