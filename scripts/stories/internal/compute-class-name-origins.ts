import { groupBy, map, mapValues, uniq } from 'lodash-es';
import { pipe } from 'remeda';
import type { ClassNameOrigins } from '../types/class-name-origins.ts';
import type { ClassNameUsage } from './types/class-name-usage.ts';

export const computeClassNameOrigins = (
  usages: readonly ClassNameUsage[],
): ClassNameOrigins =>
  pipe(
    groupBy(usages, (usage) => usage.className),
    (grouped) =>
      mapValues(grouped, (sameClassName) =>
        uniq(map(sameClassName, (usage) => usage.origin)),
      ),
  );
