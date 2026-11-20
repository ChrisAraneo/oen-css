import { describe, expect, it } from 'vitest';
import { formatOenLicenseIssue } from './format-oen-license-issue.ts';

const LICENSE =
  'MIT License\n\nCopyright (c) 2026 Krzysztof Pająk\n\nPermission is hereby granted, free of charge, to any person\n';

describe('formatOenLicenseIssue', () => {
  it('should return `undefined` when the shipped license is the MIT notice', () => {
    expect(formatOenLicenseIssue(LICENSE)).toBe(undefined);
  });

  it('should return the shape issue when the shipped license has no copyright line', () => {
    expect(
      formatOenLicenseIssue('Permission is hereby granted, free of charge'),
    ).toBe('LICENSE does not look like the MIT notice');
  });

  it('should return the shape issue when the shipped license has no permission sentence', () => {
    expect(formatOenLicenseIssue('Copyright (c) 2026 Krzysztof Pająk')).toBe(
      'LICENSE does not look like the MIT notice',
    );
  });

  it('should return the shape issue when the shipped license is empty', () => {
    expect(formatOenLicenseIssue('')).toContain('does not look like');
  });

  it('should return the shape issue when the shipped license is another license', () => {
    expect(formatOenLicenseIssue('Apache License, Version 2.0')).toContain(
      'does not look like',
    );
  });
});
