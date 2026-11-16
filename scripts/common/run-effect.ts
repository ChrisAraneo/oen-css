import { match } from 'ts-pattern';

export const runEffect = <Value>(
  value: Value,
  effect: (value: Value) => void,
): Value => match(effect(value)).otherwise(() => value);
