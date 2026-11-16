import { compact, filter, flatMap, map, split } from 'lodash-es';
import { pipe } from 'remeda';
import { CLASS_ATTRIBUTE, WHITESPACE } from './consts.ts';
import { isStillInterpolated } from './is-still-interpolated.ts';
import type { ClassNameUsage } from './types/class-name-usage.ts';

const NO_CLASS_ATTRIBUTE = '';

export const findClassNameUsages = (
  html: string,
  origin: string,
): readonly ClassNameUsage[] =>
  pipe(
    [...html.matchAll(CLASS_ATTRIBUTE)],
    (found) =>
      map(found, ([, classAttribute]) => classAttribute ?? NO_CLASS_ATTRIBUTE),
    (attributes) =>
      filter(attributes, (attribute) => !isStillInterpolated(attribute)),
    (attributes) =>
      flatMap(attributes, (attribute) => split(attribute, WHITESPACE)),
    (classNames) => compact(classNames),
    (classNames) => map(classNames, (className) => ({ className, origin })),
  );
