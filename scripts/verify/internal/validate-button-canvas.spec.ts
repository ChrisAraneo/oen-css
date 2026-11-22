import { describe, expect, it } from 'vitest';
import {
  OEN_BUTTON_CANVAS_CLASS,
  OEN_BUTTON_CANVAS_HOST_SELECTOR,
} from '../../../src/canvas/consts.ts';
import { formatButtonCanvasRules } from '../../../src/canvas/format-button-canvas-rules.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { validateButtonCanvas } from './validate-button-canvas.ts';

const RUNTIME_CODE = `"${OEN_BUTTON_CANVAS_CLASS}" "${OEN_BUTTON_CANVAS_HOST_SELECTOR}"`;

const file = (path: string, text: string) => ({ path, text, issue: undefined });

const inputs = (overrides: Partial<VerifyInputs> = {}): VerifyInputs => ({
  stylesheet: file('oen.css', formatButtonCanvasRules()),
  minifiedStylesheet: file('oen.min.css', ''),
  runtime: file('oen.js', RUNTIME_CODE),
  minifiedRuntime: file('oen.min.js', RUNTIME_CODE),
  oenLicense: file('LICENSE', ''),
  bulmaLicense: file('LICENSE-bulma', ''),
  thirdPartyNotices: file('THIRD_PARTY_NOTICES.md', ''),
  repositoryBulmaLicense: file('node_modules/bulma/LICENSE', ''),
  bulmaManifest: file('node_modules/bulma/package.json', '{}'),
  upstreamBulmaStylesheet: { css: '', issue: undefined },
  ...overrides,
});

describe('validateButtonCanvas', () => {
  it('should return the check name and both runtimes when the layer is complete', () => {
    const result = validateButtonCanvas(inputs());

    expect(result.name).toBe('every button carries an injected canvas layer');
    expect(result.detail).toBe(
      '.oen-button-canvas is parked by oen.css and injected by oen.js, oen.min.js',
    );
  });

  it('should return no issue when the stylesheet and both runtimes carry the layer', () => {
    expect(validateButtonCanvas(inputs()).issue).toBe(undefined);
  });

  it('should return the rules as missing when the stylesheet does not park the canvas', () => {
    expect(
      validateButtonCanvas(inputs({ stylesheet: file('oen.css', 'body {}') }))
        .issue,
    ).toContain('isolation: isolate');
  });

  it('should return the class as missing when the expanded runtime does not name it', () => {
    expect(
      validateButtonCanvas(
        inputs({
          runtime: file('oen.js', `"${OEN_BUTTON_CANVAS_HOST_SELECTOR}"`),
        }),
      ).issue,
    ).toContain(`expected: ${OEN_BUTTON_CANVAS_CLASS}`);
  });

  it('should return the class as missing when the minified runtime does not name it', () => {
    expect(
      validateButtonCanvas(
        inputs({
          minifiedRuntime: file(
            'oen.min.js',
            `"${OEN_BUTTON_CANVAS_HOST_SELECTOR}"`,
          ),
        }),
      ).issue,
    ).toContain(`expected: ${OEN_BUTTON_CANVAS_CLASS}`);
  });

  it('should return one entry per missing fragment when both runtimes are empty', () => {
    const issue = validateButtonCanvas(
      inputs({
        runtime: file('oen.js', ''),
        minifiedRuntime: file('oen.min.js', ''),
      }),
    ).issue;

    expect(issue).toContain(`expected: ${OEN_BUTTON_CANVAS_CLASS}`);
    expect(issue).toContain(`expected: ${OEN_BUTTON_CANVAS_HOST_SELECTOR}`);
  });
});
