import { padStart, toString } from 'lodash-es';
import type { AppliedMapping } from '../../../src/namespace/types/applied-mapping.ts';

const RENAME_COUNT_WIDTH = 5;

export const formatAppliedMapping = ({
  description,
  count,
}: AppliedMapping): string =>
  `  renamed ${padStart(toString(count), RENAME_COUNT_WIDTH)}x  ${description}`;
