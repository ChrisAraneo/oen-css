import { match } from 'ts-pattern';
import { BUILD_ARGUMENTS, DEV_ARGUMENTS } from '../consts.ts';

export const toStorybookArguments = (building: boolean): readonly string[] =>
  match(building)
    .with(true, () => BUILD_ARGUMENTS)
    .otherwise(() => DEV_ARGUMENTS);
