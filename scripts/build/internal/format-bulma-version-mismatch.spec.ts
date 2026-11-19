import { describe, expect, it } from 'vitest';
import { formatBulmaVersionMismatch } from './format-bulma-version-mismatch.ts';

describe('formatBulmaVersionMismatch', () => {
  it('should return `undefined` when the declared version matches the installed one', () => {
    expect(formatBulmaVersionMismatch('1.0.4', '1.0.4')).toBe(undefined);
  });

  it('should return `undefined` when no version is declared', () => {
    expect(formatBulmaVersionMismatch(undefined, '1.0.4')).toBe(undefined);
  });

  it('should return an issue naming both versions when the declared version differs', () => {
    const issue = formatBulmaVersionMismatch('1.0.3', '1.0.4');

    expect(issue).toContain('declares oen.bulmaVersion "1.0.3"');
    expect(issue).toContain('node_modules/bulma is "1.0.4"');
  });

  it('should return an issue naming both fixes when the declared version differs', () => {
    const issue = formatBulmaVersionMismatch('1.0.3', '1.0.4');

    expect(issue).toContain('npm install');
    expect(issue).toContain('update oen.bulmaVersion');
  });

  it('should return an issue when the installed version is `0.0.0`', () => {
    expect(formatBulmaVersionMismatch('1.0.4', '0.0.0')).toContain(
      'Bulma version mismatch',
    );
  });
});
