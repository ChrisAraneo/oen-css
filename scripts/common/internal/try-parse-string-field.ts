import { get } from 'lodash-es';
import { P, match } from 'ts-pattern';

const { string } = P;

export const tryParseStringField = (
  manifest: unknown,
  path: string,
): string | undefined =>
  match(get(manifest, path))
    .with(string, (text) => text)
    .otherwise(() => undefined);
