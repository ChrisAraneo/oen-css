import { P, match } from 'ts-pattern';

const { instanceOf, string } = P;

const UNKNOWN_ERROR_MESSAGE = 'Unknown error occurred';

export const formatErrorMessage = (error: unknown): string =>
  match(error)
    .with(instanceOf(Error), (error) => error.message)
    .with(string, (text) => text)
    .otherwise(() => UNKNOWN_ERROR_MESSAGE);
