import { describe, expect, it } from 'vitest';
import { patchRuntimeHeader } from './patch-runtime-header.ts';

const BANNER = '/*!\n * oen-css v0.2.1\n */';

const CODE = '(()=>{})();';

describe('patchRuntimeHeader', () => {
  it('should return the banner in front of the code when called with both', () => {
    expect(patchRuntimeHeader(CODE, BANNER)).toBe(`${BANNER}\n${CODE}`);
  });

  it('should return code that starts with the banner when called with both', () => {
    expect(patchRuntimeHeader(CODE, BANNER).startsWith('/*!')).toBe(true);
  });

  it('should return the banner alone when the code is an empty string', () => {
    expect(patchRuntimeHeader('', BANNER)).toBe(`${BANNER}\n`);
  });

  it('should not change the old code when the banner is prepended', () => {
    patchRuntimeHeader(CODE, BANNER);

    expect(CODE).toBe('(()=>{})();');
  });
});
