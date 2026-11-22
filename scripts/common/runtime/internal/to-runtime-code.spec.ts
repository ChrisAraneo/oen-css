import { describe, expect, it } from 'vitest';
import { toRuntimeCode } from './to-runtime-code.ts';

const outputFile = (text: string) => ({
  path: 'oen.js',
  contents: new Uint8Array(),
  hash: '',
  text,
});

describe('toRuntimeCode', () => {
  it('should return the code of the first output file when the build emitted one', () => {
    expect(toRuntimeCode([outputFile('(()=>{})();')])).toBe('(()=>{})();');
  });

  it('should return the code of the first output file when the build emitted several', () => {
    expect(toRuntimeCode([outputFile('first'), outputFile('second')])).toBe(
      'first',
    );
  });

  it('should return an empty string when the build emitted no output file', () => {
    expect(toRuntimeCode([])).toBe('');
  });

  it('should return an empty string when the build reported no output files at all', () => {
    expect(toRuntimeCode(undefined)).toBe('');
  });
});
