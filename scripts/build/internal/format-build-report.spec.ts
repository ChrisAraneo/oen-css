import { describe, expect, it } from 'vitest';
import type { BuildArtifacts } from '../types/build-artifacts.ts';
import { formatBuildReport } from './format-build-report.ts';

const artifacts = (
  overrides: Partial<BuildArtifacts> = {},
): BuildArtifacts => ({
  version: '0.2.1',
  bulmaVersion: '1.0.4',
  startedAt: 0,
  stylesheet: 'body {}',
  minifiedStylesheet: 'body{}',
  runtime: 'void 0;',
  minifiedRuntime: 'void 0;',
  bulmaLicense: 'MIT',
  thirdPartyNotices: '# Notices',
  appliedMappings: [{ description: 'the prefix', count: 7 }],
  embeddedLicenseComments: [],
  warnings: [],
  issues: [],
  ...overrides,
});

describe('formatBuildReport', () => {
  it('should return a first line naming both versions and the duration when called with the artifacts', () => {
    expect(formatBuildReport(artifacts(), 123).at(0)).toBe(
      'oen-css v0.2.1 built from Bulma v1.0.4 in 123 ms',
    );
  });

  it('should return a line naming what the mapping renamed when the artifacts carry a mapping', () => {
    expect(formatBuildReport(artifacts(), 0)).toContain(
      '  renamed     7x  the prefix',
    );
  });

  it('should return the size of both stylesheets when called with the artifacts', () => {
    const report = formatBuildReport(artifacts(), 0).join('\n');

    expect(report).toContain('oen.css');
    expect(report).toContain('oen.min.css');
    expect(report).toContain('kB gzipped');
  });

  it('should return a line naming the licenses that ship alongside when called with the artifacts', () => {
    expect(formatBuildReport(artifacts(), 0)).toContain(
      '  LICENSE-bulma, THIRD_PARTY_NOTICES.md',
    );
  });

  it('should return a warning line when the artifacts carry a clean-css warning', () => {
    expect(
      formatBuildReport(artifacts({ warnings: ['odd selector'] }), 0),
    ).toContain('  clean-css warning: odd selector');
  });

  it('should return a line per embedded notice when the artifacts carry one', () => {
    expect(
      formatBuildReport(
        artifacts({
          embeddedLicenseComments: [
            { name: 'minireset.css v0.0.6', details: [], text: '/*! x */' },
          ],
        }),
        0,
      ),
    ).toContain('  embedded notice preserved: minireset.css v0.0.6');
  });

  it('should not return a warning line when the artifacts carry no warning', () => {
    expect(
      formatBuildReport(artifacts(), 0).some((line) =>
        line.includes('clean-css warning'),
      ),
    ).toBe(false);
  });
});
