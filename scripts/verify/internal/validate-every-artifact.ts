import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { validateBulmaEquivalence } from './validate-bulma-equivalence.ts';
import { validateBulmaLicense } from './validate-bulma-license.ts';
import { validateButtonCanvas } from './validate-button-canvas.ts';
import { validateComponentClasses } from './validate-component-classes.ts';
import { validateCustomProperties } from './validate-custom-properties.ts';
import { validatePackageArtifacts } from './validate-package-artifacts.ts';
import { validateEmbeddedNotices } from './validate-embedded-notices.ts';
import { validateFixedGridContainer } from './validate-fixed-grid-container.ts';
import { validateMinifiedStylesheet } from './validate-minified-stylesheet.ts';
import { validateNoLeftoverBulma } from './validate-no-leftover-bulma.ts';
import { validateOenLicense } from './validate-oen-license.ts';
import { validateRuntimeHeaders } from './validate-runtime-headers.ts';
import { validateStylesheetHeaders } from './validate-stylesheet-headers.ts';
import { validateThemeColors } from './validate-theme-colors.ts';
import { validateThemeControls } from './validate-theme-controls.ts';
import { validateThemeFonts } from './validate-theme-fonts.ts';
import { validateThemeType } from './validate-theme-type.ts';

export const validateEveryArtifact = (
  inputs: VerifyInputs,
): readonly CheckResult[] => [
  validatePackageArtifacts(inputs),
  validateStylesheetHeaders(inputs),
  validateRuntimeHeaders(inputs),
  validateNoLeftoverBulma(inputs),
  validateCustomProperties(inputs),
  validateThemeColors(inputs),
  validateThemeFonts(inputs),
  validateThemeType(inputs),
  validateThemeControls(inputs),
  validateButtonCanvas(inputs),
  validateComponentClasses(inputs),
  validateFixedGridContainer(inputs),
  validateMinifiedStylesheet(inputs),
  validateBulmaLicense(inputs),
  validateOenLicense(inputs),
  validateEmbeddedNotices(inputs),
  validateBulmaEquivalence(inputs),
];
