import { describe, expect, it } from 'vitest';
import {
  OEN_BUTTON_CANVAS_CLASS,
  OEN_BUTTON_CANVAS_HOST_SELECTOR,
  OEN_BUTTON_CANVAS_Z_INDEX,
} from './consts.ts';
import { formatButtonCanvasRules } from './format-button-canvas-rules.ts';

describe('formatButtonCanvasRules', () => {
  it('should return the host as its own stacking context when the rules are formatted', () => {
    expect(formatButtonCanvasRules()).toContain(
      `${OEN_BUTTON_CANVAS_HOST_SELECTOR} {\n  isolation: isolate;\n  overflow: hidden;\n}`,
    );
  });

  it('should return the canvas as a direct child of the host when the rules are formatted', () => {
    expect(formatButtonCanvasRules()).toContain(
      `${OEN_BUTTON_CANVAS_HOST_SELECTOR} > canvas.${OEN_BUTTON_CANVAS_CLASS} {`,
    );
  });

  it('should return the configured stacking level when the rules are formatted', () => {
    expect(formatButtonCanvasRules()).toContain(
      `z-index: ${OEN_BUTTON_CANVAS_Z_INDEX};`,
    );
  });

  it('should return a layer that fills the button when the rules are formatted', () => {
    expect(formatButtonCanvasRules()).toContain('inset: 0;');
    expect(formatButtonCanvasRules()).toContain('width: 100%;');
    expect(formatButtonCanvasRules()).toContain('height: 100%;');
  });

  it('should return the inherited radius when the rules are formatted', () => {
    expect(formatButtonCanvasRules()).toContain('border-radius: inherit;');
  });

  it('should return a layer that takes no pointer events when the rules are formatted', () => {
    expect(formatButtonCanvasRules()).toContain('pointer-events: none;');
  });

  it('should return both tuning properties with their defaults when the rules are formatted', () => {
    expect(formatButtonCanvasRules()).toContain(
      'opacity: var(--oen-button-canvas-opacity, 1);',
    );
    expect(formatButtonCanvasRules()).toContain(
      'mix-blend-mode: var(--oen-button-canvas-blend-mode, normal);',
    );
  });

  it('should not return the ghost or the text button when the rules are formatted', () => {
    expect(formatButtonCanvasRules()).toContain(':not(.is-ghost, .is-text)');
  });

  it('should not return a gradient when the rules are formatted', () => {
    expect(formatButtonCanvasRules()).not.toContain('gradient');
  });

  it('should return a rule that ends with the closing brace when the rules are formatted', () => {
    expect(formatButtonCanvasRules().endsWith('}')).toBe(true);
  });
});
