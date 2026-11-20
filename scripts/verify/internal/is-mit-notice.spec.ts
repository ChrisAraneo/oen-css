import { describe, expect, it } from 'vitest';
import { isMitNotice } from './is-mit-notice.ts';

const LICENSE =
  'MIT License\n\nCopyright (c) 2026 Krzysztof Pająk\n\nPermission is hereby granted, free of charge\n';

describe('isMitNotice', () => {
  it('should return `true` when the text carries both the copyright line and the permission sentence', () => {
    expect(isMitNotice(LICENSE)).toBe(true);
  });

  it('should return `false` when the copyright line is missing', () => {
    expect(isMitNotice('Permission is hereby granted, free of charge')).toBe(
      false,
    );
  });

  it('should return `false` when the permission sentence is missing', () => {
    expect(isMitNotice('Copyright (c) 2026 Krzysztof Pająk')).toBe(false);
  });

  it('should return `false` when the text is empty', () => {
    expect(isMitNotice('')).toBe(false);
  });
});
