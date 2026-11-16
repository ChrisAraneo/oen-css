import { isEmpty, join, noop } from 'lodash-es';
import { match } from 'ts-pattern';

export const writeLines = (lines: readonly string[]): void =>
  match(isEmpty(lines))
    .with(true, noop)
    .otherwise(() => console.log(join(lines, '\n')));
