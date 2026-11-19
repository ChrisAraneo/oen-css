import { describe, expect, it } from 'vitest';
import { tryParseJson } from './try-parse-json.ts';

describe('tryParseJson', () => {
  it('should return the parsed object when the json is an object', () => {
    expect(tryParseJson('{"version":"1.0.0"}')).toEqual({ version: '1.0.0' });
  });

  it('should return the nested object when the json is nested', () => {
    expect(tryParseJson('{"oen":{"bulmaVersion":"1.0.4"}}')).toEqual({
      oen: { bulmaVersion: '1.0.4' },
    });
  });

  it('should return `undefined` when the json is malformed', () => {
    expect(tryParseJson('{not json}')).toBe(undefined);
  });

  it('should return `undefined` when the json is an empty string', () => {
    expect(tryParseJson('')).toBe(undefined);
  });

  it('should return the parsed value when the json is a bare number or `null`', () => {
    expect(tryParseJson('123')).toBe(123);
    expect(tryParseJson('null')).toBe(null);
  });

  it('should return `undefined` when the json is truncated', () => {
    expect(tryParseJson('{"version":')).toBe(undefined);
  });
});
