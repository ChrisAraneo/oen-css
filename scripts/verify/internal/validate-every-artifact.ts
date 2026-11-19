import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { validateBulmaEquivalence } from './validate-bulma-equivalence.ts';
import { validateBulmaLicense } from './validate-bulma-license.ts';
import { validateComponentClasses } from './validate-component-classes.ts';
import { validateCustomProperties } from './validate-custom-properties.ts';
import { validateDistArtifacts } from './validate-dist-artifacts.ts';
import { validateEmbeddedNotices } from './validate-embedded-notices.ts';
import { validateFixedGridContainer } from './validate-fixed-grid-container.ts';
import { validateMinifiedStylesheet } from './validate-minified-stylesheet.ts';
import { validateNamespaceLeakage } from './validate-namespace-leakage.ts';
import { validateOenLicense } from './validate-oen-license.ts';
import { validateStylesheetHeaders } from './validate-stylesheet-headers.ts';
import { validateThemeColors } from './validate-theme-colors.ts';
import { validateThemeFonts } from './validate-theme-fonts.ts';
import { validateThemeType } from './validate-theme-type.ts';

export const validateEveryArtifact = (
  inputs: VerifyInputs,
): readonly CheckResult[] => [
  validateDistArtifacts(inputs),
  validateStylesheetHeaders(inputs),
  validateNamespaceLeakage(inputs),
  validateCustomProperties(inputs),
  validateThemeColors(inputs),
  validateThemeFonts(inputs),
  validateThemeType(inputs),
  validateComponentClasses(inputs),
  validateFixedGridContainer(inputs),
  validateMinifiedStylesheet(inputs),
  validateBulmaLicense(inputs),
  validateOenLicense(inputs),
  validateEmbeddedNotices(inputs),
  validateBulmaEquivalence(inputs),
];
