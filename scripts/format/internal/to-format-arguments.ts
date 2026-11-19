import { match } from 'ts-pattern';
import { CHECK_ARGUMENTS, WRITE_ARGUMENTS } from '../consts.ts';

export const toFormatArguments = (checking: boolean): readonly string[] =>
  match(checking)
    .with(true, () => CHECK_ARGUMENTS)
    .otherwise(() => WRITE_ARGUMENTS);
