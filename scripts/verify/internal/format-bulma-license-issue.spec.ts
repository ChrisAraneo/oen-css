import { describe, expect, it } from 'vitest';
import { formatBulmaLicenseIssue } from './format-bulma-license-issue.ts';

const LICENSE = `MIT License

Copyright (c) 2023 Jeremy Thomas

Permission is hereby granted, free of charge, to any person obtaining a copy`;

const NOTICES = `# Third-party notices\n\n${LICENSE}\n`;

describe('formatBulmaLicenseIssue', () => {
  it('should return `undefined` when the license ships verbatim and is documented', () => {
    expect(formatBulmaLicenseIssue(LICENSE, LICENSE, NOTICES)).toBe(undefined);
  });

  it('should return the verbatim issue when the shipped license differs from the installed one', () => {
    expect(formatBulmaLicenseIssue('MIT License', LICENSE, NOTICES)).toBe(
      'LICENSE-bulma differs from node_modules/bulma/LICENSE',
    );
  });

  it('should return the MIT notice issue when the license is not the MIT notice', () => {
    expect(formatBulmaLicenseIssue('Apache', 'Apache', NOTICES)).toBe(
      'LICENSE-bulma does not look like the MIT notice',
    );
  });

  it('should return the notices issue when the notices do not reproduce the license', () => {
    expect(formatBulmaLicenseIssue(LICENSE, LICENSE, '# Notices')).toBe(
      'THIRD_PARTY_NOTICES.md does not reproduce the Bulma notice',
    );
  });

  it('should return the verbatim issue first when the license is both missing and undocumented', () => {
    expect(formatBulmaLicenseIssue('', LICENSE, '')).toContain(
      'differs from node_modules/bulma/LICENSE',
    );
  });

  it('should return `undefined` when the notices reproduce the license trimmed', () => {
    expect(
      formatBulmaLicenseIssue(
        `\n${LICENSE}\n`,
        `\n${LICENSE}\n`,
        `prefix\n${LICENSE}\nsuffix`,
      ),
    ).toBe(undefined);
  });

  it('should return the MIT notice issue when the permission sentence is missing', () => {
    expect(
      formatBulmaLicenseIssue(
        'Copyright (c) 2023 Jeremy Thomas',
        'Copyright (c) 2023 Jeremy Thomas',
        NOTICES,
      ),
    ).toBe('LICENSE-bulma does not look like the MIT notice');
  });
});
