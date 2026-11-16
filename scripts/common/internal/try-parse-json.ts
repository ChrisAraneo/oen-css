import { tryCatch } from 'ramda';

export const tryParseJson: (json: string) => unknown = tryCatch(
  (json: string) => JSON.parse(json),
  () => undefined,
);
