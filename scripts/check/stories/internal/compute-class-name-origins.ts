import { groupBy, map, mapValues, uniq } from 'lodash-es';
import type { ClassNameOrigins } from './types/class-name-origins.ts';
import type { ClassNameUsage } from './types/class-name-usage.ts';

export const computeClassNameOrigins = (
  usages: readonly ClassNameUsage[],
): ClassNameOrigins =>
  mapValues(
    groupBy(usages, (usage) => usage.className),
    (sameClassName) => uniq(map(sameClassName, (usage) => usage.origin)),
  );
