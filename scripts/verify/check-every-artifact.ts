import { checkBulmaEquivalence } from './internal/check-bulma-equivalence.ts';
import { checkBulmaLicense } from './internal/check-bulma-license.ts';
import { checkComponentClasses } from './internal/check-component-classes.ts';
import { checkCustomProperties } from './internal/check-custom-properties.ts';
import { checkDistArtifacts } from './internal/check-dist-artifacts.ts';
import { checkEmbeddedNotices } from './internal/check-embedded-notices.ts';
import { checkFixedGridContainer } from './internal/check-fixed-grid-container.ts';
import { checkMinifiedStylesheet } from './internal/check-minified-stylesheet.ts';
import { checkNamespaceLeakage } from './internal/check-namespace-leakage.ts';
import { checkOenLicense } from './internal/check-oen-license.ts';
import { checkStylesheetHeaders } from './internal/check-stylesheet-headers.ts';
import { checkThemeColors } from './internal/check-theme-colors.ts';
import { checkThemeFonts } from './internal/check-theme-fonts.ts';
import { checkThemeType } from './internal/check-theme-type.ts';
import type { CheckResult } from './types/check-result.ts';
import type { VerifyInputs } from './types/verify-inputs.ts';

export const checkEveryArtifact = (
  inputs: VerifyInputs,
): readonly CheckResult[] => [
  checkDistArtifacts(inputs),
  checkStylesheetHeaders(inputs),
  checkNamespaceLeakage(inputs),
  checkCustomProperties(inputs),
  checkThemeColors(inputs),
  checkThemeFonts(inputs),
  checkThemeType(inputs),
  checkComponentClasses(inputs),
  checkFixedGridContainer(inputs),
  checkMinifiedStylesheet(inputs),
  checkBulmaLicense(inputs),
  checkOenLicense(inputs),
  checkEmbeddedNotices(inputs),
  checkBulmaEquivalence(inputs),
];
