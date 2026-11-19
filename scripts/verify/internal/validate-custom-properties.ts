import { pipe } from 'remeda';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { toCustomPropertiesResult } from './to-custom-properties-result.ts';
import { toDeclaredCustomProperties } from './to-declared-custom-properties.ts';

export const validateCustomProperties = ({
  stylesheet,
}: VerifyInputs): CheckResult =>
  pipe(stylesheet.text, toDeclaredCustomProperties, toCustomPropertiesResult);
