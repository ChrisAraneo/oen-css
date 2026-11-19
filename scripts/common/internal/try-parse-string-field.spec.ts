import { describe, expect, it } from 'vitest';
import { tryParseStringField } from './try-parse-string-field.ts';

describe('tryParseStringField', () => {
  it('should return the field value when the field is a top level string', () => {
    expect(tryParseStringField({ version: '1.0.0' }, 'version')).toBe('1.0.0');
  });

  it('should return the field value when the path names a nested field', () => {
    expect(
      tryParseStringField(
        { oen: { bulmaVersion: '1.0.4' } },
        'oen.bulmaVersion',
      ),
    ).toBe('1.0.4');
  });

  it('should return `undefined` when the field is missing', () => {
    expect(tryParseStringField({}, 'version')).toBe(undefined);
  });

  it('should return `undefined` when the field is not a string', () => {
    expect(tryParseStringField({ version: 1 }, 'version')).toBe(undefined);
  });

  it('should return `undefined` when the manifest is `undefined`', () => {
    expect(tryParseStringField(undefined, 'version')).toBe(undefined);
  });

  it('should return `undefined` when a path segment is missing', () => {
    expect(tryParseStringField({ version: '1.0.0' }, 'oen.bulmaVersion')).toBe(
      undefined,
    );
  });

  it('should return an empty string when the field is an empty string', () => {
    expect(tryParseStringField({ homepage: '' }, 'homepage')).toBe('');
  });
});
