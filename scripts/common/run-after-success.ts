import { match } from 'ts-pattern';

export const runAfterSuccess = (
  succeeded: boolean,
  run: () => Promise<boolean>,
): Promise<boolean> =>
  match(succeeded)
    .with(true, run)
    .otherwise(() => Promise.resolve(false));
