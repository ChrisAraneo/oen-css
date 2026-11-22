import { size } from 'lodash-es';
import { describe, expect, it } from 'vitest';
import { OEN_THEME_COLORS } from '../../colors/consts.ts';
import { OEN_BUTTON_SATURATED_VARIANTS } from '../consts.ts';
import { formatSaturatedVariantSelector } from './format-saturated-variant-selector.ts';

describe('formatSaturatedVariantSelector', () => {
  it('should return the button selector matching every saturated variant when the selector is formatted', () => {
    expect(formatSaturatedVariantSelector()).toBe(
      '.button:is(.is-black, .is-dark, .is-primary, .is-link, .is-info, .is-success, .is-warning, .is-danger)',
    );
  });

  it('should return one class for each dark variant and theme color when the selector is formatted', () => {
    expect(size(formatSaturatedVariantSelector().split('.is-'))).toBe(
      size(OEN_BUTTON_SATURATED_VARIANTS) + size(OEN_THEME_COLORS) + 1,
    );
  });

  it('should not return the plain, white or light button when the selector is formatted', () => {
    expect(formatSaturatedVariantSelector()).not.toContain('.is-white');
    expect(formatSaturatedVariantSelector()).not.toContain('.is-light');
  });
});
