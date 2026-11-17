import { map, size } from 'lodash-es';
import { pipe } from 'remeda';
import { OEN_FONT_PROPERTIES } from '../../theme/consts.ts';
import { formatThemeFontDeclaration } from '../../theme/format-theme-font-declaration.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { findMissingDeclarations } from './find-missing-declarations.ts';
import { formatMissingDeclarationsProblem } from './format-missing-declarations-problem.ts';

const CHECK_NAME = 'theme fonts are the configured Oen stack';

export const checkThemeFonts = ({ stylesheet }: VerifyInputs): CheckResult =>
  pipe(
    findMissingDeclarations(
      stylesheet.text,
      map(OEN_FONT_PROPERTIES, formatThemeFontDeclaration),
    ),
    (missing) => ({
      name: CHECK_NAME,
      detail: `${size(OEN_FONT_PROPERTIES)} properties compile to the configured stack`,
      problem: formatMissingDeclarationsProblem(missing),
    }),
  );
