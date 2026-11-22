import { describe, expect, it } from 'vitest';
import { OEN_BUTTON_GRADIENT_SHIFT } from '../consts.ts';
import { formatGradientStop } from './format-gradient-stop.ts';

describe('formatGradientStop', () => {
  it('should return the lightened color capped at the limit when the stop is lighter', () => {
    expect(formatGradientStop({ direction: 'lighter', limit: '93%' })).toBe(
      'hsl(var(--oen-button-h), var(--oen-button-s), min(var(--oen-button-background-l) + 14%, 93%))',
    );
  });

  it('should return the darkened color floored at the limit when the stop is darker', () => {
    expect(formatGradientStop({ direction: 'darker', limit: '8%' })).toBe(
      'hsl(var(--oen-button-h), var(--oen-button-s), max(var(--oen-button-background-l) - 14%, 8%))',
    );
  });

  it('should return the configured shift when the stop is lighter', () => {
    expect(
      formatGradientStop({ direction: 'lighter', limit: '93%' }),
    ).toContain(`+ ${OEN_BUTTON_GRADIENT_SHIFT},`);
  });

  it('should return the button hue and saturation when called with a stop', () => {
    expect(formatGradientStop({ direction: 'darker', limit: '8%' })).toContain(
      'hsl(var(--oen-button-h), var(--oen-button-s),',
    );
  });
});
