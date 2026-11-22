import { describe, expect, it } from 'vitest';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { validateComponentClasses } from './validate-component-classes.ts';

const EVERY_SELECTOR = [
  '.button',
  '.navbar',
  '.card',
  '.modal',
  '.columns',
  '.fixed-grid',
  '.hero',
  '.tag',
  '.input',
  '.is-primary',
  '.has-text-centered',
  '.skeleton-block',
]
  .map((selector) => `${selector}{color:red}`)
  .join('\n');

const file = (text: string) => ({
  path: 'oen.css',
  text,
  issue: undefined,
});

const inputs = (stylesheet: string): VerifyInputs => ({
  stylesheet: file(stylesheet),
  minifiedStylesheet: file(''),
  runtime: file(''),
  minifiedRuntime: file(''),
  oenLicense: file(''),
  bulmaLicense: file(''),
  thirdPartyNotices: file(''),
  repositoryBulmaLicense: file(''),
  bulmaManifest: file('{}'),
  upstreamBulmaStylesheet: { css: '', issue: undefined },
});

describe('validateComponentClasses', () => {
  it('should return the check name and the spot-checked selector count when every selector is present', () => {
    const result = validateComponentClasses(inputs(EVERY_SELECTOR));

    expect(result.name).toBe('component classes are unchanged from Bulma');
    expect(result.detail).toBe('12 spot-checked selectors present');
  });

  it('should return `undefined` as the issue when every spot-checked selector is present', () => {
    expect(validateComponentClasses(inputs(EVERY_SELECTOR)).issue).toBe(
      undefined,
    );
  });

  it('should return the missing selector when `.navbar` is absent', () => {
    expect(
      validateComponentClasses(
        inputs(EVERY_SELECTOR.replace('.navbar{color:red}', '')),
      ).issue,
    ).toBe('missing selectors: .navbar');
  });

  it('should return `.button` as missing when the class names were prefixed', () => {
    expect(validateComponentClasses(inputs('.oen-button{}')).issue).toContain(
      '.button',
    );
  });

  it('should return `.has-text-centered` as missing when the stylesheet declares no class', () => {
    expect(validateComponentClasses(inputs('body{}')).issue).toContain(
      '.has-text-centered',
    );
  });
});
