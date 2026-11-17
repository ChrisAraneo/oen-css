import { map, size } from 'lodash-es';
import { pipe } from 'remeda';
import { OEN_THEME_COLORS } from '../../theme/consts.ts';
import { formatThemeColorDeclaration } from '../../theme/format-theme-color-declaration.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { findMissingDeclarations } from './find-missing-declarations.ts';
import { formatMissingDeclarationsProblem } from './format-missing-declarations-problem.ts';

const CHECK_NAME = 'theme colors are the configured Oen palette';

export const checkThemeColors = ({ stylesheet }: VerifyInputs): CheckResult =>
  pipe(
    findMissingDeclarations(
      stylesheet.text,
      map(OEN_THEME_COLORS, formatThemeColorDeclaration),
    ),
    (missing) => ({
      name: CHECK_NAME,
      detail: `${size(OEN_THEME_COLORS)} colors compile to their configured values`,
      problem: formatMissingDeclarationsProblem(missing),
    }),
  );
