import { map, size } from 'lodash-es';
import { pipe } from 'remeda';
import { OEN_TYPE_DECLARATIONS } from '../../theme/consts.ts';
import { formatThemeTypeDeclaration } from '../../theme/format-theme-type-declaration.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { findMissingDeclarations } from './find-missing-declarations.ts';
import { formatMissingDeclarationsProblem } from './format-missing-declarations-problem.ts';

const CHECK_NAME = 'type scale is the configured Oen scale';

export const checkThemeType = ({ stylesheet }: VerifyInputs): CheckResult =>
  pipe(
    findMissingDeclarations(
      stylesheet.text,
      map(OEN_TYPE_DECLARATIONS, formatThemeTypeDeclaration),
    ),
    (missing) => ({
      name: CHECK_NAME,
      detail: `${size(OEN_TYPE_DECLARATIONS)} declarations compile to their configured sizes`,
      problem: formatMissingDeclarationsProblem(missing),
    }),
  );
