import { describe, expect, it, vi } from 'vitest';
import { writeIssueLines } from '../../common/write-issue-lines.ts';
import { writeLines } from '../../common/write-lines.ts';
import type { BuildArtifacts } from '../types/build-artifacts.ts';
import { writeBuildReport } from './write-build-report.ts';

vi.mock('../../common/write-lines.ts', () => ({ writeLines: vi.fn() }));
vi.mock('../../common/write-issue-lines.ts', () => ({
  writeIssueLines: vi.fn(),
}));

const artifacts = (issues: readonly string[] = []): BuildArtifacts => ({
  version: '0.2.1',
  bulmaVersion: '1.0.4',
  startedAt: 100,
  stylesheet: 'body {}',
  minifiedStylesheet: 'body{}',
  oenLicense: 'MIT',
  bulmaLicense: 'MIT',
  thirdPartyNotices: '# Notices',
  appliedMappings: [],
  embeddedLicenseComments: [],
  warnings: [],
  issues,
});

describe('writeBuildReport', () => {
  it('should return `true` and call `writeLines` once when there was no issue', () => {
    expect(writeBuildReport(artifacts(), () => 100)).toBe(true);
    expect(writeLines).toHaveBeenCalledTimes(1);
  });

  it('should return `false` and pass the issue lines to `writeIssueLines` when there was an issue', () => {
    expect(writeBuildReport(artifacts(['it broke']), () => 100)).toBe(false);
    expect(writeIssueLines).toHaveBeenCalledWith([
      '',
      'Build failed: it broke',
      '',
    ]);
  });

  it('should pass a line naming 150 ms to `writeLines` when the clock advanced 150 ms', () => {
    writeBuildReport(artifacts(), () => 250);

    expect(writeLines).toHaveBeenCalledWith(
      expect.arrayContaining([expect.stringContaining('in 150 ms')]),
    );
  });

  it('should not call `writeIssueLines` when there was no issue', () => {
    writeBuildReport(artifacts(), () => 100);

    expect(writeIssueLines).not.toHaveBeenCalled();
  });

  it('should not call `writeLines` when there was an issue', () => {
    writeBuildReport(artifacts(['broke']), () => 100);

    expect(writeLines).not.toHaveBeenCalled();
  });
});
