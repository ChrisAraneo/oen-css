import { relative } from 'node:path';
import { REPOSITORY_ROOT } from '../../consts.ts';
import { formatErrorMessage } from '../format-error-message.ts';

export const formatUnreadableFileProblem = (
  path: string,
  error: unknown,
): string =>
  `${relative(REPOSITORY_ROOT, path)} could not be read: ${formatErrorMessage(error)}`;
