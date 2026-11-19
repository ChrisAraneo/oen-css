import { isEmpty, join, noop } from 'lodash-es';
import { match } from 'ts-pattern';

export const writeIssueLines = (lines: readonly string[]): void =>
  match(isEmpty(lines))
    .with(true, noop)
    .otherwise(() => console.error(join(lines, '\n')));
