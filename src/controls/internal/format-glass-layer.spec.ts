import { describe, expect, it } from 'vitest';
import type { ButtonGlassLayer } from '../types/button-glass-layer.ts';
import { formatGlassLayer } from './format-glass-layer.ts';

const LAYER: ButtonGlassLayer = {
  offset: 34,
  size: '86% 112%',
  position: '20% 26%',
  falloff: '72%',
};

describe('formatGlassLayer', () => {
  it('should return the radial gradient in the button color when called with a layer', () => {
    expect(formatGlassLayer(LAYER)).toBe(
      'radial-gradient(86% 112% at 20% 26%, hsl(var(--oen-button-h), calc(var(--oen-button-s) + 75%), calc(var(--oen-button-background-l) + 34%)) 0%, transparent 72%)',
    );
  });

  it('should return a darkened lightness when the offset is negative', () => {
    expect(formatGlassLayer({ ...LAYER, offset: -39 })).toContain(
      'calc(var(--oen-button-background-l) - 39%)',
    );
  });

  it('should return a lightened lightness when the offset is zero', () => {
    expect(formatGlassLayer({ ...LAYER, offset: 0 })).toContain(
      'calc(var(--oen-button-background-l) + 0%)',
    );
  });

  it('should return the boosted saturation of the button when called with a layer', () => {
    expect(formatGlassLayer(LAYER)).toContain(
      'calc(var(--oen-button-s) + 75%)',
    );
  });

  it('should return the size before the position when called with a layer', () => {
    expect(formatGlassLayer(LAYER)).toContain('86% 112% at 20% 26%');
  });

  it('should return the falloff of the layer when the layer fades sooner', () => {
    expect(
      formatGlassLayer({ ...LAYER, falloff: '62%' }).endsWith(
        'transparent 62%)',
      ),
    ).toBe(true);
  });

  it('should not return a fixed theme color when called with a layer', () => {
    expect(formatGlassLayer(LAYER)).not.toContain('var(--oen-primary)');
  });
});
